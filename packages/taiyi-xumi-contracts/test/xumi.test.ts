import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, ActorAttributesConstants,
    WorldContractRoute, WorldContractRoute__factory, 
    Actors, ShejiTu, ActorAttributes, SifusToken, WorldEvents, WorldFungible, ActorNames, ActorTalents, ActorSocialIdentity, 
    WorldZones, ActorCharmAttributes, ActorBehaviorAttributes, ActorCoreAttributes, ActorMoodAttributes, ActorRelationship, 
    Actors__factory, ActorNames__factory, ActorTalents__factory, WorldConstants__factory, WorldFungible__factory, 
    SifusToken__factory, WorldEvents__factory, ShejiTu__factory, WorldZones__factory, ActorAttributesConstants__factory, 
    ActorAttributes__factory, ActorCharmAttributes__factory, ActorBehaviorAttributes__factory, ActorCoreAttributes__factory, 
    ActorMoodAttributes__factory, ActorSocialIdentity__factory, ActorRelationship__factory, ActorCharmAttributesConstants, 
    ActorCoreAttributesConstants, ActorMoodAttributesConstants, ActorBehaviorAttributesConstants, ActorCharmAttributesConstants__factory, 
    ActorCoreAttributesConstants__factory, ActorMoodAttributesConstants__factory, ActorBehaviorAttributesConstants__factory, 
    ActorLocations, WorldItems, WorldBuildings, ActorLocations__factory, WorldItems__factory, WorldBuildings__factory, 
} from '@taiyi/contracts/dist/typechain';
import {
    blockNumber,
    blockTimestamp,
} from '@taiyi/contracts/test/utils';
import {
    WorldContractName,
    WorldContract,
    deployTaiyiWorld
} from '@taiyi/contracts/utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { 
    ActorXumiAttributesConstants,
    Xumi, XumiConstants, XumiConstants__factory, Xumi__factory,
} from '../typechain';
import { 
    deployActorXumiAttributes, deployActorXumiAttributesConstants, deployAssetElementH, deployAssetEnergy, deployXumi,
    deployXumiConstants, initEvents, initItemTypes, initTalents, initTimeline 
} from '../utils';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;
const ActRecoverTimeDay: number = 60;
const ZoneResourceGrowTimeDay: number = 60;
const ZoneResourceGrowQuantityScale: number = 10*1000; //10.0f
const BaseTravelTime: number = 3000;

