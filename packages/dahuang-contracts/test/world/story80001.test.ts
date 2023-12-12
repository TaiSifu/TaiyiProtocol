//npx hardhat node
//pnpm test ./test/world/story.test.ts --network hard
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
    ActorPrelifes, ActorPrelifes__factory, WorldYemings, WorldYemings__factory, WorldStorylines__factory, WorldStorylines, ParameterizedStorylines, 
    ParameterizedStorylines__factory, GlobalStoryRegistry, GlobalStoryRegistry__factory, ShejiTuProxy, ActorNameRegistry, ActorNameRegistry__factory, 
    WorldStoryActors__factory, WorldStoryActors,
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
    ActorMoodAttributes__factory, WorldBuildings, WorldBuildings__factory, 
    WorldEventProcessor10001__factory, WorldEventProcessor60002__factory, WorldEventProcessor60003__factory, 
    WorldEventProcessor60004__factory, WorldEventProcessor60001__factory, WorldEventProcessor60505__factory, 
    WorldEventProcessor60005__factory, WorldEventProcessor60505,
    WorldEventProcessor80001, WorldEventProcessor80002, WorldEventProcessor80003, WorldEventProcessor80004,
    WorldEventProcessor80005, WorldEventProcessor80006, WorldEventProcessor80007, WorldEventProcessor80008, 
    WorldEventProcessor10033, WorldEventProcessor10032, WorldEventProcessor80001__factory, WorldEventProcessor80002__factory,
    WorldEventProcessor80003__factory, WorldEventProcessor80004__factory, WorldEventProcessor80005__factory, 
    WorldEventProcessor80006__factory, WorldEventProcessor80007__factory, WorldEventProcessor80008__factory, 
    WorldEventProcessor10032__factory, WorldEventProcessor10033__factory,
} from '../../typechain';
import { DahuangContractName, deployDahuangWorld } from '../../utils';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;
const ActRecoverTimeDay: number = 60;
const ZoneResourceGrowTimeDay: number = 60;
const ZoneResourceGrowQuantityScale: number = 10*1000; //10.0f
const BaseTravelTime: number = 3000;
const BaseBuildTime: number = 60;

