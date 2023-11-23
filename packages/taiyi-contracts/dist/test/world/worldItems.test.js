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
describe('世界道具测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let sifusToken;
    let worldConstants;
    let worldContractRoute;
    let actors;
    let assetDaoli;
    let worldItems;
    let worldYemings;
    let actor;
    let actorPanGu;
    let newItem;
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
        worldItems = yield (0, utils_2.deployWorldItems)(worldContractRoute, deployer);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_ITEMS(), worldItems.address);
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //second actor for test
        actor = yield newActor(operator1);
        expect(actor).to.eq(2);
    }));
    it('合约符号（Symbol）', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield worldItems.symbol()).to.eq('TYITEM');
    }));
    it('合约名称', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield worldItems.name()).to.eq('Taiyi Items');
    }));
    describe('道具设计测试', () => {
        it(`非盘古无权设计新道具类型`, () => __awaiter(void 0, void 0, void 0, function* () {
            //should not
            yield expect(worldItems.setTypeName(20, "《木工房》")).to.be.revertedWith("only PanGu");
            ;
        }));
        it(`盘古设计新道具类型`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield worldItems.connect(taiyiDAO).setTypeName(20, "《木工房》")).wait()).eventually.fulfilled;
            expect(yield worldItems.typeNames(20)).to.eq("《木工房》");
        }));
    });
    describe('道具常规测试', () => {
        it(`非噎明无权铸造新道具`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(worldItems.connect(operator1).mint(actor, 20, 100, 7, actor)).to.be.revertedWith("only YeMing");
        }));
        it(`噎明铸造新道具参数错误`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(worldItems.connect(taiyiDAO).mint(1, 20, 100, 18, actor)).to.be.revertedWith("invalid shape");
        }));
        it(`噎明铸造新道具给角色`, () => __awaiter(void 0, void 0, void 0, function* () {
            newItem = yield worldItems.nextItemId();
            expect((yield worldItems.connect(taiyiDAO).mint(1, 20, 100, 7, actor)).wait()).eventually.fulfilled;
            expect(yield worldItems.ownerOf(newItem)).to.eq((yield actors.getActor(actor)).account);
            expect(yield worldItems.itemTypes(newItem)).to.eq(20);
            expect(yield worldItems.itemWears(newItem)).to.eq(100);
            let shape = yield worldItems.itemShapes(newItem);
            expect(shape).to.eq(7);
            expect(yield worldItems.shapeNames(shape)).to.eq("绝·二品");
        }));
        it(`非噎明无权修改道具属性`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(worldItems.connect(operator1).modify(actor, newItem, 10)).to.be.revertedWith("only YeMing");
        }));
        it(`噎明修改道具耐久属性`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield worldItems.connect(taiyiDAO).modify(1, newItem, 10)).wait()).eventually.fulfilled;
            expect(yield worldItems.itemWears(newItem)).to.eq(10);
        }));
        it("非噎明无权从角色提取道具", () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(worldItems.connect(operator1).withdraw(actor, newItem)).to.be.revertedWith('only YeMing');
        }));
        it("噎明从角色提取道具（取消托管）-道具所有者未授权角色", () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(worldItems.connect(taiyiDAO).withdraw(yield worldConstants.ACTOR_PANGU(), newItem)).to.be.revertedWith('not approved or the owner of actor.');
        }));
        it("噎明从角色提取道具（取消托管）-道具所有者授权角色", () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.connect(operator1).approve(taiyiDAO.address, actor);
            expect((yield worldItems.connect(taiyiDAO).withdraw(yield worldConstants.ACTOR_PANGU(), newItem)).wait()).eventually.fulfilled;
            expect(yield worldItems.ownerOf(newItem)).to.eq(operator1.address);
        }));
        it("托管道具到角色", () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield worldItems.connect(operator1).transferFrom(operator1.address, (yield actors.getActor(actor)).account, newItem)).wait()).eventually.fulfilled;
            expect(yield worldItems.ownerOf(newItem)).to.eq((yield actors.getActor(actor)).account);
        }));
        it(`非噎明无权销毁托管道具`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(worldItems.connect(operator1).burn(actor, newItem)).to.be.revertedWith("only YeMing");
        }));
        it(`噎明不能销毁未托管道具`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield worldItems.connect(taiyiDAO).withdraw(yield worldConstants.ACTOR_PANGU(), newItem)).wait()).eventually.fulfilled;
            yield expect(worldItems.connect(taiyiDAO).burn(yield worldConstants.ACTOR_PANGU(), newItem)).to.be.revertedWith("not approved or owner");
        }));
        it(`噎明销毁道具-道具托管`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield worldItems.connect(operator1).transferFrom(operator1.address, (yield actors.getActor(actor)).account, newItem);
            expect((yield worldItems.connect(taiyiDAO).burn(yield worldConstants.ACTOR_PANGU(), newItem)).wait()).eventually.fulfilled;
            yield expect(worldItems.ownerOf(newItem)).to.be.revertedWith("ERC721: owner query for nonexistent token");
        }));
    });
});
