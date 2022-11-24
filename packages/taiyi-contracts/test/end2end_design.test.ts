import chai from 'chai';
import { ethers, upgrades } from 'hardhat';
import { BigNumber, BigNumber as EthersBN } from 'ethers';
import { solidity } from 'ethereum-waffle';

import {
    Weth,
    SifusToken, SifusDescriptor, SifusDescriptor__factory,
    TaiyiDaoProxy__factory, TaiyiDaoLogicV1, TaiyiDaoLogicV1__factory, TaiyiDaoExecutor, TaiyiDaoExecutor__factory,
    WorldContractRoute__factory, ShejiTu, ShejiTu__factory, Actors,
    WorldConstants, WorldContractRoute, ActorAttributesConstants, ActorAttributes, WorldFungible,
} from '../typechain';

import {
    deploySifusToken, deployWeth, populateDescriptor,
    address, encodeParameters, advanceBlocks, blockTimestamp, setNextBlockTimestamp, blockNumber,
} from './utils';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    deployActorAttributes, deployActorAttributesConstants, deployActors, deployAssetDaoli, deployAssetWood, deployWorldConstants,
    deployWorldContractRoute, deployWorldRandom
} from '../utils';

chai.use(solidity);
const { expect } = chai;

let sifusToken: SifusToken;
let shejiTu: ShejiTu;
let descriptor: SifusDescriptor;
let weth: Weth;
let gov: TaiyiDaoLogicV1;
let timelock: TaiyiDaoExecutor;

let deployer: SignerWithAddress;
let wethDeployer: SignerWithAddress;
let taiyiDAO: SignerWithAddress;
let operator1: SignerWithAddress;

let worldConstants: WorldConstants;
let actorAttributesConstants: ActorAttributesConstants;
let worldContractRoute: WorldContractRoute;
let actors: Actors;
let actorAttributes: ActorAttributes;
let assetDaoli: WorldFungible;
let assetWood: WorldFungible;


let actorPanGu: BigNumber;

// Governance Config
const TIME_LOCK_DELAY = 172_800; // 2 days
const PROPOSAL_THRESHOLD_BPS = 500; // 5%
const QUORUM_VOTES_BPS = 1_000; // 10%
const VOTING_PERIOD = 5_760; // About 24 hours with 15s blocks
const VOTING_DELAY = 1; // 1 block

// Proposal Config
const targets: string[] = [];
const values: string[] = [];
const signatures: string[] = [];
const callDatas: string[] = [];

let proposalId: EthersBN;

