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
const hardhat_1 = __importDefault(require("hardhat"));
const { ethers } = hardhat_1.default;
const ethers_1 = require("ethers");
const utils_1 = require("../../utils");
const utils_2 = require("../../utils");
const typechain_1 = require("../../../typechain");
const utils_3 = require("../../../utils");
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
function reset() {
    return __awaiter(this, void 0, void 0, function* () {
        // nonce 0: Deploy TaiyiDAOExecutor
        // nonce 1: Deploy TaiyiDAOLogicV1
        // nonce 2: Deploy World Constants
        // nonce 3: Deploy World Contract Route
        // nonce 4: Deploy Taiyi Daoli ERC20
        // nonce 5: Deploy Actors
        // nonce 6: Register Actors to world route
        // nonce 7: Mint PanGu
        // nonce 8: Deploy SifusDescriptor
        // nonce 9: Deploy SifusSeeder
        // nonce 10: Deploy SifusToken
        // nonce 11: Deploy TaiyiDAOProxy
        // nonce 12+: populate Descriptor
        const govDelegatorAddress = ethers.utils.getContractAddress({
            from: deployer.address,
            nonce: (yield deployer.getTransactionCount()) + 11,
        });
        // Deploy TaiyiDAOExecutor with pre-computed Delegator address
        const { address: timelockAddress } = yield new typechain_1.TaiyiDaoExecutor__factory(deployer).deploy(govDelegatorAddress, timelockDelay);
        // Deploy Delegate
        const { address: govDelegateAddress } = yield new typechain_1.TaiyiDaoLogicV1__factory(deployer).deploy();
        // Deploy World Constants
        let worldConstants = yield (0, utils_3.deployWorldConstants)(deployer);
        // Deploy WorldContractRoute
        let worldContractRoute = yield (0, utils_3.deployWorldContractRoute)(deployer);
        //Deploy Taiyi Daoli ERC20
        let assetDaoli = yield (0, utils_3.deployAssetDaoli)(worldConstants, worldContractRoute, deployer);
        //Deploy Actors
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        let actors = yield (0, utils_3.deployActors)(deployer.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        //Register Actors to world route
        yield worldContractRoute.registerActors(actors.address);
        //PanGu should be mint at first, or you can not register any module
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        expect(actorPanGu).to.eq(1);
        expect(yield actors.nextActor()).to.eq(actorPanGu);
        yield actors.connect(deployer).mintActor(0);
        // Deploy Sifus token
        token = yield (0, utils_1.deploySifusToken)(worldContractRoute.address, deployer);
        // Deploy Delegator
        yield new typechain_1.TaiyiDaoProxy__factory(deployer).deploy(timelockAddress, token.address, (0, utils_2.address)(0), timelockAddress, govDelegateAddress, 5760, 1, proposalThresholdBPS, quorumVotesBPS);
        // Cast Delegator as Delegate
        gov = typechain_1.TaiyiDaoLogicV1__factory.connect(govDelegatorAddress, deployer);
        yield (0, utils_1.populateDescriptor)(typechain_1.SifusDescriptor__factory.connect(yield token.descriptor(), deployer));
        //set PanGu as YeMing for test
        let worldYemings = yield (0, utils_3.deployWorldYemings)(deployer.address, deployer);
        yield worldContractRoute.registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        yield worldYemings.setYeMing(actorPanGu, deployer.address);
    });
}
function propose(proposer) {
    return __awaiter(this, void 0, void 0, function* () {
        targets = [account0.address];
        values = ['0'];
        signatures = ['getBalanceOf(address)'];
        callDatas = [(0, utils_2.encodeParameters)(['address'], [account0.address])];
        yield gov.connect(proposer).propose(targets, values, signatures, callDatas, 'do nothing');
        proposalId = yield gov.latestProposalIds(proposer.address);
    });
}
let token;
let deployer;
let account0;
let account1;
let account2;
let signers;
let gov;
const timelockDelay = 172800; // 2 days
const proposalThresholdBPS = 678; // 6.78%，提案人最小持票要求，占比
const quorumVotesBPS = 1100; // 11%，法定投票人数要求，占比
let targets;
let values;
let signatures;
let callDatas;
let proposalId;
let actorPanGu;
describe('太乙岛师傅令牌增发情况测试', () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield (0, utils_1.getSigners)();
        deployer = signers.deployer;
        account0 = signers.account0;
        account1 = signers.account1;
        account2 = signers.account2;
        targets = [account0.address];
        values = ['0'];
        signatures = ['getBalanceOf(address)'];
        callDatas = [(0, utils_2.encodeParameters)(['address'], [account0.address])];
        yield reset();
    }));
    it('参数配置正确性', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield gov.proposalThresholdBPS()).to.equal(proposalThresholdBPS);
        expect(yield gov.quorumVotesBPS()).to.equal(quorumVotesBPS);
    }));
    it('根据师傅令牌总数，法定投票要求和提案人持票要求', () => __awaiter(void 0, void 0, void 0, function* () {
        // Total Supply = 40
        yield (0, utils_1.setTotalSupply)(actorPanGu, token, 40);
        yield (0, utils_2.mineBlock)();
        // 6.78% of 40 = 2.712, floored to 2
        expect(yield gov.proposalThreshold()).to.equal(2);
        // 11% of 40 = 4.4, floored to 4
        expect(yield gov.quorumVotes()).to.equal(4);
    }));
    it('持票不足的提案人发起提案', () => __awaiter(void 0, void 0, void 0, function* () {
        // account0 has 1 token, requires 3
        yield token.transferFrom(deployer.address, account0.address, 0);
        yield (0, utils_2.mineBlock)();
        yield expect(gov.connect(account0).propose(targets, values, signatures, callDatas, 'do nothing')).revertedWith('TaiyiDAO::propose: proposer votes below proposal threshold');
    }));
    it('持票足够的提案人发起提案', () => __awaiter(void 0, void 0, void 0, function* () {
        // account0 has 3 token, requires 3
        yield token.transferFrom(deployer.address, account0.address, 1);
        yield token.transferFrom(deployer.address, account0.address, 2);
        // account1 has 3 tokens
        yield token.transferFrom(deployer.address, account1.address, 3);
        yield token.transferFrom(deployer.address, account1.address, 4);
        yield token.transferFrom(deployer.address, account1.address, 5);
        // account2 has 5 tokens
        yield token.transferFrom(deployer.address, account2.address, 6);
        yield token.transferFrom(deployer.address, account2.address, 7);
        yield token.transferFrom(deployer.address, account2.address, 8);
        yield token.transferFrom(deployer.address, account2.address, 9);
        yield token.transferFrom(deployer.address, account2.address, 10);
        yield (0, utils_2.mineBlock)();
        yield propose(account0);
    }));
    it('提案参数正确性', () => __awaiter(void 0, void 0, void 0, function* () {
        const proposal = yield gov.proposals(proposalId);
        expect(proposal.proposalThreshold).to.equal(2);
        expect(proposal.quorumVotes).to.equal(4);
    }));
    it('师傅令牌总数变化后，法定投票要求和提案人持票要求对应变化', () => __awaiter(void 0, void 0, void 0, function* () {
        // Total Supply = 80
        yield (0, utils_1.setTotalSupply)(actorPanGu, token, 80);
        // 6.78% of 80 = 5.424, floored to 5
        expect(yield gov.proposalThreshold()).to.equal(5);
        // 11% of 80 = 8.88, floored to 8
        expect(yield gov.quorumVotes()).to.equal(8);
    }));
    it('由于师傅令牌总量增加，之前持票足够的投票人现在不满足新的持票要求', () => __awaiter(void 0, void 0, void 0, function* () {
        // account1 has 3 tokens, but requires 5 to pass new proposal threshold when totalSupply = 80 and threshold = 5%
        yield expect(gov.connect(account1).propose(targets, values, signatures, callDatas, 'do nothing')).revertedWith('TaiyiDAO::propose: proposer votes below proposal threshold');
    }));
    it('师傅令牌总量变化不会影响变化前提案参数', () => __awaiter(void 0, void 0, void 0, function* () {
        const proposal = yield gov.proposals(proposalId);
        expect(proposal.proposalThreshold).to.equal(2);
        expect(proposal.quorumVotes).to.equal(4);
    }));
    it('赞成票和反对票计票正确性', () => __awaiter(void 0, void 0, void 0, function* () {
        // Accounts voting for = 6 votes
        // forVotes should be greater than quorumVotes
        yield gov.connect(account0).castVote(proposalId, 1); // 3
        yield gov.connect(account1).castVote(proposalId, 1); // 3
        yield gov.connect(account2).castVote(proposalId, 0); // 5
        const proposal = yield gov.proposals(proposalId);
        expect(proposal.forVotes).to.equal(6);
        expect(proposal.againstVotes).to.equal(5);
    }));
    it('投票期到达，赞成票数大于反对票数且满足法定投票数要求，提案状态', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, utils_2.advanceBlocks)(5760);
        const state = yield gov.state(proposalId);
        expect(state).to.equal(4);
    }));
});
