//npx hardhat node
//yarn test ./test/world/story.test.ts --network hard
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
    ActorPrelifes, ActorPrelifes__factory, WorldYemings, WorldYemings__factory, WorldStorylines__factory, WorldStorylines, ParameterizedStorylines, ParameterizedStorylines__factory, GlobalStoryRegistry, GlobalStoryRegistry__factory, ShejiTuProxy, NameGenerator, NameGenerator__factory, WorldStoryActors__factory, WorldStoryActors,
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
    WorldEventProcessor60005__factory, WorldEventProcessor60505, WorldEventProcessor80010, WorldEventProcessor80011, WorldEventProcessor80012, WorldEventProcessor80013, WorldEventProcessor80014, WorldEventProcessor80015, WorldEventProcessor80016, WorldEventProcessor80017, WorldEventProcessor80018, WorldEventProcessor80019, WorldEventProcessor80010__factory, WorldEventProcessor80011__factory, WorldEventProcessor80012__factory, WorldEventProcessor80013__factory, WorldEventProcessor80014__factory, WorldEventProcessor80015__factory, WorldEventProcessor80016__factory, WorldEventProcessor80017__factory, WorldEventProcessor80018__factory, WorldEventProcessor80019__factory,
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

describe('剧情80010测试', () => {

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
    let nameGenerator: NameGenerator;

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
        nameGenerator = NameGenerator__factory.connect(taiyiContracts.NameGenerator.instance.address, operator1);

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
        await nameGenerator.connect(taiyiDAO).registerGender(actorPanGu, ["男", "女"]); //性别
        await nameGenerator.connect(taiyiDAO).registerFamily(actorPanGu, ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周"]); //姓
        await nameGenerator.connect(taiyiDAO).registerMiddle(actorPanGu, ["之", "亦", "其", "如", "而", "何", "乃", "且", "若", "和", "所"]); //辈分
        await nameGenerator.connect(taiyiDAO).registerGiven(actorPanGu, "男", ["国", "民", "邦", "杰", "宝", "森", "炳", "文", "伯", "华", "龙", "伦", "阳", "博"]); //男名
        await nameGenerator.connect(taiyiDAO).registerGiven(actorPanGu, "女", ["兮", "芳", "星", "清", "夏", "月", "初", "书", "简", "雪", "益", "纯", "琛", "馨"]); //女名

        testActor = await newActor(operator1, true);
        testActorName = (await names.actorName(testActor))._name;
        console.log(`-- 创建测试角色“${testActorName}”。`);
    });

    describe('全局剧情80010', () => {
        let evt80010:WorldEventProcessor80010;
        let evt80011:WorldEventProcessor80011;
        let evt80012:WorldEventProcessor80012;
        let evt80013:WorldEventProcessor80013;
        let evt80014:WorldEventProcessor80014;
        let evt80015:WorldEventProcessor80015;
        let evt80016:WorldEventProcessor80016;
        let evt80017:WorldEventProcessor80017;
        let evt80018:WorldEventProcessor80018;
        let evt80019:WorldEventProcessor80019;
        let evt60505:WorldEventProcessor60505;
        let storyActor: BigNumber;
        let storyActorName: string;
        let xiq: BigNumber;
        let daoliBefore: BigNumber;
        before(reset);

        it(`部署事件`, async ()=>{
            evt80010 = await (await (new WorldEventProcessor80010__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80010, evt80010.address);
            evt80011 = await (await (new WorldEventProcessor80011__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80011, evt80011.address);
            evt80012 = await (await (new WorldEventProcessor80012__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80012, evt80012.address);
            evt80013 = await (await (new WorldEventProcessor80013__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80013, evt80013.address);
            evt80014 = await (await (new WorldEventProcessor80014__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80014, evt80014.address);
            evt80015 = await (await (new WorldEventProcessor80015__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80015, evt80015.address);
            evt80016 = await (await (new WorldEventProcessor80016__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80016, evt80016.address);
            evt80017 = await (await (new WorldEventProcessor80017__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80017, evt80017.address);
            evt80018 = await (await (new WorldEventProcessor80018__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80018, evt80018.address);
            evt80019 = await (await (new WorldEventProcessor80019__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(80019, evt80019.address);
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
            expect(await globalStoryRegistry.hasStory(80010)).to.eq(false);
            expect(await globalStoryRegistry.storyNum()).to.eq(0);

            await globalStoryRegistry.connect(taiyiDAO).registerStory(actorPanGu, 80010, 0);

            expect(await globalStoryRegistry.hasStory(80010)).to.eq(true);
            expect(await globalStoryRegistry.storyNum()).to.eq(1);
            expect(await globalStoryRegistry.storyByIndex(0)).to.eq(80010);
        });

        it(`授权角色给时间线并成长到有效年龄`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`无前置剧情不能通过采集资源开始剧情80010`, async ()=>{
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(false);

            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });

            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(false);
        });

        it(`模拟前置剧情80001结果`, async ()=>{
            storyActor = await newActor(taiyiDAO);
            await actors.connect(taiyiDAO).approve(shejiTu.address, storyActor);
            await shejiTu.connect(taiyiDAO).grow(storyActor, { gasLimit: 5000000 });

            await names.connect(taiyiDAO).claim("恩", "贺", storyActor);
            await actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, parameterizedStorylines.address, storyActor);

            await worldStoryActors.connect(taiyiDAO).addStoryActor(1, 80001, storyActor);
            await parameterizedStorylines.connect(taiyiDAO).setActorStory(1, storyActor, 80001, 80001);
            await parameterizedStorylines.connect(taiyiDAO).setActorStory(1, storyActor, 80001, 0);
        });

        it(`剧情80001结束检查`, async ()=>{
            expect(await parameterizedStorylines.storyHistoryNum(80001)).to.eq(1);

            expect(await parameterizedStorylines.currentStoryNum()).to.eq(0);
            expect(await parameterizedStorylines.isStoryExist(80001)).to.eq(false);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(0);
            expect(await parameterizedStorylines.currentStoryActorNum(80001)).to.eq(0);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(0);
        });

        it(`剧情80001历史检查`, async ()=>{
            expect(await worldStoryActors.storyActorNum(80001)).eq(1);
            expect(await worldStoryActors.storyActorByIndex(80001, 0)).eq(storyActor);
        });

        it(`通过采集资源开始剧情80010`, async ()=>{
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(false);

            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80010检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80010);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(6);
            expect(evts[5]).eq(80010);
            expect(await worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);

            console.log(await evt80010.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80011`, async ()=>{
            expect(await evt80011.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80011检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80011);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(7);
            expect(evts[6]).eq(80011);
            expect(await worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);

            console.log(await evt80011.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80012`, async ()=>{
            expect(await evt80012.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80012检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80012);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(8);
            expect(evts[7]).eq(80012);
            expect(await worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);

            console.log(await evt80012.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80013`, async ()=>{
            expect(await evt80013.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80013检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80013);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(9);
            expect(evts[8]).eq(80013);
            expect(await worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);

            console.log(await evt80013.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80014`, async ()=>{
            expect(await evt80014.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80014检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80014);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(10);
            expect(evts[9]).eq(80014);
            expect(await worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);

            console.log(await evt80014.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80015`, async ()=>{
            expect(await evt80015.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80015检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80015);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(11);
            expect(evts[10]).eq(80015);
            expect(await worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80015)).to.eq(1);

            console.log(await evt80015.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80016`, async ()=>{
            expect(await evt80016.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80016检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80016);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(12);
            expect(evts[11]).eq(80016);
            expect(await worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80015)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80016)).to.eq(1);

            console.log(await evt80016.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80017`, async ()=>{
            expect(await evt80017.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80017检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80017);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(13);
            expect(evts[12]).eq(80017);
            expect(await worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80015)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80016)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80017)).to.eq(1);

            console.log(await evt80017.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80018`, async ()=>{
            expect(await evt80018.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80018检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80018);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(14);
            expect(evts[13]).eq(80018);
            expect(await worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80015)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80016)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80017)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80018)).to.eq(1);

            console.log(await evt80018.eventInfo(storyActor));
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源激活剧情80019`, async ()=>{
            expect(await evt80019.checkOccurrence(storyActor, 0)).to.eq(true);
            xiq = await moodAttributes.attributesScores(await dahuangConstants.ATTR_XIQ(), testActor);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80019检查`, async ()=>{
            expect(await parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(await parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(true);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80019);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(await parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(await parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            
            expect(await worldEvents.ages(storyActor)).to.eq(0);
            let evts = await worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(15);
            expect(evts[14]).eq(80019);
            expect(await worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80015)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80016)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80017)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80018)).to.eq(1);
            expect(await worldEvents.actorEventCount(storyActor, 80019)).to.eq(1);

            console.log(await evt80019.eventInfo(storyActor));

            expect(await moodAttributes.attributesScores(await dahuangConstants.ATTR_XIQ(), testActor)).to.eq(xiq.sub(10));
            console.log(`-- ${testActorName}心情-10`);
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`通过采集资源结束剧情80010`, async ()=>{
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        });

        it(`剧情80010结束检查`, async ()=>{
            expect(await parameterizedStorylines.storyHistoryNum(80010)).to.eq(1);

            expect(await parameterizedStorylines.currentStoryNum()).to.eq(0);
            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(false);

            expect(await parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(0);
            expect(await parameterizedStorylines.currentStoryActorNum(80010)).to.eq(0);
            expect(await parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(0);
        });

        it(`剧情历史检查`, async ()=>{
            expect(await worldStoryActors.storyActorNum(80010)).eq(1);
            expect(await worldStoryActors.storyActorByIndex(80010, 0)).eq(storyActor);
        });

        it(`通过采集资源不能重复剧情80010`, async ()=>{
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });

            expect(await parameterizedStorylines.isStoryExist(80010)).to.eq(false);
        });
    });
});