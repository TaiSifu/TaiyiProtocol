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
function deployGovernor(deployer, tokenAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address: govDelegateAddress } = yield new typechain_1.TaiyiDaoLogicV1Harness__factory(deployer).deploy();
        const params = [
            (0, utils_2.address)(0),
            tokenAddress,
            deployer.address,
            (0, utils_2.address)(0),
            govDelegateAddress,
            17280,
            1,
            1,
            1,
        ];
        const { address: _govDelegatorAddress } = yield (yield ethers.getContractFactory('TaiyiDAOProxy', deployer)).deploy(...params);
        return typechain_1.TaiyiDaoLogicV1Harness__factory.connect(_govDelegatorAddress, deployer);
    });
}
let snapshotId;
let token;
let deployer;
let account0;
let account1;
let account2;
let signers;
let worldConstants;
let worldContractRoute;
let actors;
let assetDaoli;
let actorPanGu;
let gov;
let targets;
let values;
let signatures;
let callDatas;
let proposalId;
function reset() {
    return __awaiter(this, void 0, void 0, function* () {
        if (snapshotId) {
            yield ethers.provider.send('evm_revert', [snapshotId]);
            snapshotId = yield ethers.provider.send('evm_snapshot', []);
            return;
        }
        //Deploy Actors and world basic
        worldConstants = yield (0, utils_3.deployWorldConstants)(deployer);
        worldContractRoute = yield (0, utils_3.deployWorldContractRoute)(deployer);
        assetDaoli = yield (0, utils_3.deployAssetDaoli)(worldConstants, worldContractRoute, deployer);
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        actors = yield (0, utils_3.deployActors)(deployer.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
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
        yield (0, utils_1.setTotalSupply)(actorPanGu, token, 10);
        gov = yield deployGovernor(deployer, token.address);
        snapshotId = yield ethers.provider.send('evm_snapshot', []);
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
describe('太乙岛投票测试', () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield (0, utils_1.getSigners)();
        deployer = signers.deployer;
        account0 = signers.account0;
        account1 = signers.account1;
        account2 = signers.account2;
    }));
    describe('失败（revert）的情况：', () => {
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            yield reset();
            yield propose(deployer);
        }));
        it("未在投票期之内投票", () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(gov.castVote(proposalId, 1)).revertedWith('TaiyiDAO::castVoteInternal: voting is closed');
        }));
        it('已经投过票的投票人再次投票', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_2.mineBlock)();
            yield (0, utils_2.mineBlock)();
            yield token.transferFrom(deployer.address, account0.address, 0);
            yield token.transferFrom(deployer.address, account1.address, 1);
            yield gov.connect(account0).castVote(proposalId, 1);
            yield gov.connect(account1).castVoteWithReason(proposalId, 1, '');
            yield expect(gov.connect(account0).castVote(proposalId, 1)).revertedWith('TaiyiDAO::castVoteInternal: voter already voted');
        }));
    });
    describe('成功的情况：', () => {
        it("投票后将发起者地址加入提案的投票人列表（尽管发起者没有票）", () => __awaiter(void 0, void 0, void 0, function* () {
            const voteReceipt1 = yield gov.getReceipt(proposalId, account2.address);
            expect(voteReceipt1.hasVoted).to.equal(false);
            yield gov.connect(account2).castVote(proposalId, 1);
            const voteReceipt2 = yield gov.getReceipt(proposalId, account2.address);
            expect(voteReceipt2.hasVoted).to.equal(true);
        }));
        describe("持票人投票", () => {
            let actor; // an account that will propose, receive tokens, delegate to self, and vote on own proposal
            before(reset);
            it('赞成票核验', () => __awaiter(void 0, void 0, void 0, function* () {
                actor = account0;
                yield token.transferFrom(deployer.address, actor.address, 0);
                yield token.transferFrom(deployer.address, actor.address, 1);
                yield propose(actor);
                const beforeFors = (yield gov.proposals(proposalId)).forVotes;
                yield (0, utils_2.mineBlock)();
                yield gov.connect(actor).castVote(proposalId, 1);
                const afterFors = (yield gov.proposals(proposalId)).forVotes;
                const balance = (yield token.balanceOf(actor.address)).toString();
                expect(afterFors).to.equal(beforeFors.add(balance));
            }));
            it("反对票核验", () => __awaiter(void 0, void 0, void 0, function* () {
                actor = account1;
                yield token.transferFrom(deployer.address, actor.address, 2);
                yield token.transferFrom(deployer.address, actor.address, 3);
                yield propose(actor);
                const beforeAgainst = (yield gov.proposals(proposalId)).againstVotes;
                yield (0, utils_2.mineBlock)();
                yield gov.connect(actor).castVote(proposalId, 0);
                const afterAgainst = (yield gov.proposals(proposalId)).againstVotes;
                const balance = (yield token.balanceOf(actor.address)).toString();
                expect(afterAgainst).to.equal(beforeAgainst.add(balance));
            }));
        });
    });
});
