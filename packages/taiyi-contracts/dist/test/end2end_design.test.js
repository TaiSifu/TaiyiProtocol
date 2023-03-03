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
//yarn test ./test/end2end_design.test.ts --network hard
const chai_1 = __importDefault(require("chai"));
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const ethereum_waffle_1 = require("ethereum-waffle");
const typechain_1 = require("../typechain");
const utils_1 = require("./utils");
const utils_2 = require("../utils");
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
let sifusToken;
let shejiTu;
let descriptor;
//let weth: Weth;
let gov;
let timelock;
let deployer;
let wethDeployer;
let taiyiDAO;
let operator1;
let worldConstants;
let worldContractRoute;
let actors;
let worldRandom;
let worldYemings;
let worldEvents;
let assetDaoli;
let actorAttributes;
let worldZones;
let actorLocations;
let actorTalents;
let trigrams;
let assetWood;
let actorPanGu;
const OneAgeVSecond = 1;
const FAKE_MODULE_EVENTS = 101;
const FAKE_MODULE_TIMELINE = 102;
const FAKE_MODULE_TALENTS = 103;
const FAKE_MODULE_WOOD = 104;
// Governance Config
const TIME_LOCK_DELAY = 172800; // 2 days
const PROPOSAL_THRESHOLD_BPS = 500; // 5%
const QUORUM_VOTES_BPS = 1000; // 10%
const VOTING_PERIOD = 5760; // About 24 hours with 15s blocks
const VOTING_DELAY = 1; // 1 block
// Proposal Config
const targets = [];
const values = [];
const signatures = [];
const callDatas = [];
let proposalId;
function deploy() {
    return __awaiter(this, void 0, void 0, function* () {
        [deployer, wethDeployer, taiyiDAO, operator1] = yield hardhat_1.ethers.getSigners();
        // Deployed by another account to simulate real network
        //weth = await deployWeth(wethDeployer);
        // 1. DEPLOY Actors with world basic
        //-World Constants
        worldConstants = yield (0, utils_2.deployWorldConstants)(deployer);
        //-WorldContractRoute
        worldContractRoute = yield (0, utils_2.deployWorldContractRoute)(deployer);
        //-Daoli ERC20
        assetDaoli = yield (0, utils_2.deployAssetDaoli)(worldConstants, worldContractRoute, deployer);
        //-Actors
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        actors = yield (0, utils_2.deployActors)(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        yield worldContractRoute.registerActors(actors.address);
        //PanGu should be mint at first, or you can not register any module
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        expect(actorPanGu).to.eq(1);
        expect(yield actors.nextActor()).to.eq(actorPanGu);
        yield actors.connect(taiyiDAO).mintActor(0);
        //-World basic modules pre shejitu
        let routeByPanGu = worldContractRoute.connect(taiyiDAO);
        worldRandom = yield (0, utils_2.deployWorldRandom)(deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address);
        worldYemings = yield (0, utils_2.deployWorldYemings)(taiyiDAO.address, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        actorAttributes = yield (0, utils_2.deployActorAttributes)(routeByPanGu, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address);
        worldEvents = yield (0, utils_2.deployWorldEvents)(OneAgeVSecond, FAKE_MODULE_EVENTS, worldContractRoute, deployer);
        yield routeByPanGu.registerModule(FAKE_MODULE_EVENTS, worldEvents.address);
        actorLocations = yield (0, utils_2.deployActorLocations)(routeByPanGu, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ACTOR_LOCATIONS(), actorLocations.address);
        worldZones = yield (0, utils_2.deployWorldZones)(worldContractRoute, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ZONES(), worldZones.address);
        actorTalents = yield (0, utils_2.deployActorTalents)(FAKE_MODULE_TALENTS, routeByPanGu, deployer);
        yield routeByPanGu.registerModule(FAKE_MODULE_TALENTS, actorTalents.address);
        trigrams = yield (0, utils_2.deployTrigrams)(routeByPanGu, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_TRIGRAMS(), trigrams.address);
        // 2. DEPLOY Sifus token
        sifusToken = yield (0, utils_1.deploySifusToken)(worldContractRoute.address, deployer, taiyiDAO.address);
        // 3a. DEPLOY ShejiTu
        //-ShejiTu
        //the second actor minted should be YeMing for ShejiTu its self
        expect(yield actors.connect(taiyiDAO).nextActor()).to.eq(2);
        const shejiTuFactory = yield hardhat_1.ethers.getContractFactory('ShejiTu', deployer);
        const shejiTuProxy = yield hardhat_1.upgrades.deployProxy(shejiTuFactory, [
            "测试", "所在时间线：测试", FAKE_MODULE_TIMELINE,
            actors.address,
            actorLocations.address,
            worldZones.address,
            actorAttributes.address,
            worldEvents.address,
            actorTalents.address,
            trigrams.address,
            worldRandom.address
        ]);
        // 3b. CAST proxy as ShejiTu
        shejiTu = typechain_1.ShejiTu__factory.connect(shejiTuProxy.address, deployer);
        yield worldContractRoute.connect(taiyiDAO).registerModule(FAKE_MODULE_TIMELINE, shejiTu.address);
        //- register yeming for shejitu
        let shejiTuOperator = yield actors.nextActor();
        yield actors.mintActor(0);
        yield actors.approve(shejiTu.address, shejiTuOperator);
        yield shejiTu.initOperator(shejiTuOperator);
        yield worldYemings.connect(taiyiDAO).setYeMing(yield shejiTu.operator(), shejiTu.address);
        // 4. POPULATE body parts
        descriptor = typechain_1.SifusDescriptor__factory.connect(yield sifusToken.descriptor(), deployer);
        yield (0, utils_1.populateDescriptor)(descriptor);
        // 5a. CALCULATE Gov Delegate, takes place after 2 transactions
        const calculatedGovDelegatorAddress = hardhat_1.ethers.utils.getContractAddress({
            from: deployer.address,
            nonce: (yield deployer.getTransactionCount()) + 2,
        });
        // 5b. DEPLOY TaiyiDAOExecutor with pre-computed Delegator address
        timelock = yield new typechain_1.TaiyiDaoExecutor__factory(deployer).deploy(calculatedGovDelegatorAddress, TIME_LOCK_DELAY);
        // 6. DEPLOY Delegate
        const govDelegate = yield new typechain_1.TaiyiDaoLogicV1__factory(deployer).deploy();
        // 7a. DEPLOY Delegator
        const taiyiDAOProxy = yield new typechain_1.TaiyiDaoProxy__factory(deployer).deploy(timelock.address, sifusToken.address, taiyiDAO.address, // taiyiDAO is vetoer
        timelock.address, govDelegate.address, VOTING_PERIOD, VOTING_DELAY, PROPOSAL_THRESHOLD_BPS, QUORUM_VOTES_BPS);
        expect(calculatedGovDelegatorAddress).to.equal(taiyiDAOProxy.address);
        // 7b. CAST Delegator as Delegate
        gov = typechain_1.TaiyiDaoLogicV1__factory.connect(taiyiDAOProxy.address, deployer);
        // 8. SET Sifus owner to TaiyiDAOExecutor
        yield sifusToken.transferOwnership(timelock.address);
        // 9. SET Descriptor owner to TaiyiDAOExecutor
        yield descriptor.transferOwnership(timelock.address);
        // 10. SET ShejiTu owner to TaiyiDAOExecutor
        yield shejiTu.transferOwnership(timelock.address);
    });
}
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
describe('太乙岛提案、投票并执行对太乙世界的设计和合约组装事务', () => __awaiter(void 0, void 0, void 0, function* () {
    before(deploy);
    it('合约参数正确性', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield sifusToken.owner()).to.equal(timelock.address);
        expect(yield descriptor.owner()).to.equal(timelock.address);
        expect(yield shejiTu.owner()).to.equal(timelock.address);
        expect(yield sifusToken.taiyiDAO()).to.equal(taiyiDAO.address);
        expect(yield gov.admin()).to.equal(timelock.address);
        expect(yield timelock.admin()).to.equal(gov.address);
        expect(yield gov.timelock()).to.equal(timelock.address);
        expect(yield gov.vetoer()).to.equal(taiyiDAO.address);
        expect(yield worldYemings.isYeMing(yield shejiTu.operator())).to.eq(true);
        expect(yield actors.ownerOf(yield worldConstants.ACTOR_PANGU())).to.eq(taiyiDAO.address);
        expect(yield actors.ownerOf(yield shejiTu.operator())).to.eq(shejiTu.address);
        console.log(`提案通过进入队列后，执行合约等待期为${TIME_LOCK_DELAY}秒`);
        console.log(`提案人持票要求占比${PROPOSAL_THRESHOLD_BPS * 100 / 10000}%`);
        console.log(`投票法定票数要求占比${QUORUM_VOTES_BPS * 100 / 10000}%`);
        console.log(`投票期时长为${VOTING_PERIOD}秒`);
        console.log(`投票前冷静期为${VOTING_DELAY}秒`);
    }));
    it('噎明颁发师傅令牌', () => __awaiter(void 0, void 0, void 0, function* () {
        //PagGu mint first two sifus as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(yield worldConstants.ACTOR_PANGU(), taiyiDAO.address);
        let actorByOp1 = yield newActor(operator1);
        yield worldYemings.connect(taiyiDAO).setYeMing(actorByOp1, operator1.address);
        const receipt = yield (yield sifusToken.connect(operator1).mint(actorByOp1)).wait();
        expect(yield sifusToken.totalSupply()).to.equal(ethers_1.BigNumber.from('2'));
        expect(yield sifusToken.ownerOf(0)).to.equal(taiyiDAO.address);
        expect(yield sifusToken.ownerOf(1)).to.equal(operator1.address);
    }));
    it('移交盘古所有权/操作权到太乙岛', () => __awaiter(void 0, void 0, void 0, function* () {
        yield actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, timelock.address, actorPanGu);
        expect(yield actors.ownerOf(actorPanGu)).to.eq(timelock.address);
    }));
    it('盘古原持有人不再拥有世界设计权', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_COIN(), assetDaoli.address)).to.be.revertedWith("only PanGu");
    }));
    describe('“将「道理」合约注册到太乙世界！”', () => __awaiter(void 0, void 0, void 0, function* () {
        it('测试者发起一个提案，进入投票期', () => __awaiter(void 0, void 0, void 0, function* () {
            const description = '注册「道理」合约到太乙世界合约路由器';
            //Action: routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address)
            targets.push(worldContractRoute.address);
            values.push('0');
            signatures.push('registerModule(uint256,address)');
            callDatas.push((0, utils_1.encodeParameters)(['uint256', 'address'], [yield worldConstants.WORLD_MODULE_COIN(), assetDaoli.address]));
            yield gov.connect(operator1).propose(targets, values, signatures, callDatas, description);
            proposalId = yield gov.latestProposalIds(operator1.address);
            // Wait for VOTING_DELAY
            yield (0, utils_1.advanceBlocks)(VOTING_DELAY + 1);
        }));
        it('一位师傅投赞成票', () => __awaiter(void 0, void 0, void 0, function* () {
            // cast vote for proposal
            yield gov.connect(operator1).castVote(proposalId, 1);
            yield (0, utils_1.advanceBlocks)(VOTING_PERIOD);
        }));
        it('投票期结束，计票并进入执行队列', () => __awaiter(void 0, void 0, void 0, function* () {
            yield gov.connect(operator1).queue(proposalId);
            // Queued state
            expect(yield gov.state(proposalId)).to.equal(5);
        }));
        it('“「道理」合约注册到世界”的提案被执行', () => __awaiter(void 0, void 0, void 0, function* () {
            const { eta } = yield gov.proposals(proposalId);
            yield (0, utils_1.setNextBlockTimestamp)(eta.toNumber(), false);
            yield gov.execute(proposalId);
            // Successfully executed Action
            expect(yield worldContractRoute.modules(yield worldConstants.WORLD_MODULE_COIN())).to.eq(assetDaoli.address);
        }));
    }));
    describe('社区开发一个「木材」资源合约，太乙岛将它注册到太乙世界', () => __awaiter(void 0, void 0, void 0, function* () {
        it('任意测试者新部署一个资源合约（木材）', () => __awaiter(void 0, void 0, void 0, function* () {
            const factory = new typechain_1.WorldFungible__factory(deployer);
            assetWood = yield (yield factory.deploy("Taiyi Wood", "TYWOOD", FAKE_MODULE_WOOD, worldContractRoute.address)).deployed();
        }));
        it('测试者发起一个提案，进入投票期', () => __awaiter(void 0, void 0, void 0, function* () {
            const description = '注册「木材」合约到太乙世界合约路由器';
            //Action: routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_WOOD(), assetWood.address)
            targets.push(worldContractRoute.address);
            values.push('0');
            signatures.push('registerModule(uint256,address)');
            callDatas.push((0, utils_1.encodeParameters)(['uint256', 'address'], [FAKE_MODULE_WOOD, assetWood.address]));
            yield gov.connect(operator1).propose(targets, values, signatures, callDatas, description);
            proposalId = yield gov.latestProposalIds(operator1.address);
            // Wait for VOTING_DELAY
            yield (0, utils_1.advanceBlocks)(VOTING_DELAY + 1);
        }));
        it('一位师傅投赞成票', () => __awaiter(void 0, void 0, void 0, function* () {
            // cast vote for proposal
            yield gov.connect(operator1).castVote(proposalId, 1);
            yield (0, utils_1.advanceBlocks)(VOTING_PERIOD);
        }));
        it('投票期结束，计票并进入执行队列', () => __awaiter(void 0, void 0, void 0, function* () {
            yield gov.connect(operator1).queue(proposalId);
            // Queued state
            expect(yield gov.state(proposalId)).to.equal(5);
        }));
        it('“「木材」合约注册进世界”的提案被执行', () => __awaiter(void 0, void 0, void 0, function* () {
            const { eta } = yield gov.proposals(proposalId);
            yield (0, utils_1.setNextBlockTimestamp)(eta.toNumber(), false);
            yield gov.execute(proposalId);
            // Successfully executed Action
            expect(yield worldContractRoute.modules(FAKE_MODULE_WOOD)).to.eq(assetWood.address);
        }));
    }));
}));
