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
const ethereum_waffle_1 = require("ethereum-waffle");
const hardhat_1 = require("hardhat");
const typechain_1 = require("../../typechain");
const utils_1 = require("../utils");
const ethers_1 = require("ethers");
const utils_2 = require("../../utils");
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
describe('太乙师傅令牌管理测试', () => {
    let snapshotId;
    let token;
    let tokenCallFromGuy;
    let tokenCallFromDeployer;
    let account0;
    let account1;
    let account2;
    let deployer;
    let actorPanGu;
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const Domain = (name, verifyingContract, chainId) => ({
        name,
        chainId,
        verifyingContract,
    });
    let domain;
    const Types = {
        Delegation: [
            { name: 'delegatee', type: 'address' },
            { name: 'nonce', type: 'uint256' },
            { name: 'expiry', type: 'uint256' },
        ],
    };
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        const signers = yield (0, utils_1.getSigners)();
        account0 = signers.account0;
        account1 = signers.account1;
        account2 = signers.account2;
        deployer = signers.deployer;
        //Deploy Actors and world basic
        let worldConstants = yield (0, utils_2.deployWorldConstants)(deployer);
        let worldContractRoute = yield (0, utils_2.deployWorldContractRoute)(deployer);
        let assetDaoli = yield (0, utils_2.deployAssetDaoli)(worldConstants, worldContractRoute, deployer);
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        let actors = yield (0, utils_2.deployActors)(deployer.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        yield worldContractRoute.registerActors(actors.address);
        //PanGu should be mint at first, or you can not register any module
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        expect(actorPanGu).to.eq(1);
        expect(yield actors.nextActor()).to.eq(actorPanGu);
        yield actors.mintActor(0);
        let worldYemings = yield (0, utils_2.deployWorldYemings)(deployer.address, deployer);
        yield worldContractRoute.registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        yield worldYemings.setYeMing(actorPanGu, deployer.address);
        token = yield (0, utils_1.deploySifusToken)(worldContractRoute.address, deployer);
        yield (0, utils_1.populateDescriptor)(typechain_1.SifusDescriptor__factory.connect(yield token.descriptor(), signers.deployer));
        domain = Domain('Taiyi Sifus', token.address, yield (0, utils_1.chainId)());
        tokenCallFromGuy = token.connect(signers.account0);
        tokenCallFromDeployer = token;
    }));
    describe('签名代理（委托）：', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
        }));
        it('签名无效情况', () => __awaiter(void 0, void 0, void 0, function* () {
            const delegatee = account1.address, nonce = 0, expiry = 0;
            const badhex = '0xbad0000000000000000000000000000000000000000000000000000000000000';
            yield expect(token.delegateBySig(delegatee, nonce, expiry, 0, badhex, badhex)).to.be.revertedWith('ERC721Checkpointable::delegateBySig: invalid signature');
        }));
        it('nonce错误情况', () => __awaiter(void 0, void 0, void 0, function* () {
            const delegatee = account1.address, nonce = 1, expiry = 0;
            const signature = yield account0._signTypedData(domain, Types, { delegatee, nonce, expiry });
            const { v, r, s } = hardhat_1.ethers.utils.splitSignature(signature);
            yield expect(token.delegateBySig(delegatee, nonce, expiry, v, r, s)).to.be.revertedWith('ERC721Checkpointable::delegateBySig: invalid nonce');
        }));
        it('签名过期情况', () => __awaiter(void 0, void 0, void 0, function* () {
            const delegatee = account1.address, nonce = 0, expiry = 0;
            const signature = yield account0._signTypedData(domain, Types, { delegatee, nonce, expiry });
            const { v, r, s } = hardhat_1.ethers.utils.splitSignature(signature);
            yield expect(token.delegateBySig(delegatee, nonce, expiry, v, r, s)).to.be.revertedWith('ERC721Checkpointable::delegateBySig: signature expired');
        }));
        it('签名授权代理', () => __awaiter(void 0, void 0, void 0, function* () {
            const delegatee = account1.address, nonce = 0, expiry = 10e9;
            const signature = yield account0._signTypedData(domain, Types, { delegatee, nonce, expiry });
            const { v, r, s } = hardhat_1.ethers.utils.splitSignature(signature);
            expect(yield token.delegates(account0.address)).to.equal(account0.address);
            const tx = yield (yield token.delegateBySig(delegatee, nonce, expiry, v, r, s)).wait();
            expect(tx.gasUsed.toNumber() < 80000);
            expect(yield token.delegates(account0.address)).to.equal(account1.address);
        }));
    });
    describe('持票记录采样点：', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
        }));
        it('代理人（被委托方）采样点数据', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_1.setTotalSupply)(actorPanGu, token, 3);
            // Give account0.address tokens
            yield tokenCallFromDeployer.transferFrom(deployer.address, account0.address, 0);
            yield tokenCallFromDeployer.transferFrom(deployer.address, account0.address, 1);
            expect(yield token.numCheckpoints(account1.address)).to.equal(0);
            const t1 = yield tokenCallFromGuy.delegate(account1.address);
            expect(yield token.numCheckpoints(account1.address)).to.equal(1);
            const t2 = yield tokenCallFromGuy.transferFrom(account0.address, account2.address, 0);
            expect(yield token.numCheckpoints(account1.address)).to.equal(2);
            const t3 = yield tokenCallFromGuy.transferFrom(account0.address, account2.address, 1);
            expect(yield token.numCheckpoints(account1.address)).to.equal(3);
            const t4 = yield tokenCallFromDeployer.transferFrom(deployer.address, account0.address, 2);
            expect(yield token.numCheckpoints(account1.address)).to.equal(4);
            const checkpoint0 = yield token.checkpoints(account1.address, 0);
            expect(checkpoint0.fromBlock).to.equal(t1.blockNumber);
            expect(checkpoint0.votes.toString(), '2');
            const checkpoint1 = yield token.checkpoints(account1.address, 1);
            expect(checkpoint1.fromBlock).to.equal(t2.blockNumber);
            expect(checkpoint1.votes.toString(), '1');
            const checkpoint2 = yield token.checkpoints(account1.address, 2);
            expect(checkpoint2.fromBlock).to.equal(t3.blockNumber);
            expect(checkpoint2.votes.toString(), '0');
            const checkpoint3 = yield token.checkpoints(account1.address, 3);
            expect(checkpoint3.fromBlock).to.equal(t4.blockNumber);
            expect(checkpoint3.votes.toString(), '1');
        }));
        it('同一区块内不会触发多个采样点', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_1.setTotalSupply)(actorPanGu, token, 4);
            // Give account0.address tokens
            yield tokenCallFromDeployer.transferFrom(deployer.address, account0.address, 0);
            yield tokenCallFromDeployer.transferFrom(deployer.address, account0.address, 1);
            yield tokenCallFromDeployer.transferFrom(deployer.address, account0.address, 2);
            expect(yield token.numCheckpoints(account1.address)).to.equal(0);
            yield (0, utils_1.minerStop)();
            const tx1 = yield tokenCallFromGuy.delegate(account1.address); // delegate 3 votes
            const tx2 = yield tokenCallFromGuy.transferFrom(account0.address, account2.address, 0); // transfer 1 vote
            const tx3 = yield tokenCallFromGuy.transferFrom(account0.address, account2.address, 1); // transfer 1 vote
            yield (0, utils_1.mineBlock)();
            const receipt1 = yield tx1.wait();
            yield tx2.wait();
            yield tx3.wait();
            yield (0, utils_1.minerStart)();
            expect(yield token.numCheckpoints(account1.address)).to.equal(1);
            const checkpoint0 = yield token.checkpoints(account1.address, 0);
            expect(checkpoint0.fromBlock).to.equal(receipt1.blockNumber);
            expect(checkpoint0.votes.toString(), '1');
            let checkpoint1 = yield token.checkpoints(account1.address, 1);
            expect(checkpoint1.fromBlock).to.equal(0);
            expect(checkpoint1.votes.toString(), '0');
            const checkpoint2 = yield token.checkpoints(account1.address, 2);
            expect(checkpoint2.fromBlock).to.equal(0);
            expect(checkpoint2.votes.toString(), '0');
            const tx4 = yield tokenCallFromDeployer.transferFrom(deployer.address, account0.address, 3);
            expect(yield token.numCheckpoints(account1.address)).to.equal(2);
            checkpoint1 = yield token.checkpoints(account1.address, 1);
            expect(checkpoint1.fromBlock).to.equal(tx4.blockNumber);
            expect(checkpoint1.votes.toString(), '1');
        }));
    });
    describe('指定时刻（块号）的持票计算：', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
        }));
        it('指定块号超过当前出块数情况', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(token.getPriorVotes(account1.address, 5e10)).to.be.revertedWith('ERC721Checkpointable::getPriorVotes: not yet determined');
        }));
        it('没有采样点一定是0票', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield token.getPriorVotes(account1.address, 0)).to.equal(0);
        }));
        it('最后采样点之后总是返回最后采样点数据', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_1.setTotalSupply)(actorPanGu, token, 1);
            const t1 = yield (yield tokenCallFromDeployer.delegate(account1.address)).wait();
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.mineBlock)();
            expect(yield token.getPriorVotes(account1.address, t1.blockNumber)).to.equal(ONE);
            expect(yield token.getPriorVotes(account1.address, t1.blockNumber + 1)).to.equal(ONE);
        }));
        it('首个采样点之前一定是0票', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.setTotalSupply)(actorPanGu, token, 1);
            const t1 = yield (yield tokenCallFromDeployer.delegate(account1.address)).wait();
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.mineBlock)();
            expect(yield token.getPriorVotes(account1.address, t1.blockNumber - 1)).to.equal(0);
            expect(yield token.getPriorVotes(account1.address, t1.blockNumber + 1)).to.equal(ONE);
        }));
        it('最适采样点持票数', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_1.setTotalSupply)(actorPanGu, token, 3);
            const t1 = yield (yield tokenCallFromDeployer.delegate(account1.address)).wait();
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.mineBlock)();
            // deployer -> account0.address id 1
            const t2 = yield (yield tokenCallFromDeployer.transferFrom(deployer.address, account0.address, 0)).wait();
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.mineBlock)();
            // deployer -> account0.address id 2
            const t3 = yield (yield tokenCallFromDeployer.transferFrom(deployer.address, account0.address, 1)).wait();
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.mineBlock)();
            // account0.address -> deployer id 1
            const t4 = yield (yield tokenCallFromGuy.transferFrom(account0.address, deployer.address, 0)).wait();
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.mineBlock)();
            expect(yield token.getPriorVotes(account1.address, t1.blockNumber - 1)).to.equal(0);
            expect(yield token.getPriorVotes(account1.address, t1.blockNumber)).to.equal(THREE);
            expect(yield token.getPriorVotes(account1.address, t1.blockNumber + 1)).to.equal(THREE);
            expect(yield token.getPriorVotes(account1.address, t2.blockNumber)).to.equal(TWO);
            expect(yield token.getPriorVotes(account1.address, t2.blockNumber + 1)).to.equal(TWO);
            expect(yield token.getPriorVotes(account1.address, t3.blockNumber)).to.equal(ONE);
            expect(yield token.getPriorVotes(account1.address, t3.blockNumber + 1)).to.equal(ONE);
            expect(yield token.getPriorVotes(account1.address, t4.blockNumber)).to.equal(TWO);
            expect(yield token.getPriorVotes(account1.address, t4.blockNumber + 1)).to.equal(TWO);
        }));
        it('委托给0地址情况，清除代理，票归还给委托方', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_1.setTotalSupply)(actorPanGu, token, 1);
            // Delegate from Deployer -> Account1
            yield (yield tokenCallFromDeployer.delegate(account1.address)).wait();
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.mineBlock)();
            expect(yield token.getCurrentVotes((0, utils_1.address)(0))).to.equal(0);
            expect(yield token.getCurrentVotes(deployer.address)).to.equal(0);
            expect(yield token.getCurrentVotes(account1.address)).to.equal(ONE);
            // Delegate from Deployer -> Address(0), which should assign back to deployer
            yield (yield tokenCallFromDeployer.delegate((0, utils_1.address)(0))).wait();
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.mineBlock)();
            expect(yield token.getCurrentVotes((0, utils_1.address)(0))).to.equal(0);
            expect(yield token.getCurrentVotes(deployer.address)).to.equal(ONE);
            expect(yield token.getCurrentVotes(account1.address)).to.equal(0);
            // Delegate from Deployer -> Account1
            yield (yield tokenCallFromDeployer.delegate(account1.address)).wait();
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.mineBlock)();
            expect(yield token.getCurrentVotes((0, utils_1.address)(0))).to.equal(0);
            expect(yield token.getCurrentVotes(deployer.address)).to.equal(0);
            expect(yield token.getCurrentVotes(account1.address)).to.equal(ONE);
            // Transfer from Deployer -> Account2
            yield (yield tokenCallFromDeployer.transferFrom(deployer.address, account2.address, 0)).wait();
            yield (0, utils_1.mineBlock)();
            yield (0, utils_1.mineBlock)();
            expect(yield token.getCurrentVotes((0, utils_1.address)(0))).to.equal(0);
            expect(yield token.getCurrentVotes(deployer.address)).to.equal(0);
            expect(yield token.getCurrentVotes(account1.address)).to.equal(0);
            expect(yield token.getCurrentVotes(account2.address)).to.equal(ONE);
        }));
    });
});
