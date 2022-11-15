import chai from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, ActorAttributesConstants,
    WorldContractRoute, WorldContractRoute__factory, 
    Actors, Actors__factory, ShejiTu, ShejiTu__factory, ActorAttributes,
} from '../typechain';
import {
    blockTimestamp,
} from './utils';
import {
    deployWorldConstants,
    deployActorAttributesConstants,
    deployWorldContractRoute,
    deployActors,
    deployWorldRandom,
    deployShejiTu,
    deployActorAttributes
} from '../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);

chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;

describe('社稷图全局时间线（噎明）测试', () => {

    let deployer: SignerWithAddress;
    let taisifusDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let worldConstants: WorldConstants;
    let actorAttributesConstants: ActorAttributesConstants;

    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let actorsByPanGu: Actors;
    let shejiTu: ShejiTu;
    let actorAttributes: ActorAttributes;

    before(async () => {
        [deployer, taisifusDAO, operator1, operator2] = await ethers.getSigners();

        //Deploy Constants
        worldConstants = await deployWorldConstants(deployer);
        actorAttributesConstants = await deployActorAttributesConstants(deployer);

        //Deploy WorldContractRoute
        worldContractRoute = await deployWorldContractRoute(deployer);

        //Deploy Actors
        actors = await deployActors(worldContractRoute, deployer);
        await worldContractRoute.registerActors(actors.address);

        //connect actors to operator
        actorsByPanGu = Actors__factory.connect(actors.address, taisifusDAO);

        //PanGu should be mint at first, or you can not register any module
        expect(await actorsByPanGu.nextActor()).to.eq(1);
        await actorsByPanGu.mintActor();

        //connect route to operator
        let routeByDAO = WorldContractRoute__factory.connect(worldContractRoute.address, taisifusDAO);
        //deploy all basic modules
        await routeByDAO.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), (await deployWorldRandom(deployer)).address);
        shejiTu = await deployShejiTu(OneAgeVSecond, routeByDAO, deployer);
        await routeByDAO.registerModule(await worldConstants.WORLD_MODULE_TIMELINE(), shejiTu.address);
        actorAttributes = await deployActorAttributes(routeByDAO, deployer);
        await routeByDAO.registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address)
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('噎明角色未创生时访问无效', async () => {
        await expect(shejiTu.ACTOR_YEMING()).to.be.reverted;
    });

    it('初始化噎明', async () => {
        //connect timeline to operator
        let shejiTuByOperator1 = ShejiTu__factory.connect(shejiTu.address, operator1);

        //any one can init YeMing
        let nextActor = await actors.nextActor();
        await shejiTuByOperator1.initYeMing();
        expect(await shejiTu.ACTOR_YEMING()).to.eq(nextActor);

        const actorYeMin = await actors.getActor(await shejiTu.ACTOR_YEMING());
        expect(actorYeMin.owner).to.eq(shejiTu.address);

        //can not init again
        await expect(shejiTu.initYeMing()).to.be.revertedWith('YeMing is alreay initialized');
    });

    it('任意角色出生，未注册到角色URI模块的情况', async () => {
        let shejiTuByDAO = ShejiTu__factory.connect(shejiTu.address, taisifusDAO);
        const receipt = await (await shejiTuByDAO.bornCharacter(await worldConstants.ACTOR_PANGU())).wait();
        const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));

        let uri = await actors.tokenURI(await worldConstants.ACTOR_PANGU());
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('ascii');
        let uriObj = JSON.parse(uriDecode);
        //console.log(JSON.stringify(uriObj, null, 2));
        expect(await worldConstants.WORLD_MODULE_TIMELINE()).to.eq(3);
        expect(uriObj.data.m_3).to.be.undefined;
    });

    it('任意角色出生，注册到角色URI模块的情况', async () => {

        //register timeline to be one part of Actor URI
        expect((await actorsByPanGu.registerURIPartModule(shejiTu.address)).wait()).eventually.fulfilled;

        let shejiTuByDAO = ShejiTu__factory.connect(shejiTu.address, taisifusDAO);
        const receipt = await (await shejiTuByDAO.bornCharacter(await worldConstants.ACTOR_PANGU())).wait();
        const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));

        let uri = await actors.tokenURI(await worldConstants.ACTOR_PANGU());
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('ascii');
        let uriObj = JSON.parse(uriDecode);
        //console.log(JSON.stringify(uriObj, null, 2));
        expect(await worldConstants.WORLD_MODULE_TIMELINE()).to.eq(3);
        expect(uriObj.data.m_3.bornTime).to.eq(timestamp);
        expect(uriObj.data.m_3.age).to.eq(0);
    });

    it('角色生长，未注册角色基础属性情况', async () => {
        let actorPanGu = await worldConstants.ACTOR_PANGU();

        let shejiTuByDAO = ShejiTu__factory.connect(shejiTu.address, taisifusDAO);
        const receipt = await (await shejiTuByDAO.bornCharacter(actorPanGu)).wait();
        const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));

        await expect(shejiTuByDAO.grow(actorPanGu)).to.be.revertedWith("actor dead!");
    });

    it('角色生长，注册角色基础属性但未初始化情况', async () => {
        let actorPanGu = await worldConstants.ACTOR_PANGU();

        let shejiTuByDAO = ShejiTu__factory.connect(shejiTu.address, taisifusDAO);
        const receipt = await (await shejiTuByDAO.bornCharacter(actorPanGu)).wait();
        const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));

        //register actor attribute to timeline
        expect((await shejiTuByDAO.registerAttributeModule(actorAttributes.address)).wait()).eventually.fulfilled;

        await expect(shejiTuByDAO.grow(actorPanGu)).to.be.revertedWith("actor dead!");
    });
});