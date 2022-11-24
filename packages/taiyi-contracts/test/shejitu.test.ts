import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, ActorAttributesConstants,
    WorldContractRoute, WorldContractRoute__factory, 
    Actors, ShejiTu, ShejiTu__factory, ActorAttributes, SifusToken, SifusDescriptor__factory, WorldEvents, WorldFungible,
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

describe('社稷图全局时间线测试', () => {

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
    let worldEvents: WorldEvents;
    let assetDaoli: WorldFungible;
    let shejiTu: ShejiTu;
    let actorAttributes: ActorAttributes;

    let actorPanGu: BigNumber;

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

        shejiTu = await deployShejiTu(sifusToken, worldContractRoute, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TIMELINE(), shejiTu.address);
    });

    it('不允许再次初始化', async () => {
        let shejiTuByDAO = ShejiTu__factory.connect(shejiTu.address, taiyiDAO);
        const tx = shejiTuByDAO.initialize(
            sifusToken.address,
            worldContractRoute.address
        );
        await expect(tx).to.be.revertedWith('Initializable: contract is already initialized');
    });

    it('时间线管理者-噎明', async () => {
        const actorYeMing = await actors.getActor(await shejiTu.ACTOR_YEMING());
        expect(actorYeMing.owner).to.eq(shejiTu.address);
    });

    it('盘古注册噎明', async () => {
        const actorYeMing = await shejiTu.ACTOR_YEMING();
        expect(await worldContractRoute.isYeMing(actorYeMing)).to.eq(false);
        await expect(worldContractRoute.setYeMing(actorYeMing, shejiTu.address)).to.be.rejectedWith("only PanGu");

        let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, taiyiDAO);
        expect((await routeByPanGu.setYeMing(actorYeMing, shejiTu.address)).wait()).eventually.fulfilled;
        expect(await worldContractRoute.isYeMing(actorYeMing)).to.eq(true);
    });

    describe('社稷图基本操作测试', () => {

        beforeEach(async () => {
            snapshotId = await ethers.provider.send('evm_snapshot', []);
        });
    
        afterEach(async () => {
            await ethers.provider.send('evm_revert', [snapshotId]);
        });

        it('盘古注销噎明', async () => {
            const actorYeMing = await shejiTu.ACTOR_YEMING();
            expect(await worldContractRoute.isYeMing(actorYeMing)).to.eq(true);
            //should disable this actor as yeming
            await worldContractRoute.connect(taiyiDAO).setYeMing(actorYeMing, "0x0000000000000000000000000000000000000000");
            expect(await worldContractRoute.isYeMing(actorYeMing)).to.eq(false);
        });

        it('角色出生-所有者未授权情况', async () => {
            await expect(shejiTu.connect(taiyiDAO).bornActor(await worldConstants.ACTOR_PANGU())).to.be.revertedWith("not approved or owner of actor");
        });

        it('角色出生-所有者授权情况', async () => {
            await actors.connect(taiyiDAO).approve(shejiTu.address, await worldConstants.ACTOR_PANGU());
            expect((await shejiTu.connect(taiyiDAO).bornActor(await worldConstants.ACTOR_PANGU())).wait()).eventually.fulfilled;
        });

        it('角色出生-未注册到角色URI模块的情况', async () => {
            await actors.connect(taiyiDAO).approve(shejiTu.address, await worldConstants.ACTOR_PANGU());
            const receipt = await (await shejiTu.connect(taiyiDAO).bornActor(await worldConstants.ACTOR_PANGU())).wait();
            const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));

            let uri = await actors.tokenURI(await worldConstants.ACTOR_PANGU());
            let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
            let uriObj = JSON.parse(uriDecode);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(await worldConstants.WORLD_MODULE_TIMELINE()).to.eq(3);
            expect(uriObj.data.m_3).to.be.undefined;
        });

        it('角色出生-注册到角色URI模块的情况', async () => {

            //register timeline to be one part of Actor URI
            expect((await actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address)).wait()).eventually.fulfilled;

            await actors.connect(taiyiDAO).approve(shejiTu.address, await worldConstants.ACTOR_PANGU());
            const receipt = await (await shejiTu.connect(taiyiDAO).bornActor(await worldConstants.ACTOR_PANGU())).wait();
            const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));

            let uri = await actors.tokenURI(await worldConstants.ACTOR_PANGU());
            let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
            let uriObj = JSON.parse(uriDecode);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(await worldConstants.WORLD_MODULE_TIMELINE()).to.eq(3);
            expect(JSON.stringify(uriObj.data.m_3)).to.eq("{}");
        });

        it('角色生长-未注册角色基础属性情况', async () => {
            let actorPanGu = await worldConstants.ACTOR_PANGU();

            await actors.connect(taiyiDAO).approve(shejiTu.address, await worldConstants.ACTOR_PANGU());
            const receipt = await (await shejiTu.connect(taiyiDAO).bornActor(actorPanGu)).wait();
            const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));

            await expect(shejiTu.connect(taiyiDAO).grow(actorPanGu)).to.be.revertedWith("actor dead!");
        });

        it('角色生长-注册角色基础属性但未初始化情况', async () => {
            let actorPanGu = await worldConstants.ACTOR_PANGU();

            await actors.connect(taiyiDAO).approve(shejiTu.address, await worldConstants.ACTOR_PANGU());
            let shejiTuByDAO = ShejiTu__factory.connect(shejiTu.address, taiyiDAO);
            const receipt = await (await shejiTuByDAO.bornActor(actorPanGu)).wait();
            const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));

            //register actor attribute to timeline
            expect((await shejiTuByDAO.registerAttributeModule(actorAttributes.address)).wait()).eventually.fulfilled;

            await expect(shejiTuByDAO.grow(actorPanGu)).to.be.revertedWith("actor dead!");
        });
    });
});