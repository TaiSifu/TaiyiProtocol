//npx hardhat node
//yarn test ./test/end2end_design.test.ts --network hard
import chai from 'chai';
import { ethers, upgrades } from 'hardhat';
import { BigNumber, BigNumber as EthersBN } from 'ethers';
import { solidity } from 'ethereum-waffle';

import {
    Weth,
    SifusToken, SifusDescriptor, SifusDescriptor__factory, ShejiTu, ShejiTu__factory, Actors,
    TaiyiDaoProxy__factory, TaiyiDaoLogicV1, TaiyiDaoLogicV1__factory, TaiyiDaoExecutor, TaiyiDaoExecutor__factory,    
    WorldConstants, WorldContractRoute, ActorAttributes, WorldFungible, WorldRandom, WorldYemings, WorldEvents, WorldZones,
    ActorLocations, ActorTalents, Trigrams, WorldFungible__factory, AssetDaoli,
} from '../typechain';

import {
    deploySifusToken, deployWeth, populateDescriptor,
    address, encodeParameters, advanceBlocks, blockTimestamp, setNextBlockTimestamp, blockNumber,
} from './utils';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    deployActorAttributes, deployActorLocations, deployActors, deployActorTalents, deployAssetDaoli, deployTrigrams, deployWorldConstants,
    deployWorldContractRoute, deployWorldEvents, deployWorldRandom, deployWorldYemings, deployWorldZones
} from '../utils';

chai.use(solidity);
const { expect } = chai;

let sifusToken: SifusToken;
let shejiTu: ShejiTu;
let descriptor: SifusDescriptor;
//let weth: Weth;
let gov: TaiyiDaoLogicV1;
let timelock: TaiyiDaoExecutor;

let deployer: SignerWithAddress;
let wethDeployer: SignerWithAddress;
let taiyiDAO: SignerWithAddress;
let operator1: SignerWithAddress;

let worldConstants: WorldConstants;
let worldContractRoute: WorldContractRoute;
let actors: Actors;
let worldRandom: WorldRandom;
let worldYemings: WorldYemings;
let worldEvents: WorldEvents;
let assetDaoli: AssetDaoli;
let actorAttributes: ActorAttributes;
let worldZones: WorldZones;
let actorLocations: ActorLocations;
let actorTalents: ActorTalents;
let trigrams: Trigrams;
let assetWood: WorldFungible;

let actorPanGu: BigNumber;

