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
    deployTaiyiWorld
} from '@taiyi/contracts/dist/utils';
import {
    DahuangConstants, DahuangConstants__factory, ActorCharmAttributes, ActorBehaviorAttributes, ActorCoreAttributes, 
    ActorMoodAttributes, ActorCharmAttributes__factory, ActorBehaviorAttributes__factory, ActorCoreAttributes__factory,
    ActorMoodAttributes__factory, WorldBuildings, WorldBuildings__factory, WorldEventProcessor10001__factory, 
    WorldEventProcessor60001__factory, WorldEventProcessor60002__factory, WorldEventProcessor60003__factory, 
    WorldEventProcessor60004__factory,
    WorldEventProcessor50002__factory,
    WorldEventProcessor60513__factory,
    WorldEventProcessor60005__factory, 
} from '@taiyi/dahuang-contracts/dist/typechain';
import { DahuangContractName, deployDahuangWorld } from '@taiyi/dahuang-contracts/dist/utils';
import { 
    ActorXumiAttributes, XumiConstants, XumiConstants__factory, ActorXumiAttributes__factory, 
    WorldEventProcessor1050001__factory,
} from '../typechain';
import { 
    deployXumiWorld, XumiContractName 
} from '../utils';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;
const ActRecoverTimeDay: number = 60;
const ZoneResourceGrowTimeDay: number = 60;
const ZoneResourceGrowQuantityScale: number = 10*1000; //10.0f
const BaseTravelTime: number = 3000;

