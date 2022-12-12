//npx hardhat node
//yarn test ./test/worldEvents.test.ts --network hard
import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, ActorAttributesConstants,
    WorldContractRoute, WorldContractRoute__factory, 
    Actors, ShejiTu, ShejiTu__factory, ActorAttributes, SifusToken, SifusDescriptor__factory, WorldEvents, WorldFungible, WorldEventProcessor10001__factory, WorldEventProcessor10001,
} from '../typechain';
import {
    blockNumber,
    blockTimestamp,
    deploySifusToken,
    populateDescriptor,
} from './utils';
import {
    deployWorldConstants,
    deployActorAttributesConstants,
    deployWorldContractRoute,
    deployActors,
    deployWorldRandom,
    deployActorAttributes,
    deployAssetDaoli,
    deployShejiTu,
    deployWorldEvents
} from '../utils';
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
    let actorAttributesConstants: ActorAttributesConstants;

    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let assetDaoli: WorldFungible;
    let worldEvents: WorldEvents;
    let shejiTu: ShejiTu;
    let actorAttributes: ActorAttributes;

    let actorPanGu: BigNumber;
    let event10001 : WorldEventProcessor10001;

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
        actorAttributesConstants = await deployActorAttributesConstants(deployer);

        //Deploy WorldContractRoute
        worldContractRoute = await deployWorldContractRoute(deployer);

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
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), (await deployWorldRandom(deployer)).address);

        actorAttributes = await deployActorAttributes(routeByPanGu, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address)

        worldEvents = await deployWorldEvents(OneAgeVSecond, worldContractRoute, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_EVENTS(), worldEvents.address);

        shejiTu = ShejiTu__factory.connect((await deployShejiTu(worldContractRoute, deployer))[0].address, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TIMELINE(), shejiTu.address);
        await routeByPanGu.setYeMing(await shejiTu.operator(), shejiTu.address);

        //set PanGu as YeMing for test
        await routeByPanGu.setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
    });

    it('部署事件10001', async () => {
        event10001 = await (await (new WorldEventProcessor10001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    });

    it('非盘古无权注册事件', async () => {
        await expect(worldEvents.connect(operator1).setEventProcessor(10001, event10001.address)).to.be.revertedWith("only PanGu");
    });

    it('盘古注册事件', async () => {
        expect((await worldEvents.connect(taiyiDAO).setEventProcessor(10001, event10001.address)).wait()).eventually.fulfilled;
        expect(await worldEvents.eventProcessors(10001)).to.eq(event10001.address);
    });

    it('非盘古无权配置时间线', async () => {
        await expect(shejiTu.connect(operator1).addAgeEvent(0, 10001, 1)).to.be.revertedWith("only PanGu");
    });

    it('盘古配置时间线', async () => {
        expect((await shejiTu.connect(taiyiDAO).addAgeEvent(0, 10001, 1)).wait()).eventually.fulfilled;
    });
});