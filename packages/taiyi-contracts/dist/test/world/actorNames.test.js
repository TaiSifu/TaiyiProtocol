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
const OneAgeVSecond = 1;
describe('角色姓名测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let snapshotId;
    let worldConstants;
    let worldContractRoute;
    let actors;
    let worldYemings;
    let actorNames;
    let assetDaoli;
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
        actorNames = yield (0, utils_2.deployActorNames)(worldContractRoute, deployer);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_NAMES(), actorNames.address);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
    }));
    it('姓名合约符号（Symbol）', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield actorNames.symbol()).to.eq('TYNAMES');
    }));
    it('姓名合约名称', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield actorNames.name()).to.eq('Taiyi Actor Names');
    }));
    it("申明姓名同时赋予角色", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let nameId = yield actorNames.nextName();
        expect(nameId).to.eq(1);
        let actorPanGu = yield worldConstants.ACTOR_PANGU();
        let firstName = `古`;
        let lastName = `盘`;
        const receipt = yield (yield actorNames.connect(taiyiDAO).claim(firstName, lastName, actorPanGu)).wait();
        //console.log(JSON.stringify(receipt.events, null, 2));
        const [, nameClaimed, , , nameAssigned] = receipt.events || [];
        expect(nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.event).to.eq('NameClaimed');
        expect((_a = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _a === void 0 ? void 0 : _a.owner).to.eq(taiyiDAO.address);
        expect((_b = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _b === void 0 ? void 0 : _b.actor).to.eq(actorPanGu);
        expect((_c = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _c === void 0 ? void 0 : _c.nameId).to.eq(nameId);
        expect((_d = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _d === void 0 ? void 0 : _d.name).to.eq('盘古');
        expect((_e = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _e === void 0 ? void 0 : _e.firstName).to.eq('古');
        expect((_f = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _f === void 0 ? void 0 : _f.lastName).to.eq('盘');
        expect((_g = nameAssigned === null || nameAssigned === void 0 ? void 0 : nameAssigned.args) === null || _g === void 0 ? void 0 : _g.nameId).to.eq(nameId);
        expect((_h = nameAssigned === null || nameAssigned === void 0 ? void 0 : nameAssigned.args) === null || _h === void 0 ? void 0 : _h.previousActor).to.eq(0);
        expect((_j = nameAssigned === null || nameAssigned === void 0 ? void 0 : nameAssigned.args) === null || _j === void 0 ? void 0 : _j.newActor).to.eq(actorPanGu);
        expect(yield actorNames.ownerOf(nameId)).to.eq((yield actors.getActor(actorPanGu)).account);
    }));
    it("仅仅申明姓名（不赋予任何角色）", () => __awaiter(void 0, void 0, void 0, function* () {
        var _k, _l, _m, _o, _p, _q;
        const namesByDAO = typechain_1.ActorNames__factory.connect(actorNames.address, taiyiDAO);
        let nameId = yield actorNames.nextName();
        expect(nameId).to.eq(1);
        let firstName = `小拼`;
        let lastName = `李`;
        const receipt = yield (yield namesByDAO.claim(firstName, lastName, 0)).wait();
        //console.log(JSON.stringify(receipt.events, null, 2));
        const [, nameClaimed] = receipt.events || [];
        expect(nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.event).to.eq('NameClaimed');
        expect((_k = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _k === void 0 ? void 0 : _k.owner).to.eq(taiyiDAO.address);
        expect((_l = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _l === void 0 ? void 0 : _l.actor).to.eq(0);
        expect((_m = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _m === void 0 ? void 0 : _m.nameId).to.eq(nameId);
        expect((_o = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _o === void 0 ? void 0 : _o.name).to.eq('李小拼');
        expect((_p = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _p === void 0 ? void 0 : _p.firstName).to.eq('小拼');
        expect((_q = nameClaimed === null || nameClaimed === void 0 ? void 0 : nameClaimed.args) === null || _q === void 0 ? void 0 : _q.lastName).to.eq('李');
        expect(yield actorNames.ownerOf(nameId)).to.eq(taiyiDAO.address);
    }));
    it("先申明姓名，再赋予角色", () => __awaiter(void 0, void 0, void 0, function* () {
        var _r, _s, _t;
        const namesByDAO = typechain_1.ActorNames__factory.connect(actorNames.address, taiyiDAO);
        let actorPanGu = yield worldConstants.ACTOR_PANGU();
        let nameId = yield actorNames.nextName();
        let firstName = `小拼`;
        let lastName = `李`;
        yield namesByDAO.claim(firstName, lastName, 0);
        const receipt = yield (yield namesByDAO.assignName(nameId, actorPanGu)).wait();
        //console.log(JSON.stringify(receipt.events, null, 2));
        const [, , nameAssigned] = receipt.events || [];
        expect((_r = nameAssigned === null || nameAssigned === void 0 ? void 0 : nameAssigned.args) === null || _r === void 0 ? void 0 : _r.nameId).to.eq(nameId);
        expect((_s = nameAssigned === null || nameAssigned === void 0 ? void 0 : nameAssigned.args) === null || _s === void 0 ? void 0 : _s.previousActor).to.eq(0);
        expect((_t = nameAssigned === null || nameAssigned === void 0 ? void 0 : nameAssigned.args) === null || _t === void 0 ? void 0 : _t.newActor).to.eq(actorPanGu);
        expect(yield actorNames.ownerOf(nameId)).to.eq((yield actors.getActor(actorPanGu)).account);
    }));
    it("不能申明已经存在的姓名", () => __awaiter(void 0, void 0, void 0, function* () {
        const namesByDAO = typechain_1.ActorNames__factory.connect(actorNames.address, taiyiDAO);
        let nameId = yield actorNames.nextName();
        let firstName = `小拼`;
        let lastName = `李`;
        yield namesByDAO.claim(firstName, lastName, 0);
        yield expect(namesByDAO.claim(firstName, lastName, 0)).to.be.revertedWith('name taken');
    }));
    it("如果一个角色已有姓名，则不能赋予角色新姓名", () => __awaiter(void 0, void 0, void 0, function* () {
        const namesByDAO = typechain_1.ActorNames__factory.connect(actorNames.address, taiyiDAO);
        let actorPanGu = yield worldConstants.ACTOR_PANGU();
        let firstName = `古`;
        let lastName = `盘`;
        yield namesByDAO.claim(firstName, lastName, actorPanGu);
        firstName = `小拼`;
        lastName = `李`;
        let nameId = yield actorNames.nextName();
        yield namesByDAO.claim(firstName, lastName, 0);
        yield expect(namesByDAO.assignName(nameId, actorPanGu)).to.be.revertedWith('actor already named');
    }));
    it("提取姓名NFT", () => __awaiter(void 0, void 0, void 0, function* () {
        //second actor test for YeMing, should be mint for free
        expect(yield actors.nextActor()).to.eq(2);
        yield actors.connect(operator1).mintActor(0);
        yield worldYemings.connect(taiyiDAO).setYeMing(2, operator1.address); //fake address just for test
        //deal coin
        yield assetDaoli.connect(taiyiDAO).claim(1, 2, BigInt(1000e18));
        yield assetDaoli.connect(operator1).withdraw(2, 2, BigInt(1000e18));
        expect(yield assetDaoli.balanceOf(operator1.address)).to.eq(BigInt(1000e18));
        yield assetDaoli.connect(operator1).approve(actors.address, BigInt(1000e18));
        let actor = yield actors.nextActor();
        yield actors.connect(operator1).mintActor(BigInt(100e18));
        let firstName = `小拼`;
        let lastName = `李`;
        let nameId = yield actorNames.nextName();
        yield actorNames.connect(operator1).claim(firstName, lastName, actor);
        //can not withdrawn by anyone except YeMing
        yield expect(actorNames.connect(taiyiDAO).withdraw(yield worldConstants.ACTOR_PANGU(), actor)).to.be.revertedWith('only YeMing');
        //should be withdrawn by YeMing
        expect((yield actorNames.connect(operator1).withdraw(2, actor)).wait()).eventually.fulfilled;
        expect(yield actorNames.ownerOf(nameId)).to.eq(operator1.address);
    }));
});