describe('大荒到须弥', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let taiyiContracts: Record<TaiyiContractName, WorldContract>;
    let dahuangEventProcessorAddressBook: {[index: string]:any};
    let dahuangContracts: Record<DahuangContractName, WorldContract>;

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

    //dahuang
    let dahuangConstants: DahuangConstants;
    let dahuangTalents: ActorTalents;
    let dahuang: ShejiTu;
    let golds: WorldFungible;
    let woods: WorldFungible;
    let fabrics: WorldFungible;
    let prestiges: WorldFungible;
    let charmAttributes: ActorCharmAttributes;
    let behaviorAttributes: ActorBehaviorAttributes;
    let coreAttributes: ActorCoreAttributes;
    let moodAttributes: ActorMoodAttributes;
    let dahuangActorRelationship: ActorRelationship;
    let dahuangWorldEvents: WorldEvents;
    let worldBuildings: WorldBuildings;

    let actorPanGu: BigNumber;
    let testActor: BigNumber; 
    let dahuangZone: BigNumber;
    let xumiZone: BigNumber; 
    let enterItem: BigNumber;  

    let evt60513: any;

    ///// 须弥相关
    let xumiContracts: Record<XumiContractName, WorldContract>;
    let xumiEventProcessorAddressBook: {[index: string]:any};

    let xumiConstants: XumiConstants;
    let xumi: ShejiTu;
    let xumiTalents: ActorTalents;
    let actorXumiAttributes: ActorXumiAttributes;
    let assetEnergy: WorldFungible;
    let xumiActorRelationship: ActorRelationship;
    let xumiWorldEvents: WorldEvents;

    let evt1050001: any;

    let makeMoney = async (toWho: string, amount: BigNumberish):Promise<void> => { 
        await assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, amount);
        await assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, amount);
        if(toWho != taiyiDAO.address)
            await assetDaoli.connect(taiyiDAO).transfer(toWho, amount);
    };

    let newXumiActor = async (toWho: SignerWithAddress, randomName?:boolean):Promise<BigNumber> => {
        //deal coin
        await makeMoney(taiyiDAO.address, BigInt(1000e18));

        await assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = await actors.nextActor();
        await actors.connect(taiyiDAO).mintActor(BigInt(100e18));

        if(randomName) {
            let firstName = `${Math.round(Math.random()*100)}`;
            await names.connect(taiyiDAO).claim(firstName, "赛博", _actor);    
        }

        await actors.connect(taiyiDAO).approve(xumi.address, _actor);
        await xumi.connect(taiyiDAO).bornActor(_actor);

        if(toWho.address != taiyiDAO.address)
            await actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
        return _actor;
    }

    let newDahuangActor = async (toWho: SignerWithAddress, randomName?:boolean):Promise<BigNumber> => {
        //deal coin
        await makeMoney(taiyiDAO.address, BigInt(1000e18));

        await assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = await actors.nextActor();
        await actors.connect(taiyiDAO).mintActor(BigInt(100e18));

        if(randomName) {
            let firstName = `小拼${Math.round(Math.random()*100)}`;
            await names.connect(taiyiDAO).claim(firstName, "李", _actor);    
        }

        await actors.connect(taiyiDAO).approve(dahuang.address, _actor);
        await dahuang.connect(taiyiDAO).bornActor(_actor);

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

        //Deploy dahuang world
        let worldDeployed = await deployDahuangWorld(OneAgeVSecond, ActRecoverTimeDay, ZoneResourceGrowTimeDay, ZoneResourceGrowQuantityScale,
            worldContractRoute, worldConstants, actors, actorLocations, worldYemings, zones, baseAttributes, trigrams, 
            worldRandom, worldItems, actorSIDs, 
            deployer, taiyiDAO, 
            {
                isTest: true,
                noSIDNames : true,
                noTalents : true,
                noTalentProcessors : true,
                noRelations : true,
                noItemTypes : true,
                noBuildingTypes : true,
                noEventProcessors : true,
                noTimelineEvents : true,
                noZones : true
            }, false);
        dahuangContracts = worldDeployed.worldContracts;
        dahuangEventProcessorAddressBook = worldDeployed.eventProcessorAddressBook;

        dahuangConstants = DahuangConstants__factory.connect(dahuangContracts.DahuangConstants.instance.address, operator1);
        dahuangTalents = ActorTalents__factory.connect(dahuangContracts.ActorTalents.instance.address, operator1);
        dahuangWorldEvents = WorldEvents__factory.connect(dahuangContracts.WorldEvents.instance.address, operator1);
        dahuang = ShejiTu__factory.connect(dahuangContracts.ShejiTuProxy.instance.address, operator1);
        golds = WorldFungible__factory.connect(dahuangContracts.AssetGold.instance.address, operator1);
        woods = WorldFungible__factory.connect(dahuangContracts.AssetWood.instance.address, operator1);
        fabrics = WorldFungible__factory.connect(dahuangContracts.AssetFabric.instance.address, operator1);
        prestiges = WorldFungible__factory.connect(dahuangContracts.AssetPrestige.instance.address, operator1);
        charmAttributes = ActorCharmAttributes__factory.connect(dahuangContracts.ActorCharmAttributes.instance.address, operator1);
        behaviorAttributes = ActorBehaviorAttributes__factory.connect(dahuangContracts.ActorBehaviorAttributes.instance.address, operator1);
        coreAttributes = ActorCoreAttributes__factory.connect(dahuangContracts.ActorCoreAttributes.instance.address, operator1);
        moodAttributes = ActorMoodAttributes__factory.connect(dahuangContracts.ActorMoodAttributes.instance.address, operator1);
        dahuangActorRelationship = ActorRelationship__factory.connect(dahuangContracts.ActorRelationship.instance.address, operator1);
        worldBuildings = WorldBuildings__factory.connect(dahuangContracts.WorldBuildings.instance.address, operator1);

        actorPanGu = await worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test

        //bind timeline to a zone
        dahuangZone = await zones.nextZone();
        await zones.connect(taiyiDAO).claim(actorPanGu, "大荒", dahuang.address, actorPanGu);
        await dahuang.connect(deployer).setStartZone(dahuangZone);

        //born PanGu
        await actors.connect(taiyiDAO).approve(dahuang.address, actorPanGu);
        await dahuang.connect(taiyiDAO).bornActor(actorPanGu);

        //部署大荒出生序列
        let eventsByPanGu = dahuangWorldEvents.connect(taiyiDAO);
        const evt10001 = await (await (new WorldEventProcessor10001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(10001, evt10001.address);
        const evt60001 = await (await (new WorldEventProcessor60001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(60001, evt60001.address);
        const evt60002 = await (await (new WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(60002, evt60002.address);
        const evt60003 = await (await (new WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(60003, evt60003.address);
        const evt60004 = await (await (new WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(60004, evt60004.address);
        const evt60005 = await (await (new WorldEventProcessor60005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(60005, evt60005.address);

        //配置时间线出生事件
        await dahuang.connect(deployer).addAgeEvent(0, 10001, 1);

        //Deploy Xumi world
        let xumiWorldDeployed = await deployXumiWorld(OneAgeVSecond, worldContractRoute, worldConstants, actors, actorLocations,
            zones, baseAttributes, trigrams, worldRandom, worldItems, operator1, taiyiDAO, 
            {},
            false);
        xumiContracts = xumiWorldDeployed.worldContracts;
        xumiEventProcessorAddressBook = xumiWorldDeployed.eventProcessorAddressBook;

        xumiConstants = XumiConstants__factory.connect(xumiContracts.XumiConstants.instance.address, operator1);
        xumi = ShejiTu__factory.connect(xumiContracts.XumiProxy.instance.address, operator1);
        actorXumiAttributes = ActorXumiAttributes__factory.connect(xumiContracts.ActorXumiAttributes.instance.address, operator1);
        assetEnergy = WorldFungible__factory.connect(xumiContracts.AssetEnergy.instance.address, operator1);
        xumiTalents = ActorTalents__factory.connect(xumiContracts.ActorTalents.instance.address, operator1);
        xumiWorldEvents = WorldEvents__factory.connect(xumiContracts.WorldEvents.instance.address, operator1);
        xumiActorRelationship = ActorRelationship__factory.connect(xumiContracts.ActorRelationship.instance.address, operator1);

        //register actors uri modules
        await actors.connect(taiyiDAO).registerURIPartModule(names.address);
        await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
        await actors.connect(taiyiDAO).registerURIPartModule(dahuang.address);
        await actors.connect(taiyiDAO).registerURIPartModule(xumi.address);

        testActor = await newDahuangActor(operator1, true);
    });

    describe('配置须弥域', () => {
        it(`配置须弥操作员`, async ()=>{
            let newActor = await newDahuangActor(operator1);
            await worldYemings.connect(taiyiDAO).setYeMing(newActor, xumi.address);
            await actors.approve(xumi.address, newActor);
            expect((await xumi.initOperator(newActor)).wait()).eventually.fulfilled;
            expect(await worldYemings.isYeMing(await xumi.operator())).to.eq(true);
            expect(await actors.ownerOf(await xumi.operator())).to.eq(xumi.address);
        });

        it(`噎明铸造新区域绑定须弥时间线`, async ()=>{
            xumiZone = await zones.nextZone();
            expect((await zones.connect(taiyiDAO).claim(actorPanGu, "须弥域", xumi.address, await xumi.operator())).wait()).eventually.fulfilled;    
            expect(await zones.ownerOf(xumiZone)).to.eq((await actors.getActor(await xumi.operator())).account);
            expect((await xumi.setStartZone(xumiZone)).wait()).eventually.fulfilled;
            expect(await xumi.startZone()).to.eq(xumiZone);
        });
    });

    describe('出生在大荒', () => {

        it(`部署大荒事件线`, async ()=>{
            let evt50002 = await (await (new WorldEventProcessor50002__factory(operator1)).deploy(worldContractRoute.address)).deployed();
            await dahuangWorldEvents.connect(taiyiDAO).setEventProcessor(50002, evt50002.address);
            evt60513 = await (await (new WorldEventProcessor60513__factory(operator1)).deploy(worldContractRoute.address)).deployed();
            await dahuangWorldEvents.connect(taiyiDAO).setEventProcessor(60513, evt60513.address);

            await evt60513.setTargetZoneId(xumiZone);
            expect(await evt60513.targetZone()).to.eq(xumiZone);

            await dahuang.connect(deployer).addAgeEvent(1, 50002, 1); 
            await dahuang.connect(deployer).addAgeEvent(2, 60001, 1); 
        });

        it(`成长到0岁`, async ()=>{
            await actors.approve(dahuang.address, testActor);
            await dahuang.grow(testActor, { gasLimit: 5000000 }); //age 0
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`没有道具无法激活查看紫金米事件`, async ()=>{
            await expect(dahuang.activeTrigger(60513, testActor, [1], [])).to.be.revertedWith("ERC721: owner query for nonexistent token");
        });

        it(`成长到1岁`, async ()=>{
            enterItem = await worldItems.nextItemId();
            await dahuang.grow(testActor, { gasLimit: 5000000 }); //age 1
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`捡到紫金米`, async ()=>{
            expect(await worldItems.itemTypes(enterItem)).to.eq(50);
            expect(await worldItems.ownerOf(enterItem)).to.eq((await actors.getActor(testActor)).account);
        });

        it(`非道具持有者无法激活查看紫金米事件`, async ()=>{
            await expect(dahuang.connect(taiyiDAO).activeTrigger(60513, actorPanGu, [enterItem], [])).to.be.revertedWith("item is not belongs to actor");
        });

        it(`查看紫金米`, async ()=>{
            expect(await evt60513.checkOccurrence(testActor, 0)).to.eq(true);
            expect((await dahuang.activeTrigger(60513, testActor, [enterItem], [])).wait()).eventually.fulfilled;
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`破碎虚空，传送到须弥域`, async ()=>{
            let currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(xumiZone);
        });

        it(`年龄检查`, async ()=>{
            expect(await xumiWorldEvents.ages(testActor)).to.eq(0);
            expect(await dahuangWorldEvents.ages(testActor)).to.eq(1);
        });

        it(`不能再在大荒成长`, async ()=>{
            await expect(dahuang.grow(testActor, { gasLimit: 5000000 })).to.be.revertedWith("not in current timeline");
        });
    });
    ///////////////////////////////////////////////////////////////////////////////////////////
    describe('生长在须弥', () => {

        it(`部署须弥事件线`, async ()=>{
            evt1050001 = await (await (new WorldEventProcessor1050001__factory(operator1)).deploy(worldContractRoute.address)).deployed();
            await xumiWorldEvents.connect(taiyiDAO).setEventProcessor(1050001, evt1050001.address);

            await evt1050001.setTargetZoneId(dahuangZone);
            expect(await evt1050001.targetZone()).to.eq(dahuangZone);
        });

        it(`出生`, async ()=>{
            await actors.connect(operator1).approve(xumi.address, testActor);
            await xumi.connect(operator1).bornActor(testActor);

            await assetEnergy.approveActor(testActor, await xumi.operator(), BigInt(1000e18));

            await xumi.grow(testActor, { gasLimit: 5000000 }); //age 0
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`成长到1岁`, async ()=>{
            await xumi.grow(testActor, { gasLimit: 5000000 }); //age 1
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`未达到2岁不能回大荒`, async ()=>{
            expect(await evt1050001.checkOccurrence(testActor, 0)).to.eq(false);
        });

        it(`成长到2岁`, async ()=>{
            await xumi.grow(testActor, { gasLimit: 5000000 }); //age 2
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`直接激活回大荒事件`, async ()=>{
            expect(await evt1050001.checkOccurrence(testActor, 0)).to.eq(true);
            expect((await xumi.activeTrigger(1050001, testActor, [], [])).wait()).eventually.fulfilled;
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`破碎虚空，传送回大荒`, async ()=>{
            let currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(dahuangZone);
        });

        it(`年龄检查`, async ()=>{
            expect(await dahuangWorldEvents.ages(testActor)).to.eq(1);
            expect(await xumiWorldEvents.ages(testActor)).to.eq(2);
        });

        it(`不能再在须弥成长`, async ()=>{
            await expect(xumi.grow(testActor, { gasLimit: 5000000 })).to.be.revertedWith("not in current timeline");
        });
    });
    ///////////////////////////////////////////////////////////////////////////////////////////
    describe('回大荒', () => {
        it(`在大荒成长到2岁`, async ()=>{
            await actors.approve(dahuang.address, testActor);
            await expect((await dahuang.grow(testActor, { gasLimit: 5000000 })).wait()).eventually.fulfilled;
            expect(await dahuangWorldEvents.ages(testActor)).to.eq(2);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });
});