import chai from 'chai';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants,
    WorldContractRoute, WorldContractRoute__factory,
    Actors, Actors__factory, 
} from '../../typechain';
import {
    blockTimestamp,
} from '../utils';
import {
    deployWorldConstants,
    deployWorldContractRoute,
    deployActors,
    deployWorldRandom,
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(solidity);
const { expect } = chai;

describe('角色Token基础测试', () => {

    let deployer: SignerWithAddress;
    let taisifusDAO: SignerWithAddress;
    let snapshotId: number;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;

    before(async () => {
        [deployer, taisifusDAO] = await ethers.getSigners();

        //Deploy Constants
        worldConstants = await deployWorldConstants(deployer);

        //Deploy WorldContractRoute
        worldContractRoute = await deployWorldContractRoute(deployer);

        //Deploy Actors
        actors = await deployActors(worldContractRoute, deployer);
        await worldContractRoute.registerActors(actors.address);
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
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
        const receipt = await (await actorsByDAO.mintActor()).wait();
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

        //PanGu should be mint
        expect(await actorsByDAO.nextActor()).to.eq(1);
        await actorsByDAO.mintActor();

        expect(await actorsByDAO.nextActor()).to.eq(2);
        //newone should be mint
        await actorsByDAO.mintActor();
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
        await actorsByDAO.mintActor();

        //deploy modules when operator is not PanGu
        await expect(worldContractRoute.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address))
        .to.be.revertedWith('Only PanGu');
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

        //Deploy Actors
        actors = await deployActors(worldContractRoute, deployer);
        await worldContractRoute.registerActors(actors.address);

        //connect actors to operator
        let actorsByDAO = Actors__factory.connect(actors.address, taisifusDAO);

        //PanGu should be mint at first, or you can not register any module
        expect(await actorsByDAO.nextActor()).to.eq(1);
        await actorsByDAO.mintActor();
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
        const receipt = await (await actorsByOperator1.mintActor()).wait();
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
        const receipt = await (await actorsByOperator1.mintActor()).wait();

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