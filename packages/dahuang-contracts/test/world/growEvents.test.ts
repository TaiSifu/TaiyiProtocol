import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, WorldContractRoute, WorldContractRoute__factory, 
    Actors, ShejiTu, ActorAttributes, SifusToken, WorldEvents, WorldFungible, ActorNames, ActorTalents, ActorSocialIdentity, 
    WorldZones, ActorRelationship,  Actors__factory, ActorNames__factory, ActorTalents__factory, WorldConstants__factory, WorldFungible__factory, 
    SifusToken__factory, WorldEvents__factory, ShejiTu__factory, WorldZones__factory, ActorAttributes__factory, 
    ActorSocialIdentity__factory, ActorRelationship__factory, WorldYemings, WorldYemings__factory, WorldRandom, 
    ActorLocations, Trigrams, WorldRandom__factory, ActorLocations__factory, Trigrams__factory, WorldItems, WorldItems__factory,
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
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    DahuangConstants, DahuangConstants__factory, ActorCharmAttributes, ActorBehaviorAttributes, ActorCoreAttributes, 
    ActorMoodAttributes, ActorCharmAttributes__factory, ActorBehaviorAttributes__factory, ActorCoreAttributes__factory,
    ActorMoodAttributes__factory, WorldBuildings, WorldBuildings__factory, 
    WorldEventProcessor10001__factory, WorldEventProcessor60002__factory, WorldEventProcessor60003__factory, 
    WorldEventProcessor60004__factory, WorldEventProcessor60001__factory, WorldEventProcessor60005__factory,
    WorldEventProcessor10000__factory, WorldEventProcessor10016__factory, WorldEventProcessor10009__factory,
    WorldEventProcessor10017__factory, WorldEventProcessor10019__factory, WorldEventProcessor10020__factory,
    WorldEventProcessor10021__factory, WorldEventProcessor10024__factory, WorldEventProcessor10025__factory,
} from '../../typechain';
import { DahuangContractName, deployDahuangWorld } from '../../utils';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;
const ActRecoverTimeDay: number = 60;
const ZoneResourceGrowTimeDay: number = 60;
const ZoneResourceGrowQuantityScale: number = 10*1000; //10.0f
const BaseTravelTime: number = 60;
const BaseBuildTime: number = 60;

