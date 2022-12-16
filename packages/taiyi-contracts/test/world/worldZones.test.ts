import chai from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, WorldContractRoute, 
    Actors, SifusToken, SifusDescriptor__factory, WorldZones, WorldYemings, AssetDaoli,
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
    deployAssetDaoli,
    deployWorldZones,
    deployWorldYemings,
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

describe('世界区域测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;

    let sifusToken: SifusToken;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let assetDaoli: AssetDaoli;
    let worldZones: WorldZones;
    let worldYemings: WorldYemings;
    let fakeTimelineAddress: any;

    let actor: BigNumber;
    let actorPanGu: BigNumber;
    let newZone: BigNumber;

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

        //deploy all basic modules
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_RANDOM(), (await deployWorldRandom(deployer)).address);
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
        worldZones = await deployWorldZones(worldContractRoute, deployer);
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_ZONES(), worldZones.address);

        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //second actor for test
        actor = await newActor(operator1);
        expect(actor).to.eq(2);

        fakeTimelineAddress = operator1.address;
    });

    it('合约符号（Symbol）', async () => {
        expect(await worldZones.symbol()).to.eq('TYZONE');
    });

    it('合约名称', async () => {
        expect(await worldZones.name()).to.eq('Taiyi Zone');
    });

    it(`非噎明无权铸造新区域`, async ()=>{
        await expect(worldZones.connect(operator1).claim(actor, "小灰域", fakeTimelineAddress, actor)).to.be.revertedWith("only YeMing");
    });

    it(`噎明铸造新区域参数错误`, async ()=>{
        await expect(worldZones.connect(taiyiDAO).claim(actorPanGu, "小  灰域", fakeTimelineAddress, actor)).to.be.revertedWith("invalid name");
    });

    it(`噎明铸造新区域给角色`, async ()=>{
        newZone = await worldZones.nextZone();
        expect((await worldZones.connect(taiyiDAO).claim(actorPanGu, "小灰域", fakeTimelineAddress, actor)).wait()).eventually.fulfilled;

        expect(await worldZones.ownerOf(newZone)).to.eq((await actors.getActor(actor)).account);
        expect(await worldZones.names(newZone)).to.eq("小灰域");
    });

    it(`区域改名-无所有者授权`, async ()=>{
        await expect(worldZones.connect(taiyiDAO).updateZone(actor, newZone, "大灰域")).to.be.revertedWith("not approved or owner of actor");
    });

    it(`区域改名-区域错误`, async ()=>{
        let anotherZone = await worldZones.nextZone();
        await worldZones.connect(taiyiDAO).claim(actorPanGu, "无尘星", fakeTimelineAddress, actorPanGu);
        await expect(worldZones.connect(operator1).updateZone(actor, anotherZone, "大灰域")).to.be.revertedWith("not approved or the owner of zone");
    });

    it(`区域改名`, async ()=>{
        expect((await worldZones.connect(operator1).updateZone(actor, newZone, "大灰域")).wait()).eventually.fulfilled;
        expect(await worldZones.names(newZone)).to.eq("大灰域");
    });

    it("非噎明无权从角色提取区域", async ()=>{
        await expect(worldZones.connect(operator1).withdraw(actor, newZone)).to.be.revertedWith('only YeMing');
    });

    it("噎明从角色提取区域（取消托管）-区域所有者未授权角色", async ()=>{
        await expect(worldZones.connect(taiyiDAO).withdraw(await worldConstants.ACTOR_PANGU(), newZone)).to.be.revertedWith('not approved or the owner of actor.');
    });

    it("噎明从角色提取区域（取消托管）-区域所有者授权角色", async ()=>{
        await actors.connect(operator1).approve(taiyiDAO.address, actor);
        expect((await worldZones.connect(taiyiDAO).withdraw(await worldConstants.ACTOR_PANGU(), newZone)).wait()).eventually.fulfilled;
        expect(await worldZones.ownerOf(newZone)).to.eq(operator1.address);
    });

    it("托管区域到角色", async ()=>{
        expect((await worldZones.connect(operator1).transferFrom(operator1.address, (await actors.getActor(actor)).account, newZone)).wait()).eventually.fulfilled;
        expect(await worldZones.ownerOf(newZone)).to.eq((await actors.getActor(actor)).account);
    });
});