describe('剧情80001测试', () => {

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
    let nameRegistry: ActorNameRegistry;

    //dahuang
    let dahuangConstants: DahuangConstants;
    let talents: ActorTalents;
    let shejiTu: ShejiTu;
    let golds: WorldFungible;
    let woods: WorldFungible;
    let fabrics: WorldFungible;
    let prestiges: WorldFungible;
    let charmAttributes: ActorCharmAttributes;
    let behaviorAttributes: ActorBehaviorAttributes;
    let coreAttributes: ActorCoreAttributes;
    let moodAttributes: ActorMoodAttributes;
    let actorRelationship: ActorRelationship;
    let worldEvents: WorldEvents;
    let worldBuildings: WorldBuildings;
    let worldStorylines: WorldStorylines;
    let parameterizedStorylines: ParameterizedStorylines;
    let globalStoryRegistry : GlobalStoryRegistry;
    let worldStoryActors: WorldStoryActors;

    let actorPanGu: BigNumber;
    let testActor: BigNumber;
    let testActorName: string;
    let startZone: BigNumber;

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
        actorPrelifes = ActorPrelifes__factory.connect(taiyiContracts.ActorPrelifes.instance.address, operator1);
        nameRegistry = ActorNameRegistry__factory.connect(taiyiContracts.ActorNameRegistry.instance.address, operator1);

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
        worldStorylines = WorldStorylines__factory.connect(contracts.WorldStorylines.instance.address, operator1);
        parameterizedStorylines = ParameterizedStorylines__factory.connect(contracts.ParameterizedStorylines.instance.address, operator1);
        globalStoryRegistry = GlobalStoryRegistry__factory.connect(contracts.GlobalStoryRegistry.instance.address, operator1);
        worldStoryActors = WorldStoryActors__factory.connect(contracts.WorldStoryActors.instance.address, operator1);

        actorPanGu = await worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test

        //bind timeline to a zone
        startZone = await zones.nextZone();
        await zones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
        await shejiTu.connect(deployer).setStartZone(startZone);

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
        await shejiTu.connect(deployer).addAgeEvent(1, 60001, 1);

        //名称发生器配置
        await nameRegistry.connect(taiyiDAO).registerGender(actorPanGu, ["男", "女"]); //性别
        await nameRegistry.connect(taiyiDAO).registerFamily(actorPanGu, ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周"]); //姓
        await nameRegistry.connect(taiyiDAO).registerMiddle(actorPanGu, ["之", "亦", "其", "如", "而", "何", "乃", "且", "若", "和", "所"]); //辈分
        await nameRegistry.connect(taiyiDAO).registerGiven(actorPanGu, "男", ["国", "民", "邦", "杰", "宝", "森", "炳", "文", "伯", "华", "龙", "伦", "阳", "博"]); //男名
        await nameRegistry.connect(taiyiDAO).registerGiven(actorPanGu, "女", ["兮", "芳", "星", "清", "夏", "月", "初", "书", "简", "雪", "益", "纯", "琛", "馨"]); //女名

        testActor = await newActor(operator1, true);
        testActorName = (await names.actorName(testActor))._name;
        console.log(`-- 创建测试角色“${testActorName}”。`);
    });

    describe('全局剧情80001', () => {
        let evt10032:WorldEventProcessor10032;
        let evt10033:WorldEventProcessor10033;
        let evt80001:WorldEventProcessor80001;
        let evt80002:WorldEventProcessor80002;
        let evt80003:WorldEventProcessor80003;
        let evt80004:WorldEventProcessor80004;
        let evt80005:WorldEventProcessor80005;
        let evt80006:WorldEventProcessor80006;
        let evt80007:WorldEventProcessor80007;
        let evt80008:WorldEventProcessor80008;
        let evt60505:WorldEventProcessor60505;
        let storyActor: BigNumber;
        let storyActorName: string;
        let wux: BigNumber;
        let daoliBefore: BigNumber;
        before(reset);

        it(`部署事件`, async ()=>{
            evt10032 = await (await (new WorldEventProcessor10032__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10032, evt10032.address);
            await shejiTu.connect(deployer).addAgeEvent(2, 10032, 1);
            evt10033 = await (await (new WorldEventProcessor10033__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(10033, evt10033.address);
            evt80001 = await (await (new WorldEventProcessor80001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80001, evt80001.address);
            evt80002 = await (await (new WorldEventProcessor80002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80002, evt80002.address);
            evt80003 = await (await (new WorldEventProcessor80003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80003, evt80003.address);
            evt80004 = await (await (new WorldEventProcessor80004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80004, evt80004.address);
            evt80005 = await (await (new WorldEventProcessor80005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80005, evt80005.address);
            evt80006 = await (await (new WorldEventProcessor80006__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80006, evt80006.address);
            evt80007 = await (await (new WorldEventProcessor80007__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80007, evt80007.address);
            evt80008 = await (await (new WorldEventProcessor80008__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80008, evt80008.address);
            evt60505 = await (await (new WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
        });

        it('配置60505操作角色', async () => {
            let newOne = await newActor(deployer);
            await actors.connect(deployer).approve(evt60505.address, newOne);
            await evt60505.initOperator(newOne);
            expect(await evt60505.eventOperator()).to.eq(newOne);
            expect(await actors.ownerOf(newOne)).to.eq(evt60505.address);
        });

        it('配置60505影响的属性模块', async () => {
            await (await evt60505.registerAttributeModule(baseAttributes.address)).wait();
            await (await evt60505.registerAttributeModule(charmAttributes.address)).wait();
            await (await evt60505.registerAttributeModule(coreAttributes.address)).wait();
            await (await evt60505.registerAttributeModule(moodAttributes.address)).wait();
            await (await evt60505.registerAttributeModule(behaviorAttributes.address)).wait();
        });

        it(`注册全局剧情起始事件`, async ()=>{
            expect(await globalStoryRegistry.hasStory(80001)).to.eq(false);
            expect(await globalStoryRegistry.storyNum()).to.eq(0);

            await globalStoryRegistry.connect(taiyiDAO).registerStory(actorPanGu, 80001, 0);

            expect(await globalStoryRegistry.hasStory(80001)).to.eq(true);
            expect(await globalStoryRegistry.storyNum()).to.eq(1);
            expect(await globalStoryRegistry.storyByIndex(0)).to.eq(80001);
        });

        it(`注册道具类型`, async ()=>{
            await worldItems.connect(taiyiDAO).setTypeName(20, "《木工房》0");
            await worldItems.connect(taiyiDAO).setTypeName(21, "《木工房》1");
            await worldItems.connect(taiyiDAO).setTypeName(22, "《木工房》2");
            await worldItems.connect(taiyiDAO).setTypeName(23, "《木工房》3");
            await worldItems.connect(taiyiDAO).setTypeName(24, "《木工房》4");
            await worldItems.connect(taiyiDAO).setTypeName(25, "《木工房》5");

            await worldItems.connect(taiyiDAO).setTypeName(52, "《寻龙诀》");
            await worldItems.connect(taiyiDAO).setTypeName(53, "太乙村水酒");
            await worldItems.connect(taiyiDAO).setTypeName(54, "龙溪水");
        });

        it(`授权角色给时间线并成长到有效年龄`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        });

        it(`成长事件10032不能发生`, async ()=>{
            expect(await evt10032.checkOccurrence(testActor, 1)).to.eq(false);
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`噎明道理不够时无法创建剧情角色`, async ()=>{
            expect(await parameterizedStorylines.isStoryExist(70001)).to.eq(false);

            storyActor = await actors.nextActor();
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], []);

            expect(await actors.nextActor()).to.eq(storyActor);
        });

        it(`充值噎明道理（剧情费用)`, async ()=>{
            await assetDaoli.connect(taiyiDAO).claim(actorPanGu, await shejiTu.operator(), BigInt(100e18));
        });

        it(`通过采集资源开始剧情80001`, async ()=>{
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(false);

            storyActor = await actors.nextActor();            
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });

            expect(await actors.ownerOf(storyActor)).to.eq(parameterizedStorylines.address);

            storyActorName = (await names.actorName(storyActor))._name;
            console.log(`-- 创建剧情角色“${storyActorName}”。`);
        });

        it(`剧情80001检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80001);
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(80001);
            expect(await parameterizedStorylines.currentStoryActorNum(80001)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80001, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80001);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(6);
            expect(evts[5]).eq(80001);
            expect(await worldEvents.actorEventCount(storyActor, 80001)).to.eq(1);

            console.log(await evt80001.eventInfo(storyActor));
        });

        it(`成长事件10032仍然不能发生`, async ()=>{
            expect(await evt10032.checkOccurrence(testActor, 1)).to.eq(false);
        });

        it(`充值道理`, async ()=>{
            await assetDaoli.connect(taiyiDAO).claim(actorPanGu, testActor, BigInt(1e18));
        });

        it(`成长事件10032可以发生`, async ()=>{
            expect(await evt10032.checkOccurrence(testActor, 1)).to.eq(true);
        });

        it(`授权角色给时间线并成长事件10032`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await assetDaoli.approveActor(testActor, await shejiTu.operator(), BigInt(1e18));
            daoliBefore = await assetDaoli.balanceOfActor(testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2

            expect(await worldEvents.actorEventCount(testActor, 10032)).to.eq(1);
            expect(await worldEvents.actorEventCount(testActor, 10033)).to.eq(1);
        });

        it(`事件10032-10033检查`, async ()=>{            
            console.log(await evt10032.eventInfo(testActor));
            expect(await assetDaoli.balanceOfActor(testActor)).to.eq(daoliBefore.sub(BigInt(1e17)));
            expect(await worldItems.balanceOfActor(storyActor)).to.eq(1);
            let itemid = await worldItems.tokenOfActorByIndex(storyActor, 0);
            expect(await worldItems.itemTypes(itemid)).to.eq(53);
            console.log(`-- ${storyActorName}获得了“太乙村水酒”`);

            console.log(await evt10033.eventInfo(testActor));
            expect(await worldItems.balanceOfActor(testActor)).to.eq(1);
            itemid = await worldItems.tokenOfActorByIndex(testActor, 0);
            let typename = await worldItems.typeNames(await worldItems.itemTypes(itemid));
            console.log(`-- ${testActorName}获得了“${typename}”`);
        });

        it(`授权角色给剧情`, async ()=>{
            await actors.approve(parameterizedStorylines.address, testActor);
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80002`, async ()=>{
            expect(await evt80002.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80002检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80001);
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(80002);
            expect(await parameterizedStorylines.currentStoryActorNum(80001)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80001, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80001);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(7);
            expect(evts[6]).eq(80002);
            expect(await worldEvents.actorEventCount(storyActor, 80001)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80002)).to.eq(1);

            console.log(await evt80002.eventInfo(storyActor));

            expect(await worldItems.balanceOfActor(testActor)).to.eq(2);
            let itemid = await worldItems.tokenOfActorByIndex(testActor, 1);
            let typename = await worldItems.typeNames(await worldItems.itemTypes(itemid));
            console.log(`-- ${testActorName}获得了“${typename}”`);
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80003`, async ()=>{
            expect(await evt80003.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80003检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80001);
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(80003);
            expect(await parameterizedStorylines.currentStoryActorNum(80001)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80001, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80001);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(8);
            expect(evts[7]).eq(80003);
            expect(await worldEvents.actorEventCount(storyActor, 80001)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80002)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80003)).to.eq(1);

            console.log(await evt80003.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80004`, async ()=>{
            expect(await evt80004.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80004检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80001);
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(80004);
            expect(await parameterizedStorylines.currentStoryActorNum(80001)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80001, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80001);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(9);
            expect(evts[8]).eq(80004);
            expect(await worldEvents.actorEventCount(storyActor, 80001)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80002)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80003)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80004)).to.eq(1);

            console.log(await evt80004.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80005`, async ()=>{
            expect(await evt80005.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80005检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80001);
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(80005);
            expect(await parameterizedStorylines.currentStoryActorNum(80001)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80001, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80001);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(10);
            expect(evts[9]).eq(80005);
            expect(await worldEvents.actorEventCount(storyActor, 80001)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80002)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80003)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80004)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80005)).to.eq(1);

            console.log(await evt80005.eventInfo(storyActor));

            expect(await worldItems.balanceOfActor(storyActor)).to.eq(0);
            console.log(`-- ${storyActorName}消耗了“太乙村水酒”`);
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80006`, async ()=>{
            expect(await evt80006.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80006检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80001);
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(80006);
            expect(await parameterizedStorylines.currentStoryActorNum(80001)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80001, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80001);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(11);
            expect(evts[10]).eq(80006);
            expect(await worldEvents.actorEventCount(storyActor, 80001)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80002)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80003)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80004)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80005)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80006)).to.eq(1);

            console.log(await evt80006.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80007`, async ()=>{
            expect(await evt80007.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80007检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80001);
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(80007);
            expect(await parameterizedStorylines.currentStoryActorNum(80001)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80001, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80001);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(12);
            expect(evts[11]).eq(80007);
            expect(await worldEvents.actorEventCount(storyActor, 80001)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80002)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80003)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80004)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80005)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80006)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80007)).to.eq(1);

            console.log(await evt80007.eventInfo(storyActor));

            expect(await worldItems.balanceOfActor(testActor)).to.eq(3);
            let itemid = await worldItems.tokenOfActorByIndex(testActor, 2);
            let typename = await worldItems.typeNames(await worldItems.itemTypes(itemid));
            console.log(`-- ${testActorName}获得了“${typename}”`);
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80008`, async ()=>{
            expect(await evt80008.checkOccurrence(storyActor, 0)).to.eq(true);
            wux = await coreAttributes.attributesScores(await dahuangConstants.ATTR_WUX(), testActor);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80008检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80001);
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(80008);
            expect(await parameterizedStorylines.currentStoryActorNum(80001)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80001, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80001);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(13);
            expect(evts[12]).eq(80008);
            expect(await worldEvents.actorEventCount(storyActor, 80001)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80002)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80003)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80004)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80005)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80006)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80007)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80008)).to.eq(1);

            console.log(await evt80008.eventInfo(storyActor));

            expect(await coreAttributes.attributesScores(await dahuangConstants.ATTR_WUX(), testActor)).to.eq(wux.add(10));
            console.log(`-- ${testActorName}悟性+10`);
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源结束剧情80001`, async ()=>{
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80001结束检查`, async ()=>{
            expect(await parameterizedStorylines.storyHistoryNum(80001)).to.eq(1);

            expect(await parameterizedStorylines.currentStoryNum()).to.eq(0);
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(false);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(0);
            expect(await parameterizedStorylines.currentStoryActorNum(80001)).to.eq(0);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(0);
        });

        it(`剧情历史检查`, async ()=>{
            expect(await worldStoryActors.storyActorNum(80001)).eq(1);
            expect(await worldStoryActors.storyActorByIndex(80001, 0)).eq(storyActor);
        });

        it(`剧情结束后，角色相关成长经历检查`, async ()=>{
            console.log(await evt10032.eventInfo(testActor));
            console.log(await evt10033.eventInfo(testActor));
        });

        it(`通过采集资源不能重复剧情80001`, async ()=>{
            storyActor = await actors.nextActor();
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });

            expect(await actors.nextActor()).to.eq(storyActor);
        });
    });
});