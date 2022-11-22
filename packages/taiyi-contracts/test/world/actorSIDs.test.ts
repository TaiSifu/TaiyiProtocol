import chai from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants,
    WorldContractRoute, WorldContractRoute__factory, 
    Actors, ActorNames, ActorNames__factory, Fungible, ActorSocialIdentity,
} from '../../typechain';
import {
    blockNumber,
    blockTimestamp,
} from '../utils';
import {
    deployWorldConstants,
    deployWorldContractRoute,
    deployActors,
    deployWorldRandom,
    deployActorNames,
    deployAssetDaoli,
    deployActorSocialIdentity,
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;

describe('角色社会身份测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let assetDaoli: Fungible;
    let actorSIDs: ActorSocialIdentity;

    let newActorByOp1 = async ():Promise<BigNumber> => {
        //deal coin
        await assetDaoli.connect(operator1).claim(2, 2, BigInt(1000e18));
        await assetDaoli.connect(operator1).withdraw(2, 2, BigInt(1000e18));
        await assetDaoli.connect(operator1).approve(actors.address, BigInt(1000e18));
        let actor = await actors.nextActor();
        await actors.connect(operator1).mintActor(BigInt(100e18));
        return actor;
    }

    before(async () => {
        [deployer, taiyiDAO, operator1, operator2] = await ethers.getSigners();

        //Deploy Constants
        worldConstants = await deployWorldConstants(deployer);

        //Deploy WorldContractRoute
        worldContractRoute = await deployWorldContractRoute(deployer);

        //Deploy Taiyi Daoli ERC20
        assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);

        //Deploy Actors
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        actors = await deployActors(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        await worldContractRoute.registerActors(actors.address);

        //PanGu should be mint at first, or you can not register any module
        expect(await actors.nextActor()).to.eq(1);
        await actors.connect(taiyiDAO).mintActor(0);

        //connect route to operator
        let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, taiyiDAO);
        //deploy all basic modules
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), (await deployWorldRandom(deployer)).address);
        actorSIDs = await deployActorSocialIdentity(worldContractRoute, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_SIDS(), actorSIDs.address);

        //second actor test for YeMing, should be mint for free
        expect(await actors.nextActor()).to.eq(2);
        await actors.connect(operator1).mintActor(0);
        await worldContractRoute.connect(taiyiDAO).setYeMing(2, operator1.address); //fake address just for test
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('合约符号（Symbol）', async () => {
        expect(await actorSIDs.symbol()).to.eq('TYSID');
    });

    it('合约名称', async () => {
        expect(await actorSIDs.name()).to.eq('Taiyi Social Identity');
    });

    it(`非盘古无权设计新身份`, async ()=>{
        //should not
        await expect(actorSIDs.setSIDName(10010, "乞丐")).to.be.revertedWith("only PanGu");;
    });

    it(`盘古设计新身份`, async ()=>{
        expect((await actorSIDs.connect(taiyiDAO).setSIDName(10010, "乞丐")).wait()).eventually.fulfilled;
        expect(await actorSIDs.names(10010)).to.eq("乞丐");
    });

});