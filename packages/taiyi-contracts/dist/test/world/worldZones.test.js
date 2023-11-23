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
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const ethereum_waffle_1 = require("ethereum-waffle");
const typechain_1 = require("../../typechain");
const utils_1 = require("../utils");
const utils_2 = require("../../utils");
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
describe('世界区域测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let sifusToken;
    let worldConstants;
    let worldContractRoute;
    let actors;
    let assetDaoli;
    let worldZones;
    let worldYemings;
    let fakeTimelineAddress;
    let actor;
    let actorPanGu;
    let newZone;
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
        //deploy all basic modules
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_RANDOM(), (yield (0, utils_2.deployWorldRandom)(deployer)).address);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
        worldZones = yield (0, utils_2.deployWorldZones)(worldContractRoute, deployer);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_ZONES(), worldZones.address);
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //second actor for test
        actor = yield newActor(operator1);
        expect(actor).to.eq(2);
        fakeTimelineAddress = operator1.address;
    }));
    it('合约符号（Symbol）', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield worldZones.symbol()).to.eq('TYZONE');
    }));
    it('合约名称', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield worldZones.name()).to.eq('Taiyi Zone');
    }));
    it(`非噎明无权铸造新区域`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(worldZones.connect(operator1).claim(actor, "小灰域", fakeTimelineAddress, actor)).to.be.revertedWith("only YeMing");
    }));
    it(`噎明铸造新区域参数错误`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(worldZones.connect(taiyiDAO).claim(actorPanGu, "小  灰域", fakeTimelineAddress, actor)).to.be.revertedWith("invalid name");
    }));
    it(`噎明铸造新区域给角色`, () => __awaiter(void 0, void 0, void 0, function* () {
        newZone = yield worldZones.nextZone();
        expect((yield worldZones.connect(taiyiDAO).claim(actorPanGu, "小灰域", fakeTimelineAddress, actor)).wait()).eventually.fulfilled;
        expect(yield worldZones.ownerOf(newZone)).to.eq((yield actors.getActor(actor)).account);
        expect(yield worldZones.names(newZone)).to.eq("小灰域");
    }));
    it(`区域改名-无所有者授权`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(worldZones.connect(taiyiDAO).updateZone(actor, newZone, "大灰域")).to.be.revertedWith("not approved or owner of actor");
    }));
    it(`区域改名-区域错误`, () => __awaiter(void 0, void 0, void 0, function* () {
        let anotherZone = yield worldZones.nextZone();
        yield worldZones.connect(taiyiDAO).claim(actorPanGu, "无尘星", fakeTimelineAddress, actorPanGu);
        yield expect(worldZones.connect(operator1).updateZone(actor, anotherZone, "大灰域")).to.be.revertedWith("not approved or the owner of zone");
    }));
    it(`区域改名`, () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield worldZones.connect(operator1).updateZone(actor, newZone, "大灰域")).wait()).eventually.fulfilled;
        expect(yield worldZones.names(newZone)).to.eq("大灰域");
    }));
    it("非噎明无权从角色提取区域", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(worldZones.connect(operator1).withdraw(actor, newZone)).to.be.revertedWith('only YeMing');
    }));
    it("噎明从角色提取区域（取消托管）-区域所有者未授权角色", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(worldZones.connect(taiyiDAO).withdraw(yield worldConstants.ACTOR_PANGU(), newZone)).to.be.revertedWith('not approved or the owner of actor.');
    }));
    it("噎明从角色提取区域（取消托管）-区域所有者授权角色", () => __awaiter(void 0, void 0, void 0, function* () {
        yield actors.connect(operator1).approve(taiyiDAO.address, actor);
        expect((yield worldZones.connect(taiyiDAO).withdraw(yield worldConstants.ACTOR_PANGU(), newZone)).wait()).eventually.fulfilled;
        expect(yield worldZones.ownerOf(newZone)).to.eq(operator1.address);
    }));
    it("托管区域到角色", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield worldZones.connect(operator1).transferFrom(operator1.address, (yield actors.getActor(actor)).account, newZone)).wait()).eventually.fulfilled;
        expect(yield worldZones.ownerOf(newZone)).to.eq((yield actors.getActor(actor)).account);
    }));
});
