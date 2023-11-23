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
const states = [
    'Pending',
    'Active',
    'Canceled',
    'Defeated',
    'Succeeded',
    'Queued',
    'Expired',
    'Executed',
];
let token;
let deployer;
let account0;
let account1;
let signers;
let gov;
let timelock;
let delay;
let targets;
let values;
let signatures;
let callDatas;
let proposalId;
let snapshotId;
let actorPanGu;
function expectState(proposalId, expectedState) {
    return __awaiter(this, void 0, void 0, function* () {
        const actualState = states[yield gov.state(proposalId)];
        expect(actualState).to.equal(expectedState);
    });
}
function makeProposal(proposer = deployer, mintAmount = 5, transferAmount = 0, transferTo = proposer, proposalThresholdBPS = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, utils_1.setTotalSupply)(actorPanGu, token, mintAmount);
        delay = 4 * 24 * 60 * 60;
        timelock = yield new typechain_1.TaiyiDaoExecutorHarness__factory(deployer).deploy(deployer.address, delay);
        gov = yield new typechain_1.TaiyiDaoImmutable__factory(deployer).deploy(timelock.address, token.address, (0, utils_2.address)(0), deployer.address, 1728, 1, proposalThresholdBPS, 1);
        yield timelock.harnessSetAdmin(gov.address);
        targets = [deployer.address];
        values = ['0'];
        signatures = ['getBalanceOf(address)'];
        callDatas = [(0, utils_2.encodeParameters)(['address'], [deployer.address])];
        for (let i = 0; transferAmount > 0; i++) {
            yield token.transferFrom(deployer.address, transferTo.address, i);
            transferAmount--;
        }
        yield gov.connect(proposer).propose(targets, values, signatures, callDatas, 'do nothing');
        proposalId = yield gov.latestProposalIds(proposer.address);
    });
}
describe('太乙岛提案状态测试', () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, utils_2.freezeTime)(100);
        signers = yield (0, utils_1.getSigners)();
        deployer = signers.deployer;
        account0 = signers.account0;
        account1 = signers.account1;
        //Deploy Actors and world basic
        let worldConstants = yield (0, utils_3.deployWorldConstants)(deployer);
        let worldContractRoute = yield (0, utils_3.deployWorldContractRoute)(deployer);
        let assetDaoli = yield (0, utils_3.deployAssetDaoli)(worldConstants, worldContractRoute, deployer);
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        let actors = yield (0, utils_3.deployActors)(deployer.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        yield worldContractRoute.registerActors(actors.address);
        //PanGu should be mint at first, or you can not register any module
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        expect(actorPanGu).to.eq(1);
        expect(yield actors.nextActor()).to.eq(actorPanGu);
        yield actors.mintActor(0);
        let worldYemings = yield (0, utils_3.deployWorldYemings)(deployer.address, deployer);
        yield worldContractRoute.registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        yield worldYemings.setYeMing(actorPanGu, deployer.address);
        token = yield (0, utils_1.deploySifusToken)(worldContractRoute.address, signers.deployer);
        yield (0, utils_1.populateDescriptor)(typechain_1.SifusDescriptor__factory.connect(yield token.descriptor(), signers.deployer));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        snapshotId = yield ethers.provider.send('evm_snapshot', []);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield ethers.provider.send('evm_revert', [snapshotId]);
    }));
    it('无效的提案ID', () => __awaiter(void 0, void 0, void 0, function* () {
        yield makeProposal();
        yield expect(gov.state(5)).revertedWith('TaiyiDAO::state: invalid proposal id');
    }));
    it('待投票排队期（Pending）', () => __awaiter(void 0, void 0, void 0, function* () {
        yield makeProposal();
        expectState(proposalId, 'Pending');
    }));
    it('进入投票期（Active）', () => __awaiter(void 0, void 0, void 0, function* () {
        yield makeProposal();
        expectState(proposalId, 'Pending');
        // mine blocks passed voting delay; voting delay is 1 block, have to wait 2 blocks
        yield (0, utils_2.mineBlock)();
        yield (0, utils_2.mineBlock)();
        expectState(proposalId, 'Active');
    }));
    it('取消提案（Canceled）', () => __awaiter(void 0, void 0, void 0, function* () {
        // set proposalThresholdBPS to 10% (1 token) so proposalThreshold is > 0
        yield makeProposal(account0, 10, 2, account0, 1000);
        yield gov.proposals(proposalId);
        // send away the delegates，使提案人持票低于持票要求（任何人可以取消提案人持票变得不足后的提案）
        yield token.connect(account0).delegate(deployer.address);
        yield (0, utils_2.mineBlock)();
        yield (0, utils_2.mineBlock)();
        yield gov.cancel(proposalId);
        expectState(proposalId, 'Canceled');
    }));
    it('投票期超时后无投票被否决（Defeated）', () => __awaiter(void 0, void 0, void 0, function* () {
        yield makeProposal();
        // travel to end block
        yield (0, utils_2.advanceBlocks)(2000);
        expectState(proposalId, 'Defeated');
    }));
    it('反对票胜出被否决（Defeated）', () => __awaiter(void 0, void 0, void 0, function* () {
        yield makeProposal(deployer, 5, 3, account0);
        // pass the waiting period of 1 block
        yield (0, utils_2.mineBlock)();
        // cast 2 votes for
        yield gov.connect(deployer).castVote(proposalId, 1);
        // cast 3 votes against
        yield gov.connect(account0).castVote(proposalId, 0);
        // travel to end block
        yield (0, utils_2.advanceBlocks)(2000);
        expectState(proposalId, 'Defeated');
    }));
    it('赞成票胜出，通过（Succeeded）', () => __awaiter(void 0, void 0, void 0, function* () {
        // deployer mints 5, sends 2 to account0, account0 proposes,
        yield makeProposal(account0, 5, 2);
        yield (0, utils_2.mineBlock)();
        // cast 3 votes for
        yield gov.connect(deployer).castVote(proposalId, 1);
        // cast 2 votes against
        yield gov.connect(account0).castVote(proposalId, 0);
        yield (0, utils_2.advanceBlocks)(2000);
        expectState(proposalId, 'Succeeded');
    }));
    it('被否决后不能进入执行队列', () => __awaiter(void 0, void 0, void 0, function* () {
        yield makeProposal();
        yield (0, utils_2.advanceBlocks)(2000);
        expectState(proposalId, 'Defeated');
        yield expect(gov.queue(proposalId)).revertedWith('queue: proposal can only be queued if it is succeeded');
    }));
    it('被取消后不能进入执行队列', () => __awaiter(void 0, void 0, void 0, function* () {
        yield makeProposal();
        yield gov.cancel(proposalId);
        expectState(proposalId, 'Canceled');
        yield expect(gov.queue(proposalId)).revertedWith('queue: proposal can only be queued if it is succeeded');
    }));
    it('进入执行队列（Queued）', () => __awaiter(void 0, void 0, void 0, function* () {
        yield makeProposal();
        yield (0, utils_2.mineBlock)();
        yield gov.connect(deployer).castVote(proposalId, 1);
        yield expect(gov.queue(proposalId)).revertedWith('queue: proposal can only be queued if it is succeeded');
        yield (0, utils_2.advanceBlocks)(2000);
        // anyone can queue
        yield gov.connect(account0).queue(proposalId);
        expectState(proposalId, 'Queued');
    }));
    it('执行期超时（Expired）', () => __awaiter(void 0, void 0, void 0, function* () {
        yield makeProposal();
        yield (0, utils_2.mineBlock)();
        yield gov.connect(deployer).castVote(proposalId, 1);
        yield (0, utils_2.advanceBlocks)(2000);
        yield gov.connect(account0).queue(proposalId);
        const gracePeriod = yield timelock.GRACE_PERIOD();
        const { eta } = yield gov.proposals(proposalId);
        // 1 second before grace period, still Queued
        yield (0, utils_2.setNextBlockTimestamp)(eta.add(gracePeriod).sub(1).toNumber());
        expectState(proposalId, 'Queued');
        // Mining at graceperiod
        yield (0, utils_2.setNextBlockTimestamp)(eta.add(gracePeriod).toNumber());
        expectState(proposalId, 'Expired');
    }));
    it('进入执行队列后，被任何人执行（Executed）', () => __awaiter(void 0, void 0, void 0, function* () {
        yield makeProposal();
        yield (0, utils_2.mineBlock)();
        yield gov.connect(deployer).castVote(proposalId, 1);
        yield expect(gov.execute(proposalId)).revertedWith('execute: proposal can only be executed if it is queued');
        yield (0, utils_2.advanceBlocks)(2000);
        yield expect(gov.execute(proposalId)).revertedWith('execute: proposal can only be executed if it is queued');
        yield gov.connect(account0).queue(proposalId);
        const gracePeriod = yield timelock.GRACE_PERIOD();
        const { eta } = yield gov.proposals(proposalId);
        yield (0, utils_2.setNextBlockTimestamp)(eta.add(gracePeriod).sub(2).toNumber());
        expectState(proposalId, 'Queued');
        // the execute call can happen 1 second before the grace period expires
        yield (0, utils_2.setNextBlockTimestamp)(eta.add(gracePeriod).sub(1).toNumber(), false);
        yield gov.connect(account1).execute(proposalId);
        expectState(proposalId, 'Executed');
        // still executed even though would be expired
        yield (0, utils_2.setNextBlockTimestamp)(eta.add(gracePeriod).toNumber());
        expectState(proposalId, 'Executed');
    }));
});
