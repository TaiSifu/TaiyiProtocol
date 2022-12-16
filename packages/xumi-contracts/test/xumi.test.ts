import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumberish } from 'ethers';
import { solidity } from 'ethereum-waffle';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    WorldConstants, WorldContractRoute, WorldContractRoute__factory, 
    Actors, ShejiTu, ActorAttributes, SifusToken, WorldEvents, WorldFungible, ActorNames, ActorTalents, ActorSocialIdentity, 
    WorldZones, ActorRelationship,  Actors__factory, ActorNames__factory, ActorTalents__factory, WorldConstants__factory, WorldFungible__factory, 
    SifusToken__factory, WorldEvents__factory, ShejiTu__factory, WorldZones__factory, ActorAttributes__factory, 
    ActorSocialIdentity__factory, ActorRelationship__factory, WorldRandom, 
    ActorLocations, Trigrams, WorldRandom__factory, ActorLocations__factory, Trigrams__factory, WorldItems, WorldItems__factory, 
    ActorPrelifes, ActorPrelifes__factory, WorldYemings, WorldYemings__factory,
} from '@taiyi/contracts/dist/typechain';
import {
    blockNumber,
    blockTimestamp,
} from '@taiyi/contracts/dist/test/utils';
import {
    TaiyiContractName,
    WorldContract,
    deployTaiyiWorld,
    deployShejiTu,
    deployActorTalents,
    deployWorldEvents
} from '@taiyi/contracts/dist/utils';
import { 
    ActorXumiAttributes,
    XumiConstants,
} from '../typechain';
import { 
    deployActorXumiAttributes, deployAssetElementH, deployAssetEnergy,
    deployXumiConstants, initEvents, initItemTypes, initTalents, initTimeline, XumiContractName 
} from '../utils';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;
const ActRecoverTimeDay: number = 60;
const ZoneResourceGrowTimeDay: number = 60;
const ZoneResourceGrowQuantityScale: number = 10*1000; //10.0f
const BaseTravelTime: number = 3000;

