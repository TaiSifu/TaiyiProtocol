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
describe('角色属性测试', () => {
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
        charmAttributes = typechain_2.ActorCharmAttributes__factory.connect(contracts.ActorCharmAttributes.instance.address, operator1);
        behaviorAttributes = typechain_2.ActorBehaviorAttributes__factory.connect(contracts.ActorBehaviorAttributes.instance.address, operator1);
        coreAttributes = typechain_2.ActorCoreAttributes__factory.connect(contracts.ActorCoreAttributes.instance.address, operator1);
        moodAttributes = typechain_2.ActorMoodAttributes__factory.connect(contracts.ActorMoodAttributes.instance.address, operator1);
        actorRelationship = typechain_1.ActorRelationship__factory.connect(contracts.ActorRelationship.instance.address, operator1);
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //bind timeline to a zone
        let zoneId = yield zones.nextZone();
        yield zones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
        yield shejiTu.connect(deployer).setStartZone(zoneId);
        testActor = yield newActor(operator1);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
    }));
    it('外貌属性集', () => __awaiter(void 0, void 0, void 0, function* () {
        //set one talent to test
        let W_MODULE_CHARM_ATTRIBUTES = yield dahuangConstants.WORLD_MODULE_CHARM_ATTRIBUTES();
        let MEL = yield dahuangConstants.ATTR_MEL();
        yield talents.connect(taiyiDAO).setTalent(1010, "Good Man", "Born as good man", [MEL, ethers_1.BigNumber.from(10)], [W_MODULE_CHARM_ATTRIBUTES, 20]);
        //should not point
        yield expect(charmAttributes.connect(taiyiDAO).pointActor(testActor, testActor)).to.be.revertedWith('only YeMing');
        //can not point with out talents initialized
        yield expect(charmAttributes.connect(taiyiDAO).pointActor(actorPanGu, testActor)).to.be.revertedWith('talents have not initiated');
        yield talents.connect(taiyiDAO).talentActor(actorPanGu, testActor);
        let actTlts = yield talents.actorTalents(testActor);
        expect((yield charmAttributes.connect(taiyiDAO).pointActor(actorPanGu, testActor)).wait()).eventually.fulfilled;
        let _mel = yield charmAttributes.attributesScores(MEL, testActor);
        if (actTlts.length >= 1)
            expect(_mel).to.be.equal(120);
        else
            expect(_mel).to.be.equal(100);
    }));
    it('核心属性集', () => __awaiter(void 0, void 0, void 0, function* () {
        //set one talent to test
        let W_MODULE_CORE_ATTRIBUTES = yield dahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES();
        let DIL = yield dahuangConstants.ATTR_DIL();
        let GEG = yield dahuangConstants.ATTR_GEG();
        let LIM = yield dahuangConstants.ATTR_LIM();
        let LVL = yield dahuangConstants.ATTR_LVL();
        let TIZ = yield dahuangConstants.ATTR_TIZ();
        let WUX = yield dahuangConstants.ATTR_WUX();
        yield talents.connect(taiyiDAO).setTalent(1010, "Good Man", "Born as good man", [DIL, ethers_1.BigNumber.from(1), DIL, ethers_1.BigNumber.from(-1)], [W_MODULE_CORE_ATTRIBUTES, 20]);
        //should not point
        yield expect(coreAttributes.connect(taiyiDAO).pointActor(testActor, testActor)).to.be.revertedWith('only YeMing');
        //can not point with out talents initialized
        yield expect(coreAttributes.connect(taiyiDAO).pointActor(actorPanGu, testActor)).to.be.revertedWith('talents have not initiated');
        yield talents.connect(taiyiDAO).talentActor(actorPanGu, testActor);
        let actTlts = yield talents.actorTalents(testActor);
        expect((yield coreAttributes.connect(taiyiDAO).pointActor(actorPanGu, testActor)).wait()).eventually.fulfilled;
        let _dil = yield coreAttributes.attributesScores(DIL, testActor);
        let _geg = yield coreAttributes.attributesScores(GEG, testActor);
        let _lim = yield coreAttributes.attributesScores(LIM, testActor);
        let _lvl = yield coreAttributes.attributesScores(LVL, testActor);
        let _tiz = yield coreAttributes.attributesScores(TIZ, testActor);
        let _wux = yield coreAttributes.attributesScores(WUX, testActor);
        if (actTlts.length >= 1)
            expect(_dil.add(_geg).add(_lim).add(_lvl).add(_tiz).add(_wux)).to.be.equal(120);
        else
            expect(_dil.add(_geg).add(_lim).add(_lvl).add(_tiz).add(_wux)).to.be.equal(100);
    }));
    it('情绪属性集', () => __awaiter(void 0, void 0, void 0, function* () {
        //set one talent to test
        let W_MODULE_MOOD_ATTRIBUTES = yield dahuangConstants.WORLD_MODULE_MOOD_ATTRIBUTES();
        let XIQ = yield dahuangConstants.ATTR_XIQ();
        yield talents.connect(taiyiDAO).setTalent(1010, "Good Man", "Born as good man", [XIQ, ethers_1.BigNumber.from(10)], [W_MODULE_MOOD_ATTRIBUTES, 20]);
        //should not point
        yield expect(moodAttributes.connect(taiyiDAO).pointActor(testActor, testActor)).to.be.revertedWith('only YeMing');
        //can not point with out talents initialized
        yield expect(moodAttributes.connect(taiyiDAO).pointActor(actorPanGu, testActor)).to.be.revertedWith('talents have not initiated');
        yield talents.connect(taiyiDAO).talentActor(actorPanGu, testActor);
        let actTlts = yield talents.actorTalents(testActor);
        expect((yield moodAttributes.connect(taiyiDAO).pointActor(actorPanGu, testActor)).wait()).eventually.fulfilled;
        let _xiq = yield moodAttributes.attributesScores(XIQ, testActor);
        if (actTlts.length >= 1)
            expect(_xiq).to.be.equal(120);
        else
            expect(_xiq).to.be.equal(100);
    }));
    it('行为属性集', () => __awaiter(void 0, void 0, void 0, function* () {
        //set one talent to test
        let W_MODULE_BEHAVIOR_ATTRIBUTES = yield dahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES();
        let ACT = yield dahuangConstants.ATTR_ACT();
        yield talents.connect(taiyiDAO).setTalent(1010, "Good Man", "Born as good man", [ACT, ethers_1.BigNumber.from(10)], [W_MODULE_BEHAVIOR_ATTRIBUTES, 20]);
        //should not point
        yield expect(behaviorAttributes.connect(taiyiDAO).pointActor(testActor, testActor)).to.be.revertedWith('only YeMing');
        //can not point with out talents initialized
        yield expect(behaviorAttributes.connect(taiyiDAO).pointActor(actorPanGu, testActor)).to.be.revertedWith('talents have not initiated');
        yield talents.connect(taiyiDAO).talentActor(actorPanGu, testActor);
        let actTlts = yield talents.actorTalents(testActor);
        expect((yield behaviorAttributes.connect(taiyiDAO).pointActor(actorPanGu, testActor)).wait()).eventually.fulfilled;
        let _act = yield behaviorAttributes.attributesScores(ACT, testActor);
        expect(_act).to.be.equal(0);
    }));
});
