import chai from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants,
    WorldContractRoute, WorldContractRoute__factory, 
    Actors, Actors__factory, ActorNames, ActorNames__factory, ShejiTu, SifusToken, SifusDescriptor__factory, ActorAttributes, Fungible,
} from '../../typechain';
import {
    blockNumber,
    blockTimestamp, deploySifusToken, populateDescriptor,
} from '../utils';
import {
    deployWorldConstants,
    deployWorldContractRoute,
    deployActors,
    deployWorldRandom,
    deployActorNames,
    deployActorAttributes,
    deployAssetDaoli,
    deployShejiTu
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;

describe('角色姓名测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let actorNames: ActorNames;
    let assetDaoli: Fungible;

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
        actorNames = await deployActorNames(routeByPanGu, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_NAMES(), actorNames.address);
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('姓名合约符号（Symbol）', async () => {
        expect(await actorNames.symbol()).to.eq('TYNAMES');
    });

    it('姓名合约名称', async () => {
        expect(await actorNames.name()).to.eq('Taiyi Actor Names');
    });

    it("申明姓名同时赋予角色", async ()=>{
        let nameId = await actorNames.nextName();
        expect(nameId).to.eq(1);

        let actorPanGu = await worldConstants.ACTOR_PANGU();
        let firstName = `古`;
        let lastName = `盘`;
        const receipt = await (await actorNames.connect(taiyiDAO).claim(firstName, lastName, actorPanGu)).wait();
        //console.log(JSON.stringify(receipt.events, null, 2));
        const [, nameClaimed, , , nameAssigned] = receipt.events || [];

        expect(nameClaimed?.event).to.eq('NameClaimed');
        expect(nameClaimed?.args?.owner).to.eq(taiyiDAO.address);
        expect(nameClaimed?.args?.actor).to.eq(actorPanGu);
        expect(nameClaimed?.args?.nameId).to.eq(nameId);
        expect(nameClaimed?.args?.name).to.eq('盘古');
        expect(nameClaimed?.args?.firstName).to.eq('古');
        expect(nameClaimed?.args?.lastName).to.eq('盘');


        expect(nameAssigned?.args?.nameId).to.eq(nameId);
        expect(nameAssigned?.args?.previousActor).to.eq(0);
        expect(nameAssigned?.args?.newActor).to.eq(actorPanGu);

        expect(await actorNames.ownerOf(nameId)).to.eq((await actors.getActor(actorPanGu)).account);
    });

    it("仅仅申明姓名（不赋予任何角色）", async ()=>{
        const namesByDAO = ActorNames__factory.connect(actorNames.address, taiyiDAO);

        let nameId = await actorNames.nextName();
        expect(nameId).to.eq(1);

        let firstName = `小拼`;
        let lastName = `李`;
        const receipt = await (await namesByDAO.claim(firstName, lastName, 0)).wait();
        //console.log(JSON.stringify(receipt.events, null, 2));
        const [, nameClaimed] = receipt.events || [];

        expect(nameClaimed?.event).to.eq('NameClaimed');
        expect(nameClaimed?.args?.owner).to.eq(taiyiDAO.address);
        expect(nameClaimed?.args?.actor).to.eq(0);
        expect(nameClaimed?.args?.nameId).to.eq(nameId);
        expect(nameClaimed?.args?.name).to.eq('李小拼');
        expect(nameClaimed?.args?.firstName).to.eq('小拼');
        expect(nameClaimed?.args?.lastName).to.eq('李');

        expect(await actorNames.ownerOf(nameId)).to.eq(taiyiDAO.address);
    });

    it("先申明姓名，再赋予角色", async ()=>{
        const namesByDAO = ActorNames__factory.connect(actorNames.address, taiyiDAO);

        let actorPanGu = await worldConstants.ACTOR_PANGU();
        let nameId = await actorNames.nextName();
        let firstName = `小拼`;
        let lastName = `李`;
        await namesByDAO.claim(firstName, lastName, 0);
        const receipt = await (await namesByDAO.assignName(nameId, actorPanGu)).wait();
        //console.log(JSON.stringify(receipt.events, null, 2));
        const [, , nameAssigned] = receipt.events || [];

        expect(nameAssigned?.args?.nameId).to.eq(nameId);
        expect(nameAssigned?.args?.previousActor).to.eq(0);
        expect(nameAssigned?.args?.newActor).to.eq(actorPanGu);

        expect(await actorNames.ownerOf(nameId)).to.eq((await actors.getActor(actorPanGu)).account);
    });

    it("不能申明已经存在的姓名", async ()=>{
        const namesByDAO = ActorNames__factory.connect(actorNames.address, taiyiDAO);

        let nameId = await actorNames.nextName();

        let firstName = `小拼`;
        let lastName = `李`;
        await namesByDAO.claim(firstName, lastName, 0);
        await expect(namesByDAO.claim(firstName, lastName, 0)).to.be.revertedWith('name taken');
    });

    it("如果一个角色已有姓名，则不能赋予角色新姓名", async ()=>{
        const namesByDAO = ActorNames__factory.connect(actorNames.address, taiyiDAO);

        let actorPanGu = await worldConstants.ACTOR_PANGU();
        let firstName = `古`;
        let lastName = `盘`;
        await namesByDAO.claim(firstName, lastName, actorPanGu);

        firstName = `小拼`;
        lastName = `李`;
        let nameId = await actorNames.nextName();
        await namesByDAO.claim(firstName, lastName, 0);
        await expect(namesByDAO.assignName(nameId, actorPanGu)).to.be.revertedWith('actor already named');
    });

    it("提取姓名NFT", async ()=>{
        //second actor for YeMing, should be mint for free
        expect(await actors.nextActor()).to.eq(2);
        await actors.connect(operator1).mintActor(0);
        await worldContractRoute.connect(taiyiDAO).setYeMing(2, operator1.address); //fake address just for test

        //deal coin
        await assetDaoli.connect(operator1).claim(2, 2, BigInt(1000e18));
        await assetDaoli.connect(operator1).withdraw(2, 2, BigInt(1000e18));
        expect(await assetDaoli.balanceOf(operator1.address)).to.eq(BigInt(1000e18));

        await assetDaoli.connect(operator1).approve(actors.address, BigInt(1000e18));
        let actor = await actors.nextActor();
        await actors.connect(operator1).mintActor(BigInt(100e18));

        let firstName = `小拼`;
        let lastName = `李`;
        let nameId = await actorNames.nextName();
        await actorNames.connect(operator1).claim(firstName, lastName, actor);

        //can not withdrawn by anyone except YeMing
        await expect(actorNames.connect(taiyiDAO).withdrawName(await worldConstants.ACTOR_PANGU(), actor)).to.be.revertedWith('not operated by YeMing');

        //should be withdrawn by YeMing
        expect((await actorNames.connect(operator1).withdrawName(2, actor)).wait()).eventually.fulfilled;
        expect(await actorNames.ownerOf(nameId)).to.eq(operator1.address);
    });
});