const OneAgeVSecond : number = 1;
const FAKE_MODULE_EVENTS = 101;
const FAKE_MODULE_TIMELINE = 102;
const FAKE_MODULE_TALENTS = 103;
const FAKE_MODULE_WOOD = 104;

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
    //weth = await deployWeth(wethDeployer);

    // 1. DEPLOY Actors with world basic
    //-World Constants
    worldConstants = await deployWorldConstants(deployer);
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

    //-World basic modules pre shejitu
    let routeByPanGu = worldContractRoute.connect(taiyiDAO);
    worldRandom = await deployWorldRandom(deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address);
    worldYemings = await deployWorldYemings(taiyiDAO.address, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
    actorAttributes = await deployActorAttributes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address);
    worldEvents = await deployWorldEvents(OneAgeVSecond, FAKE_MODULE_EVENTS, worldContractRoute, deployer);
    await routeByPanGu.registerModule(FAKE_MODULE_EVENTS, worldEvents.address);
    actorLocations = await deployActorLocations(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ACTOR_LOCATIONS(), actorLocations.address);
    worldZones = await deployWorldZones(worldContractRoute, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ZONES(), worldZones.address);
    actorTalents = await deployActorTalents(FAKE_MODULE_TALENTS, routeByPanGu, deployer);
    await routeByPanGu.registerModule(FAKE_MODULE_TALENTS, actorTalents.address);
    trigrams = await deployTrigrams(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TRIGRAMS(), trigrams.address);

    // 2. DEPLOY Sifus token
    sifusToken = await deploySifusToken(worldContractRoute.address, deployer, taiyiDAO.address);

    // 3a. DEPLOY ShejiTu
    //-ShejiTu
    //the second actor minted should be YeMing for ShejiTu its self
    expect(await actors.connect(taiyiDAO).nextActor()).to.eq(2);
    const shejiTuFactory = await ethers.getContractFactory('ShejiTu', deployer);
    const shejiTuProxy = await upgrades.deployProxy(shejiTuFactory, [
        "??????", "????????????????????????", FAKE_MODULE_TIMELINE,
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
    shejiTu = ShejiTu__factory.connect(shejiTuProxy.address, deployer);
    await worldContractRoute.connect(taiyiDAO).registerModule(FAKE_MODULE_TIMELINE, shejiTu.address);
    //- register yeming for shejitu
    let shejiTuOperator = await actors.nextActor();
    await actors.mintActor(0);
    await actors.approve(shejiTu.address, shejiTuOperator);
    await shejiTu.initOperator(shejiTuOperator);
    await worldYemings.connect(taiyiDAO).setYeMing(await shejiTu.operator(), shejiTu.address);

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

describe('??????????????????????????????????????????????????????????????????????????????', async () => {

    before(deploy);

    it('?????????????????????', async () => {
        expect(await sifusToken.owner()).to.equal(timelock.address);
        expect(await descriptor.owner()).to.equal(timelock.address);
        expect(await shejiTu.owner()).to.equal(timelock.address);

        expect(await sifusToken.taiyiDAO()).to.equal(taiyiDAO.address);

        expect(await gov.admin()).to.equal(timelock.address);
        expect(await timelock.admin()).to.equal(gov.address);
        expect(await gov.timelock()).to.equal(timelock.address);

        expect(await gov.vetoer()).to.equal(taiyiDAO.address);

        expect(await worldYemings.isYeMing(await shejiTu.operator())).to.eq(true);

        expect(await actors.ownerOf(await worldConstants.ACTOR_PANGU())).to.eq(taiyiDAO.address);
        expect(await actors.ownerOf(await shejiTu.operator())).to.eq(shejiTu.address);

        console.log(`??????????????????????????????????????????????????????${TIME_LOCK_DELAY}???`);
        console.log(`???????????????????????????${PROPOSAL_THRESHOLD_BPS * 100 / 10000}%`);
        console.log(`??????????????????????????????${QUORUM_VOTES_BPS * 100 / 10000}%`);
        console.log(`??????????????????${VOTING_PERIOD}???`);
        console.log(`?????????????????????${VOTING_DELAY}???`);
    });

    it('????????????????????????', async () => {
        //PagGu mint first two sifus as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(await worldConstants.ACTOR_PANGU(), taiyiDAO.address);

        let actorByOp1 = await newActor(operator1);
        await worldYemings.connect(taiyiDAO).setYeMing(actorByOp1, operator1.address);

        const receipt = await (await sifusToken.connect(operator1).mint(actorByOp1)).wait();

        expect(await sifusToken.totalSupply()).to.equal(EthersBN.from('2'));

        expect(await sifusToken.ownerOf(0)).to.equal(taiyiDAO.address);
        expect(await sifusToken.ownerOf(1)).to.equal(operator1.address);
    });

    it('?????????????????????/?????????????????????', async () => {
        await actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, timelock.address, actorPanGu);
        expect(await actors.ownerOf(actorPanGu)).to.eq(timelock.address);
    });

    it('?????????????????????????????????????????????', async () => {
        await expect(worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address)).to.be.revertedWith("only PanGu");
    });

    describe('???????????????????????????????????????????????????', async () => {
        it('?????????????????????????????????????????????', async () => {
            const description = '??????????????????????????????????????????????????????';

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

        it('????????????????????????', async () => {
            // cast vote for proposal
            await gov.connect(operator1).castVote(proposalId, 1);

            await advanceBlocks(VOTING_PERIOD);
        });

        it('?????????????????????????????????????????????', async () => {
            await gov.connect(operator1).queue(proposalId);

            // Queued state
            expect(await gov.state(proposalId)).to.equal(5);
        });

        it('?????????????????????????????????????????????????????????', async () => {
            const { eta } = await gov.proposals(proposalId);
            await setNextBlockTimestamp(eta.toNumber(), false);
            await gov.execute(proposalId);

            // Successfully executed Action
            expect(await worldContractRoute.modules(await worldConstants.WORLD_MODULE_COIN())).to.eq(assetDaoli.address);
        });
    });

    describe('?????????????????????????????????????????????????????????????????????????????????', async () => {
        it('??????????????????????????????????????????????????????', async () => {
            const factory = new WorldFungible__factory(deployer);
            assetWood = await (await factory.deploy("Taiyi Wood", "TYWOOD", FAKE_MODULE_WOOD, worldContractRoute.address)).deployed();
        });

        it('?????????????????????????????????????????????', async () => {
            const description = '??????????????????????????????????????????????????????';

            //Action: routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_WOOD(), assetWood.address)
            targets.push(worldContractRoute.address);
            values.push('0');
            signatures.push('registerModule(uint256,address)');
            callDatas.push(encodeParameters(['uint256', 'address'], [FAKE_MODULE_WOOD, assetWood.address]));

            await gov.connect(operator1).propose(targets, values, signatures, callDatas, description);
            proposalId = await gov.latestProposalIds(operator1.address);

            // Wait for VOTING_DELAY
            await advanceBlocks(VOTING_DELAY + 1);
        });

        it('????????????????????????', async () => {
            // cast vote for proposal
            await gov.connect(operator1).castVote(proposalId, 1);

            await advanceBlocks(VOTING_PERIOD);
        });

        it('?????????????????????????????????????????????', async () => {
            await gov.connect(operator1).queue(proposalId);

            // Queued state
            expect(await gov.state(proposalId)).to.equal(5);
        });

        it('?????????????????????????????????????????????????????????', async () => {
            const { eta } = await gov.proposals(proposalId);
            await setNextBlockTimestamp(eta.toNumber(), false);
            await gov.execute(proposalId);

            // Successfully executed Action
            expect(await worldContractRoute.modules(FAKE_MODULE_WOOD)).to.eq(assetWood.address);
        });
    });
});
