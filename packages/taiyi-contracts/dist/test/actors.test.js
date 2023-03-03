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
//yarn test ./test/actors.test.ts --network hard
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const ethereum_waffle_1 = require("ethereum-waffle");
const utils_1 = require("./utils");
const utils_2 = require("../utils");
const web3_1 = __importDefault(require("web3"));
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
describe('太乙角色基础测试', () => {
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
    }));
    it('角色合约符号（Symbol）', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield actors.symbol()).to.eq('TYACTOR');
    }));
    it('角色合约名称', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield actors.name()).to.eq('Taiyi Actor Manifested');
    }));
    it('访问不存在的角色', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(actors.getActor(0)).to.be.revertedWith('invalid actor');
        yield expect(actors.getActor(1)).to.be.revertedWith('ERC721: owner query for nonexistent token');
    }));
    it('注册世界模块-盘古不存在的情况', () => __awaiter(void 0, void 0, void 0, function* () {
        //deploy module with out any actor exist
        let worldRandom = yield (0, utils_2.deployWorldRandom)(deployer);
        yield expect(worldContractRoute.registerModule(yield worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address))
            .to.be.revertedWith('ERC721: approved query for nonexistent token');
    }));
    it('第一个角色作为「盘古」', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        //first actor token id must be PanGu
        expect(yield worldConstants.ACTOR_PANGU()).to.eq(1);
        expect(yield actors.nextActor()).to.eq(1);
        //PanGu should be mint
        const holderAddress = hardhat_1.ethers.utils.getContractAddress({
            from: actors.address,
            nonce: 1,
        });
        const receipt = yield (yield actors.connect(taiyiDAO).mintActor(0)).wait();
        //console.log(JSON.stringify(receipt.events, null, 2));
        const [, actorMinted] = receipt.events || [];
        expect(yield actors.ownerOf(1)).to.eq(taiyiDAO.address);
        expect(actorMinted === null || actorMinted === void 0 ? void 0 : actorMinted.event).to.eq('ActorMinted');
        expect((_a = actorMinted === null || actorMinted === void 0 ? void 0 : actorMinted.args) === null || _a === void 0 ? void 0 : _a.owner).to.eq(taiyiDAO.address);
        expect((_b = actorMinted === null || actorMinted === void 0 ? void 0 : actorMinted.args) === null || _b === void 0 ? void 0 : _b.actorId).to.equal(1);
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));
        expect((_c = actorMinted === null || actorMinted === void 0 ? void 0 : actorMinted.args) === null || _c === void 0 ? void 0 : _c.time).to.equal(timestamp);
        const actor1 = yield actors.getActor(1);
        expect(actor1.actorId).to.eq(1);
        expect(actor1.owner).to.eq(taiyiDAO.address);
        expect(actor1.account).to.eq(holderAddress);
    }));
    it('无准入铸造新角色-免费角色', () => __awaiter(void 0, void 0, void 0, function* () {
        //2 should be mint for free
        expect(yield actors.nextActor()).to.eq(2);
        yield actors.mintActor(0);
        //3 should be mint for free
        expect(yield actors.nextActor()).to.eq(3);
        yield actors.connect(operator1).mintActor(0);
        //newone should not be mint for free
        expect(yield actors.nextActor()).to.eq(4);
        yield expect(actors.mintActor(0)).to.be.revertedWith("current actor price exceeded max");
        yield expect(actors.mintActor(BigInt(100.0e18))).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    }));
    it('非盘古操作员无权注册世界模块', () => __awaiter(void 0, void 0, void 0, function* () {
        let worldRandom = yield (0, utils_2.deployWorldRandom)(deployer);
        //deploy modules when operator is not PanGu
        yield expect(worldContractRoute.registerModule(yield worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address))
            .to.be.revertedWith('only PanGu');
    }));
    it('盘古注册世界模块', () => __awaiter(void 0, void 0, void 0, function* () {
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
    }));
    it('无准入铸造新角色-付费角色', () => __awaiter(void 0, void 0, void 0, function* () {
        //deal coin by PanGu
        expect((yield assetDaoli.connect(taiyiDAO).claim(yield worldConstants.ACTOR_PANGU(), 3, BigInt(1000e18))).wait()).eventually.fulfilled;
        //set actor #3 as YeMing
        yield worldYemings.connect(taiyiDAO).setYeMing(3, operator1.address); //fake address just for test
        expect(yield worldYemings.isYeMing(3)).to.eq(true);
        expect(yield assetDaoli.balanceOf(operator1.address)).to.eq(0);
        expect((yield assetDaoli.connect(operator1).withdraw(3, 3, BigInt(1000e18))).wait()).eventually.fulfilled;
        expect(yield assetDaoli.balanceOf(operator1.address)).to.eq(BigInt(1000e18));
        //not approve coin to spend by Actors
        expect(yield actors.nextActor()).to.eq(4);
        yield expect(actors.connect(operator1).mintActor(BigInt(100e18))).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
        //newone should be mint
        yield assetDaoli.connect(operator1).approve(actors.address, BigInt(1000e18));
        expect((yield actors.connect(operator1).mintActor(BigInt(100e18))).wait()).to.eventually.fulfilled;
        let actualPay = yield assetDaoli.balanceOf(taiyiDAO.address);
        expect(yield assetDaoli.balanceOf(operator1.address)).to.eq(ethers_1.BigNumber.from(BigInt(1000e18)).sub(actualPay));
        expect(yield actors.ownerOf(4)).to.eq(operator1.address);
    }));
    it('铸造新角色-道理不够情况', () => __awaiter(void 0, void 0, void 0, function* () {
        yield worldYemings.connect(taiyiDAO).setYeMing(2, deployer.address); //fake address just for test
        //deal coin
        yield assetDaoli.connect(taiyiDAO).claim(yield worldConstants.ACTOR_PANGU(), 2, BigInt(1e17));
        yield assetDaoli.withdraw(2, 2, BigInt(1e17));
        yield assetDaoli.approve(actors.address, BigInt(1000e18));
        expect(yield actors.nextActor()).to.eq(5);
        expect(yield actors.actorPrice()).to.gt(BigInt(1e17));
        yield expect(actors.mintActor(BigInt(100e18))).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    }));
    it('铸造新角色-最小花费上限情况', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield actors.nextActor()).to.eq(5);
        let price = yield actors.actorPrice();
        expect(price).to.gt(BigInt(9e17));
        yield expect(actors.connect(operator1).mintActor(price.sub(BigInt(9e17)))).to.be.revertedWith("current actor price exceeded max");
    }));
    it('铸造角色花费-标准值精度', () => __awaiter(void 0, void 0, void 0, function* () {
        let timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        let tstWad = yield actors.getTargetSaleTime(BigInt(1e18));
        let tstSecond = tstWad.mul(86400).div(BigInt(1e18));
        let dt = (yield actors.mintStart()).add(tstSecond).sub(timestamp);
        yield (0, utils_1.increaseTime)(dt.toNumber());
        let cost = yield actors.actorPrice();
        let targetPrice = yield actors.targetPrice();
        let err = targetPrice.sub(cost).mul(BigInt(1e18)).div(cost);
        expect(err).to.lt(BigInt(0.0001e18));
    }));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('角色铸造费用VRGDA测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let snapshotId;
    let worldConstants;
    let worldContractRoute;
    let actors;
    let assetDaoli;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        [deployer, taiyiDAO, operator1, operator2] = yield hardhat_1.ethers.getSigners();
        //Deploy Constants
        worldConstants = yield (0, utils_2.deployWorldConstants)(deployer);
        //Deploy WorldContractRoute
        worldContractRoute = yield (0, utils_2.deployWorldContractRoute)(deployer);
        //Deploy Taiyi Daoli ERC20
        assetDaoli = yield (0, utils_2.deployAssetDaoli)(worldConstants, worldContractRoute, deployer);
        //Deploy Actors
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        actors = yield (0, utils_2.deployActors)(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        yield worldContractRoute.registerActors(actors.address);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
    }));
    it('发行曲线', () => __awaiter(void 0, void 0, void 0, function* () {
        let maxMintable = yield actors.MAX_MINTABLE();
        let tstWad = yield actors.getTargetSaleTime(maxMintable.mul(BigInt(1e18)));
        let tstSecond = tstWad.mul(86400).div(BigInt(1e18));
        console.log(`角色可铸造${maxMintable}个，计划在${tstSecond.div(86400 * 365).toString()}年内发行完毕，约为${tstSecond.div(86400).toString()}天（共${tstSecond.toString()}秒）。`);
        tstWad = yield actors.getTargetSaleTime(BigInt(10e18));
        tstSecond = tstWad.mul(86400).div(BigInt(1e18));
        console.log(`- 头10个角色计划在${tstSecond.div(86400).toString()}天内发行完毕，约为${tstSecond.toString()}秒。`);
        tstWad = yield actors.getTargetSaleTime(BigInt(100e18));
        tstSecond = tstWad.mul(86400).div(BigInt(1e18));
        console.log(`- 头100个角色计划在${tstSecond.div(86400).toString()}天内发行完毕，约为${tstSecond.toString()}秒。`);
        tstWad = yield actors.getTargetSaleTime(BigInt(1000e18));
        tstSecond = tstWad.mul(86400).div(BigInt(1e18));
        console.log(`- 头1000个角色计划在${tstSecond.div(86400).toString()}天内发行完毕，约为${tstSecond.toString()}秒。`);
    }));
    it('价格稳定性', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`角色指导价为:${web3_1.default.utils.fromWei((yield actors.targetPrice()).toString())}个道理`);
        let dt = 10; //seconds
        let timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        yield (0, utils_1.increaseTime)((yield actors.mintStart()).add(dt).sub(timestamp).toNumber());
        console.log(`- 若${dt}秒还没有人买，则价格降为${web3_1.default.utils.fromWei((yield actors.actorPrice()).toString())}`);
        dt = 60; //seconds
        timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        yield (0, utils_1.increaseTime)((yield actors.mintStart()).add(dt).sub(timestamp).toNumber());
        console.log(`- 若${dt}秒还没有人买，则价格降为${web3_1.default.utils.fromWei((yield actors.actorPrice()).toString())}`);
        dt = 1; //hours
        timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        yield (0, utils_1.increaseTime)((yield actors.mintStart()).add(dt * 3600).sub(timestamp).toNumber());
        console.log(`- 若${dt}小时还没有人买，则价格降为${web3_1.default.utils.fromWei((yield actors.actorPrice()).toString())}`);
        dt = 1; //days
        timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        yield (0, utils_1.increaseTime)((yield actors.mintStart()).add(dt * 24 * 3600).sub(timestamp).toNumber());
        console.log(`- 若${dt}天还没有人买，则价格降为${web3_1.default.utils.fromWei((yield actors.actorPrice()).toString())}`);
        dt = 30; //days
        timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        yield (0, utils_1.increaseTime)((yield actors.mintStart()).add(dt * 24 * 3600).sub(timestamp).toNumber());
        console.log(`- 若${dt}天还没有人买，则价格降为${web3_1.default.utils.fromWei((yield actors.actorPrice()).toString())}`);
    }));
    it('发行超量容错', () => __awaiter(void 0, void 0, void 0, function* () {
        let maxMintablePlusOne = (yield actors.MAX_MINTABLE()).add(1);
        /// Pricing function should revert when trying to price beyond the last mintable actor.
        yield expect(actors.getTargetSaleTime(maxMintablePlusOne.mul(BigInt(1e18)))).to.be.reverted;
    }));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('角色URI测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let snapshotId;
    let worldConstants;
    let worldContractRoute;
    let actors;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        [deployer, taiyiDAO, operator1, operator2] = yield hardhat_1.ethers.getSigners();
        //Deploy Constants
        worldConstants = yield (0, utils_2.deployWorldConstants)(deployer);
        //Deploy WorldContractRoute
        worldContractRoute = yield (0, utils_2.deployWorldContractRoute)(deployer);
        //Deploy Taiyi Daoli ERC20
        let assetDaoli = yield (0, utils_2.deployAssetDaoli)(worldConstants, worldContractRoute, deployer);
        //Deploy Actors
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        actors = yield (0, utils_2.deployActors)(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        yield worldContractRoute.registerActors(actors.address);
        //PanGu should be mint at first, or you can not register any module
        expect(yield actors.nextActor()).to.eq(1);
        yield actors.connect(taiyiDAO).mintActor(0);
    }));
    it('角色URI', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield actors.nextActor()).to.eq(2);
        const receipt = yield (yield actors.connect(operator1).mintActor(0)).wait();
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));
        let uri = yield actors.tokenURI(2);
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
        let uriObj = JSON.parse(uriDecode);
        //console.log(JSON.stringify(uriObj, null, 2));
        expect(uriObj.name).to.eq("Taiyi Actor #2");
        expect(uriObj.description).to.eq("This is not a game.");
        expect(uriObj.data.base.mintTime).to.eq(timestamp);
        expect(uriObj.data.base.status).to.eq(2);
        // const svgDecode = Buffer.from(uriObj.image.substring(26), 'base64').toString('utf-8');
        // console.log(svgDecode);
    }));
});
