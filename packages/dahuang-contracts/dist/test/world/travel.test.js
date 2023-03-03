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
const BaseTravelTime = 3000;
const BaseBuildTime = 60;
describe('基本移动测试', () => {
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
    let actorPanGu;
    let testActor;
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
        yield shejiTu.connect(deployer).addAgeEvent(1, 60001, 1);
        yield shejiTu.connect(deployer).addAgeEvent(2, 60001, 1);
        yield shejiTu.connect(deployer).addAgeEvent(3, 60001, 1);
        yield shejiTu.connect(deployer).addAgeEvent(4, 60001, 1);
        yield shejiTu.connect(deployer).addAgeEvent(5, 60001, 1);
        testActor = yield newActor(operator1, true);
    }));
    describe('区域间移动', () => {
        let evt70000;
        let evt60505;
        let evt60506;
        let evt60509;
        let zone1;
        let zone2;
        before(reset);
        it(`部署事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt70000 = yield (yield (new typechain_2.WorldEventProcessor70000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(70000, evt70000.address);
            evt60505 = yield (yield (new typechain_2.WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
            evt60506 = yield (yield (new typechain_2.WorldEventProcessor60506__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60506, evt60506.address);
            evt60509 = yield (yield (new typechain_2.WorldEventProcessor60509__factory(deployer)).deploy(BaseTravelTime, worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60509, evt60509.address);
        }));
        it(`盘古创建区域1`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt70000.checkOccurrence(actorPanGu, 0)).to.eq(true);
            zone1 = yield zones.nextZone();
            yield actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            yield shejiTu.connect(taiyiDAO).activeTrigger(70000, actorPanGu, [0], ["区域1"]);
        }));
        it(`成长到有效年龄`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.approve(shejiTu.address, testActor);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        }));
        it(`用户创建区域1`, () => __awaiter(void 0, void 0, void 0, function* () {
            zone2 = yield zones.nextZone();
            yield prestiges.approveActor(testActor, yield shejiTu.operator(), BigInt(1000e18));
            yield shejiTu.activeTrigger(60506, testActor, [], ["区域2"]);
            expect(yield zones.names(zone2)).to.eq("区域2");
            expect(yield zones.ownerOf(zone2)).to.eq((yield actors.getActor(testActor)).account);
        }));
        it(`行动力不足不能移动`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60509.checkOccurrence(testActor, 0)).to.eq(false);
            let currentLc = yield actorLocations.actorLocations(testActor);
            yield expect(shejiTu.activeTrigger(60509, testActor, [currentLc[1], zone2], [])).to.be.revertedWith("event check occurrence failed.");
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        }));
        it(`移动到区域2-开始`, () => __awaiter(void 0, void 0, void 0, function* () {
            let currentLc = yield actorLocations.actorLocations(testActor);
            let lA = currentLc[1];
            yield shejiTu.activeTrigger(60509, testActor, [lA, zone2], []);
            currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(lA);
            expect(currentLc[1]).to.eq(zone2);
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        }));
        it(`移动到区域2-移动时间未到`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(true);
            //finish call can success but no effect
            expect((yield actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(true);
            //shold not move since actor is locked
            expect(yield evt60509.checkOccurrence(testActor, 0)).to.eq(false);
            yield expect(shejiTu.activeTrigger(60509, testActor, [zone2, zone1], [])).to.be.revertedWith("actor is locked by location");
        }));
        it(`移动到区域2-移动时间达到`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [BaseTravelTime]);
            expect((yield actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(false);
            let currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(zone2);
            expect(currentLc[1]).to.eq(zone2);
        }));
        it(`移动到区域1-开始`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60509.checkOccurrence(testActor, 0)).to.eq(true);
            yield shejiTu.activeTrigger(60509, testActor, [zone2, zone1], []);
            let currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(zone2);
            expect(currentLc[1]).to.eq(zone1);
        }));
        it(`移动到区域2-完成`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [BaseTravelTime]);
            expect((yield actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(false);
            let currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(zone1);
            expect(currentLc[1]).to.eq(zone1);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
    });
});
