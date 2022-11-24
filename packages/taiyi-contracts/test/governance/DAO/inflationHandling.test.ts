import chai from 'chai';
import { solidity } from 'ethereum-waffle';
import hardhat from 'hardhat';

const { ethers } = hardhat;

import { BigNumber, BigNumber as EthersBN } from 'ethers';

import {
    deploySifusToken,
    getSigners,
    TestSigners,
    setTotalSupply,
    populateDescriptor,
    blockTimestamp,
    blockNumber,
} from '../../utils';

import { mineBlock, address, encodeParameters, advanceBlocks } from '../../utils';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    SifusToken,
    SifusDescriptor__factory,
    TaiyiDaoProxy__factory,
    TaiyiDaoLogicV1,
    TaiyiDaoLogicV1__factory,
    TaiyiDaoExecutor__factory,
} from '../../../typechain';
import { deployActors, deployAssetDaoli, deployWorldConstants, deployWorldContractRoute } from '../../../utils';

chai.use(solidity);
const { expect } = chai;

async function reset(): Promise<void> {
    // nonce 0: Deploy TaiyiDAOExecutor
    // nonce 1: Deploy TaiyiDAOLogicV1
    // nonce 2: Deploy multiPartRLEToSVGLibraryFactory
    // nonce 3: Deploy World Constants
    // nonce 4: Deploy World Contract Route
    // nonce 5: Deploy Taiyi Daoli ERC20
    // nonce 6: Deploy Actors
    // nonce 7: Register Actors to world route
    // nonce 8: Mint PanGu
    // nonce 9: Deploy SifusDescriptor
    // nonce 10: Deploy SifusSeeder
    // nonce 11: Deploy SifusToken
    // nonce 12: Deploy TaiyiDAOProxy
    // nonce 13+: populate Descriptor

    const govDelegatorAddress = ethers.utils.getContractAddress({
        from: deployer.address,
        nonce: (await deployer.getTransactionCount()) + 12,
    });

    // Deploy TaiyiDAOExecutor with pre-computed Delegator address
    const { address: timelockAddress } = await new TaiyiDaoExecutor__factory(deployer).deploy(
        govDelegatorAddress,
        timelockDelay,
    );

    // Deploy Delegate
    const { address: govDelegateAddress } = await new TaiyiDaoLogicV1__factory(deployer).deploy();

    // Deploy World Constants
    let worldConstants = await deployWorldConstants(deployer);

    // Deploy WorldContractRoute
    let worldContractRoute = await deployWorldContractRoute(deployer);

    //Deploy Taiyi Daoli ERC20
    let assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);

    //Deploy Actors
    const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
    let actors = await deployActors(deployer.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
    //Register Actors to world route
    await worldContractRoute.registerActors(actors.address);

    //PanGu should be mint at first, or you can not register any module
    actorPanGu = await worldConstants.ACTOR_PANGU();
    expect(actorPanGu).to.eq(1);
    expect(await actors.nextActor()).to.eq(actorPanGu);
    await actors.connect(deployer).mintActor(0);

    // Deploy Sifus token
    token = await deploySifusToken(worldContractRoute.address, deployer);

    // Deploy Delegator
    await new TaiyiDaoProxy__factory(deployer).deploy(
        timelockAddress,
        token.address,
        address(0),
        timelockAddress,
        govDelegateAddress,
        5760,
        1,
        proposalThresholdBPS,
        quorumVotesBPS,
    );

    // Cast Delegator as Delegate
    gov = TaiyiDaoLogicV1__factory.connect(govDelegatorAddress, deployer);

    await populateDescriptor(SifusDescriptor__factory.connect(await token.descriptor(), deployer));

    //set PanGu as YeMing for test
    await worldContractRoute.setYeMing(actorPanGu, deployer.address);
}

async function propose(proposer: SignerWithAddress) {
    targets = [account0.address];
    values = ['0'];
    signatures = ['getBalanceOf(address)'];
    callDatas = [encodeParameters(['address'], [account0.address])];

    await gov.connect(proposer).propose(targets, values, signatures, callDatas, 'do nothing');
    proposalId = await gov.latestProposalIds(proposer.address);
}

let token: SifusToken;
let deployer: SignerWithAddress;
let account0: SignerWithAddress;
let account1: SignerWithAddress;
let account2: SignerWithAddress;
let signers: TestSigners;

let gov: TaiyiDaoLogicV1;
const timelockDelay = 172800; // 2 days

const proposalThresholdBPS = 678; // 6.78%，提案人最小持票要求，占比
const quorumVotesBPS = 1100; // 11%，法定投票人数要求，占比

