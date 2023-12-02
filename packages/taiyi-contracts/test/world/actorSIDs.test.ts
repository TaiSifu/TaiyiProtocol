import chai from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, WorldContractRoute, Actors, ActorSocialIdentity, WorldYemings, AssetDaoli,
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
    deployAssetDaoli,
    deployActorSocialIdentity,
    deployWorldYemings,
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
    let worldYemings: WorldYemings;
    let assetDaoli: AssetDaoli;
    let actorSIDs: ActorSocialIdentity;

    let actor: BigNumber;
    let newSID: BigNumber;

    let newActorByOp1 = async ():Promise<BigNumber> => {
        //deal coin
        await assetDaoli.connect(taiyiDAO).claim(1, 2, BigInt(1000e18));
        await assetDaoli.connect(operator1).withdraw(2, 2, BigInt(1000e18));
        await assetDaoli.connect(operator1).approve(actors.address, BigInt(1000e18));
        let _actor = await actors.nextActor();
        await actors.connect(operator1).mintActor(BigInt(100e18));
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
        expect(await actors.nextActor()).to.eq(1);
        await actors.connect(taiyiDAO).mintActor(0);

        //deploy all basic modules
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_RANDOM(), (await deployWorldRandom(deployer)).address);
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
        actorSIDs = await deployActorSocialIdentity(worldContractRoute, deployer);
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_SIDS(), actorSIDs.address);

        //second actor test for YeMing, should be mint for free
        expect(await actors.nextActor()).to.eq(2);
        await actors.connect(operator1).mintActor(0);
        await worldYemings.connect(taiyiDAO).setYeMing(2, operator1.address); //fake address just for test
    });

    it('合约符号（Symbol）', async () => {
        expect(await actorSIDs.symbol()).to.eq('TYSID');
    });

    it('合约名称', async () => {
        expect(await actorSIDs.name()).to.eq('Taiyi Social Identity');
    });

    describe('社会身份设计测试', () => {

        it(`非盘古无权设计新身份`, async ()=>{
            //should not
            await expect(actorSIDs.setSIDName(10010, "乞丐")).to.be.revertedWith("only PanGu");;
        });

        it(`盘古设计新身份`, async ()=>{
            expect((await actorSIDs.connect(taiyiDAO).setSIDName(10010, "乞丐")).wait()).eventually.fulfilled;
            expect(await actorSIDs.names(10010)).to.eq("乞丐");
        });
    });        

    describe('社会身份颁发测试', () => {

        it(`非噎明无权赋予角色新身份`, async ()=>{
            actor = await newActorByOp1();

            await expect(actorSIDs.connect(taiyiDAO).claim(await worldConstants.ACTOR_PANGU(), 10010, actor)).to.be.revertedWith("only YeMing");
        });

        it(`噎明赋予角色新身份`, async ()=>{
            newSID = await actorSIDs.nextSID();
            //claim to PanGu just for test, PanGu is not act as YeMing
            expect((await actorSIDs.connect(operator1).claim(2, 10010, await worldConstants.ACTOR_PANGU())).wait()).eventually.fulfilled;

            expect(await actorSIDs.ownerOf(newSID)).to.eq((await actors.getActor(await worldConstants.ACTOR_PANGU())).account);
        });

        it(`非噎明无权销毁身份`, async ()=>{
            await expect(actorSIDs.connect(taiyiDAO).burn(await worldConstants.ACTOR_PANGU(), newSID)).to.be.revertedWith("only YeMing");
        });

        it(`噎明销毁身份-角色所有者未授权`, async ()=>{
            await expect(actorSIDs.connect(operator1).burn(2, newSID)).to.be.revertedWith("not approved or the owner of actor.");
        });

        it(`噎明销毁身份-角色所有者已经授权`, async ()=>{
            //approve PanGu to op1
            await actors.connect(taiyiDAO).approve(operator1.address, await worldConstants.ACTOR_PANGU());
            expect((await actorSIDs.connect(operator1).burn(2, newSID)).wait()).eventually.fulfilled;
            await expect(actorSIDs.ownerOf(newSID)).to.be.rejectedWith("ERC721NonexistentToken");            
        });
    });        
});