"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npx hardhat node
//yarn test ./test/world/story.test.ts --network hard
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
require("@openzeppelin/hardhat-upgrades");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const ethereum_waffle_1 = require("ethereum-waffle");
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const utils_1 = require("@taiyi/contracts/dist/test/utils");
const utils_2 = require("@taiyi/contracts/dist/utils");
const typechain_2 = require("../../typechain");
const utils_3 = require("../../utils");
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
const OneAgeVSecond = 1;
const ActRecoverTimeDay = 60;
const ZoneResourceGrowTimeDay = 60;
const ZoneResourceGrowQuantityScale = 10 * 1000; //10.0f
const BaseTravelTime = 3000;
const BaseBuildTime = 60;
describe('剧情80010测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let snapshotId;
    let taiyiContracts;
    let eventProcessorAddressBook;
    let contracts;
    //taiyi basic
    let worldConstants;
    let worldContractRoute;
    let sifusToken;
    let actors;
    let names;
    let actorSIDs;
    let assetDaoli;
    let zones;
    let baseAttributes;
    let actorPrelifes;
    let worldYemings;
    let worldRandom;
    let actorLocations;
    let trigrams;
    let worldItems;
    let nameGenerator;
    //dahuang
    let dahuangConstants;
    let talents;
    let shejiTu;
    let golds;
    let woods;
    let fabrics;
    let prestiges;
    let charmAttributes;
    let behaviorAttributes;
    let coreAttributes;
    let moodAttributes;
    let actorRelationship;
    let worldEvents;
    let worldBuildings;
    let worldStorylines;
    let parameterizedStorylines;
    let globalStoryRegistry;
    let worldStoryActors;
    let actorPanGu;
    let testActor;
    let testActorName;
    let startZone;
    let makeMoney = (toWho, amount) => __awaiter(void 0, void 0, void 0, function* () {
        yield assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, amount);
        yield assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, amount);
        if (toWho != taiyiDAO.address)
            yield assetDaoli.connect(taiyiDAO).transfer(toWho, amount);
    });
    let newActor = (toWho, randomName) => __awaiter(void 0, void 0, void 0, function* () {
        //deal coin
        yield makeMoney(taiyiDAO.address, BigInt(1000e18));
        yield assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = yield actors.nextActor();
        yield actors.connect(taiyiDAO).mintActor(BigInt(100e18));
        if (randomName) {
            let firstName = `小拼${Math.round(Math.random() * 100)}`;
            yield names.connect(taiyiDAO).claim(firstName, "李", _actor);
        }
        yield actors.connect(taiyiDAO).approve(shejiTu.address, _actor);
        yield shejiTu.connect(taiyiDAO).bornActor(_actor);
        if (toWho.address != taiyiDAO.address)
            yield actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
        return _actor;
    });
    let parseActorURI = (actor) => __awaiter(void 0, void 0, void 0, function* () {
        let uri = yield actors.tokenURI(actor);
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
        //console.log(uriDecode);
        return JSON.parse(uriDecode);
    });
    function reset() {
        return __awaiter(this, void 0, void 0, function* () {
            if (snapshotId) {
                yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
                snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
                return;
            }
            snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
        });
    }
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        [deployer, taiyiDAO, operator1, operator2] = yield hardhat_1.ethers.getSigners();
        //Deploy taiyi basic
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        taiyiContracts = yield (0, utils_2.deployTaiyiWorld)(timestamp, deployer, taiyiDAO, false);
        sifusToken = typechain_1.SifusToken__factory.connect(taiyiContracts.SifusToken.instance.address, operator1);
        worldConstants = typechain_1.WorldConstants__factory.connect(taiyiContracts.WorldConstants.instance.address, operator1);
        worldContractRoute = typechain_1.WorldContractRoute__factory.connect(taiyiContracts.WorldContractRoute.instance.address, operator1);
        actors = typechain_1.Actors__factory.connect(taiyiContracts.Actors.instance.address, operator1);
        assetDaoli = typechain_1.WorldFungible__factory.connect(taiyiContracts.AssetDaoli.instance.address, operator1);
        names = typechain_1.ActorNames__factory.connect(taiyiContracts.ActorNames.instance.address, operator1);
        zones = typechain_1.WorldZones__factory.connect(taiyiContracts.WorldZones.instance.address, operator1);
        worldYemings = typechain_1.WorldYemings__factory.connect(taiyiContracts.WorldYemings.instance.address, operator1);
        baseAttributes = typechain_1.ActorAttributes__factory.connect(taiyiContracts.ActorAttributes.instance.address, operator1);
        actorSIDs = typechain_1.ActorSocialIdentity__factory.connect(taiyiContracts.ActorSocialIdentity.instance.address, operator1);
        worldRandom = typechain_1.WorldRandom__factory.connect(taiyiContracts.WorldRandom.instance.address, operator1);
        actorLocations = typechain_1.ActorLocations__factory.connect(taiyiContracts.ActorLocations.instance.address, operator1);
        trigrams = typechain_1.Trigrams__factory.connect(taiyiContracts.Trigrams.instance.address, operator1);
        worldItems = typechain_1.WorldItems__factory.connect(taiyiContracts.WorldItems.instance.address, operator1);
        actorPrelifes = typechain_1.ActorPrelifes__factory.connect(taiyiContracts.ActorPrelifes.instance.address, operator1);
        nameGenerator = typechain_1.NameGenerator__factory.connect(taiyiContracts.NameGenerator.instance.address, operator1);
        //Deploy dahuang world
        let worldDeployed = yield (0, utils_3.deployDahuangWorld)(OneAgeVSecond, ActRecoverTimeDay, ZoneResourceGrowTimeDay, ZoneResourceGrowQuantityScale, worldContractRoute, worldConstants, actors, actorLocations, worldYemings, zones, baseAttributes, trigrams, worldRandom, worldItems, actorSIDs, deployer, taiyiDAO, {
            isTest: true,
            noSIDNames: true,
            noTalents: true,
            noTalentProcessors: true,
            noRelations: true,
            noItemTypes: true,
            noBuildingTypes: true,
            noEventProcessors: true,
            noTimelineEvents: true,
            noZones: true
        }, false);
        contracts = worldDeployed.worldContracts;
        eventProcessorAddressBook = worldDeployed.eventProcessorAddressBook;
        dahuangConstants = typechain_2.DahuangConstants__factory.connect(contracts.DahuangConstants.instance.address, operator1);
        talents = typechain_1.ActorTalents__factory.connect(contracts.ActorTalents.instance.address, operator1);
        worldEvents = typechain_1.WorldEvents__factory.connect(contracts.WorldEvents.instance.address, operator1);
        shejiTu = typechain_1.ShejiTu__factory.connect(contracts.ShejiTuProxy.instance.address, operator1);
        golds = typechain_1.WorldFungible__factory.connect(contracts.AssetGold.instance.address, operator1);
        woods = typechain_1.WorldFungible__factory.connect(contracts.AssetWood.instance.address, operator1);
        fabrics = typechain_1.WorldFungible__factory.connect(contracts.AssetFabric.instance.address, operator1);
        prestiges = typechain_1.WorldFungible__factory.connect(contracts.AssetPrestige.instance.address, operator1);
        charmAttributes = typechain_2.ActorCharmAttributes__factory.connect(contracts.ActorCharmAttributes.instance.address, operator1);
        behaviorAttributes = typechain_2.ActorBehaviorAttributes__factory.connect(contracts.ActorBehaviorAttributes.instance.address, operator1);
        coreAttributes = typechain_2.ActorCoreAttributes__factory.connect(contracts.ActorCoreAttributes.instance.address, operator1);
        moodAttributes = typechain_2.ActorMoodAttributes__factory.connect(contracts.ActorMoodAttributes.instance.address, operator1);
        actorRelationship = typechain_1.ActorRelationship__factory.connect(contracts.ActorRelationship.instance.address, operator1);
        worldBuildings = typechain_2.WorldBuildings__factory.connect(contracts.WorldBuildings.instance.address, operator1);
        worldStorylines = typechain_1.WorldStorylines__factory.connect(contracts.WorldStorylines.instance.address, operator1);
        parameterizedStorylines = typechain_1.ParameterizedStorylines__factory.connect(contracts.ParameterizedStorylines.instance.address, operator1);
        globalStoryRegistry = typechain_1.GlobalStoryRegistry__factory.connect(contracts.GlobalStoryRegistry.instance.address, operator1);
        worldStoryActors = typechain_1.WorldStoryActors__factory.connect(contracts.WorldStoryActors.instance.address, operator1);
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //bind timeline to a zone
        startZone = yield zones.nextZone();
        yield zones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
        yield shejiTu.connect(deployer).setStartZone(startZone);
        //born PanGu
        yield actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
        yield shejiTu.connect(taiyiDAO).bornActor(actorPanGu);
        //register actors uri modules
        yield actors.connect(taiyiDAO).registerURIPartModule(names.address);
        yield actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
        yield actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
        //部署出生序列
        let eventsByPanGu = worldEvents.connect(taiyiDAO);
        const evt10001 = yield (yield (new typechain_2.WorldEventProcessor10001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(10001, evt10001.address);
        const evt60001 = yield (yield (new typechain_2.WorldEventProcessor60001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(60001, evt60001.address);
        const evt60002 = yield (yield (new typechain_2.WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(60002, evt60002.address);
        const evt60003 = yield (yield (new typechain_2.WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(60003, evt60003.address);
        const evt60004 = yield (yield (new typechain_2.WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(60004, evt60004.address);
        const evt60005 = yield (yield (new typechain_2.WorldEventProcessor60005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(60005, evt60005.address);
        //配置时间线出生事件
        yield shejiTu.connect(deployer).addAgeEvent(0, 10001, 1);
        yield shejiTu.connect(deployer).addAgeEvent(1, 60001, 1);
        //名称发生器配置
        yield nameGenerator.connect(taiyiDAO).registerGender(actorPanGu, ["男", "女"]); //性别
        yield nameGenerator.connect(taiyiDAO).registerFamily(actorPanGu, ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周"]); //姓
        yield nameGenerator.connect(taiyiDAO).registerMiddle(actorPanGu, ["之", "亦", "其", "如", "而", "何", "乃", "且", "若", "和", "所"]); //辈分
        yield nameGenerator.connect(taiyiDAO).registerGiven(actorPanGu, "男", ["国", "民", "邦", "杰", "宝", "森", "炳", "文", "伯", "华", "龙", "伦", "阳", "博"]); //男名
        yield nameGenerator.connect(taiyiDAO).registerGiven(actorPanGu, "女", ["兮", "芳", "星", "清", "夏", "月", "初", "书", "简", "雪", "益", "纯", "琛", "馨"]); //女名
        testActor = yield newActor(operator1, true);
        testActorName = (yield names.actorName(testActor))._name;
        console.log(`-- 创建测试角色“${testActorName}”。`);
    }));
    describe('全局剧情80010', () => {
        let evt80010;
        let evt80011;
        let evt80012;
        let evt80013;
        let evt80014;
        let evt80015;
        let evt80016;
        let evt80017;
        let evt80018;
        let evt80019;
        let evt60505;
        let storyActor;
        let storyActorName;
        let xiq;
        let daoliBefore;
        before(reset);
        it(`部署事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt80010 = yield (yield (new typechain_2.WorldEventProcessor80010__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(80010, evt80010.address);
            evt80011 = yield (yield (new typechain_2.WorldEventProcessor80011__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(80011, evt80011.address);
            evt80012 = yield (yield (new typechain_2.WorldEventProcessor80012__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(80012, evt80012.address);
            evt80013 = yield (yield (new typechain_2.WorldEventProcessor80013__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(80013, evt80013.address);
            evt80014 = yield (yield (new typechain_2.WorldEventProcessor80014__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(80014, evt80014.address);
            evt80015 = yield (yield (new typechain_2.WorldEventProcessor80015__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(80015, evt80015.address);
            evt80016 = yield (yield (new typechain_2.WorldEventProcessor80016__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(80016, evt80016.address);
            evt80017 = yield (yield (new typechain_2.WorldEventProcessor80017__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(80017, evt80017.address);
            evt80018 = yield (yield (new typechain_2.WorldEventProcessor80018__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(80018, evt80018.address);
            evt80019 = yield (yield (new typechain_2.WorldEventProcessor80019__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(80019, evt80019.address);
            evt60505 = yield (yield (new typechain_2.WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
        }));
        it('配置60505操作角色', () => __awaiter(void 0, void 0, void 0, function* () {
            let newOne = yield newActor(deployer);
            yield actors.connect(deployer).approve(evt60505.address, newOne);
            yield evt60505.initOperator(newOne);
            expect(yield evt60505.eventOperator()).to.eq(newOne);
            expect(yield actors.ownerOf(newOne)).to.eq(evt60505.address);
        }));
        it('配置60505影响的属性模块', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (yield evt60505.registerAttributeModule(baseAttributes.address)).wait();
            yield (yield evt60505.registerAttributeModule(charmAttributes.address)).wait();
            yield (yield evt60505.registerAttributeModule(coreAttributes.address)).wait();
            yield (yield evt60505.registerAttributeModule(moodAttributes.address)).wait();
            yield (yield evt60505.registerAttributeModule(behaviorAttributes.address)).wait();
        }));
        it(`注册全局剧情起始事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield globalStoryRegistry.hasStory(80010)).to.eq(false);
            expect(yield globalStoryRegistry.storyNum()).to.eq(0);
            yield globalStoryRegistry.connect(taiyiDAO).registerStory(actorPanGu, 80010, 0);
            expect(yield globalStoryRegistry.hasStory(80010)).to.eq(true);
            expect(yield globalStoryRegistry.storyNum()).to.eq(1);
            expect(yield globalStoryRegistry.storyByIndex(0)).to.eq(80010);
        }));
        it(`授权角色给时间线并成长到有效年龄`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.approve(shejiTu.address, testActor);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`无前置剧情不能通过采集资源开始剧情80010`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(false);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(false);
        }));
        it(`模拟前置剧情80001结果`, () => __awaiter(void 0, void 0, void 0, function* () {
            storyActor = yield newActor(taiyiDAO);
            yield actors.connect(taiyiDAO).approve(shejiTu.address, storyActor);
            yield shejiTu.connect(taiyiDAO).grow(storyActor, { gasLimit: 5000000 });
            yield names.connect(taiyiDAO).claim("恩", "贺", storyActor);
            yield actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, parameterizedStorylines.address, storyActor);
            yield worldStoryActors.connect(taiyiDAO).addStoryActor(1, 80001, storyActor);
            yield parameterizedStorylines.connect(taiyiDAO).setActorStory(1, storyActor, 80001, 80001);
            yield parameterizedStorylines.connect(taiyiDAO).setActorStory(1, storyActor, 80001, 0);
        }));
        it(`剧情80001结束检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.storyHistoryNum(80001)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(0);
            expect(yield parameterizedStorylines.isStoryExist(80001)).to.eq(false);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80001)).to.eq(0);
            expect(yield parameterizedStorylines.currentStoryActorNum(80001)).to.eq(0);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(0);
        }));
        it(`剧情80001历史检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield worldStoryActors.storyActorNum(80001)).eq(1);
            expect(yield worldStoryActors.storyActorByIndex(80001, 0)).eq(storyActor);
        }));
        it(`通过采集资源开始剧情80010`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(false);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80010检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(true);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80010);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(yield parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            expect(yield worldEvents.ages(storyActor)).to.eq(0);
            let evts = yield worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(6);
            expect(evts[5]).eq(80010);
            expect(yield worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            console.log(yield evt80010.eventInfo(storyActor));
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`通过采集资源激活剧情80011`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt80011.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80011检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(true);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80011);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(yield parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            expect(yield worldEvents.ages(storyActor)).to.eq(0);
            let evts = yield worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(7);
            expect(evts[6]).eq(80011);
            expect(yield worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            console.log(yield evt80011.eventInfo(storyActor));
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`通过采集资源激活剧情80012`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt80012.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80012检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(true);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80012);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(yield parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            expect(yield worldEvents.ages(storyActor)).to.eq(0);
            let evts = yield worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(8);
            expect(evts[7]).eq(80012);
            expect(yield worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            console.log(yield evt80012.eventInfo(storyActor));
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`通过采集资源激活剧情80013`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt80013.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80013检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(true);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80013);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(yield parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            expect(yield worldEvents.ages(storyActor)).to.eq(0);
            let evts = yield worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(9);
            expect(evts[8]).eq(80013);
            expect(yield worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            console.log(yield evt80013.eventInfo(storyActor));
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`通过采集资源激活剧情80014`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt80014.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80014检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(true);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80014);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(yield parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            expect(yield worldEvents.ages(storyActor)).to.eq(0);
            let evts = yield worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(10);
            expect(evts[9]).eq(80014);
            expect(yield worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            console.log(yield evt80014.eventInfo(storyActor));
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`通过采集资源激活剧情80015`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt80015.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80015检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(true);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80015);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(yield parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            expect(yield worldEvents.ages(storyActor)).to.eq(0);
            let evts = yield worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(11);
            expect(evts[10]).eq(80015);
            expect(yield worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80015)).to.eq(1);
            console.log(yield evt80015.eventInfo(storyActor));
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`通过采集资源激活剧情80016`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt80016.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80016检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(true);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80016);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(yield parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            expect(yield worldEvents.ages(storyActor)).to.eq(0);
            let evts = yield worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(12);
            expect(evts[11]).eq(80016);
            expect(yield worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80015)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80016)).to.eq(1);
            console.log(yield evt80016.eventInfo(storyActor));
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`通过采集资源激活剧情80017`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt80017.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80017检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(true);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80017);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(yield parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            expect(yield worldEvents.ages(storyActor)).to.eq(0);
            let evts = yield worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(13);
            expect(evts[12]).eq(80017);
            expect(yield worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80015)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80016)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80017)).to.eq(1);
            console.log(yield evt80017.eventInfo(storyActor));
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`通过采集资源激活剧情80018`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt80018.checkOccurrence(storyActor, 0)).to.eq(true);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80018检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(true);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80018);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(yield parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            expect(yield worldEvents.ages(storyActor)).to.eq(0);
            let evts = yield worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(14);
            expect(evts[13]).eq(80018);
            expect(yield worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80015)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80016)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80017)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80018)).to.eq(1);
            console.log(yield evt80018.eventInfo(storyActor));
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`通过采集资源激活剧情80019`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt80019.checkOccurrence(storyActor, 0)).to.eq(true);
            xiq = yield moodAttributes.attributesScores(yield dahuangConstants.ATTR_XIQ(), testActor);
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80019检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryByIndex(0)).to.eq(80010);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(true);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(80019);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryActorByIndex(80010, 0)).to.eq(storyActor);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(1);
            expect(yield parameterizedStorylines.currentActorStoryByIndex(storyActor, 0)).to.eq(80010);
            expect(yield worldEvents.ages(storyActor)).to.eq(0);
            let evts = yield worldEvents.actorEvent(storyActor, 0);
            expect(evts.length).eq(15);
            expect(evts[14]).eq(80019);
            expect(yield worldEvents.actorEventCount(storyActor, 80010)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80011)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80012)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80013)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80014)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80015)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80016)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80017)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80018)).to.eq(1);
            expect(yield worldEvents.actorEventCount(storyActor, 80019)).to.eq(1);
            console.log(yield evt80019.eventInfo(storyActor));
            expect(yield moodAttributes.attributesScores(yield dahuangConstants.ATTR_XIQ(), testActor)).to.eq(xiq.sub(10));
            console.log(`-- ${testActorName}心情-10`);
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`通过采集资源结束剧情80010`, () => __awaiter(void 0, void 0, void 0, function* () {
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
        }));
        it(`剧情80010结束检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield parameterizedStorylines.storyHistoryNum(80010)).to.eq(1);
            expect(yield parameterizedStorylines.currentStoryNum()).to.eq(0);
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(false);
            expect(yield parameterizedStorylines.currentActorEventByStoryId(storyActor, 80010)).to.eq(0);
            expect(yield parameterizedStorylines.currentStoryActorNum(80010)).to.eq(0);
            expect(yield parameterizedStorylines.currentActorStoryNum(storyActor)).to.eq(0);
        }));
        it(`剧情历史检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield worldStoryActors.storyActorNum(80010)).eq(1);
            expect(yield worldStoryActors.storyActorByIndex(80010, 0)).eq(storyActor);
        }));
        it(`通过采集资源不能重复剧情80010`, () => __awaiter(void 0, void 0, void 0, function* () {
            let lcs = yield actorLocations.actorLocations(testActor);
            yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], [], { gasLimit: 8000000 });
            expect(yield parameterizedStorylines.isStoryExist(80010)).to.eq(false);
        }));
    });
});