let targets: string[];
let values: string[];
let signatures: string[];
let callDatas: string[];
let proposalId: EthersBN;

let actorPanGu: BigNumber;

describe('太乙岛师傅令牌增发情况测试', () => {
    before(async () => {
        signers = await getSigners();
        deployer = signers.deployer;
        account0 = signers.account0;
        account1 = signers.account1;
        account2 = signers.account2;

        targets = [account0.address];
        values = ['0'];
        signatures = ['getBalanceOf(address)'];
        callDatas = [encodeParameters(['address'], [account0.address])];

        await reset();
    });

    it('参数配置正确性', async () => {
        expect(await gov.proposalThresholdBPS()).to.equal(proposalThresholdBPS);
        expect(await gov.quorumVotesBPS()).to.equal(quorumVotesBPS);
    });

    it('根据师傅令牌总数，法定投票要求和提案人持票要求', async () => {
        // Total Supply = 40
        await setTotalSupply(actorPanGu, token, 40);

        await mineBlock();

        // 6.78% of 40 = 2.712, floored to 2
        expect(await gov.proposalThreshold()).to.equal(2);
        // 11% of 40 = 4.4, floored to 4
        expect(await gov.quorumVotes()).to.equal(4);
    });

    it('持票不足的提案人发起提案', async () => {
        // account0 has 1 token, requires 3
        await token.transferFrom(deployer.address, account0.address, 0);
        await mineBlock();
        await expect(
            gov.connect(account0).propose(targets, values, signatures, callDatas, 'do nothing'),
        ).revertedWith('TaiyiDAO::propose: proposer votes below proposal threshold');
    });
    it('持票足够的提案人发起提案', async () => {
        // account0 has 3 token, requires 3
        await token.transferFrom(deployer.address, account0.address, 1);
        await token.transferFrom(deployer.address, account0.address, 2);

        // account1 has 3 tokens
        await token.transferFrom(deployer.address, account1.address, 3);
        await token.transferFrom(deployer.address, account1.address, 4);
        await token.transferFrom(deployer.address, account1.address, 5);

        // account2 has 5 tokens
        await token.transferFrom(deployer.address, account2.address, 6);
        await token.transferFrom(deployer.address, account2.address, 7);
        await token.transferFrom(deployer.address, account2.address, 8);
        await token.transferFrom(deployer.address, account2.address, 9);
        await token.transferFrom(deployer.address, account2.address, 10);

        await mineBlock();
        await propose(account0);
    });

    it('提案参数正确性', async () => {
        const proposal = await gov.proposals(proposalId);
        expect(proposal.proposalThreshold).to.equal(2);
        expect(proposal.quorumVotes).to.equal(4);
    });

    it('师傅令牌总数变化后，法定投票要求和提案人持票要求对应变化', async () => {
        // Total Supply = 80
        await setTotalSupply(actorPanGu, token, 80);

        // 6.78% of 80 = 5.424, floored to 5
        expect(await gov.proposalThreshold()).to.equal(5);
        // 11% of 80 = 8.88, floored to 8
        expect(await gov.quorumVotes()).to.equal(8);
    });

    it('由于师傅令牌总量增加，之前持票足够的投票人现在不满足新的持票要求', async () => {
        // account1 has 3 tokens, but requires 5 to pass new proposal threshold when totalSupply = 80 and threshold = 5%
        await expect(
            gov.connect(account1).propose(targets, values, signatures, callDatas, 'do nothing'),
        ).revertedWith('TaiyiDAO::propose: proposer votes below proposal threshold');
    });

    it('师傅令牌总量变化不会影响变化前提案参数', async () => {
        const proposal = await gov.proposals(proposalId);
        expect(proposal.proposalThreshold).to.equal(2);
        expect(proposal.quorumVotes).to.equal(4);
    });

    it('赞成票和反对票计票正确性', async () => {
        // Accounts voting for = 6 votes
        // forVotes should be greater than quorumVotes
        await gov.connect(account0).castVote(proposalId, 1); // 3
        await gov.connect(account1).castVote(proposalId, 1); // 3

        await gov.connect(account2).castVote(proposalId, 0); // 5

        const proposal = await gov.proposals(proposalId);
        expect(proposal.forVotes).to.equal(6);
        expect(proposal.againstVotes).to.equal(5);
    });

    it('投票期到达，赞成票数大于反对票数且满足法定投票数要求，提案状态', async () => {
        await advanceBlocks(5760);
        const state = await gov.state(proposalId);
        expect(state).to.equal(4);
    });
});
