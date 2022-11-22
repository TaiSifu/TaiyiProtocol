import chai from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants,
    WorldContractRoute, WorldContractRoute__factory,
    Actors, Actors__factory, Fungible, Fungible__factory, 
} from '../../typechain';
import {
    blockTimestamp,
    blockNumber,
    increaseTime,
} from '../utils';
import {
    deployWorldConstants,
    deployWorldContractRoute,
    deployActors,
    deployWorldRandom,
    deployAssetDaoli,
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import web3 from 'web3';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

describe('太乙角色基础测试', () => {

    let deployer: SignerWithAddress;
    let taisifusDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let assetDaoli: Fungible;

    before(async () => {
        [deployer, taisifusDAO, operator1, operator2] = await ethers.getSigners();

        //Deploy Constants
        worldConstants = await deployWorldConstants(deployer);

        //Deploy WorldContractRoute
        worldContractRoute = await deployWorldContractRoute(deployer);

        //Deploy Taiyi Daoli ERC20
        assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);

        //Deploy Actors
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        actors = await deployActors(taisifusDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        await worldContractRoute.registerActors(actors.address);
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('角色合约符号（Symbol）', async () => {
        expect(await actors.symbol()).to.eq('TYACTOR');
    });

    it('角色合约名称', async () => {
        expect(await actors.name()).to.eq('Taiyi Actor Manifested');
    });

    it('访问不存在的角色', async () => {
        let actorsByDAO = Actors__factory.connect(actors.address, taisifusDAO);

        await expect(actorsByDAO.getActor(0)).to.be.revertedWith('invalid actor');
        await expect(actorsByDAO.getActor(1)).to.be.revertedWith('ERC721: owner query for nonexistent token');
    });

    it('第一个角色必须名为「盘古」', async () => {
        let actorsByDAO = Actors__factory.connect(actors.address, taisifusDAO);

        //first actor token id must be PanGu
        expect(await worldConstants.ACTOR_PANGU()).to.eq(1);
        expect(await actorsByDAO.nextActor()).to.eq(1);

        //PanGu should be mint
        const holderAddress = ethers.utils.getContractAddress({
            from: actorsByDAO.address,
            nonce: 1,
        });
        const receipt = await (await actorsByDAO.mintActor(0)).wait();
        //console.log(JSON.stringify(receipt.events, null, 2));
        const [, actorMinted] = receipt.events || [];

        expect(await actorsByDAO.ownerOf(1)).to.eq(taisifusDAO.address);
        expect(actorMinted?.event).to.eq('ActorMinted');
        expect(actorMinted?.args?.owner).to.eq(taisifusDAO.address);
        expect(actorMinted?.args?.actorId).to.equal(1);

        const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));
        expect(actorMinted?.args?.time).to.equal(timestamp);

        const actor1 = await actorsByDAO.getActor(1);
        expect(actor1.actorId).to.eq(1);
        expect(actor1.owner).to.eq(taisifusDAO.address);
        expect(actor1.account).to.eq(holderAddress);
    });

    it('无准入铸造新角色', async () => {
        let actorsByDAO = Actors__factory.connect(actors.address, taisifusDAO);

        //PanGu should be mint for free
        expect(await actorsByDAO.nextActor()).to.eq(1);
        await actorsByDAO.mintActor(0);

        expect(await actorsByDAO.nextActor()).to.eq(2);
        //YeMing should be mint for free
        await actorsByDAO.mintActor(0);

        expect(await actorsByDAO.nextActor()).to.eq(3);
        //newone should not be mint for free
        await expect(actorsByDAO.mintActor(0)).to.be.revertedWith("current actor price exceeded max");
        await expect(actorsByDAO.mintActor(BigInt(100.0e18))).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it('非盘古操作员无权注册世界模块', async () => {
        //connect actors to operator
        let actorsByDAO = Actors__factory.connect(actors.address, taisifusDAO);

        //deploy module with out any actor exist
        let worldRandom = await deployWorldRandom(deployer);
        await expect(worldContractRoute.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address))
        .to.be.revertedWith('ERC721: approved query for nonexistent token');

        //PanGu should be mint at first, or you can not register any module
        expect(await actorsByDAO.nextActor()).to.eq(1);
        await actorsByDAO.mintActor(0);

        //deploy modules when operator is not PanGu
        await expect(worldContractRoute.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address))
        .to.be.revertedWith('Only PanGu');
    });

    it('无准入铸造新角色', async () => {
        let actorsByDAO = Actors__factory.connect(actors.address, taisifusDAO);
        let actorsByOp1 = Actors__factory.connect(actors.address, operator1);

        //PanGu should be mint for free
        expect(await actorsByDAO.nextActor()).to.eq(1);
        await actorsByDAO.mintActor(0);

        //YeMing should be mint for free
        expect(await actorsByOp1.nextActor()).to.eq(2);
        await actorsByOp1.mintActor(0);

        let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, taisifusDAO);
        await routeByPanGu.setYeMing(2, operator1.address); //fake address just for test
        expect(await worldContractRoute.isYeMing(2)).to.eq(true);

        //deal coin
        let assetDaoliByOp1 = Fungible__factory.connect(assetDaoli.address, operator1);
        expect((await assetDaoliByOp1.claim(2, 2, BigInt(1000e18))).wait()).eventually.fulfilled;
        expect(await assetDaoli.balanceOf(operator1.address)).to.eq(0);
        expect((await assetDaoliByOp1.withdraw(2, 2, BigInt(1000e18))).wait()).eventually.fulfilled;
        expect(await assetDaoli.balanceOf(operator1.address)).to.eq(BigInt(1000e18));

        expect(await actors.nextActor()).to.eq(3);
        //not approve coin to spend by Actors
        await expect(actorsByOp1.mintActor(BigInt(100e18))).to.be.revertedWith("ERC20: transfer amount exceeds allowance");

        //newone should be mint
        await assetDaoliByOp1.approve(actors.address, BigInt(1000e18));
        expect((await actorsByOp1.mintActor(BigInt(100e18))).wait()).to.eventually.fulfilled;
        let actualPay = await assetDaoli.balanceOf(taisifusDAO.address);
        expect(await assetDaoli.balanceOf(operator1.address)).to.eq(BigNumber.from(BigInt(1000e18)).sub(actualPay));

        expect(await actors.ownerOf(3)).to.eq(operator1.address);
    });

    it('铸造新角色-道理不够情况', async () => {
        let actorsByDAO = Actors__factory.connect(actors.address, taisifusDAO);
        let actorsByOp1 = Actors__factory.connect(actors.address, operator1);

        //PanGu should be mint for free
        await actorsByDAO.mintActor(0);
        //YeMing should be mint for free
        await actorsByOp1.mintActor(0);

        let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, taisifusDAO);
        await routeByPanGu.setYeMing(2, operator1.address); //fake address just for test

        //deal coin
        let assetDaoliByOp1 = Fungible__factory.connect(assetDaoli.address, operator1);
        await assetDaoliByOp1.claim(2, 2, BigInt(1e17));
        await assetDaoliByOp1.withdraw(2, 2, BigInt(1e17));
        await assetDaoliByOp1.approve(actors.address, BigInt(1000e18));

        expect(await actors.nextActor()).to.eq(3);
        expect(await actors.actorPrice()).to.gt(BigInt(1e17));
        await expect(actorsByOp1.mintActor(BigInt(100e18))).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it('铸造新角色-最小花费上限情况', async () => {
        let actorsByDAO = Actors__factory.connect(actors.address, taisifusDAO);
        let actorsByOp1 = Actors__factory.connect(actors.address, operator1);

        //PanGu should be mint for free
        await actorsByDAO.mintActor(0);
        //YeMing should be mint for free
        await actorsByOp1.mintActor(0);

        let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, taisifusDAO);
        await routeByPanGu.setYeMing(2, operator1.address); //fake address just for test

        //deal coin
        let assetDaoliByOp1 = Fungible__factory.connect(assetDaoli.address, operator1);
        await assetDaoliByOp1.claim(2, 2, BigInt(100e18));
        await assetDaoliByOp1.withdraw(2, 2, BigInt(100e18));
        await assetDaoliByOp1.approve(actors.address, BigInt(1000e18));

        expect(await actors.nextActor()).to.eq(3);
        let price = await actors.actorPrice();
        expect(price).to.gt(BigInt(9e17));
        await expect(actorsByOp1.mintActor(price.sub(BigInt(9e17)))).to.be.revertedWith("current actor price exceeded max");
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
    let taisifusDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let assetDaoli: Fungible;

    before(async () => {
        [deployer, taisifusDAO, operator1, operator2] = await ethers.getSigners();

        //Deploy Constants
        worldConstants = await deployWorldConstants(deployer);

        //Deploy WorldContractRoute
        worldContractRoute = await deployWorldContractRoute(deployer);

        //Deploy Taiyi Daoli ERC20
        assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);

        //Deploy Actors
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        actors = await deployActors(taisifusDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
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
        console.log(`角色指导价为:${web3.utils.fromWei((await actors.targetPrice()).toString())}个道理`);
        let dt = 10; //seconds
        let timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        await increaseTime((await actors.mintStart()).add(dt).sub(timestamp).toNumber());
        console.log(`- 若${dt}秒还没有人买，则价格降为${web3.utils.fromWei((await actors.actorPrice()).toString())}`);

        dt = 60; //seconds
        timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        await increaseTime((await actors.mintStart()).add(dt).sub(timestamp).toNumber());
        console.log(`- 若${dt}秒还没有人买，则价格降为${web3.utils.fromWei((await actors.actorPrice()).toString())}`);

        dt = 1; //hours
        timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        await increaseTime((await actors.mintStart()).add(dt*3600).sub(timestamp).toNumber());
        console.log(`- 若${dt}小时还没有人买，则价格降为${web3.utils.fromWei((await actors.actorPrice()).toString())}`);

        dt = 1; //days
        timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        await increaseTime((await actors.mintStart()).add(dt*24*3600).sub(timestamp).toNumber());
        console.log(`- 若${dt}天还没有人买，则价格降为${web3.utils.fromWei((await actors.actorPrice()).toString())}`);

        dt = 30; //days
        timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        await increaseTime((await actors.mintStart()).add(dt*24*3600).sub(timestamp).toNumber());
        console.log(`- 若${dt}天还没有人买，则价格降为${web3.utils.fromWei((await actors.actorPrice()).toString())}`);
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
    let taisifusDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let worldConstants: WorldConstants;

    let worldContractRoute: WorldContractRoute;
    let actors: Actors;

    before(async () => {
        [deployer, taisifusDAO, operator1, operator2] = await ethers.getSigners();

        //Deploy Constants
        worldConstants = await deployWorldConstants(deployer);

        //Deploy WorldContractRoute
        worldContractRoute = await deployWorldContractRoute(deployer);

        //Deploy Taiyi Daoli ERC20
        let assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);

        //Deploy Actors
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        actors = await deployActors(taisifusDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        await worldContractRoute.registerActors(actors.address);

        //connect actors to operator
        let actorsByDAO = Actors__factory.connect(actors.address, taisifusDAO);

        //PanGu should be mint at first, or you can not register any module
        expect(await actorsByDAO.nextActor()).to.eq(1);
        await actorsByDAO.mintActor(0);
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('访问不存在角色', async () => {
        let actorsByDAO = Actors__factory.connect(actors.address, taisifusDAO);

        await expect(actorsByDAO.getActor(2)).to.be.revertedWith('ERC721: owner query for nonexistent token');
    });

    it('角色铸造', async () => {
        //connect actors to operator
        let actorsByOperator1 = Actors__factory.connect(actors.address, operator1);

        //new actor can be mint
        expect(await actors.nextActor()).to.eq(2);

        const holderAddress = ethers.utils.getContractAddress({
            from: actors.address,
            nonce: 1+1,
        });
        const receipt = await (await actorsByOperator1.mintActor(0)).wait();
        const [,actorMinted] = receipt.events || [];

        expect(await actors.ownerOf(2)).to.eq(operator1.address);
        expect(actorMinted?.event).to.eq('ActorMinted');
        expect(actorMinted?.args?.owner).to.eq(operator1.address);
        expect(actorMinted?.args?.actorId).to.equal(2);

        const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));
        expect(actorMinted?.args?.time).to.equal(timestamp);

        const actor1 = await actors.getActor(2);
        expect(actor1.actorId).to.eq(2);
        expect(actor1.owner).to.eq(operator1.address);
        expect(actor1.account).to.eq(holderAddress);
    });

    it('角色URI', async () => {
        //connect actors to operator
        let actorsByOperator1 = Actors__factory.connect(actors.address, operator1);

        expect(await actors.nextActor()).to.eq(2);
        const receipt = await (await actorsByOperator1.mintActor(0)).wait();

        const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));

        let uri = await actors.tokenURI(2);
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('ascii');
        let uriObj = JSON.parse(uriDecode);
        //console.log(JSON.stringify(uriObj, null, 2));
        expect(uriObj.name).to.eq("Taiyi Actor #2");
        expect(uriObj.description).to.eq("This is not a game.");
        expect(uriObj.data.base.mintTime).to.eq(timestamp);
        expect(uriObj.data.base.status).to.eq(2);

        // const svgDecode = Buffer.from(uriObj.image.substring(26), 'base64').toString('ascii');
        // console.log(svgDecode);
    });
});