async function deploy() {
    [deployer, wethDeployer, taiyiDAO, operator1] = await ethers.getSigners();

    // Deployed by another account to simulate real network
    weth = await deployWeth(wethDeployer);

    // 1. DEPLOY Actors with world basic
    //-World Constants
    worldConstants = await deployWorldConstants(deployer);
    actorAttributesConstants = await deployActorAttributesConstants(deployer);
    //-WorldContractRoute
    worldContractRoute = await deployWorldContractRoute(deployer);
    //-Daoli ERC20
    assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);
    //-Actors
    const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
    actors = await deployActors(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
    await worldContractRoute.registerActors(actors.address);
    //PanGu should be mint at first, or you can not register any module
    actorPanGu = await worldConstants.ACTOR_PANGU();
    expect(actorPanGu).to.eq(1);
    expect(await actors.nextActor()).to.eq(actorPanGu);
    await actors.connect(taiyiDAO).mintActor(0);
    //-World basic modules
    await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_RANDOM(), (await deployWorldRandom(deployer)).address);
    actorAttributes = await deployActorAttributes(worldContractRoute, deployer);
    await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address)

    // 2. DEPLOY Sifus token
    sifusToken = await deploySifusToken(worldContractRoute.address, deployer, taiyiDAO.address);

    // 3a. DEPLOY ShejiTu
    //-ShejiTu
    //the second actor minted should be YeMing for ShejiTu its self
    expect(await actors.connect(taiyiDAO).nextActor()).to.eq(2);
    const shejiTuFactory = await ethers.getContractFactory('ShejiTu', deployer);
    const shejiTuProxy = await upgrades.deployProxy(shejiTuFactory, [
        sifusToken.address,
        worldContractRoute.address
    ]);
    // 3b. CAST proxy as ShejiTu
    shejiTu = ShejiTu__factory.connect(shejiTuProxy.address, deployer);
    await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_TIMELINE(), shejiTu.address);
    //- register yeming for shejitu
    expect(await shejiTu.ACTOR_YEMING()).to.eq(2);
    await worldContractRoute.connect(taiyiDAO).setYeMing(await shejiTu.ACTOR_YEMING(), shejiTu.address);

    // 4. POPULATE body parts
    descriptor = SifusDescriptor__factory.connect(await sifusToken.descriptor(), deployer);
    await populateDescriptor(descriptor);

    // 5a. CALCULATE Gov Delegate, takes place after 2 transactions
    const calculatedGovDelegatorAddress = ethers.utils.getContractAddress({
        from: deployer.address,
        nonce: (await deployer.getTransactionCount()) + 2,
    });
    // 5b. DEPLOY TaiyiDAOExecutor with pre-computed Delegator address
    timelock = await new TaiyiDaoExecutor__factory(deployer).deploy(
        calculatedGovDelegatorAddress,
        TIME_LOCK_DELAY,
    );

    // 6. DEPLOY Delegate
    const govDelegate = await new TaiyiDaoLogicV1__factory(deployer).deploy();

    // 7a. DEPLOY Delegator
    const taiyiDAOProxy = await new TaiyiDaoProxy__factory(deployer).deploy(
        timelock.address,
        sifusToken.address,
        taiyiDAO.address, // taiyiDAO is vetoer
        timelock.address,
        govDelegate.address,
        VOTING_PERIOD,
        VOTING_DELAY,
        PROPOSAL_THRESHOLD_BPS,
        QUORUM_VOTES_BPS,
    );
    expect(calculatedGovDelegatorAddress).to.equal(taiyiDAOProxy.address);
    // 7b. CAST Delegator as Delegate
    gov = TaiyiDaoLogicV1__factory.connect(taiyiDAOProxy.address, deployer);

    // 8. SET Sifus owner to TaiyiDAOExecutor
    await sifusToken.transferOwnership(timelock.address);

    // 9. SET Descriptor owner to TaiyiDAOExecutor
    await descriptor.transferOwnership(timelock.address);

    // 10. SET ShejiTu owner to TaiyiDAOExecutor
    await shejiTu.transferOwnership(timelock.address);
}

let newActor = async (toWho: SignerWithAddress):Promise<BigNumber> => {
    //deal coin
    await assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1000e18));
    await assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, BigInt(1000e18));
    await assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
    let _actor = await actors.nextActor();
    await actors.connect(taiyiDAO).mintActor(BigInt(100e18));
    await actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
    return _actor;
}

