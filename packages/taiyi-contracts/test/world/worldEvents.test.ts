//npx hardhat node
//yarn test ./test/worldEvents.test.ts --network hard
import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants,
    WorldContractRoute, WorldContractRoute__factory, Actors, ShejiTu, ShejiTu__factory, ActorAttributes, SifusToken,
    SifusDescriptor__factory, WorldEvents, DefaultWorldEventProcessor__factory, DefaultWorldEventProcessor,
     WorldYemings, WorldRandom, WorldZones, ActorLocations, ActorTalents, Trigrams, AssetDaoli,
} from '../../typechain';
import {
    blockNumber,
    blockTimestamp,
    deploySifusToken,
    populateDescriptor,
} from '../utils';
import {
    deployWorldConstants,
    deployWorldContractRoute,
    deployActors,
    deployWorldRandom,
    deployActorAttributes,
    deployAssetDaoli,
    deployShejiTu,
    deployWorldEvents,
    deployWorldYemings,
    deployActorLocations,
    deployWorldZones,
    deployActorTalents,
    deployTrigrams
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;

describe('世界事件集测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let sifusToken: SifusToken;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let worldYemings: WorldYemings;
    let assetDaoli: AssetDaoli;
    let worldEvents: WorldEvents;
    let shejiTu: ShejiTu;
    let actorAttributes: ActorAttributes;
    let worldRandom: WorldRandom;
    let worldZones: WorldZones;
    let actorLocations: ActorLocations;
    let actorTalents: ActorTalents;
    let trigrams: Trigrams;

    let actorPanGu: BigNumber;
    let eventTest : DefaultWorldEventProcessor;

    const FAKE_MODULE_EVENTS = 101;
    const FAKE_MODULE_TIMELINE = 102;
    const FAKE_MODULE_TALENTS = 103;

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

    before(async () => {
        [deployer, taiyiDAO, operator1, operator2] = await ethers.getSigners();

        //Deploy Constants
        worldConstants = await deployWorldConstants(deployer);

        //Deploy WorldContractRoute
        worldContractRoute = await deployWorldContractRoute(deployer);

        //Deploy WorldYemings
        worldYemings = await deployWorldYemings(taiyiDAO.address, deployer);

        //Deploy Taiyi Daoli ERC20
        assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);

        //Deploy Actors
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        actors = await deployActors(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        await worldContractRoute.registerActors(actors.address);

        //PanGu should be mint at first, or you can not register any module
        actorPanGu = await worldConstants.ACTOR_PANGU();
        expect(actorPanGu).to.eq(1);
        expect(await actors.nextActor()).to.eq(actorPanGu);
        await actors.connect(taiyiDAO).mintActor(0);

        //Deploy SifusToken
        sifusToken = await deploySifusToken(worldContractRoute.address, deployer, taiyiDAO.address, deployer.address);
        const descriptor = await sifusToken.descriptor();
        await populateDescriptor(SifusDescriptor__factory.connect(descriptor, deployer));

        //connect route to operator
        let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, taiyiDAO);
        //deploy all basic modules
        worldRandom = await deployWorldRandom(deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address);
        worldYemings = await deployWorldYemings(taiyiDAO.address, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address)
        actorAttributes = await deployActorAttributes(routeByPanGu, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address)
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

        shejiTu = ShejiTu__factory.connect((await deployShejiTu("测试", "所在时间线：测试", FAKE_MODULE_TIMELINE,
            actors, actorLocations, worldZones, actorAttributes,
            worldEvents, actorTalents, trigrams, worldRandom, deployer))[0].address, deployer);
        await routeByPanGu.registerModule(FAKE_MODULE_TIMELINE, shejiTu.address);

        let shejiTuOperator = await actors.nextActor();
        await actors.mintActor(0);
        await actors.approve(shejiTu.address, shejiTuOperator);
        await shejiTu.initOperator(shejiTuOperator);
        await worldYemings.connect(taiyiDAO).setYeMing(await shejiTu.operator(), shejiTu.address);

        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
    });

    it('部署测试事件', async () => {
        eventTest = await (await (new DefaultWorldEventProcessor__factory(deployer)).deploy(worldContractRoute.address, 0)).deployed();
    });

    it('非盘古无权注册事件', async () => {
        await expect(worldEvents.connect(operator1).setEventProcessor(10001, eventTest.address)).to.be.revertedWith("only PanGu");
    });

    it('盘古注册事件', async () => {
        expect((await worldEvents.connect(taiyiDAO).setEventProcessor(10001, eventTest.address)).wait()).eventually.fulfilled;
        expect(await worldEvents.eventProcessors(10001)).to.eq(eventTest.address);
    });

    it('非Owner无权配置时间线', async () => {
        await expect(shejiTu.connect(taiyiDAO).addAgeEvent(0, 10001, 1)).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it('Owner配置时间线', async () => {
        expect((await shejiTu.addAgeEvent(0, 10001, 1)).wait()).eventually.fulfilled;
    });
});