describe('须弥时间线测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let contracts: Record<WorldContractName, WorldContract>;
    let eventProcessorAddressBook: {[index: string]:any};

    let worldConstants: WorldConstants;
    let actorAttributesConstants: ActorAttributesConstants;
    let actorCharmAttributesConstants: ActorCharmAttributesConstants;
    let actorCoreAttributesConstants: ActorCoreAttributesConstants;
    let actorMoodAttributesConstants: ActorMoodAttributesConstants;
    let actorBehaviorAttributesConstants: ActorBehaviorAttributesConstants;

    let worldContractRoute: WorldContractRoute;
    let sifusToken: SifusToken;
    let actors: Actors;
    let names: ActorNames;
    let talents: ActorTalents;
    let shejiTu: ShejiTu;
    let actorSIDs: ActorSocialIdentity;
    let assetDaoli: WorldFungible;
    let golds: WorldFungible;
    let woods: WorldFungible;
    let fabrics: WorldFungible;
    let prestiges: WorldFungible;
    let zones: WorldZones;
    let baseAttributes: ActorAttributes;
    let charmAttributes: ActorCharmAttributes;
    let behaviorAttributes: ActorBehaviorAttributes;
    let coreAttributes: ActorCoreAttributes;
    let moodAttributes: ActorMoodAttributes;
    let actorRelationship: ActorRelationship;
    let worldEvents: WorldEvents;
    let actorLocations : ActorLocations;
    let worldItems : WorldItems;
    let worldBuildings: WorldBuildings;

    let actorPanGu: BigNumber;
    let testActor: BigNumber;    

    ///// 须弥相关
    let xumiConstants: XumiConstants;
    let xumi: Xumi;
    let actorXumiAttributesConstants: ActorXumiAttributesConstants;

    let newActor = async (toWho: SignerWithAddress, randomName?:boolean):Promise<BigNumber> => {
        //deal coin
        await assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1000e18));
        await assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, BigInt(1000e18));
        await assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = await actors.nextActor();
        await actors.connect(taiyiDAO).mintActor(BigInt(100e18));

        if(randomName) {
            let firstName = `${Math.round(Math.random()*100)}`;
            await names.connect(taiyiDAO).claim(firstName, "赛博", _actor);    
        }

        await actors.connect(taiyiDAO).approve(shejiTu.address, _actor);
        await shejiTu.connect(taiyiDAO).bornActor(_actor);
        await talents.connect(taiyiDAO).talentActor(_actor);
        await baseAttributes.connect(taiyiDAO).pointActor(_actor);
        await charmAttributes.connect(taiyiDAO).pointActor(_actor);
        await coreAttributes.connect(taiyiDAO).pointActor(_actor);
        await moodAttributes.connect(taiyiDAO).pointActor(_actor);
        await behaviorAttributes.connect(taiyiDAO).pointActor(_actor);

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

        //Deploy world
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        let worldDeployed = await deployTaiyiWorld(timestamp, OneAgeVSecond, ActRecoverTimeDay, ZoneResourceGrowTimeDay, ZoneResourceGrowQuantityScale, deployer, taiyiDAO, 
            {
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
        contracts = worldDeployed.worldContracts;
        eventProcessorAddressBook = worldDeployed.eventProcessorAddressBook;

        sifusToken = SifusToken__factory.connect(contracts.SifusToken.instance.address, operator1);
        worldConstants = WorldConstants__factory.connect(contracts.WorldConstants.instance.address, operator1);
        worldContractRoute = WorldContractRoute__factory.connect(contracts.WorldContractRoute.instance.address, operator1);
        actors = Actors__factory.connect(contracts.Actors.instance.address, operator1);
        assetDaoli = WorldFungible__factory.connect(contracts.AssetDaoli.instance.address, operator1);
        names = ActorNames__factory.connect(contracts.ActorNames.instance.address, operator1);
        talents = ActorTalents__factory.connect(contracts.ActorTalents.instance.address, operator1);
        worldEvents = WorldEvents__factory.connect(contracts.WorldEvents.instance.address, operator1);
        shejiTu = ShejiTu__factory.connect(contracts.Shejitu.instance.address, operator1);
        golds = WorldFungible__factory.connect(contracts.AssetGold.instance.address, operator1);
        woods = WorldFungible__factory.connect(contracts.AssetWood.instance.address, operator1);
        fabrics = WorldFungible__factory.connect(contracts.AssetFabric.instance.address, operator1);
        prestiges = WorldFungible__factory.connect(contracts.AssetPrestige.instance.address, operator1);
        zones = WorldZones__factory.connect(contracts.WorldZones.instance.address, operator1);
        actorAttributesConstants = ActorAttributesConstants__factory.connect(contracts.ActorAttributesConstants.instance.address, operator1);
        actorCharmAttributesConstants = ActorCharmAttributesConstants__factory.connect(contracts.ActorCharmAttributesConstants.instance.address, operator1);
        actorCoreAttributesConstants = ActorCoreAttributesConstants__factory.connect(contracts.ActorCoreAttributesConstants.instance.address, operator1);
        actorMoodAttributesConstants = ActorMoodAttributesConstants__factory.connect(contracts.ActorMoodAttributesConstants.instance.address, operator1);
        actorBehaviorAttributesConstants = ActorBehaviorAttributesConstants__factory.connect(contracts.ActorBehaviorAttributesConstants.instance.address, operator1);
        baseAttributes = ActorAttributes__factory.connect(contracts.ActorAttributes.instance.address, operator1);
        charmAttributes = ActorCharmAttributes__factory.connect(contracts.ActorCharmAttributes.instance.address, operator1);
        behaviorAttributes = ActorBehaviorAttributes__factory.connect(contracts.ActorBehaviorAttributes.instance.address, operator1);
        coreAttributes = ActorCoreAttributes__factory.connect(contracts.ActorCoreAttributes.instance.address, operator1);
        moodAttributes = ActorMoodAttributes__factory.connect(contracts.ActorMoodAttributes.instance.address, operator1);
        actorSIDs = ActorSocialIdentity__factory.connect(contracts.ActorSocialIdentity.instance.address, operator1);
        actorRelationship = ActorRelationship__factory.connect(contracts.ActorRelationship.instance.address, operator1);
        actorLocations = ActorLocations__factory.connect(contracts.ActorLocations.instance.address, operator1);
        worldItems = WorldItems__factory.connect(contracts.WorldItems.instance.address, operator1);
        worldBuildings = WorldBuildings__factory.connect(contracts.WorldBuildings.instance.address, operator1);

        actorPanGu = await worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        await worldContractRoute.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
    });

    describe('构建须弥域合约', () => {
        it(`部署常量库`, async ()=>{
            xumiConstants = await deployXumiConstants(deployer);
        });

        it(`部署资源`, async ()=>{
            let assetEnergy = await deployAssetEnergy(xumiConstants, worldContractRoute, deployer);
            await worldContractRoute.connect(taiyiDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_ENERGY(), assetEnergy.address);

            let assetElementH = await deployAssetElementH(xumiConstants, worldContractRoute, deployer);
            await worldContractRoute.connect(taiyiDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_ELEMENT_H(), assetElementH.address);
        });

        it(`部署属性`, async ()=>{
            actorXumiAttributesConstants = await deployActorXumiAttributesConstants(deployer);
            let actorXumiAttributes = await deployActorXumiAttributes(worldContractRoute, deployer);
            await worldContractRoute.connect(taiyiDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES(), actorXumiAttributes.address);
        });

        it(`部署须弥时间线`, async ()=>{
            xumi = Xumi__factory.connect((await deployXumi(worldContractRoute, deployer))[0].address, deployer);
            await worldContractRoute.connect(taiyiDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_TIMELINE(), xumi.address);
        });

        it(`初始化天赋`, async ()=>{
            await initTalents(talents.address, taiyiDAO, worldConstants, xumiConstants, actorAttributesConstants, actorXumiAttributesConstants);

            let W_MODULE_XUMI_ATTRIBUTES = await xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES();
            let STB = await actorXumiAttributesConstants.STB();

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
            let eventProcessorAddressBook = await initEvents(worldContractRoute, worldEvents.address, taiyiDAO, deployer);
        });

        it(`配置时间线`, async ()=>{
            await initTimeline(xumi.address, deployer);
        });
    });
});