describe('太乙岛提案、投票并执行对太乙世界的设计和合约组装事务', async () => {

    before(deploy);

    it('合约参数正确性', async () => {
        expect(await sifusToken.owner()).to.equal(timelock.address);
        expect(await descriptor.owner()).to.equal(timelock.address);
        expect(await shejiTu.owner()).to.equal(timelock.address);

        expect(await sifusToken.taiyiDAO()).to.equal(taiyiDAO.address);

        expect(await gov.admin()).to.equal(timelock.address);
        expect(await timelock.admin()).to.equal(gov.address);
        expect(await gov.timelock()).to.equal(timelock.address);

        expect(await gov.vetoer()).to.equal(taiyiDAO.address);

        expect(await worldContractRoute.isYeMing(await shejiTu.ACTOR_YEMING())).to.eq(true);

        expect(await actors.ownerOf(await worldConstants.ACTOR_PANGU())).to.eq(taiyiDAO.address);
        expect(await actors.ownerOf(await shejiTu.ACTOR_YEMING())).to.eq(shejiTu.address);

        console.log(`提案通过进入队列后，执行合约等待期为${TIME_LOCK_DELAY}秒`);
        console.log(`提案人持票要求占比${PROPOSAL_THRESHOLD_BPS * 100 / 10000}%`);
        console.log(`投票法定票数要求占比${QUORUM_VOTES_BPS * 100 / 10000}%`);
        console.log(`投票期时长为${VOTING_PERIOD}秒`);
        console.log(`投票前冷静期为${VOTING_DELAY}秒`);
    });

    it('社稷图颁发师傅令牌（需要事件，待实现）', async () => {
        //PagGu mint first two sifus as YeMing for test
        await worldContractRoute.connect(taiyiDAO).setYeMing(await worldConstants.ACTOR_PANGU(), taiyiDAO.address);

        let actorByOp1 = await newActor(operator1);
        await worldContractRoute.connect(taiyiDAO).setYeMing(actorByOp1, operator1.address);

        const receipt = await (await sifusToken.connect(operator1).mint(actorByOp1)).wait();

        expect(await sifusToken.totalSupply()).to.equal(EthersBN.from('2'));

        expect(await sifusToken.ownerOf(0)).to.equal(taiyiDAO.address);
        expect(await sifusToken.ownerOf(1)).to.equal(operator1.address);
    });

    it('移交盘古所有权/操作权到太乙岛', async () => {
        await actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, timelock.address, actorPanGu);
        expect(await actors.ownerOf(actorPanGu)).to.eq(timelock.address);
    });

    it('盘古原持有人不再拥有世界设计权', async () => {
        await expect(worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address)).to.be.revertedWith("only PanGu");
    });

    describe('“将「道理」合约注册到太乙世界！”', async () => {
        it('测试者发起一个提案，进入投票期', async () => {
            const description = '注册「道理」合约到太乙世界合约路由器';

            //Action: routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address)
            targets.push(worldContractRoute.address);
            values.push('0');
            signatures.push('registerModule(uint256,address)');
            callDatas.push(encodeParameters(['uint256', 'address'], [await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address]));

            await gov.connect(operator1).propose(targets, values, signatures, callDatas, description);
            proposalId = await gov.latestProposalIds(operator1.address);

            // Wait for VOTING_DELAY
            await advanceBlocks(VOTING_DELAY + 1);
        });

        it('一位师傅投赞成票', async () => {
            // cast vote for proposal
            await gov.connect(operator1).castVote(proposalId, 1);

            await advanceBlocks(VOTING_PERIOD);
        });

        it('投票期结束，计票并进入执行队列', async () => {
            await gov.connect(operator1).queue(proposalId);

            // Queued state
            expect(await gov.state(proposalId)).to.equal(5);
        });

        it('“「道理」合约注册到世界”的提案被执行', async () => {
            const { eta } = await gov.proposals(proposalId);
            await setNextBlockTimestamp(eta.toNumber(), false);
            await gov.execute(proposalId);

            // Successfully executed Action
            expect(await worldContractRoute.modules(await worldConstants.WORLD_MODULE_COIN())).to.eq(assetDaoli.address);
        });
    });

    describe('社区开发一个「木材」资源合约，太乙岛将它注册到太乙世界', async () => {
        it('任意测试者新部署一个资源合约（木材）', async () => {
            assetWood = await deployAssetWood(worldConstants, worldContractRoute, deployer);
        });

        it('测试者发起一个提案，进入投票期', async () => {
            const description = '注册「木材」合约到太乙世界合约路由器';

            //Action: routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_WOOD(), assetWood.address)
            targets.push(worldContractRoute.address);
            values.push('0');
            signatures.push('registerModule(uint256,address)');
            callDatas.push(encodeParameters(['uint256', 'address'], [await worldConstants.WORLD_MODULE_WOOD(), assetWood.address]));

            await gov.connect(operator1).propose(targets, values, signatures, callDatas, description);
            proposalId = await gov.latestProposalIds(operator1.address);

            // Wait for VOTING_DELAY
            await advanceBlocks(VOTING_DELAY + 1);
        });

        it('一位师傅投赞成票', async () => {
            // cast vote for proposal
            await gov.connect(operator1).castVote(proposalId, 1);

            await advanceBlocks(VOTING_PERIOD);
        });

        it('投票期结束，计票并进入执行队列', async () => {
            await gov.connect(operator1).queue(proposalId);

            // Queued state
            expect(await gov.state(proposalId)).to.equal(5);
        });

        it('“「木材」合约注册进世界”的提案被执行', async () => {
            const { eta } = await gov.proposals(proposalId);
            await setNextBlockTimestamp(eta.toNumber(), false);
            await gov.execute(proposalId);

            // Successfully executed Action
            expect(await worldContractRoute.modules(await worldConstants.WORLD_MODULE_WOOD())).to.eq(assetWood.address);
        });
    });
});