describe('须弥时间线基础', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let taiyiContracts: Record<TaiyiContractName, WorldContract>;
    let eventProcessorAddressBook: {[index: string]:any};
    let contracts: Record<XumiContractName, WorldContract>;

    //taiyi basic
    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let sifusToken: SifusToken;
    let actors: Actors;
    let names: ActorNames;
    let actorSIDs: ActorSocialIdentity;
    let assetDaoli: WorldFungible;
    let zones: WorldZones;
    let baseAttributes: ActorAttributes;
    let actorPrelifes: ActorPrelifes;
    let worldYemings: WorldYemings;
    let worldRandom: WorldRandom;
    let actorLocations: ActorLocations;
    let trigrams: Trigrams;
    let worldItems: WorldItems;

    // 须弥相关
    let xumiConstants: XumiConstants;
    let talents: ActorTalents;
    let xumi: ShejiTu;
    let actorXumiAttributes: ActorXumiAttributes;
    let actorRelationship: ActorRelationship;
    let worldEvents: WorldEvents;

    let actorPanGu: BigNumber;
    let testActor: BigNumber; 
    let newZone: BigNumber;

    let makeMoney = async (toWho: string, amount: BigNumberish):Promise<void> => { 
        await assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, amount);
        await assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, amount);
        if(toWho != taiyiDAO.address)
            await assetDaoli.connect(taiyiDAO).transfer(toWho, amount);
    };

    let newActor = async (toWho: SignerWithAddress, randomName?:boolean):Promise<BigNumber> => {
        //deal coin
        await makeMoney(taiyiDAO.address, BigInt(1000e18));

        await assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = await actors.nextActor();
        await actors.connect(taiyiDAO).mintActor(BigInt(100e18));

        if(randomName) {
            let firstName = `${Math.round(Math.random()*100)}`;
            await names.connect(taiyiDAO).claim(firstName, "赛博", _actor);    
        }

        if(toWho.address != taiyiDAO.address)
            await actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
        return _actor;
    }

    let parseActorURI = async (actor: BigNumber) => {
        let uri = await actors.tokenURI(actor);
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
        //console.log(uriDecode);
        return JSON.parse(uriDecode);
    };

    async function reset() {
        if (snapshotId) {
            await ethers.provider.send('evm_revert', [snapshotId]);
            snapshotId = await ethers.provider.send('evm_snapshot', []);
            return;
        }    
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    }

    before(async () => {
        [deployer, taiyiDAO, operator1, operator2] = await ethers.getSigners();

        //Deploy taiyi basic
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        taiyiContracts = await deployTaiyiWorld(timestamp, deployer, taiyiDAO, false);

        sifusToken = SifusToken__factory.connect(taiyiContracts.SifusToken.instance.address, operator1);
        worldConstants = WorldConstants__factory.connect(taiyiContracts.WorldConstants.instance.address, operator1);
        worldContractRoute = WorldContractRoute__factory.connect(taiyiContracts.WorldContractRoute.instance.address, operator1);
        actors = Actors__factory.connect(taiyiContracts.Actors.instance.address, operator1);
        assetDaoli = WorldFungible__factory.connect(taiyiContracts.AssetDaoli.instance.address, operator1);
        names = ActorNames__factory.connect(taiyiContracts.ActorNames.instance.address, operator1);
        zones = WorldZones__factory.connect(taiyiContracts.WorldZones.instance.address, operator1);
        worldYemings = WorldYemings__factory.connect(taiyiContracts.WorldYemings.instance.address, operator1);
        baseAttributes = ActorAttributes__factory.connect(taiyiContracts.ActorAttributes.instance.address, operator1);
        actorSIDs = ActorSocialIdentity__factory.connect(taiyiContracts.ActorSocialIdentity.instance.address, operator1);
        worldRandom = WorldRandom__factory.connect(taiyiContracts.WorldRandom.instance.address, operator1);
        actorLocations = ActorLocations__factory.connect(taiyiContracts.ActorLocations.instance.address, operator1);
        trigrams = Trigrams__factory.connect(taiyiContracts.Trigrams.instance.address, operator1);
        worldItems = WorldItems__factory.connect(taiyiContracts.WorldItems.instance.address, operator1);
        actorPrelifes = ActorPrelifes__factory.connect(taiyiContracts.ActorPrelifes.instance.address, operator1);


        actorPanGu = await worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
    });

    describe('构建须弥域合约组', () => {
        it(`部署常量库`, async ()=>{
            xumiConstants = await deployXumiConstants(operator1);
        });

        it(`部署资源`, async ()=>{
            let assetEnergy = await deployAssetEnergy(xumiConstants, worldContractRoute, operator1);
            await worldContractRoute.connect(taiyiDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_ENERGY(), assetEnergy.address);

            let assetElementH = await deployAssetElementH(xumiConstants, worldContractRoute, operator1);
            await worldContractRoute.connect(taiyiDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_ELEMENT_H(), assetElementH.address);
        });

        it(`部署属性`, async ()=>{
            actorXumiAttributes = await deployActorXumiAttributes(worldContractRoute, operator1);
            await worldContractRoute.connect(taiyiDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES(), actorXumiAttributes.address);
        });

        it(`部署天赋模块`, async ()=>{
            talents = await deployActorTalents(await xumiConstants.WORLD_MODULE_TALENTS(), worldContractRoute, deployer);
            await worldContractRoute.connect(taiyiDAO).registerModule(await xumiConstants.WORLD_MODULE_TALENTS(), talents.address);
        });

        it(`部署事件模块`, async ()=>{
            worldEvents = await deployWorldEvents(OneAgeVSecond, await xumiConstants.WORLD_MODULE_EVENTS(), worldContractRoute, deployer);
            await worldContractRoute.connect(taiyiDAO).registerModule(await xumiConstants.WORLD_MODULE_EVENTS(), worldEvents.address);
        });

        it(`部署须弥时间线`, async ()=>{
            xumi = ShejiTu__factory.connect((await deployShejiTu("须弥", "所在时间线：须弥", await xumiConstants.WORLD_MODULE_TIMELINE(),
                actors, actorLocations, zones, baseAttributes, worldEvents, talents, trigrams, worldRandom,
                operator1))[0].address, operator1);
            await worldContractRoute.connect(taiyiDAO).registerModule(await xumiConstants.WORLD_MODULE_TIMELINE(), xumi.address);
        });

        it('不允许再次初始化', async () => {
            const tx = xumi.connect(operator1).initialize(
                "须弥", "所在时间线：须弥", await xumiConstants.WORLD_MODULE_TIMELINE(),
                actors.address,
                actorLocations.address,
                zones.address,
                baseAttributes.address,
                worldEvents.address,
                talents.address,
                trigrams.address,
                worldRandom.address);
            await expect(tx).to.be.revertedWith('Initializable: contract is already initialized');
        });    

        it(`初始化天赋`, async ()=>{
            await initTalents(talents.address, taiyiDAO, xumiConstants, worldConstants);

            let W_MODULE_XUMI_ATTRIBUTES = await xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES();
            let STB = await xumiConstants.ATTR_STB();

            expect(await talents.talentNames(10004)).to.eq("跃迁达人");
            expect(await talents.talentDescriptions(10004)).to.eq("运动可能自发突然变化，稳定性-10，属性点+40");
            expect((await talents.talentAttributeModifiers(10004)).length).to.eq(2);
            expect((await talents.talentAttributeModifiers(10004))[0]).to.eq(STB);
            expect((await talents.talentAttributeModifiers(10004))[1]).to.eq(-10);
            expect(await talents.talentAttrPointsModifiers(10004, W_MODULE_XUMI_ATTRIBUTES)).to.eq(40);
        });

        it(`增加物品类型`, async ()=>{
            await initItemTypes(worldItems.address, taiyiDAO);
            expect(await worldItems.typeNames(100)).to.eq("小型恒星");
        });

        it(`部署事件`, async ()=>{
            let eventProcessorAddressBook = await initEvents(worldContractRoute, worldEvents.address, taiyiDAO, operator1);
        });

        it(`配置时间线`, async ()=>{
            await initTimeline(xumi.address, operator1);
        });

        it(`配置Actor URI模块`, async ()=>{
            //register actors uri modules
            await actors.connect(taiyiDAO).registerURIPartModule(names.address);
            await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
            await actors.connect(taiyiDAO).registerURIPartModule(xumi.address);
        });

        it(`创建测试角色`, async ()=>{
            //deal coin
            await makeMoney(operator1.address, BigInt(1000e18));

            await assetDaoli.approve(actors.address, BigInt(1000e18));
            testActor = await actors.nextActor();
            await actors.mintActor(BigInt(100e18));

            let firstName = `${Math.round(Math.random()*100)}`;
            await names.claim(firstName, "赛博", testActor);    
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`须弥时间线未配置操作员不能出生角色`, async ()=>{
            await actors.approve(xumi.address, testActor);
            await expect(xumi.bornActor(testActor)).to.be.revertedWith("only YeMing");
        });

        it(`配置须弥操作员`, async ()=>{
            let testActor = await newActor(operator1);
            await worldYemings.connect(taiyiDAO).setYeMing(testActor, xumi.address);
            await actors.approve(xumi.address, testActor);
            expect((await xumi.initOperator(testActor)).wait()).eventually.fulfilled;
            expect(await worldYemings.isYeMing(await xumi.operator())).to.eq(true);
            expect(await actors.ownerOf(await xumi.operator())).to.eq(xumi.address);
        });

        it(`须弥时间线未绑定区域不能出生角色`, async ()=>{
            await expect(xumi.bornActor(testActor)).to.be.revertedWith("start zone invalid");
        });

        it(`噎明铸造新区域绑定须弥时间线`, async ()=>{
            newZone = await zones.nextZone();
            expect((await zones.connect(taiyiDAO).claim(actorPanGu, "须弥域", xumi.address, testActor)).wait()).eventually.fulfilled;    
            expect(await zones.ownerOf(newZone)).to.eq((await actors.getActor(testActor)).account);
            expect((await xumi.setStartZone(newZone)).wait()).eventually.fulfilled;
            expect(await xumi.startZone()).to.eq(newZone);
        });

        it(`出生在须弥时间线`, async ()=>{
            expect((await xumi.bornActor(testActor)).wait()).eventually.fulfilled;
            expect((await actorLocations.actorLocations(testActor))[0]).to.eq(newZone);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`角色在须弥时间线上成长`, async ()=>{
            await actors.approve(xumi.address, testActor);
            await xumi.grow(testActor, { gasLimit: 5000000 }); //age 0
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
            // await xumi.grow(testActor, { gasLimit: 5000000 });
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
            // await xumi.grow(testActor, { gasLimit: 5000000 });
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
            // await xumi.grow(testActor, { gasLimit: 5000000 });
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
            // await xumi.grow(testActor, { gasLimit: 5000000 });
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
            // await xumi.grow(testActor, { gasLimit: 5000000 });
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

    });
});