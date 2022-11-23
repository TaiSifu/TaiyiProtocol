import chai from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants,
    WorldContractRoute, WorldContractRoute__factory, 
    Actors, Fungible, WorldItems, ShejiTu, SifusToken, SifusDescriptor__factory,
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
    deployWorldItems,
    deployShejiTu,
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;

describe('世界道具测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;

    let sifusToken: SifusToken;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let shejiTu: ShejiTu;
    let assetDaoli: Fungible;
    let worldItems: WorldItems;

    let actor: BigNumber;
    let newItem: BigNumber;

    let newActor = async (toWho: SignerWithAddress):Promise<BigNumber> => {
        //deal coin
        await assetDaoli.connect(taiyiDAO).claim(1, 1, BigInt(1000e18));
        await assetDaoli.connect(taiyiDAO).withdraw(1, 1, BigInt(1000e18));
        await assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = await actors.nextActor();
        await actors.connect(taiyiDAO).mintActor(BigInt(100e18));
        await actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
        return _actor;
    }

    before(async () => {
        [deployer, taiyiDAO, operator1, operator2] = await ethers.getSigners();

        //Deploy SifusToken
        sifusToken = await deploySifusToken(deployer, taiyiDAO.address, deployer.address);
        const descriptor = await sifusToken.descriptor();
        await populateDescriptor(SifusDescriptor__factory.connect(descriptor, deployer));

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
        shejiTu = await deployShejiTu(OneAgeVSecond, sifusToken, worldContractRoute, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TIMELINE(), shejiTu.address);
        worldItems = await deployWorldItems(worldContractRoute, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ITEMS(), worldItems.address);

        //set PanGu as YeMing for test
        await routeByPanGu.setYeMing(1, taiyiDAO.address); //fake address for test
        //third actor for test
        actor = await newActor(operator1);
        expect(actor).to.eq(3);
    });

    it('合约符号（Symbol）', async () => {
        expect(await worldItems.symbol()).to.eq('TYITEM');
    });

    it('合约名称', async () => {
        expect(await worldItems.name()).to.eq('Taiyi Items');
    });

    describe('道具设计测试', () => {

        it(`非盘古无权设计新道具类型`, async ()=>{
            //should not
            await expect(worldItems.setTypeName(20, "《木工房》")).to.be.revertedWith("only PanGu");;
        });

        it(`盘古设计新道具类型`, async ()=>{
            expect((await worldItems.connect(taiyiDAO).setTypeName(20, "《木工房》")).wait()).eventually.fulfilled;
            expect(await worldItems.typeNames(20)).to.eq("《木工房》");
        });
    });

    describe('道具常规测试', () => {

        it(`非噎明无权铸造新道具`, async ()=>{
            await expect(worldItems.connect(operator1).mint(actor, 20, 100, 7, actor)).to.be.revertedWith("not operated by YeMing");
        });

        it(`噎明铸造新道具参数错误`, async ()=>{
            await expect(worldItems.connect(taiyiDAO).mint(1, 20, 100, 18, actor)).to.be.revertedWith("invalid shape");
        });

        it(`噎明铸造新道具给未出生角色`, async ()=>{
            await expect(worldItems.connect(taiyiDAO).mint(1, 20, 100, 7, actor)).to.be.revertedWith("character have not born in timeline");
        });

        it(`噎明铸造新道具给角色`, async ()=>{
            await shejiTu.connect(operator1).bornCharacter(actor);

            newItem = await worldItems.nextItemId();
            expect((await worldItems.connect(taiyiDAO).mint(1, 20, 100, 7, actor)).wait()).eventually.fulfilled;

            expect(await worldItems.ownerOf(newItem)).to.eq((await actors.getActor(actor)).account);
            expect(await worldItems.itemTypes(newItem)).to.eq(20);
            expect(await worldItems.itemWears(newItem)).to.eq(100);
            let shape = await worldItems.itemShapes(newItem);
            expect(shape).to.eq(7);
            expect(await worldItems.shapeNames(shape)).to.eq("绝·二品");
        });

        it(`非噎明无权修改道具属性`, async ()=>{
            await expect(worldItems.connect(operator1).modify(actor, newItem, 10)).to.be.revertedWith("not operated by YeMing");
        });

        it(`噎明修改道具耐久属性`, async ()=>{
            expect((await worldItems.connect(taiyiDAO).modify(1, newItem, 10)).wait()).eventually.fulfilled;
            expect(await worldItems.itemWears(newItem)).to.eq(10);
        });

        it("非噎明无权从角色提取道具", async ()=>{
            await expect(worldItems.connect(operator1).withdrawItem(actor, newItem)).to.be.revertedWith('not operated by YeMing');
        });
    
        it("噎明从角色提取道具（取消托管）-道具所有者未授权角色", async ()=>{
            await expect(worldItems.connect(taiyiDAO).withdrawItem(await worldConstants.ACTOR_PANGU(), newItem)).to.be.revertedWith('not approved or the owner of actor.');
        });

        it("噎明从角色提取道具（取消托管）-道具所有者授权角色", async ()=>{
            await actors.connect(operator1).approve(taiyiDAO.address, actor);
            expect((await worldItems.connect(taiyiDAO).withdrawItem(await worldConstants.ACTOR_PANGU(), newItem)).wait()).eventually.fulfilled;
            expect(await worldItems.ownerOf(newItem)).to.eq(operator1.address);
        });

        it("托管道具到角色", async ()=>{
            expect((await worldItems.connect(operator1).transferFrom(operator1.address, (await actors.getActor(actor)).account, newItem)).wait()).eventually.fulfilled;
            expect(await worldItems.ownerOf(newItem)).to.eq((await actors.getActor(actor)).account);

            //withdraw again
            expect((await worldItems.connect(taiyiDAO).withdrawItem(await worldConstants.ACTOR_PANGU(), newItem)).wait()).eventually.fulfilled;
        });

        it(`非噎明无权销毁道具`, async ()=>{
            await expect(worldItems.connect(operator1).burn(actor, newItem)).to.be.revertedWith("not operated by YeMing");
        });

        it(`噎明销毁道具-道具未托管`, async ()=>{
            await expect(worldItems.connect(taiyiDAO).burn(await worldConstants.ACTOR_PANGU(), newItem)).to.be.revertedWith("actor holder is not exist");
        });

        it(`噎明销毁道具-道具托管`, async ()=>{
            await worldItems.connect(operator1).transferFrom(operator1.address, (await actors.getActor(actor)).account, newItem);
            
            expect((await worldItems.connect(taiyiDAO).burn(await worldConstants.ACTOR_PANGU(), newItem)).wait()).eventually.fulfilled;
            await expect(worldItems.ownerOf(newItem)).to.be.revertedWith("ERC721: owner query for nonexistent token");            
        });
    });
});