describe('角色成长事件测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let taiyiContracts: Record<TaiyiContractName, WorldContract>;
    let eventProcessorAddressBook: {[index: string]:any};
    let contracts: Record<DahuangContractName, WorldContract>;

    //taiyi basic
    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let sifusToken: SifusToken;
    let actors: Actors;
    let names: ActorNames;
    let talents: ActorTalents;
    let shejiTu: ShejiTu;
    let actorSIDs: ActorSocialIdentity;
    let assetDaoli: WorldFungible;
    let zones: WorldZones;
    let baseAttributes: ActorAttributes;
    let charmAttributes: ActorCharmAttributes;
    let behaviorAttributes: ActorBehaviorAttributes;
    let coreAttributes: ActorCoreAttributes;
    let moodAttributes: ActorMoodAttributes;
    let actorRelationship: ActorRelationship;
    let worldEvents: WorldEvents;
    let worldYemings: WorldYemings;
    let worldRandom: WorldRandom;
    let actorLocations: ActorLocations;
    let trigrams: Trigrams;
    let worldItems: WorldItems;

    //dahuang
    let dahuangConstants: DahuangConstants;
    let golds: WorldFungible;
    let woods: WorldFungible;
    let fabrics: WorldFungible;
    let prestiges: WorldFungible;
    let worldBuildings: WorldBuildings;

    let actorPanGu: BigNumber;
    let testActor: BigNumber;
    
    let newActor = async (toWho: SignerWithAddress, randomName?:boolean):Promise<BigNumber> => {
        //deal coin
        await assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1000e18));
        await assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, BigInt(1000e18));
        await assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = await actors.nextActor();
        await actors.connect(taiyiDAO).mintActor(BigInt(100e18));

        if(randomName) {
            let firstName = `小拼${Math.round(Math.random()*100)}`;
            await names.connect(taiyiDAO).claim(firstName, "李", _actor);    
        }

        await actors.connect(taiyiDAO).approve(shejiTu.address, _actor);
        await shejiTu.connect(taiyiDAO).bornActor(_actor);

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
        contracts = worldDeployed.worldContracts;
        eventProcessorAddressBook = worldDeployed.eventProcessorAddressBook;

        dahuangConstants = DahuangConstants__factory.connect(contracts.DahuangConstants.instance.address, operator1);
        talents = ActorTalents__factory.connect(contracts.ActorTalents.instance.address, operator1);
        worldEvents = WorldEvents__factory.connect(contracts.WorldEvents.instance.address, operator1);
        shejiTu = ShejiTu__factory.connect(contracts.ShejiTuProxy.instance.address, operator1);
        golds = WorldFungible__factory.connect(contracts.AssetGold.instance.address, operator1);
        woods = WorldFungible__factory.connect(contracts.AssetWood.instance.address, operator1);
        fabrics = WorldFungible__factory.connect(contracts.AssetFabric.instance.address, operator1);
        prestiges = WorldFungible__factory.connect(contracts.AssetPrestige.instance.address, operator1);
        charmAttributes = ActorCharmAttributes__factory.connect(contracts.ActorCharmAttributes.instance.address, operator1);
        behaviorAttributes = ActorBehaviorAttributes__factory.connect(contracts.ActorBehaviorAttributes.instance.address, operator1);
        coreAttributes = ActorCoreAttributes__factory.connect(contracts.ActorCoreAttributes.instance.address, operator1);
        moodAttributes = ActorMoodAttributes__factory.connect(contracts.ActorMoodAttributes.instance.address, operator1);
        actorRelationship = ActorRelationship__factory.connect(contracts.ActorRelationship.instance.address, operator1);
        worldBuildings = WorldBuildings__factory.connect(contracts.WorldBuildings.instance.address, operator1);

        actorPanGu = await worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test

        //bind timeline to a zone
        let zoneId = await zones.nextZone();
        await zones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
        await shejiTu.connect(deployer).setStartZone(zoneId);

        //born PanGu
        await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
        await shejiTu.connect(taiyiDAO).bornActor(actorPanGu);

        //register actors uri modules
        await actors.connect(taiyiDAO).registerURIPartModule(names.address);
        await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
        await actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);

        //部署出生序列
        let eventsByPanGu = worldEvents.connect(taiyiDAO);
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
        await shejiTu.connect(deployer).addAgeEvent(0, 10001, 1);

        testActor = await newActor(operator1, true);
    });


    describe('事件10016-10017', () => {
        let evt10016:any;
        let evt10017:any;
        before(reset);

        it(`部署相关事件`, async ()=>{
            const evt10000 = await (await (new WorldEventProcessor10000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10000, evt10000.address);
            const evt10009 = await (await (new WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10009, evt10009.address);
            await shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);

            evt10016 = await (await (new WorldEventProcessor10016__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10016, evt10016.address);
            await shejiTu.connect(deployer).addAgeEvent(2, 10016, 1);

            evt10017 = await (await (new WorldEventProcessor10017__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10017, evt10017.address);
            await shejiTu.connect(deployer).addAgeEvent(3, 10017, 1);
        });

        it(`成长到测试年龄之前`, async ()=>{
            //授权时间线
            await actors.approve(shejiTu.address, testActor);
            //授权资源给时间线
            let yeming = await shejiTu.operator();
            await (await golds.approveActor(testActor, yeming, BigInt(1e29))).wait();
            await (await assetDaoli.approveActor(testActor, yeming, BigInt(1e29))).wait();    
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        });

        it(`准备测试条件`, async ()=>{
            await coreAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [await dahuangConstants.ATTR_LVL(), 10]);
            await moodAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [await dahuangConstants.ATTR_XIQ(), 10]);
        });

        it(`成长测试10016`, async ()=>{
            expect(await evt10016.checkOccurrence(testActor, 0)).eq(true);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
        });

        it(`成长测试10017`, async ()=>{
            expect(await evt10017.checkOccurrence(testActor, 0)).eq(true);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            expect(await baseAttributes.attributesScores(await worldConstants.ATTR_HLH(), testActor)).eq(0);
        });

    });

    describe('事件10019', () => {
        let evt10019:any;
        before(reset);

        it(`部署相关事件`, async ()=>{
            evt10019 = await (await (new WorldEventProcessor10019__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10019, evt10019.address);
            await shejiTu.connect(deployer).addAgeEvent(1, 10019, 1);
        });

        it(`成长到测试年龄之前`, async ()=>{
            //授权时间线
            await actors.approve(shejiTu.address, testActor);
            //授权资源给时间线
            let yeming = await shejiTu.operator();
            await (await golds.approveActor(testActor, yeming, BigInt(1e29))).wait();
            await (await assetDaoli.approveActor(testActor, yeming, BigInt(1e29))).wait();    
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
        });

        it(`准备测试条件`, async ()=>{
            await coreAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [await dahuangConstants.ATTR_LVL(), 0]);
            await moodAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [await dahuangConstants.ATTR_XIQ(), 0]);
        });

        it(`成长测试10019`, async ()=>{
            expect(await evt10019.checkOccurrence(testActor, 0)).eq(true);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            expect(await coreAttributes.attributesScores(await dahuangConstants.ATTR_LVL(), testActor)).eq(10);
            expect(await moodAttributes.attributesScores(await dahuangConstants.ATTR_XIQ(), testActor)).eq(10);
        });

    });

    describe('事件10020', () => {
        let evt10020:any;
        before(reset);

        it(`部署相关事件`, async ()=>{
            const evt10009 = await (await (new WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10009, evt10009.address);
            await shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);
            evt10020 = await (await (new WorldEventProcessor10020__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10020, evt10020.address);
            await shejiTu.connect(deployer).addAgeEvent(2, 10020, 1);
        });

        it(`成长到测试年龄之前`, async ()=>{
            //授权时间线
            await actors.approve(shejiTu.address, testActor);
            //授权资源给时间线
            let yeming = await shejiTu.operator();
            await (await golds.approveActor(testActor, yeming, BigInt(1e29))).wait();
            await (await assetDaoli.approveActor(testActor, yeming, BigInt(1e29))).wait();    
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        });

        it(`准备测试条件`, async ()=>{
            await coreAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [await dahuangConstants.ATTR_WUX(), 80]);
            expect(await worldEvents.actorEventCount(testActor, 10009)).gt(0);
        });

        it(`成长测试10020`, async ()=>{
            expect(await evt10020.checkOccurrence(testActor, 0)).eq(true);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            expect(await coreAttributes.attributesScores(await dahuangConstants.ATTR_WUX(), testActor)).eq(70);
        });

    });

    describe('事件10021', () => {
        let evt10021:any;
        before(reset);

        it(`部署相关事件`, async ()=>{
            const evt10009 = await (await (new WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10009, evt10009.address);
            await shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);
            evt10021 = await (await (new WorldEventProcessor10021__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10021, evt10021.address);
            await shejiTu.connect(deployer).addAgeEvent(2, 10021, 1);
        });

        it(`成长到测试年龄之前`, async ()=>{
            //授权时间线
            await actors.approve(shejiTu.address, testActor);
            //授权资源给时间线
            let yeming = await shejiTu.operator();
            await (await golds.approveActor(testActor, yeming, BigInt(1e29))).wait();
            await (await assetDaoli.approveActor(testActor, yeming, BigInt(1e29))).wait();    
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        });

        it(`准备测试条件`, async ()=>{
            await coreAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [await dahuangConstants.ATTR_WUX(), 80]);
            expect(await worldEvents.actorEventCount(testActor, 10009)).gt(0);
            expect(await evt10021.checkOccurrence(testActor, 0)).eq(false); //道理不够

            await assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1e18));
            await assetDaoli.connect(taiyiDAO).transferActor(actorPanGu, testActor, BigInt(1e18));
            expect(await assetDaoli.balanceOfActor(testActor)).eq(BigInt(1e18));
        });

        it(`成长测试10020`, async ()=>{
            expect(await evt10021.checkOccurrence(testActor, 0)).eq(true);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            expect(await coreAttributes.attributesScores(await dahuangConstants.ATTR_WUX(), testActor)).eq(90);
        });
    });

    describe('事件10024-10025', () => {
        let evt10024: any;
        let evt10025: any;
        let taiyiZone: any;
        before(reset);

        it(`部署相关事件`, async ()=>{
            const evt10009 = await (await (new WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10009, evt10009.address);
            await shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);

            evt10024 = await (await (new WorldEventProcessor10024__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10024, evt10024.address);
            await shejiTu.connect(deployer).addAgeEvent(2, 10024, 1);

            taiyiZone = await zones.nextZone();
            await zones.connect(taiyiDAO).claim(actorPanGu, "太乙村", shejiTu.address, actorPanGu);

            evt10025 = await (await (new WorldEventProcessor10025__factory(deployer)).deploy(taiyiZone, worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10025, evt10025.address);
        });

        it(`成长到测试年龄之前`, async ()=>{
            //授权时间线
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        });

        it(`准备测试条件`, async ()=>{
            await talents.connect(taiyiDAO).setTalent(1015, "Good Man", "Born as good man", [], []);
            await talents.connect(taiyiDAO).setActorTalent(actorPanGu, testActor, 1015);

            await moodAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [await dahuangConstants.ATTR_XIQ(), 80]);
        });

        it(`成长测试10024`, async ()=>{
            expect(await evt10024.checkOccurrence(testActor, 0)).eq(true);
            expect(await evt10025.checkOccurrence(testActor, 0)).eq(true);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            expect(await moodAttributes.attributesScores(await dahuangConstants.ATTR_XIQ(), testActor)).eq(80);
            expect(await worldEvents.actorEventCount(testActor, 10024)).eq(1);
            expect(await worldEvents.actorEventCount(testActor, 10025)).eq(1);
            let lcs = await actorLocations.actorLocations(testActor);
            expect(lcs[0]).eq(2);
            expect(lcs[0]).eq(lcs[1]);
        });
    });
});