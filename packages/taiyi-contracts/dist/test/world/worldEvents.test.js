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
//yarn test ./test/worldEvents.test.ts --network hard
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
describe('世界事件集测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let snapshotId;
    let sifusToken;
    let worldConstants;
    let worldContractRoute;
    let actors;
    let worldYemings;
    let assetDaoli;
    let worldEvents;
    let shejiTu;
    let actorAttributes;
    let worldRandom;
    let worldZones;
    let actorLocations;
    let actorTalents;
    let trigrams;
    let actorPanGu;
    let eventTest;
    const FAKE_MODULE_EVENTS = 101;
    const FAKE_MODULE_TIMELINE = 102;
    const FAKE_MODULE_TALENTS = 103;
    let newActor = (toWho) => __awaiter(void 0, void 0, void 0, function* () {
        //deal coin
        yield assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1000e18));
        yield assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, BigInt(1000e18));
        yield assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = yield actors.nextActor();
        yield actors.connect(taiyiDAO).mintActor(BigInt(100e18));
        yield actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
        return _actor;
    });
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        [deployer, taiyiDAO, operator1, operator2] = yield hardhat_1.ethers.getSigners();
        //Deploy Constants
        worldConstants = yield (0, utils_2.deployWorldConstants)(deployer);
        //Deploy WorldContractRoute
        worldContractRoute = yield (0, utils_2.deployWorldContractRoute)(deployer);
        //Deploy WorldYemings
        worldYemings = yield (0, utils_2.deployWorldYemings)(taiyiDAO.address, deployer);
        //Deploy Taiyi Daoli ERC20
        assetDaoli = yield (0, utils_2.deployAssetDaoli)(worldConstants, worldContractRoute, deployer);
        //Deploy Actors
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        actors = yield (0, utils_2.deployActors)(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        yield worldContractRoute.registerActors(actors.address);
        //PanGu should be mint at first, or you can not register any module
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        expect(actorPanGu).to.eq(1);
        expect(yield actors.nextActor()).to.eq(actorPanGu);
        yield actors.connect(taiyiDAO).mintActor(0);
        //Deploy SifusToken
        sifusToken = yield (0, utils_1.deploySifusToken)(worldContractRoute.address, deployer, taiyiDAO.address, deployer.address);
        const descriptor = yield sifusToken.descriptor();
        yield (0, utils_1.populateDescriptor)(typechain_1.SifusDescriptor__factory.connect(descriptor, deployer));
        //connect route to operator
        let routeByPanGu = typechain_1.WorldContractRoute__factory.connect(worldContractRoute.address, taiyiDAO);
        //deploy all basic modules
        worldRandom = yield (0, utils_2.deployWorldRandom)(deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address);
        worldYemings = yield (0, utils_2.deployWorldYemings)(taiyiDAO.address, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        actorAttributes = yield (0, utils_2.deployActorAttributes)(routeByPanGu, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address);
        worldEvents = yield (0, utils_2.deployWorldEvents)(OneAgeVSecond, FAKE_MODULE_EVENTS, worldContractRoute, deployer);
        yield routeByPanGu.registerModule(FAKE_MODULE_EVENTS, worldEvents.address);
        actorLocations = yield (0, utils_2.deployActorLocations)(routeByPanGu, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ACTOR_LOCATIONS(), actorLocations.address);
        worldZones = yield (0, utils_2.deployWorldZones)(worldContractRoute, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ZONES(), worldZones.address);
        actorTalents = yield (0, utils_2.deployActorTalents)(FAKE_MODULE_TALENTS, routeByPanGu, deployer);
        yield routeByPanGu.registerModule(FAKE_MODULE_TALENTS, actorTalents.address);
        trigrams = yield (0, utils_2.deployTrigrams)(routeByPanGu, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_TRIGRAMS(), trigrams.address);
        shejiTu = typechain_1.ShejiTu__factory.connect((yield (0, utils_2.deployShejiTu)("测试", "所在时间线：测试", FAKE_MODULE_TIMELINE, actors, actorLocations, worldZones, actorAttributes, worldEvents, actorTalents, trigrams, worldRandom, deployer))[0].address, deployer);
        yield routeByPanGu.registerModule(FAKE_MODULE_TIMELINE, shejiTu.address);
        let shejiTuOperator = yield actors.nextActor();
        yield actors.mintActor(0);
        yield actors.approve(shejiTu.address, shejiTuOperator);
        yield shejiTu.initOperator(shejiTuOperator);
        yield worldYemings.connect(taiyiDAO).setYeMing(yield shejiTu.operator(), shejiTu.address);
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
    }));
    it('部署测试事件', () => __awaiter(void 0, void 0, void 0, function* () {
        eventTest = yield (yield (new typechain_1.DefaultWorldEventProcessor__factory(deployer)).deploy(worldContractRoute.address, 0)).deployed();
    }));
    it('非盘古无权注册事件', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(worldEvents.connect(operator1).setEventProcessor(10001, eventTest.address)).to.be.revertedWith("only PanGu");
    }));
    it('盘古注册事件', () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield worldEvents.connect(taiyiDAO).setEventProcessor(10001, eventTest.address)).wait()).eventually.fulfilled;
        expect(yield worldEvents.eventProcessors(10001)).to.eq(eventTest.address);
    }));
    it('非Owner无权配置时间线', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(shejiTu.connect(taiyiDAO).addAgeEvent(0, 10001, 1)).to.be.revertedWith("Ownable: caller is not the owner");
    }));
    it('Owner配置时间线', () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield shejiTu.addAgeEvent(0, 10001, 1)).wait()).eventually.fulfilled;
    }));
});
