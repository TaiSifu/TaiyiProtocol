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
const BaseTravelTime = 60;
const BaseBuildTime = 60;
describe('角色成长事件测试', () => {
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
    let talents;
    let shejiTu;
    let actorSIDs;
    let assetDaoli;
    let zones;
    let baseAttributes;
    let charmAttributes;
    let behaviorAttributes;
    let coreAttributes;
    let moodAttributes;
    let actorRelationship;
    let worldEvents;
    let worldYemings;
    let worldRandom;
    let actorLocations;
    let trigrams;
    let worldItems;
    //dahuang
    let dahuangConstants;
    let golds;
    let woods;
    let fabrics;
    let prestiges;
    let worldBuildings;
    let actorPanGu;
    let testActor;
    let newActor = (toWho, randomName) => __awaiter(void 0, void 0, void 0, function* () {
        //deal coin
        yield assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1000e18));
        yield assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, BigInt(1000e18));
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
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //bind timeline to a zone
        let zoneId = yield zones.nextZone();
        yield zones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
        yield shejiTu.connect(deployer).setStartZone(zoneId);
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
        testActor = yield newActor(operator1, true);
    }));
    describe('事件10016-10017', () => {
        let evt10016;
        let evt10017;
        before(reset);
        it(`部署相关事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            const evt10000 = yield (yield (new typechain_2.WorldEventProcessor10000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10000, evt10000.address);
            const evt10009 = yield (yield (new typechain_2.WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10009, evt10009.address);
            yield shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);
            evt10016 = yield (yield (new typechain_2.WorldEventProcessor10016__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10016, evt10016.address);
            yield shejiTu.connect(deployer).addAgeEvent(2, 10016, 1);
            evt10017 = yield (yield (new typechain_2.WorldEventProcessor10017__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10017, evt10017.address);
            yield shejiTu.connect(deployer).addAgeEvent(3, 10017, 1);
        }));
        it(`成长到测试年龄之前`, () => __awaiter(void 0, void 0, void 0, function* () {
            //授权时间线
            yield actors.approve(shejiTu.address, testActor);
            //授权资源给时间线
            let yeming = yield shejiTu.operator();
            yield (yield golds.approveActor(testActor, yeming, BigInt(1e29))).wait();
            yield (yield assetDaoli.approveActor(testActor, yeming, BigInt(1e29))).wait();
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        }));
        it(`准备测试条件`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield coreAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [yield dahuangConstants.ATTR_LVL(), 10]);
            yield moodAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [yield dahuangConstants.ATTR_XIQ(), 10]);
        }));
        it(`成长测试10016`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt10016.checkOccurrence(testActor, 0)).eq(true);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
        }));
        it(`成长测试10017`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt10017.checkOccurrence(testActor, 0)).eq(true);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            expect(yield baseAttributes.attributesScores(yield worldConstants.ATTR_HLH(), testActor)).eq(0);
        }));
    });
    describe('事件10019', () => {
        let evt10019;
        before(reset);
        it(`部署相关事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt10019 = yield (yield (new typechain_2.WorldEventProcessor10019__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10019, evt10019.address);
            yield shejiTu.connect(deployer).addAgeEvent(1, 10019, 1);
        }));
        it(`成长到测试年龄之前`, () => __awaiter(void 0, void 0, void 0, function* () {
            //授权时间线
            yield actors.approve(shejiTu.address, testActor);
            //授权资源给时间线
            let yeming = yield shejiTu.operator();
            yield (yield golds.approveActor(testActor, yeming, BigInt(1e29))).wait();
            yield (yield assetDaoli.approveActor(testActor, yeming, BigInt(1e29))).wait();
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
        }));
        it(`准备测试条件`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield coreAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [yield dahuangConstants.ATTR_LVL(), 0]);
            yield moodAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [yield dahuangConstants.ATTR_XIQ(), 0]);
        }));
        it(`成长测试10019`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt10019.checkOccurrence(testActor, 0)).eq(true);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            expect(yield coreAttributes.attributesScores(yield dahuangConstants.ATTR_LVL(), testActor)).eq(10);
            expect(yield moodAttributes.attributesScores(yield dahuangConstants.ATTR_XIQ(), testActor)).eq(10);
        }));
    });
    describe('事件10020', () => {
        let evt10020;
        before(reset);
        it(`部署相关事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            const evt10009 = yield (yield (new typechain_2.WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10009, evt10009.address);
            yield shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);
            evt10020 = yield (yield (new typechain_2.WorldEventProcessor10020__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10020, evt10020.address);
            yield shejiTu.connect(deployer).addAgeEvent(2, 10020, 1);
        }));
        it(`成长到测试年龄之前`, () => __awaiter(void 0, void 0, void 0, function* () {
            //授权时间线
            yield actors.approve(shejiTu.address, testActor);
            //授权资源给时间线
            let yeming = yield shejiTu.operator();
            yield (yield golds.approveActor(testActor, yeming, BigInt(1e29))).wait();
            yield (yield assetDaoli.approveActor(testActor, yeming, BigInt(1e29))).wait();
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        }));
        it(`准备测试条件`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield coreAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [yield dahuangConstants.ATTR_WUX(), 80]);
            expect(yield worldEvents.actorEventCount(testActor, 10009)).gt(0);
        }));
        it(`成长测试10020`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt10020.checkOccurrence(testActor, 0)).eq(true);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            expect(yield coreAttributes.attributesScores(yield dahuangConstants.ATTR_WUX(), testActor)).eq(70);
        }));
    });
    describe('事件10021', () => {
        let evt10021;
        before(reset);
        it(`部署相关事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            const evt10009 = yield (yield (new typechain_2.WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10009, evt10009.address);
            yield shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);
            evt10021 = yield (yield (new typechain_2.WorldEventProcessor10021__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10021, evt10021.address);
            yield shejiTu.connect(deployer).addAgeEvent(2, 10021, 1);
        }));
        it(`成长到测试年龄之前`, () => __awaiter(void 0, void 0, void 0, function* () {
            //授权时间线
            yield actors.approve(shejiTu.address, testActor);
            //授权资源给时间线
            let yeming = yield shejiTu.operator();
            yield (yield golds.approveActor(testActor, yeming, BigInt(1e29))).wait();
            yield (yield assetDaoli.approveActor(testActor, yeming, BigInt(1e29))).wait();
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        }));
        it(`准备测试条件`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield coreAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [yield dahuangConstants.ATTR_WUX(), 80]);
            expect(yield worldEvents.actorEventCount(testActor, 10009)).gt(0);
            expect(yield evt10021.checkOccurrence(testActor, 0)).eq(false); //道理不够
            yield assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1e18));
            yield assetDaoli.connect(taiyiDAO).transferActor(actorPanGu, testActor, BigInt(1e18));
            expect(yield assetDaoli.balanceOfActor(testActor)).eq(BigInt(1e18));
        }));
        it(`成长测试10020`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt10021.checkOccurrence(testActor, 0)).eq(true);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            expect(yield coreAttributes.attributesScores(yield dahuangConstants.ATTR_WUX(), testActor)).eq(90);
        }));
    });
    describe('事件10024-10025', () => {
        let evt10024;
        let evt10025;
        let taiyiZone;
        before(reset);
        it(`部署相关事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            const evt10009 = yield (yield (new typechain_2.WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10009, evt10009.address);
            yield shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);
            evt10024 = yield (yield (new typechain_2.WorldEventProcessor10024__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10024, evt10024.address);
            yield shejiTu.connect(deployer).addAgeEvent(2, 10024, 1);
            taiyiZone = yield zones.nextZone();
            yield zones.connect(taiyiDAO).claim(actorPanGu, "太乙村", shejiTu.address, actorPanGu);
            evt10025 = yield (yield (new typechain_2.WorldEventProcessor10025__factory(deployer)).deploy(taiyiZone, worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10025, evt10025.address);
        }));
        it(`成长到测试年龄之前`, () => __awaiter(void 0, void 0, void 0, function* () {
            //授权时间线
            yield actors.approve(shejiTu.address, testActor);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
        }));
        it(`准备测试条件`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield talents.connect(taiyiDAO).setTalent(1015, "Good Man", "Born as good man", [], []);
            yield talents.connect(taiyiDAO).setActorTalent(actorPanGu, testActor, 1015);
            yield moodAttributes.connect(taiyiDAO).setAttributes(actorPanGu, testActor, [yield dahuangConstants.ATTR_XIQ(), 80]);
        }));
        it(`成长测试10024`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt10024.checkOccurrence(testActor, 0)).eq(true);
            expect(yield evt10025.checkOccurrence(testActor, 0)).eq(true);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            expect(yield moodAttributes.attributesScores(yield dahuangConstants.ATTR_XIQ(), testActor)).eq(80);
            expect(yield worldEvents.actorEventCount(testActor, 10024)).eq(1);
            expect(yield worldEvents.actorEventCount(testActor, 10025)).eq(1);
            let lcs = yield actorLocations.actorLocations(testActor);
            expect(lcs[0]).eq(2);
            expect(lcs[0]).eq(lcs[1]);
        }));
    });
    describe('事件10031', () => {
        let evt10031;
        before(reset);
        it(`部署相关事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt10031 = yield (yield (new typechain_2.WorldEventProcessor10031__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(10031, evt10031.address);
            yield shejiTu.connect(deployer).addAgeEvent(1, 10031, 1);
        }));
        it(`成长到测试年龄之前`, () => __awaiter(void 0, void 0, void 0, function* () {
            //授权时间线
            yield actors.approve(shejiTu.address, testActor);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
        }));
        it(`准备测试条件`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield worldItems.connect(taiyiDAO).setTypeName(20, "《木工房》0");
            yield worldItems.connect(taiyiDAO).setTypeName(21, "《木工房》1");
            yield worldItems.connect(taiyiDAO).setTypeName(22, "《木工房》2");
            yield worldItems.connect(taiyiDAO).setTypeName(23, "《木工房》3");
            yield worldItems.connect(taiyiDAO).setTypeName(24, "《木工房》4");
            yield worldItems.connect(taiyiDAO).setTypeName(25, "《木工房》5");
        }));
        it(`成长测试10031（未授权声誉）`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt10031.checkOccurrence(testActor, 0)).eq(true);
            //未授权声誉
            yield expect(shejiTu.grow(testActor, { gasLimit: 5000000 })).to.be.revertedWith("transfer amount exceeds allowance"); //age 1
        }));
        it(`成长测试10031（授权声誉）`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt10031.checkOccurrence(testActor, 0)).eq(true);
            yield prestiges.approveActor(testActor, yield shejiTu.operator(), BigInt(1000e18));
            let newItem = yield worldItems.nextItemId();
            expect((yield shejiTu.grow(testActor, { gasLimit: 5000000 })).wait()).eventually.fulfilled; //age 1
            expect(yield worldItems.balanceOf(operator1.address)).to.eq(0); //not in operator but account
            expect(yield worldItems.balanceOf((yield actors.getActor(testActor)).account)).to.eq(1);
            expect(yield worldItems.ownerOf(newItem)).to.eq((yield actors.getActor(testActor)).account);
        }));
    });
});
