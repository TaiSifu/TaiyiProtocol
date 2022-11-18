import chai from 'chai';
import { ethers, upgrades } from 'hardhat';
import { BigNumber, BigNumber as EthersBN } from 'ethers';
import { solidity } from 'ethereum-waffle';

import {
    Weth,
    SifusToken, SifusDescriptor, SifusDescriptor__factory,
    ShejiTu, ShejiTu__factory,
    TaiyiDaoLogicV1, TaiyiDaoLogicV1__factory, TaiyiDaoExecutor, TaiyiDaoExecutor__factory, 
    WorldConstants,
    WorldContractRoute,
    TaiyiDaoProxy__factory,
    ActorAttributesConstants,
    Actors,
    ActorAttributes,
    WorldContractRoute__factory,
} from '../typechain';

import {
    deploySifusToken,
    deployWeth,
    populateDescriptor,
    address,
    encodeParameters,
    advanceBlocks,
    blockTimestamp,
    setNextBlockTimestamp,
    blockNumber,
} from './utils';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { deployActorAttributes, deployActorAttributesConstants, deployActors, deployAssetDaoli, deployWorldConstants, deployWorldContractRoute, deployWorldRandom } from '../utils';

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

const RESERVE_PRICE = 2;

// ShejiTu Config
const ONE_AGE_VSECOND : number = 1;

async function deploy() {
    [deployer, wethDeployer, taiyiDAO, operator1] = await ethers.getSigners();

    // Deployed by another account to simulate real network
    weth = await deployWeth(wethDeployer);

    // 1. DEPLOY Sifus token
    sifusToken = await deploySifusToken(deployer, taiyiDAO.address,
        deployer.address, // do not know minter/shejitu yet
    );

    // 2a. DEPLOY ShejiTu with world basic
    //-World Constants
    worldConstants = await deployWorldConstants(deployer);
    actorAttributesConstants = await deployActorAttributesConstants(deployer);
    //-WorldContractRoute
    worldContractRoute = await deployWorldContractRoute(deployer);
    //-TaiyiDaoli ERC20
    let assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);
    //-Actors
    const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
    actors = await deployActors(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
    await worldContractRoute.registerActors(actors.address);
    //PanGu should be mint at first, or you can not register any module
    expect(await actors.connect(taiyiDAO).nextActor()).to.eq(1);
    expect(await worldConstants.ACTOR_PANGU()).to.eq(1);
    await actors.connect(taiyiDAO).mintActor(0);
    //connect route to operator
    let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, taiyiDAO);
    //deploy world basic modules
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), (await deployWorldRandom(deployer)).address);
    actorAttributes = await deployActorAttributes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address)
    //-ShejiTu
    console.log(`deploy ShejiTu with oneAgeVSecond=${ONE_AGE_VSECOND}`);
    //the second actor minted should be YeMing for ShejiTu its self
    expect(await actors.connect(taiyiDAO).nextActor()).to.eq(2);
    const shejiTuFactory = await ethers.getContractFactory('ShejiTu', deployer);
    const shejiTuProxy = await upgrades.deployProxy(shejiTuFactory, [
        sifusToken.address,
        ONE_AGE_VSECOND,
        worldContractRoute.address
    ]);
    // 2b. CAST proxy as ShejiTu
    shejiTu = ShejiTu__factory.connect(shejiTuProxy.address, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TIMELINE(), shejiTu.address);
    expect(await shejiTu.ACTOR_YEMING()).to.eq(2);
    //- register yeming for shejitu
    await routeByPanGu.setYeMing(await shejiTu.ACTOR_YEMING(), shejiTu.address);

    // 3. SET MINTER
    await sifusToken.setMinter(shejiTu.address);

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

    // 11.JUST FOR TEST, mint two sifu
    // PagGu mint first two sifus as YeMing for test
    await worldContractRoute.connect(taiyiDAO).setYeMing(await worldConstants.ACTOR_PANGU(), taiyiDAO.address);
    await shejiTu.connect(taiyiDAO).mintSifu(await worldConstants.ACTOR_PANGU(), operator1.address);
}

