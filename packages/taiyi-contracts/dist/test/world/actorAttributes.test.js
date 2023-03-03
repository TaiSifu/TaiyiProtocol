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
const typechain_1 = require("../../typechain");
const utils_1 = require("../utils");
const utils_2 = require("../../utils");
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
const OneAgeVSecond = 1;
describe('角色属性测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let snapshotId;
    let contracts;
    let worldConstants;
    let worldContractRoute;
    let sifusToken;
    let actors;
    let names;
    let actorTalents;
    let shejiTu;
    let shejiTuImpl;
    let actorSIDs;
    let assetDaoli;
    let worldZones;
    let actorAttributes;
    let worldEvents;
    let worldYemings;
    let worldRandom;
    let actorLocations;
    let trigrams;
    let actorPanGu;
    let testActor;
    const FAKE_MODULE_EVENTS = 101;
    const FAKE_MODULE_TIMELINE = 102;
    const FAKE_MODULE_TALENTS = 103;
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
        //Deploy world
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        contracts = yield (0, utils_2.deployTaiyiWorld)(timestamp, deployer, taiyiDAO, false);
        sifusToken = typechain_1.SifusToken__factory.connect(contracts.SifusToken.instance.address, operator1);
        worldConstants = typechain_1.WorldConstants__factory.connect(contracts.WorldConstants.instance.address, operator1);
        worldContractRoute = typechain_1.WorldContractRoute__factory.connect(contracts.WorldContractRoute.instance.address, operator1);
        actors = typechain_1.Actors__factory.connect(contracts.Actors.instance.address, operator1);
        assetDaoli = typechain_1.WorldFungible__factory.connect(contracts.AssetDaoli.instance.address, operator1);
        names = typechain_1.ActorNames__factory.connect(contracts.ActorNames.instance.address, operator1);
        worldZones = typechain_1.WorldZones__factory.connect(contracts.WorldZones.instance.address, operator1);
        worldYemings = typechain_1.WorldYemings__factory.connect(contracts.WorldYemings.instance.address, operator1);
        actorAttributes = typechain_1.ActorAttributes__factory.connect(contracts.ActorAttributes.instance.address, operator1);
        actorSIDs = typechain_1.ActorSocialIdentity__factory.connect(contracts.ActorSocialIdentity.instance.address, operator1);
        worldRandom = typechain_1.WorldRandom__factory.connect(contracts.WorldRandom.instance.address, operator1);
        actorLocations = typechain_1.ActorLocations__factory.connect(contracts.ActorLocations.instance.address, operator1);
        trigrams = typechain_1.Trigrams__factory.connect(contracts.Trigrams.instance.address, operator1);
        //deploy all basic modules pre shejitu
        let routeByPanGu = typechain_1.WorldContractRoute__factory.connect(worldContractRoute.address, taiyiDAO);
        worldEvents = yield (0, utils_2.deployWorldEvents)(OneAgeVSecond, FAKE_MODULE_EVENTS, worldContractRoute, deployer); //moduleId for test
        yield routeByPanGu.registerModule(FAKE_MODULE_EVENTS, worldEvents.address);
        actorTalents = yield (0, utils_2.deployActorTalents)(FAKE_MODULE_TALENTS, routeByPanGu, deployer); //moduleId for test
        yield routeByPanGu.registerModule(FAKE_MODULE_TALENTS, actorTalents.address);
        let shejiTuPkg = yield (0, utils_2.deployShejiTu)("测试", "所在时间线：测试", FAKE_MODULE_TIMELINE, actors, actorLocations, worldZones, actorAttributes, worldEvents, actorTalents, trigrams, worldRandom, deployer);
        shejiTu = typechain_1.ShejiTu__factory.connect(shejiTuPkg[0].address, deployer);
        shejiTuImpl = typechain_1.ShejiTu__factory.connect(shejiTuPkg[2].address, deployer);
        yield routeByPanGu.registerModule(FAKE_MODULE_TIMELINE, shejiTu.address);
        //set timeline YeMing
        let shejiTuOperator = yield actors.nextActor();
        yield actors.connect(deployer).mintActor(0);
        yield actors.connect(deployer).approve(shejiTu.address, shejiTuOperator);
        yield shejiTu.connect(deployer).initOperator(shejiTuOperator);
        yield worldYemings.connect(taiyiDAO).setYeMing(shejiTuOperator, shejiTu.address);
        //set PanGu as YeMing for test
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //bind timeline to a zone
        let zoneId = yield worldZones.nextZone();
        yield worldZones.connect(taiyiDAO).claim(actorPanGu, "测试区域", shejiTu.address, actorPanGu);
        yield shejiTu.connect(deployer).setStartZone(zoneId);
        testActor = yield newActor(operator1);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
    }));
    it('基础属性集', () => __awaiter(void 0, void 0, void 0, function* () {
        let HLH = yield worldConstants.ATTR_HLH();
        //should not point
        yield expect(actorAttributes.connect(operator1).pointActor(testActor, testActor)).to.be.revertedWith('only YeMing');
        expect((yield actorAttributes.connect(taiyiDAO).pointActor(actorPanGu, testActor)).wait()).eventually.fulfilled;
        let _hlh = yield actorAttributes.attributesScores(HLH, testActor);
        expect(_hlh).to.be.equal(100);
    }));
});
