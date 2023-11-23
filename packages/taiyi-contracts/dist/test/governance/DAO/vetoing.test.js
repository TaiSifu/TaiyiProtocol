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
function expectState(proposalId, expectedState) {
    return __awaiter(this, void 0, void 0, function* () {
        const states = [
            'Pending',
            'Active',
            'Canceled',
            'Defeated',
            'Succeeded',
            'Queued',
            'Expired',
            'Executed',
            'Vetoed',
        ];
        const actualState = states[yield gov.state(proposalId)];
        expect(actualState).to.equal(expectedState);
    });
}
function reset() {
    return __awaiter(this, void 0, void 0, function* () {
        if (snapshotId) {
            yield ethers.provider.send('evm_revert', [snapshotId]);
            snapshotId = yield ethers.provider.send('evm_snapshot', []);
            return;
        }
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
        vetoer = deployer;
        const govDelegatorAddress = ethers.utils.getContractAddress({
            from: deployer.address,
            nonce: (yield deployer.getTransactionCount()) + 11,
        });
        // Deploy TaiyiDAOExecutor with pre-computed Delegator address
        timelock = yield new typechain_1.TaiyiDaoExecutor__factory(deployer).deploy(govDelegatorAddress, timelockDelay);
        const timelockAddress = timelock.address;
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
        yield new typechain_1.TaiyiDaoProxy__factory(deployer).deploy(timelockAddress, token.address, vetoer.address, timelockAddress, govDelegateAddress, 5760, 1, proposalThresholdBPS, quorumVotesBPS);
        // Cast Delegator as Delegate
        gov = typechain_1.TaiyiDaoLogicV1__factory.connect(govDelegatorAddress, deployer);
        yield (0, utils_1.populateDescriptor)(typechain_1.SifusDescriptor__factory.connect(yield token.descriptor(), deployer));
        //set PanGu as YeMing for test
        let worldYemings = yield (0, utils_3.deployWorldYemings)(deployer.address, deployer);
        yield worldContractRoute.registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        yield worldYemings.setYeMing(actorPanGu, deployer.address);
        snapshotId = yield ethers.provider.send('evm_snapshot', []);
    });
}
function propose(proposer, mint = true) {
    return __awaiter(this, void 0, void 0, function* () {
        if (mint) {
            yield (0, utils_1.setTotalSupply)(actorPanGu, token, 1);
            if (proposer.address !== deployer.address) {
                yield token.transferFrom(deployer.address, proposer.address, 0);
            }
        }
        yield (0, utils_2.mineBlock)();
        targets = [account0.address];
        values = ['0'];
        signatures = ['getBalanceOf(address)'];
        callDatas = [(0, utils_2.encodeParameters)(['address'], [account0.address])];
        yield gov.connect(proposer).propose(targets, values, signatures, callDatas, 'do nothing');
        proposalId = yield gov.latestProposalIds(proposer.address);
    });
}
let snapshotId;
let token;
let deployer;
let vetoer;
let account0;
let account1;
let account2;
let signers;
let gov;
let timelock;
const timelockDelay = 172800; // 2 days
const proposalThresholdBPS = 500; // 5%
const quorumVotesBPS = 1000; // 10%
let targets;
let values;
let signatures;
let callDatas;
let proposalId;
let actorPanGu;
describe('太乙岛否决权测试', () => {
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
    it('否决权参数正确性检查', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield gov.vetoer()).to.equal(vetoer.address);
    }));
    it('非现任否决权人不能设置新任', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(gov.connect(account0)._setVetoer(account1.address)).revertedWith('TaiyiDAO::_setVetoer: vetoer only');
    }));
    it('现任否决权人设置新任', () => __awaiter(void 0, void 0, void 0, function* () {
        const oldVetoer = vetoer;
        vetoer = account2;
        yield gov.connect(oldVetoer)._setVetoer(vetoer.address);
        expect(yield gov.vetoer()).to.equal(vetoer.address);
    }));
    it('只有现任否决权人能行驶否决权', () => __awaiter(void 0, void 0, void 0, function* () {
        yield propose(account0);
        yield expect(gov.veto(proposalId)).revertedWith('TaiyiDAO::veto: only vetoer');
    }));
    it('销毁否决权', () => __awaiter(void 0, void 0, void 0, function* () {
        // vetoer is still set
        expect(yield gov.vetoer()).to.equal(vetoer.address);
        yield expect(gov._burnVetoPower()).revertedWith('TaiyiDAO::_burnVetoPower: vetoer only');
        // burn
        yield gov.connect(vetoer)._burnVetoPower();
        expect(yield gov.vetoer()).to.equal((0, utils_2.address)(0));
        yield expect(gov.connect(vetoer).veto(proposalId)).revertedWith('TaiyiDAO::veto: veto power burned');
    }));
    describe('提案在不同状态下，否决权工作情况：', () => __awaiter(void 0, void 0, void 0, function* () {
        before(reset);
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            snapshotId = yield ethers.provider.send('evm_snapshot', []);
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield ethers.provider.send('evm_revert', [snapshotId]);
        }));
        it('待投票（Pending）', () => __awaiter(void 0, void 0, void 0, function* () {
            yield propose(account0);
            yield expectState(proposalId, 'Pending');
            yield gov.veto(proposalId);
            yield expectState(proposalId, 'Vetoed');
        }));
        it('投票期（Active）', () => __awaiter(void 0, void 0, void 0, function* () {
            yield propose(account0);
            yield (0, utils_2.mineBlock)();
            yield (0, utils_2.mineBlock)();
            yield expectState(proposalId, 'Active');
            yield gov.veto(proposalId);
            yield expectState(proposalId, 'Vetoed');
        }));
        it('已被取消（Canceled）', () => __awaiter(void 0, void 0, void 0, function* () {
            yield propose(account0);
            yield (0, utils_2.mineBlock)();
            yield (0, utils_2.mineBlock)();
            yield expectState(proposalId, 'Active');
            yield gov.connect(account0).cancel(proposalId);
            yield expectState(proposalId, 'Canceled');
            yield gov.veto(proposalId);
            yield expectState(proposalId, 'Vetoed');
        }));
        it('已被否决（Defeated）', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_1.setTotalSupply)(actorPanGu, token, 3);
            yield token.transferFrom(deployer.address, account0.address, 0);
            yield token.transferFrom(deployer.address, account1.address, 1);
            yield token.transferFrom(deployer.address, account1.address, 2);
            yield propose(account0, false);
            yield (0, utils_2.mineBlock)();
            yield (0, utils_2.mineBlock)();
            yield expectState(proposalId, 'Active');
            // account0 with 1 vote casts for vote
            yield gov.connect(account0).castVote(proposalId, 1);
            // account1 with 2 votes casts against vote
            yield gov.connect(account1).castVote(proposalId, 0);
            yield (0, utils_2.advanceBlocks)(5780);
            yield expectState(proposalId, 'Defeated');
            yield gov.veto(proposalId);
            yield expectState(proposalId, 'Vetoed');
        }));
        it('已通过（Succeeded）', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_1.setTotalSupply)(actorPanGu, token, 3);
            yield token.transferFrom(deployer.address, account0.address, 0);
            yield token.transferFrom(deployer.address, account1.address, 1);
            yield token.transferFrom(deployer.address, account1.address, 2);
            yield propose(account0, false);
            yield (0, utils_2.mineBlock)();
            yield (0, utils_2.mineBlock)();
            yield expectState(proposalId, 'Active');
            // account0 with 1 vote casts against vote
            yield gov.connect(account0).castVote(proposalId, 0);
            // account1 with 2 votes casts for vote
            yield gov.connect(account1).castVote(proposalId, 1);
            yield (0, utils_2.advanceBlocks)(5780);
            yield expectState(proposalId, 'Succeeded');
            yield gov.veto(proposalId);
            yield expectState(proposalId, 'Vetoed');
        }));
        it('已进入执行队列（Queued）', () => __awaiter(void 0, void 0, void 0, function* () {
            yield propose(account0);
            yield (0, utils_2.mineBlock)();
            yield (0, utils_2.mineBlock)();
            yield expectState(proposalId, 'Active');
            yield gov.connect(account0).castVote(proposalId, 1);
            yield (0, utils_2.advanceBlocks)(5780);
            yield gov.queue(proposalId);
            yield expectState(proposalId, 'Queued');
            yield gov.veto(proposalId);
            yield expectState(proposalId, 'Vetoed');
        }));
        it('执行超时（Expired）', () => __awaiter(void 0, void 0, void 0, function* () {
            yield propose(account0);
            yield (0, utils_2.mineBlock)();
            yield (0, utils_2.mineBlock)();
            yield expectState(proposalId, 'Active');
            yield gov.connect(account0).castVote(proposalId, 1);
            yield (0, utils_2.advanceBlocks)(5780);
            yield gov.queue(proposalId);
            const proposal = yield gov.proposals(proposalId);
            yield (0, utils_2.setNextBlockTimestamp)(proposal.eta.toNumber() + (yield timelock.GRACE_PERIOD()).toNumber() + 1);
            yield expectState(proposalId, 'Expired');
            yield gov.veto(proposalId);
            yield expectState(proposalId, 'Vetoed');
        }));
        it('已被执行（Executed）', () => __awaiter(void 0, void 0, void 0, function* () {
            yield propose(account0);
            yield (0, utils_2.mineBlock)();
            yield (0, utils_2.mineBlock)();
            yield expectState(proposalId, 'Active');
            yield gov.connect(account0).castVote(proposalId, 1);
            yield (0, utils_2.advanceBlocks)(5780);
            yield gov.queue(proposalId);
            const proposal = yield gov.proposals(proposalId);
            yield (0, utils_2.setNextBlockTimestamp)(proposal.eta.toNumber() + 1);
            yield gov.execute(proposalId);
            yield expectState(proposalId, 'Executed');
            yield expect(gov.veto(proposalId)).revertedWith('TaiyiDAO::veto: cannot veto executed proposal');
        }));
        it('已被否决人否决（Vetoed）', () => __awaiter(void 0, void 0, void 0, function* () {
            yield propose(account0);
            yield expectState(proposalId, 'Pending');
            yield gov.veto(proposalId);
            yield expectState(proposalId, 'Vetoed');
            yield gov.veto(proposalId);
            yield expectState(proposalId, 'Vetoed');
        }));
    }));
});
