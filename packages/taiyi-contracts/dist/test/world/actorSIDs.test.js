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
const OneAgeVSecond = 1;
describe('角色社会身份测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let snapshotId;
    let worldConstants;
    let worldContractRoute;
    let actors;
    let worldYemings;
    let assetDaoli;
    let actorSIDs;
    let actor;
    let newSID;
    let newActorByOp1 = () => __awaiter(void 0, void 0, void 0, function* () {
        //deal coin
        yield assetDaoli.connect(taiyiDAO).claim(1, 2, BigInt(1000e18));
        yield assetDaoli.connect(operator1).withdraw(2, 2, BigInt(1000e18));
        yield assetDaoli.connect(operator1).approve(actors.address, BigInt(1000e18));
        let _actor = yield actors.nextActor();
        yield actors.connect(operator1).mintActor(BigInt(100e18));
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
        expect(yield actors.nextActor()).to.eq(1);
        yield actors.connect(taiyiDAO).mintActor(0);
        //deploy all basic modules
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_RANDOM(), (yield (0, utils_2.deployWorldRandom)(deployer)).address);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
        actorSIDs = yield (0, utils_2.deployActorSocialIdentity)(worldContractRoute, deployer);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_SIDS(), actorSIDs.address);
        //second actor test for YeMing, should be mint for free
        expect(yield actors.nextActor()).to.eq(2);
        yield actors.connect(operator1).mintActor(0);
        yield worldYemings.connect(taiyiDAO).setYeMing(2, operator1.address); //fake address just for test
    }));
    it('合约符号（Symbol）', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield actorSIDs.symbol()).to.eq('TYSID');
    }));
    it('合约名称', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield actorSIDs.name()).to.eq('Taiyi Social Identity');
    }));
    describe('社会身份设计测试', () => {
        it(`非盘古无权设计新身份`, () => __awaiter(void 0, void 0, void 0, function* () {
            //should not
            yield expect(actorSIDs.setSIDName(10010, "乞丐")).to.be.revertedWith("only PanGu");
            ;
        }));
        it(`盘古设计新身份`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield actorSIDs.connect(taiyiDAO).setSIDName(10010, "乞丐")).wait()).eventually.fulfilled;
            expect(yield actorSIDs.names(10010)).to.eq("乞丐");
        }));
    });
    describe('社会身份颁发测试', () => {
        it(`非噎明无权赋予角色新身份`, () => __awaiter(void 0, void 0, void 0, function* () {
            actor = yield newActorByOp1();
            yield expect(actorSIDs.connect(taiyiDAO).claim(yield worldConstants.ACTOR_PANGU(), 10010, actor)).to.be.revertedWith("only YeMing");
        }));
        it(`噎明赋予角色新身份`, () => __awaiter(void 0, void 0, void 0, function* () {
            newSID = yield actorSIDs.nextSID();
            //claim to PanGu just for test, PanGu is not act as YeMing
            expect((yield actorSIDs.connect(operator1).claim(2, 10010, yield worldConstants.ACTOR_PANGU())).wait()).eventually.fulfilled;
            expect(yield actorSIDs.ownerOf(newSID)).to.eq((yield actors.getActor(yield worldConstants.ACTOR_PANGU())).account);
        }));
        it(`非噎明无权销毁身份`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(actorSIDs.connect(taiyiDAO).burn(yield worldConstants.ACTOR_PANGU(), newSID)).to.be.revertedWith("only YeMing");
        }));
        it(`噎明销毁身份-角色所有者未授权`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(actorSIDs.connect(operator1).burn(2, newSID)).to.be.revertedWith("not approved or the owner of actor.");
        }));
        it(`噎明销毁身份-角色所有者已经授权`, () => __awaiter(void 0, void 0, void 0, function* () {
            //approve PanGu to op1
            yield actors.connect(taiyiDAO).approve(operator1.address, yield worldConstants.ACTOR_PANGU());
            expect((yield actorSIDs.connect(operator1).burn(2, newSID)).wait()).eventually.fulfilled;
            yield expect(actorSIDs.ownerOf(newSID)).to.be.revertedWith("ERC721: owner query for nonexistent token");
        }));
    });
});
