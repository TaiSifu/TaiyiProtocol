//npx hardhat node
//yarn test ./test/sifus.test.ts --network hard
import chai from 'chai';
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import { Actors, SifusDescriptor__factory, SifusToken, WorldConstants, WorldContractRoute, WorldFungible } from '../typechain';
import { deploySifusToken, populateDescriptor, blockTimestamp, blockNumber } from './utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { deployActors, deployAssetDaoli, deployWorldConstants, deployWorldContractRoute } from '../utils';

chai.use(solidity);
const { expect } = chai;

describe('太乙师傅令牌测试', () => {
    let sifusToken: SifusToken;
    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let snapshotId: number;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let assetDaoli: WorldFungible;

    let actorPanGu: BigNumber;

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
        [deployer, taiyiDAO] = await ethers.getSigners();

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
        actorPanGu = await worldConstants.ACTOR_PANGU();
        expect(actorPanGu).to.eq(1);
        expect(await actors.nextActor()).to.eq(actorPanGu);
        await actors.connect(taiyiDAO).mintActor(0);

        //Deploy SifusToken and its descriptor
        sifusToken = await deploySifusToken(worldContractRoute.address, deployer, taiyiDAO.address);
        const descriptor = await sifusToken.descriptor();
        await populateDescriptor(SifusDescriptor__factory.connect(descriptor, deployer));

        //set PanGu as YeMing for test
        await worldContractRoute.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address);
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('噎明铸造师傅令牌同时自动奖励部分令牌给太乙岛', async () => {
        let actorByDeployer = await newActor(deployer);
        await worldContractRoute.connect(taiyiDAO).setYeMing(actorByDeployer, deployer.address);

        const receipt = await (await sifusToken.connect(deployer).mint(actorByDeployer)).wait();

        const [, , , taisifusSifuCreated, , , , ownersSifuCreated] = receipt.events || [];

        expect(await sifusToken.ownerOf(0)).to.eq(taiyiDAO.address);
        expect(taisifusSifuCreated?.event).to.eq('SifuCreated');
        expect(taisifusSifuCreated?.args?.sifu).to.eq(0);
        expect(taisifusSifuCreated?.args?.seed.length).to.equal(5);

        expect(await sifusToken.ownerOf(1)).to.eq(deployer.address);
        expect(ownersSifuCreated?.event).to.eq('SifuCreated');
        expect(ownersSifuCreated?.args?.sifu).to.eq(1);
        expect(ownersSifuCreated?.args?.seed.length).to.equal(5);

        taisifusSifuCreated?.args?.seed.forEach((item: EthersBN | number) => {
            const value = typeof item !== 'number' ? item?.toNumber() : item;
            expect(value).to.be.a('number');
        });

        ownersSifuCreated?.args?.seed.forEach((item: EthersBN | number) => {
            const value = typeof item !== 'number' ? item?.toNumber() : item;
            expect(value).to.be.a('number');
        });
    });

    it('合约符号（Symbol）', async () => {
        expect(await sifusToken.symbol()).to.eq('SIFU');
    });

    it('合约名称', async () => {
        expect(await sifusToken.name()).to.eq('Taiyi Sifus');
    });

    it('噎明铸造师傅令牌', async () => {
        await (await sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();

        const receipt = await (await sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();
        const sifuCreated = receipt.events?.[3];

        expect(await sifusToken.ownerOf(2)).to.eq(taiyiDAO.address);
        expect(sifuCreated?.event).to.eq('SifuCreated');
        expect(sifuCreated?.args?.sifu).to.eq(2);
        expect(sifuCreated?.args?.seed.length).to.equal(5);

        sifuCreated?.args?.seed.forEach((item: EthersBN | number) => {
            const value = typeof item !== 'number' ? item?.toNumber() : item;
            expect(value).to.be.a('number');
        });
    });

    it('铸造师傅令牌时产生两个Transfer事件日志', async () => {
        const [, , creator, minter] = await ethers.getSigners();

        await (await sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();

        await (await sifusToken.transferOwnership(creator.address)).wait();

        let actorByMinter = await newActor(minter);
        await worldContractRoute.connect(taiyiDAO).setYeMing(actorByMinter, minter.address);

        const tx = sifusToken.connect(minter).mint(actorByMinter);

        await expect(tx)
            .to.emit(sifusToken, 'Transfer')
            .withArgs(constants.AddressZero, creator.address, 2);
        await expect(tx).to.emit(sifusToken, 'Transfer').withArgs(creator.address, minter.address, 2);
    });

    it('噎明可以销毁一个师傅令牌', async () => {
        await (await sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();

        const tx = sifusToken.connect(taiyiDAO).burn(actorPanGu, 0);
        await expect(tx).to.emit(sifusToken, 'SifuBurned').withArgs(0);
    });

    it('非噎明无权铸造', async () => {
        let actorByDao = await newActor(taiyiDAO);
        const account0AsSifuErc721Account = sifusToken.connect(taiyiDAO);
        await expect(account0AsSifuErc721Account.mint(actorByDao)).to.be.reverted;
    });

    it('师傅令牌tokenURI', async () => {
        await (await sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();

        const receipt = await (await sifusToken.connect(taiyiDAO).mint(actorPanGu)).wait();
        const timestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));
        const sifuCreated = receipt.events?.[3];

        expect(sifuCreated?.args?.sifu).to.eq(2);

        let uri = await sifusToken.tokenURI(2);
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
        let uriObj = JSON.parse(uriDecode);
        expect(uriObj.name).to.eq("Taiyi Sifu 2");
        expect(uriObj.description).to.eq("Taiyi Sifu 2 is a member of the Taiyi DAO.");
        //console.log(JSON.stringify(uriObj, null, 2));
    });

    it('合约contractURI测试', async () => {
        expect(await sifusToken.contractURI()).to.eq(
            'ipfs://QmUXSbKuptaT3kt6wrN16zE7bdBBCFzVcUttZDp4osjhtU',
        );
    });
    it('合约所有人设置contractURI', async () => {
        await sifusToken.setContractURIHash('ABC123');
        expect(await sifusToken.contractURI()).to.eq('ipfs://ABC123');
    });
    it('非合约所有人无权设置contractURI', async () => {
        const [, nonOwner] = await ethers.getSigners();
        await expect(sifusToken.connect(nonOwner).setContractURIHash('BAD')).to.be.revertedWith(
            'Ownable: caller is not the owner',
        );
    });

});
