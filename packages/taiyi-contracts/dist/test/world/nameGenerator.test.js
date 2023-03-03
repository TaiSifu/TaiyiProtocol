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
const utils_1 = require("../utils");
const utils_2 = require("../../utils");
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
describe('姓名发生器测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let worldConstants;
    let worldContractRoute;
    let actors;
    let assetDaoli;
    let nameGen;
    let worldYemings;
    let actor;
    let actorPanGu;
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
        //deploy all basic modules
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_RANDOM(), (yield (0, utils_2.deployWorldRandom)(deployer)).address);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
        nameGen = yield (0, utils_2.deployNameGenerator)(worldContractRoute, deployer);
        yield worldContractRoute.connect(taiyiDAO).registerModule(225, nameGen.address);
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //second actor for test
        actor = yield newActor(operator1);
        expect(actor).to.eq(2);
    }));
    it('注册性别', () => __awaiter(void 0, void 0, void 0, function* () {
        yield nameGen.connect(taiyiDAO).registerGender(actorPanGu, ["男", "女"]);
    }));
    it('注册姓', () => __awaiter(void 0, void 0, void 0, function* () {
        yield nameGen.connect(taiyiDAO).registerFamily(actorPanGu, [
            "李",
            "王",
            "张",
            "刘",
            "陈",
            "杨",
            "赵",
            "黄",
            "周"
        ]);
    }));
    it('注册辈分', () => __awaiter(void 0, void 0, void 0, function* () {
        yield nameGen.connect(taiyiDAO).registerMiddle(actorPanGu, [
            "之",
            "亦",
            "其",
            "如",
            "而",
            "何",
            "乃",
            "且",
            "若",
            "和",
            "所"
        ]);
    }));
    it('注册错误性别的名', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(nameGen.connect(taiyiDAO).registerGiven(actorPanGu, "非", ["国", "民"])).to.be.revertedWith("gender not exist");
    }));
    it('注册男名', () => __awaiter(void 0, void 0, void 0, function* () {
        yield nameGen.connect(taiyiDAO).registerGiven(actorPanGu, "男", [
            "国",
            "民",
            "邦",
            "杰",
            "宝",
            "森",
            "炳",
            "文",
            "伯",
            "华",
            "龙",
            "伦",
            "阳",
            "博"
        ]);
    }));
    it('注册女名', () => __awaiter(void 0, void 0, void 0, function* () {
        yield nameGen.connect(taiyiDAO).registerGiven(actorPanGu, "女", [
            "兮",
            "芳",
            "星",
            "清",
            "夏",
            "月",
            "初",
            "书",
            "简",
            "雪",
            "益",
            "纯",
            "琛",
            "馨",
        ]);
    }));
    it('性别错误生成', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(nameGen.genName(20, 10, 0, "", "", "", 0)).to.be.rejectedWith("invalid gender");
    }));
    it('随机生成', () => __awaiter(void 0, void 0, void 0, function* () {
        let names = yield nameGen.genName(20, 0, 0, "", "", "", 0);
        for (var i = 0; i < 20; i++) {
            console.log(`${names[3 * i]}${names[3 * i + 1]}${names[3 * i + 2]}`);
        }
    }));
    it('“周”姓随机生成', () => __awaiter(void 0, void 0, void 0, function* () {
        let names = yield nameGen.genName(20, 0, 0, "周", "", "", 0);
        for (var i = 0; i < 20; i++) {
            console.log(`${names[3 * i]}${names[3 * i + 1]}${names[3 * i + 2]}`);
        }
    }));
    it('“和”字辈两字名随机生成', () => __awaiter(void 0, void 0, void 0, function* () {
        let names = yield nameGen.genName(20, 0, 2, "", "和", "", 0);
        for (var i = 0; i < 20; i++) {
            console.log(`${names[3 * i]}${names[3 * i + 1]}${names[3 * i + 2]}`);
        }
    }));
    it('“和”字辈随机生成', () => __awaiter(void 0, void 0, void 0, function* () {
        let names = yield nameGen.genName(20, 0, 0, "", "和", "", 0);
        for (var i = 0; i < 20; i++) {
            console.log(`${names[3 * i]}${names[3 * i + 1]}${names[3 * i + 2]}`);
        }
    }));
});
