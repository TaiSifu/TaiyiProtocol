//npx hardhat node
//pnpm test ./test/actors.test.ts --network hard
import chai from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, WorldContractRoute, Actors, WorldFungible__factory, WorldYemings, AssetDaoli, 
} from '../typechain';
import {
    blockTimestamp,
    blockNumber,
    increaseTime,
} from './utils';
import {
    deployWorldConstants,
    deployWorldContractRoute,
    deployActors,
    deployWorldRandom,
    deployAssetDaoli,
    deployWorldYemings,
} from '../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import web3 from 'web3';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

describe('太乙角色基础测试', () => {

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
    });

    it('角色合约符号（Symbol）', async () => {
        expect(await actors.symbol()).to.eq('TYACTOR');
    });

    it('角色合约名称', async () => {
        expect(await actors.name()).to.eq('Taiyi Actor Manifested');
    });

    it('访问不存在的角色', async () => {
        await expect(actors.getActor(0)).to.be.revertedWith('invalid actor');
        await expect(actors.getActor(1)).to.be.rejectedWith('ERC721NonexistentToken');
    });

    it('注册世界模块-盘古不存在的情况', async () => {
        //deploy module with out any actor exist
        let worldRandom = await deployWorldRandom(deployer);
        await expect(worldContractRoute.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address))
        .to.be.rejectedWith('ERC721NonexistentToken(1)');
    });

    it('第一个角色作为「盘古」', async () => {
        //first actor token id must be PanGu
        expect(await worldConstants.ACTOR_PANGU()).to.eq(1);
        expect(await actors.nextActor()).to.eq(1);

        //PanGu should be mint
        const holderAddress = ethers.utils.getContractAddress({
            from: actors.address,
            nonce: 1,
        });
        const receipt = await (await actors.connect(taiyiDAO).mintActor(0)).wait();
        //console.log(JSON.stringify(receipt.events, null, 2));
        const [, actorMinted] = receipt.events || [];

        expect(await actors.ownerOf(1)).to.eq(taiyiDAO.address);
        expect(actorMinted?.event).to.eq('ActorMinted');
        expect(actorMinted?.args?.owner).to.eq(taiyiDAO.address);
        expect(actorMinted?.args?.actorId).to.equal(1);

        const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));
        expect(actorMinted?.args?.time).to.equal(timestamp);

        const actor1 = await actors.getActor(1);
        expect(actor1.actorId).to.eq(1);
        expect(actor1.owner).to.eq(taiyiDAO.address);
        expect(actor1.account).to.eq(holderAddress);
    });

    it('无准入铸造新角色-免费角色', async () => {
        //2 should be mint for free
        expect(await actors.nextActor()).to.eq(2);
        await actors.mintActor(0);
        //3 should be mint for free
        expect(await actors.nextActor()).to.eq(3);
        await actors.connect(operator1).mintActor(0);

        //newone should not be mint for free
        expect(await actors.nextActor()).to.eq(4);
        await expect(actors.mintActor(0)).to.be.revertedWith("current actor price exceeded max");
        await expect(actors.mintActor(BigInt(100.0e18))).to.be.rejectedWith("ERC20InsufficientAllowance");
    });

    it('非盘古操作员无权注册世界模块', async () => {
        let worldRandom = await deployWorldRandom(deployer);

        //deploy modules when operator is not PanGu
        await expect(worldContractRoute.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address))
        .to.be.revertedWith('only PanGu');
    });

    it('盘古注册世界模块', async () => {
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
    });

    it('无准入铸造新角色-付费角色', async () => {
        //deal coin by PanGu
        expect((await assetDaoli.connect(taiyiDAO).claim(await worldConstants.ACTOR_PANGU(), 3, BigInt(1000e18))).wait()).eventually.fulfilled;

        //set actor #3 as YeMing
        await worldYemings.connect(taiyiDAO).setYeMing(3, operator1.address); //fake address just for test
        expect(await worldYemings.isYeMing(3)).to.eq(true);
        
        expect(await assetDaoli.balanceOf(operator1.address)).to.eq(0);
        expect((await assetDaoli.connect(operator1).withdraw(3, 3, BigInt(1000e18))).wait()).eventually.fulfilled;
        expect(await assetDaoli.balanceOf(operator1.address)).to.eq(BigInt(1000e18));

        //not approve coin to spend by Actors
        expect(await actors.nextActor()).to.eq(4);
        await expect(actors.connect(operator1).mintActor(BigInt(100e18))).to.be.rejectedWith("ERC20InsufficientAllowance");

        //newone should be mint
        await assetDaoli.connect(operator1).approve(actors.address, BigInt(1000e18));
        expect((await actors.connect(operator1).mintActor(BigInt(100e18))).wait()).to.eventually.fulfilled;
        let actualPay = await assetDaoli.balanceOf(taiyiDAO.address);
        expect(await assetDaoli.balanceOf(operator1.address)).to.eq(BigNumber.from(BigInt(1000e18)).sub(actualPay));

        expect(await actors.ownerOf(4)).to.eq(operator1.address);
    });

    it('铸造新角色-道理不够情况', async () => {
        await worldYemings.connect(taiyiDAO).setYeMing(2, deployer.address); //fake address just for test

        //deal coin
        await assetDaoli.connect(taiyiDAO).claim(await worldConstants.ACTOR_PANGU(), 2, BigInt(1e17));
        await assetDaoli.withdraw(2, 2, BigInt(1e17));
        await assetDaoli.approve(actors.address, BigInt(1000e18));

        expect(await actors.nextActor()).to.eq(5);
        expect(await actors.actorPrice()).to.gt(BigInt(1e17));
        await expect(actors.mintActor(BigInt(100e18))).to.be.rejectedWith("ERC20InsufficientBalance");
    });

    it('铸造新角色-最小花费上限情况', async () => {
        expect(await actors.nextActor()).to.eq(5);
        let price = await actors.actorPrice();
        expect(price).to.gt(BigInt(9e17));
        await expect(actors.connect(operator1).mintActor(price.sub(BigInt(9e17)))).to.be.revertedWith("current actor price exceeded max");
    });

    it('铸造角色花费-标准值精度', async () => {
        let timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        let tstWad = await actors.getTargetSaleTime(BigInt(1e18));
        let tstSecond = tstWad.mul(86400).div(BigInt(1e18));
        let dt = (await actors.mintStart()).add(tstSecond).sub(timestamp);
        await increaseTime(dt.toNumber());
        let cost = await actors.actorPrice();
        let targetPrice = await actors.targetPrice();

        let err = targetPrice.sub(cost).mul(BigInt(1e18)).div(cost);
        expect(err).to.lt(BigInt(0.0001e18));
    });

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('角色铸造费用VRGDA测试', () => {
    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let assetDaoli: AssetDaoli;

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
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('发行曲线', async () => {
        let maxMintable = await actors.MAX_MINTABLE();
        let tstWad = await actors.getTargetSaleTime(maxMintable.mul(BigInt(1e18)));
        let tstSecond = tstWad.mul(86400).div(BigInt(1e18));
        console.log(`角色可铸造${maxMintable}个，计划在${tstSecond.div(86400*365).toString()}年内发行完毕，约为${tstSecond.div(86400).toString()}天（共${tstSecond.toString()}秒）。`);

        tstWad = await actors.getTargetSaleTime(BigInt(10e18));
        tstSecond = tstWad.mul(86400).div(BigInt(1e18));
        console.log(`- 头10个角色计划在${tstSecond.div(86400).toString()}天内发行完毕，约为${tstSecond.toString()}秒。`);

        tstWad = await actors.getTargetSaleTime(BigInt(100e18));
        tstSecond = tstWad.mul(86400).div(BigInt(1e18));
        console.log(`- 头100个角色计划在${tstSecond.div(86400).toString()}天内发行完毕，约为${tstSecond.toString()}秒。`);

        tstWad = await actors.getTargetSaleTime(BigInt(1000e18));
        tstSecond = tstWad.mul(86400).div(BigInt(1e18));
        console.log(`- 头1000个角色计划在${tstSecond.div(86400).toString()}天内发行完毕，约为${tstSecond.toString()}秒。`);
    });

    it('价格稳定性', async () => {
        console.log(`角色指导价为:${web3.utils.fromWei((await actors.targetPrice()).toString(), "ether")}个道理`);
        let dt = 10; //seconds
        let timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        await increaseTime((await actors.mintStart()).add(dt).sub(timestamp).toNumber());
        console.log(`- 若${dt}秒还没有人买，则价格降为${web3.utils.fromWei((await actors.actorPrice()).toString(), "ether")}`);

        dt = 60; //seconds
        timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        await increaseTime((await actors.mintStart()).add(dt).sub(timestamp).toNumber());
        console.log(`- 若${dt}秒还没有人买，则价格降为${web3.utils.fromWei((await actors.actorPrice()).toString(), "ether")}`);

        dt = 1; //hours
        timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        await increaseTime((await actors.mintStart()).add(dt*3600).sub(timestamp).toNumber());
        console.log(`- 若${dt}小时还没有人买，则价格降为${web3.utils.fromWei((await actors.actorPrice()).toString(), "ether")}`);

        dt = 1; //days
        timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        await increaseTime((await actors.mintStart()).add(dt*24*3600).sub(timestamp).toNumber());
        console.log(`- 若${dt}天还没有人买，则价格降为${web3.utils.fromWei((await actors.actorPrice()).toString(), "ether")}`);

        dt = 30; //days
        timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        await increaseTime((await actors.mintStart()).add(dt*24*3600).sub(timestamp).toNumber());
        console.log(`- 若${dt}天还没有人买，则价格降为${web3.utils.fromWei((await actors.actorPrice()).toString(), "ether")}`);
    });

    it('发行超量容错', async () => {
        let maxMintablePlusOne = (await actors.MAX_MINTABLE()).add(1);
        /// Pricing function should revert when trying to price beyond the last mintable actor.
        await expect(actors.getTargetSaleTime(maxMintablePlusOne.mul(BigInt(1e18)))).to.be.reverted;
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('角色URI测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let worldConstants: WorldConstants;

    let worldContractRoute: WorldContractRoute;
    let actors: Actors;

    before(async () => {
        [deployer, taiyiDAO, operator1, operator2] = await ethers.getSigners();

        //Deploy Constants
        worldConstants = await deployWorldConstants(deployer);

        //Deploy WorldContractRoute
        worldContractRoute = await deployWorldContractRoute(deployer);

        //Deploy Taiyi Daoli ERC20
        let assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);

        //Deploy Actors
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        actors = await deployActors(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        await worldContractRoute.registerActors(actors.address);

        //PanGu should be mint at first, or you can not register any module
        expect(await actors.nextActor()).to.eq(1);
        await actors.connect(taiyiDAO).mintActor(0);
    });

    it('角色URI', async () => {
        expect(await actors.nextActor()).to.eq(2);
        const receipt = await (await actors.connect(operator1).mintActor(0)).wait();
        const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));

        let uri = await actors.tokenURI(2);
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
        let uriObj = JSON.parse(uriDecode);
        //console.log(JSON.stringify(uriObj, null, 2));
        expect(uriObj.name).to.eq("Taiyi Actor #2");
        expect(uriObj.description).to.eq("This is not a game.");
        expect(uriObj.data.base.mintTime).to.eq(timestamp);

        // const svgDecode = Buffer.from(uriObj.image.substring(26), 'base64').toString('utf-8');
        // console.log(svgDecode);
    });
});