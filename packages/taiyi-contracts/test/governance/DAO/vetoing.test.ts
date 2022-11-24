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

import {
    mineBlock,
    address,
    encodeParameters,
    advanceBlocks,
    setNextBlockTimestamp,
} from '../../utils';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    SifusToken,
    SifusDescriptor__factory,
    TaiyiDaoProxy__factory,
    TaiyiDaoLogicV1,
    TaiyiDaoLogicV1__factory,
    TaiyiDaoExecutor,
    TaiyiDaoExecutor__factory,
} from '../../../typechain';
import { deployActors, deployAssetDaoli, deployWorldConstants, deployWorldContractRoute } from '../../../utils';

chai.use(solidity);
const { expect } = chai;

async function expectState(proposalId: number | EthersBN, expectedState: string) {
    const states: string[] = [
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
    const actualState = states[await gov.state(proposalId)];
    expect(actualState).to.equal(expectedState);
}

async function reset(): Promise<void> {
    if (snapshotId) {
        await ethers.provider.send('evm_revert', [snapshotId]);
        snapshotId = await ethers.provider.send('evm_snapshot', []);
        return;
    }

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

    vetoer = deployer;

    const govDelegatorAddress = ethers.utils.getContractAddress({
        from: deployer.address,
        nonce: (await deployer.getTransactionCount()) + 12,
    });

    // Deploy TaiyiDAOExecutor with pre-computed Delegator address
    timelock = await new TaiyiDaoExecutor__factory(deployer).deploy(govDelegatorAddress, timelockDelay);
    const timelockAddress = timelock.address;

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
        vetoer.address,
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

    snapshotId = await ethers.provider.send('evm_snapshot', []);
}

async function propose(proposer: SignerWithAddress, mint = true) {
    if (mint) {
        await setTotalSupply(actorPanGu, token, 1);
        if (proposer.address !== deployer.address) {
            await token.transferFrom(deployer.address, proposer.address, 0);
        }
    }
    await mineBlock();
    targets = [account0.address];
    values = ['0'];
    signatures = ['getBalanceOf(address)'];
    callDatas = [encodeParameters(['address'], [account0.address])];

    await gov.connect(proposer).propose(targets, values, signatures, callDatas, 'do nothing');
    proposalId = await gov.latestProposalIds(proposer.address);
}

let snapshotId: number;

let token: SifusToken;
let deployer: SignerWithAddress;
let vetoer: SignerWithAddress;
let account0: SignerWithAddress;
let account1: SignerWithAddress;
let account2: SignerWithAddress;
let signers: TestSigners;

let gov: TaiyiDaoLogicV1;
let timelock: TaiyiDaoExecutor;
const timelockDelay = 172800; // 2 days

const proposalThresholdBPS = 500; // 5%
const quorumVotesBPS = 1000; // 10%

let targets: string[];
let values: string[];
let signatures: string[];
let callDatas: string[];
let proposalId: EthersBN;
let actorPanGu: BigNumber;

describe('太乙岛否决权测试', () => {
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

    it('否决权参数正确性检查', async () => {
        expect(await gov.vetoer()).to.equal(vetoer.address);
    });

    it('非现任否决权人不能设置新任', async () => {
        await expect(gov.connect(account0)._setVetoer(account1.address)).revertedWith(
            'TaiyiDAO::_setVetoer: vetoer only',
        );
    });

    it('现任否决权人设置新任', async () => {
        const oldVetoer = vetoer;
        vetoer = account2;
        await gov.connect(oldVetoer)._setVetoer(vetoer.address);
        expect(await gov.vetoer()).to.equal(vetoer.address);
    });

    it('只有现任否决权人能行驶否决权', async () => {
        await propose(account0);
        await expect(gov.veto(proposalId)).revertedWith('TaiyiDAO::veto: only vetoer');
    });

    it('销毁否决权', async () => {
        // vetoer is still set
        expect(await gov.vetoer()).to.equal(vetoer.address);
        await expect(gov._burnVetoPower()).revertedWith('TaiyiDAO::_burnVetoPower: vetoer only');
        // burn
        await gov.connect(vetoer)._burnVetoPower();
        expect(await gov.vetoer()).to.equal(address(0));
        await expect(gov.connect(vetoer).veto(proposalId)).revertedWith(
            'TaiyiDAO::veto: veto power burned',
        );
    });

    describe('提案在不同状态下，否决权工作情况：', async () => {
        before(reset);

        beforeEach(async () => {
            snapshotId = await ethers.provider.send('evm_snapshot', []);
        });

        afterEach(async () => {
            await ethers.provider.send('evm_revert', [snapshotId]);
        });

        it('待投票（Pending）', async () => {
            await propose(account0);
            await expectState(proposalId, 'Pending');
            await gov.veto(proposalId);
            await expectState(proposalId, 'Vetoed');
        });
        it('投票期（Active）', async () => {
            await propose(account0);
            await mineBlock();
            await mineBlock();
            await expectState(proposalId, 'Active');
            await gov.veto(proposalId);
            await expectState(proposalId, 'Vetoed');
        });
        it('已被取消（Canceled）', async () => {
            await propose(account0);
            await mineBlock();
            await mineBlock();
            await expectState(proposalId, 'Active');
            await gov.connect(account0).cancel(proposalId);
            await expectState(proposalId, 'Canceled');
            await gov.veto(proposalId);
            await expectState(proposalId, 'Vetoed');
        });
        it('已被否决（Defeated）', async () => {
            await setTotalSupply(actorPanGu, token, 3);
            await token.transferFrom(deployer.address, account0.address, 0);
            await token.transferFrom(deployer.address, account1.address, 1);
            await token.transferFrom(deployer.address, account1.address, 2);
            await propose(account0, false);
            await mineBlock();
            await mineBlock();
            await expectState(proposalId, 'Active');
            // account0 with 1 vote casts for vote
            await gov.connect(account0).castVote(proposalId, 1);
            // account1 with 2 votes casts against vote
            await gov.connect(account1).castVote(proposalId, 0);
            await advanceBlocks(5780);
            await expectState(proposalId, 'Defeated');
            await gov.veto(proposalId);
            await expectState(proposalId, 'Vetoed');
        });
        it('已通过（Succeeded）', async () => {
            await setTotalSupply(actorPanGu, token, 3);
            await token.transferFrom(deployer.address, account0.address, 0);
            await token.transferFrom(deployer.address, account1.address, 1);
            await token.transferFrom(deployer.address, account1.address, 2);
            await propose(account0, false);
            await mineBlock();
            await mineBlock();
            await expectState(proposalId, 'Active');
            // account0 with 1 vote casts against vote
            await gov.connect(account0).castVote(proposalId, 0);
            // account1 with 2 votes casts for vote
            await gov.connect(account1).castVote(proposalId, 1);
            await advanceBlocks(5780);
            await expectState(proposalId, 'Succeeded');
            await gov.veto(proposalId);
            await expectState(proposalId, 'Vetoed');
        });
        it('已进入执行队列（Queued）', async () => {
            await propose(account0);
            await mineBlock();
            await mineBlock();
            await expectState(proposalId, 'Active');
            await gov.connect(account0).castVote(proposalId, 1);
            await advanceBlocks(5780);
            await gov.queue(proposalId);
            await expectState(proposalId, 'Queued');
            await gov.veto(proposalId);
            await expectState(proposalId, 'Vetoed');
        });
        it('执行超时（Expired）', async () => {
            await propose(account0);
            await mineBlock();
            await mineBlock();
            await expectState(proposalId, 'Active');
            await gov.connect(account0).castVote(proposalId, 1);
            await advanceBlocks(5780);
            await gov.queue(proposalId);
            const proposal = await gov.proposals(proposalId);
            await setNextBlockTimestamp(
                proposal.eta.toNumber() + (await timelock.GRACE_PERIOD()).toNumber() + 1,
            );
            await expectState(proposalId, 'Expired');
            await gov.veto(proposalId);
            await expectState(proposalId, 'Vetoed');
        });
        it('已被执行（Executed）', async () => {
            await propose(account0);
            await mineBlock();
            await mineBlock();
            await expectState(proposalId, 'Active');
            await gov.connect(account0).castVote(proposalId, 1);
            await advanceBlocks(5780);
            await gov.queue(proposalId);
            const proposal = await gov.proposals(proposalId);
            await setNextBlockTimestamp(proposal.eta.toNumber() + 1);
            await gov.execute(proposalId);
            await expectState(proposalId, 'Executed');
            await expect(gov.veto(proposalId)).revertedWith(
                'TaiyiDAO::veto: cannot veto executed proposal',
            );
        });
        it('已被否决人否决（Vetoed）', async () => {
            await propose(account0);
            await expectState(proposalId, 'Pending');
            await gov.veto(proposalId);
            await expectState(proposalId, 'Vetoed');
            await gov.veto(proposalId);
            await expectState(proposalId, 'Vetoed');
        });
    });
});
