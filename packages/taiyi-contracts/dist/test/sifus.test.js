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
//yarn test ./test/sifus.test.ts --network hard
const chai_1 = __importDefault(require("chai"));
require("@nomiclabs/hardhat-ethers");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const ethereum_waffle_1 = require("ethereum-waffle");
const typechain_1 = require("../typechain");
const utils_1 = require("./utils");
const utils_2 = require("../utils");
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
describe('太乙师傅令牌测试', () => {
    let sifusToken;
    let deployer;
    let taiyiDAO;
    let snapshotId;
    let worldConstants;
    let worldContractRoute;
    let actors;
    let worldYemings;
    let assetDaoli;
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
        [deployer, taiyiDAO] = yield hardhat_1.ethers.getSigners();
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
        //Deploy SifusToken and its descriptor
        sifusToken = yield (0, utils_1.deploySifusToken)(worldContractRoute.address, deployer, taiyiDAO.address);
        const descriptor = yield sifusToken.descriptor();
        yield (0, utils_1.populateDescriptor)(typechain_1.SifusDescriptor__factory.connect(descriptor, deployer));
        //register world modules
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
    }));
    it('噎明铸造师傅令牌同时自动奖励部分令牌给太乙岛', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        let actorByDeployer = yield newActor(deployer);
        yield worldYemings.connect(taiyiDAO).setYeMing(actorByDeployer, deployer.address);
        const receipt = yield (yield sifusToken.connect(deployer).mint(actorByDeployer)).wait();
        const [, , , taisifusSifuCreated, , , , ownersSifuCreated] = receipt.events || [];
        expect(yield sifusToken.ownerOf(0)).to.eq(taiyiDAO.address);
        expect(taisifusSifuCreated === null || taisifusSifuCreated === void 0 ? void 0 : taisifusSifuCreated.event).to.eq('SifuCreated');
        expect((_a = taisifusSifuCreated === null || taisifusSifuCreated === void 0 ? void 0 : taisifusSifuCreated.args) === null || _a === void 0 ? void 0 : _a.sifu).to.eq(0);
        expect((_b = taisifusSifuCreated === null || taisifusSifuCreated === void 0 ? void 0 : taisifusSifuCreated.args) === null || _b === void 0 ? void 0 : _b.seed.length).to.equal(5);
        expect(yield sifusToken.ownerOf(1)).to.eq(deployer.address);
        expect(ownersSifuCreated === null || ownersSifuCreated === void 0 ? void 0 : ownersSifuCreated.event).to.eq('SifuCreated');
        expect((_c = ownersSifuCreated === null || ownersSifuCreated === void 0 ? void 0 : ownersSifuCreated.args) === null || _c === void 0 ? void 0 : _c.sifu).to.eq(1);
        expect((_d = ownersSifuCreated === null || ownersSifuCreated === void 0 ? void 0 : ownersSifuCreated.args) === null || _d === void 0 ? void 0 : _d.seed.length).to.equal(5);
        (_e = taisifusSifuCreated === null || taisifusSifuCreated === void 0 ? void 0 : taisifusSifuCreated.args) === null || _e === void 0 ? void 0 : _e.seed.forEach((item) => {
            const value = typeof item !== 'number' ? item === null || item === void 0 ? void 0 : item.toNumber() : item;
            expect(value).to.be.a('number');
        });
        (_f = ownersSifuCreated === null || ownersSifuCreated === void 0 ? void 0 : ownersSifuCreated.args) === null || _f === void 0 ? void 0 : _f.seed.forEach((item) => {
            const value = typeof item !== 'number' ? item === null || item === void 0 ? void 0 : item.toNumber() : item;
            expect(value).to.be.a('number');
        });
    }));
    it('合约符号（Symbol）', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield sifusToken.symbol()).to.eq('SIFU');
    }));
    it('合约名称', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield sifusToken.name()).to.eq('Taiyi Sifus');
    }));
    it('噎明铸造师傅令牌', () => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h, _j, _k;
        yield (yield sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();
        const receipt = yield (yield sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();
        const sifuCreated = (_g = receipt.events) === null || _g === void 0 ? void 0 : _g[3];
        expect(yield sifusToken.ownerOf(2)).to.eq(taiyiDAO.address);
        expect(sifuCreated === null || sifuCreated === void 0 ? void 0 : sifuCreated.event).to.eq('SifuCreated');
        expect((_h = sifuCreated === null || sifuCreated === void 0 ? void 0 : sifuCreated.args) === null || _h === void 0 ? void 0 : _h.sifu).to.eq(2);
        expect((_j = sifuCreated === null || sifuCreated === void 0 ? void 0 : sifuCreated.args) === null || _j === void 0 ? void 0 : _j.seed.length).to.equal(5);
        (_k = sifuCreated === null || sifuCreated === void 0 ? void 0 : sifuCreated.args) === null || _k === void 0 ? void 0 : _k.seed.forEach((item) => {
            const value = typeof item !== 'number' ? item === null || item === void 0 ? void 0 : item.toNumber() : item;
            expect(value).to.be.a('number');
        });
    }));
    it('铸造师傅令牌时产生两个Transfer事件日志', () => __awaiter(void 0, void 0, void 0, function* () {
        const [, , creator, minter] = yield hardhat_1.ethers.getSigners();
        yield (yield sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();
        yield (yield sifusToken.transferOwnership(creator.address)).wait();
        let actorByMinter = yield newActor(minter);
        yield worldYemings.connect(taiyiDAO).setYeMing(actorByMinter, minter.address);
        const tx = sifusToken.connect(minter).mint(actorByMinter);
        yield expect(tx)
            .to.emit(sifusToken, 'Transfer')
            .withArgs(ethers_1.constants.AddressZero, creator.address, 2);
        yield expect(tx).to.emit(sifusToken, 'Transfer').withArgs(creator.address, minter.address, 2);
    }));
    it('噎明可以销毁一个师傅令牌', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (yield sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();
        const tx = sifusToken.connect(taiyiDAO).burn(actorPanGu, 0);
        yield expect(tx).to.emit(sifusToken, 'SifuBurned').withArgs(0);
    }));
    it('非噎明无权铸造', () => __awaiter(void 0, void 0, void 0, function* () {
        let actorByDao = yield newActor(taiyiDAO);
        const account0AsSifuErc721Account = sifusToken.connect(taiyiDAO);
        yield expect(account0AsSifuErc721Account.mint(actorByDao)).to.be.reverted;
    }));
    it('师傅令牌tokenURI', () => __awaiter(void 0, void 0, void 0, function* () {
        var _l, _m;
        yield (yield sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();
        const receipt = yield (yield sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));
        const sifuCreated = (_l = receipt.events) === null || _l === void 0 ? void 0 : _l[3];
        expect((_m = sifuCreated === null || sifuCreated === void 0 ? void 0 : sifuCreated.args) === null || _m === void 0 ? void 0 : _m.sifu).to.eq(2);
        let uri = yield sifusToken.tokenURI(2);
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
        let uriObj = JSON.parse(uriDecode);
        expect(uriObj.name).to.eq("Taiyi Sifu 2");
        expect(uriObj.description).to.eq("Taiyi Sifu 2 is a member of the Taiyi DAO.");
        //console.log(JSON.stringify(uriObj, null, 2));
    }));
    it('合约contractURI测试', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield sifusToken.contractURI()).to.eq('ipfs://QmUXSbKuptaT3kt6wrN16zE7bdBBCFzVcUttZDp4osjhtU');
    }));
    it('合约所有人设置contractURI', () => __awaiter(void 0, void 0, void 0, function* () {
        yield sifusToken.setContractURIHash('ABC123');
        expect(yield sifusToken.contractURI()).to.eq('ipfs://ABC123');
    }));
    it('非合约所有人无权设置contractURI', () => __awaiter(void 0, void 0, void 0, function* () {
        const [, nonOwner] = yield hardhat_1.ethers.getSigners();
        yield expect(sifusToken.connect(nonOwner).setContractURIHash('BAD')).to.be.revertedWith('Ownable: caller is not the owner');
    }));
});
