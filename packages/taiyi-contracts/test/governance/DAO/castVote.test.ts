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

import { mineBlock, address, encodeParameters } from '../../utils';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    SifusToken,
    SifusDescriptor__factory,
    TaiyiDAOLogicV1Harness,
    TaiyiDAOLogicV1Harness__factory,
    WorldConstants,
    WorldContractRoute,
    Actors,
    WorldFungible,
} from '../../../typechain';
import { deployActors, deployAssetDaoli, deployWorldConstants, deployWorldContractRoute, deployWorldYemings } from '../../../utils';

chai.use(solidity);
const { expect } = chai;

async function deployGovernor(
    deployer: SignerWithAddress,
    tokenAddress: string,
): Promise<TaiyiDAOLogicV1Harness> {
    const { address: govDelegateAddress } = await new TaiyiDAOLogicV1Harness__factory(deployer).deploy();
    const { address: _govDelegatorAddress } = await (await ethers.getContractFactory('TaiyiDAOProxy', deployer)).deploy(
        address(0),
        tokenAddress,
        deployer.address,
        address(0),
        govDelegateAddress,
        17280,
        1,
        1,
        1,
    );

    return TaiyiDAOLogicV1Harness__factory.connect(_govDelegatorAddress, deployer);
}

let snapshotId: number;

let token: SifusToken;
let deployer: SignerWithAddress;
let account0: SignerWithAddress;
let account1: SignerWithAddress;
let account2: SignerWithAddress;
let signers: TestSigners;

let worldConstants: WorldConstants;
let worldContractRoute: WorldContractRoute;
let actors: Actors;
let assetDaoli: WorldFungible;

let actorPanGu: BigNumber;

let gov: TaiyiDAOLogicV1Harness;
let targets: string[];
let values: string[];
let signatures: string[];
let callDatas: string[];
let proposalId: EthersBN;

async function reset() {
    if (snapshotId) {
        await ethers.provider.send('evm_revert', [snapshotId]);
        snapshotId = await ethers.provider.send('evm_snapshot', []);
        return;
    }

    //Deploy Actors and world basic
    worldConstants = await deployWorldConstants(deployer);
    worldContractRoute = await deployWorldContractRoute(deployer);
    assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);

    const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
    actors = await deployActors(deployer.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
    await worldContractRoute.registerActors(actors.address);

    //PanGu should be mint at first, or you can not register any module
    actorPanGu = await worldConstants.ACTOR_PANGU();
    expect(actorPanGu).to.eq(1);
    expect(await actors.nextActor()).to.eq(actorPanGu);
    await actors.mintActor(0);

    let worldYemings = await deployWorldYemings(deployer.address, deployer);
    await worldContractRoute.registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
    await worldYemings.setYeMing(actorPanGu, deployer.address);

    token = await deploySifusToken(worldContractRoute.address, signers.deployer);
    await populateDescriptor(SifusDescriptor__factory.connect(await token.descriptor(), signers.deployer));

    await setTotalSupply(actorPanGu, token, 10);

    gov = await deployGovernor(deployer, token.address);
    snapshotId = await ethers.provider.send('evm_snapshot', []);
}

async function propose(proposer: SignerWithAddress) {
    targets = [account0.address];
    values = ['0'];
    signatures = ['getBalanceOf(address)'];
    callDatas = [encodeParameters(['address'], [account0.address])];

    await gov.connect(proposer).propose(targets, values, signatures, callDatas, 'do nothing');
    proposalId = await gov.latestProposalIds(proposer.address);
}

describe('太乙岛投票测试', () => {
    before(async () => {
        signers = await getSigners();
        deployer = signers.deployer;
        account0 = signers.account0;
        account1 = signers.account1;
        account2 = signers.account2;
    });

    describe('失败（revert）的情况：', () => {
        before(async () => {
            await reset();
            await propose(deployer);
        });

        it("未在投票期之内投票", async () => {
            await expect(gov.castVote(proposalId, 1)).revertedWith(
                'TaiyiDAO::castVoteInternal: voting is closed',
            );
        });

        it('已经投过票的投票人再次投票', async () => {
            await mineBlock();
            await mineBlock();

            await token.transferFrom(deployer.address, account0.address, 0);
            await token.transferFrom(deployer.address, account1.address, 1);

            await gov.connect(account0).castVote(proposalId, 1);

            await gov.connect(account1).castVoteWithReason(proposalId, 1, '');

            await expect(gov.connect(account0).castVote(proposalId, 1)).revertedWith(
                'TaiyiDAO::castVoteInternal: voter already voted',
            );
        });
    });

    describe('成功的情况：', () => {
        it("投票后将发起者地址加入提案的投票人列表（尽管发起者没有票）", async () => {
            const voteReceipt1 = await gov.getReceipt(proposalId, account2.address);
            expect(voteReceipt1.hasVoted).to.equal(false);

            await gov.connect(account2).castVote(proposalId, 1);
            const voteReceipt2 = await gov.getReceipt(proposalId, account2.address);
            expect(voteReceipt2.hasVoted).to.equal(true);
        });

        describe("持票人投票", () => {
            let actor: SignerWithAddress; // an account that will propose, receive tokens, delegate to self, and vote on own proposal

            before(reset);

            it('赞成票核验', async () => {
                actor = account0;

                await token.transferFrom(deployer.address, actor.address, 0);
                await token.transferFrom(deployer.address, actor.address, 1);
                await propose(actor);

                const beforeFors = (await gov.proposals(proposalId)).forVotes;
                await mineBlock();
                await gov.connect(actor).castVote(proposalId, 1);

                const afterFors = (await gov.proposals(proposalId)).forVotes;

                const balance = (await token.balanceOf(actor.address)).toString();

                expect(afterFors).to.equal(beforeFors.add(balance));
            });

            it("反对票核验", async () => {
                actor = account1;
                await token.transferFrom(deployer.address, actor.address, 2);
                await token.transferFrom(deployer.address, actor.address, 3);

                await propose(actor);

                const beforeAgainst = (await gov.proposals(proposalId)).againstVotes;

                await mineBlock();
                await gov.connect(actor).castVote(proposalId, 0);

                const afterAgainst = (await gov.proposals(proposalId)).againstVotes;

                const balance = (await token.balanceOf(actor.address)).toString();

                expect(afterAgainst).to.equal(beforeAgainst.add(balance));
            });
        });
    });
});