describe('太乙岛和社稷图端对端测试（合约部署，颁发师傅令牌, 提案，投票，执行）', async () => {
    before(deploy);

    it('初始参数正确性', async () => {
        expect(await sifusToken.owner()).to.equal(timelock.address);
        expect(await descriptor.owner()).to.equal(timelock.address);
        expect(await shejiTu.owner()).to.equal(timelock.address);

        expect(await sifusToken.minter()).to.equal(shejiTu.address);
        expect(await sifusToken.taiyiDAO()).to.equal(taiyiDAO.address);

        expect(await gov.admin()).to.equal(timelock.address);
        expect(await timelock.admin()).to.equal(gov.address);
        expect(await gov.timelock()).to.equal(timelock.address);

        expect(await gov.vetoer()).to.equal(taiyiDAO.address);

        expect(await sifusToken.totalSupply()).to.equal(EthersBN.from('2'));

        expect(await sifusToken.ownerOf(0)).to.equal(taiyiDAO.address);
        expect(await sifusToken.ownerOf(1)).to.equal(operator1.address);
    });

    it('允许太乙岛金库（TaiyiDAOExecutor）接收外部资金', async () => {
        // test receive()
        await operator1.sendTransaction({
            to: timelock.address,
            value: RESERVE_PRICE,
        });

        expect(await ethers.provider.getBalance(timelock.address)).to.equal(RESERVE_PRICE);

        // test fallback() calls deposit(uint) which is not implemented
        await operator1.sendTransaction({
            data: '0xb6b55f250000000000000000000000000000000000000000000000000000000000000001',
            to: timelock.address,
            value: 10,
        });

        expect(await ethers.provider.getBalance(timelock.address)).to.equal(10+RESERVE_PRICE);
    });

    it('师傅发起提案，投票，提案进入排队', async () => {
        const description = 'Set sifusToken minter to address(1) and transfer treasury to address(2)';

        // Action 1. Execute sifusToken.setMinter(address(1))
        targets.push(sifusToken.address);
        values.push('0');
        signatures.push('setMinter(address)');
        callDatas.push(encodeParameters(['address'], [address(1)]));

        // Action 2. Execute transfer RESERVE_PRICE to address(2)
        targets.push(address(2));
        values.push(String(RESERVE_PRICE));
        signatures.push('');
        callDatas.push('0x');

        await gov.connect(operator1).propose(targets, values, signatures, callDatas, description);
        proposalId = await gov.latestProposalIds(operator1.address);

        // Wait for VOTING_DELAY
        await advanceBlocks(VOTING_DELAY + 1);

        // cast vote for proposal
        await gov.connect(operator1).castVote(proposalId, 1);

        await advanceBlocks(VOTING_PERIOD);

        await gov.connect(operator1).queue(proposalId);

        // Queued state
        expect(await gov.state(proposalId)).to.equal(5);
    });

    it('提案执行正确性', async () => {
        const { eta } = await gov.proposals(proposalId);
        await setNextBlockTimestamp(eta.toNumber(), false);
        await gov.execute(proposalId);

        // Successfully executed Action 1
        expect(await sifusToken.minter()).to.equal(address(1));

        // Successfully executed Action 2
        expect(await ethers.provider.getBalance(address(2))).to.equal(RESERVE_PRICE);
        expect(await ethers.provider.getBalance(timelock.address)).to.equal(10);
    });

    it('太乙岛不允许直接接收资金', async () => {
        let error1;

        // TaiyiDAO does not accept value without calldata
        try {
            await operator1.sendTransaction({
                to: gov.address,
                value: 10,
            });
        } catch (e) {
            error1 = e;
        }

        expect(error1);

        let error2;

        // TaiyiDAO does not accept value with calldata
        try {
            await operator1.sendTransaction({
                data: '0xb6b55f250000000000000000000000000000000000000000000000000000000000000001',
                to: gov.address,
                value: 10,
            });
        } catch (e) {
            error2 = e;
        }

        expect(error2);
    });
});
