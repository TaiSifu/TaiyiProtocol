import chai from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, WorldContractRoute, 
    Actors, WorldItems, SifusToken, SifusDescriptor__factory, WorldYemings, AssetDaoli, ActorNameRegistry, ActorNameGenerator,
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
    deployWorldYemings,
    deployActorNameRegistry,
    deployActorNameGenerator,
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

describe('姓名发生器测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let assetDaoli: AssetDaoli;
    let nameReg: ActorNameRegistry;
    let nameGen: ActorNameGenerator;
    let worldYemings: WorldYemings;

    let actor: BigNumber;
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

        //deploy all basic modules
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_RANDOM(), (await deployWorldRandom(deployer)).address);
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
        nameGen = await deployActorNameGenerator(worldContractRoute, deployer);
        await worldContractRoute.connect(taiyiDAO).registerModule(225, nameGen.address);
        nameReg = await deployActorNameRegistry(worldContractRoute, deployer);
        await worldContractRoute.connect(taiyiDAO).registerModule(227, nameReg.address);

        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //second actor for test
        actor = await newActor(operator1);
        expect(actor).to.eq(2);
    });

    it('注册性别', async () => {
        await nameReg.connect(taiyiDAO).registerGender(actorPanGu, ["男", "女"]);
    });

    it('注册姓', async () => {
        await nameReg.connect(taiyiDAO).registerFamily(actorPanGu, [
            "李",
            "王",
            "张",
            "刘",
            "陈",
            "杨",
            "赵",
            "黄",
            "周"
        ]);
    });

    it('注册辈分', async () => {
        await nameReg.connect(taiyiDAO).registerMiddle(actorPanGu, [
            "之",
            "亦",
            "其",
            "如",
            "而",
            "何",
            "乃",
            "且",
            "若",
            "和",
            "所"
        ]);
    });

    it('注册错误性别的名', async () => {
        await expect(nameReg.connect(taiyiDAO).registerGiven(actorPanGu, "非", ["国","民"])).to.be.revertedWith("gender not exist");
    });

    it('注册男名', async () => {
        await nameReg.connect(taiyiDAO).registerGiven(actorPanGu, "男", [
            "国",
            "民",
            "邦",
            "杰",
            "宝",
            "森",
            "炳",
            "文",
            "伯",
            "华",
            "龙",
            "伦",
            "阳",
            "博"
        ]);
    });

    it('注册女名', async () => {
        await nameReg.connect(taiyiDAO).registerGiven(actorPanGu, "女", [
            "兮",
            "芳",
            "星",
            "清",
            "夏",
            "月",
            "初",
            "书",
            "简",
            "雪",
            "益",
            "纯",
            "琛",
            "馨",
        ]);
    });

    it('性别错误生成', async () => {
        await expect(nameGen.genName(20, 10, 0, "", "", "", 0)).to.be.rejectedWith("invalid gender");
    });

    it('随机生成', async () => {
        let names = await nameGen.genName(20, 0, 0, "", "", "", 0);
        for(var i=0; i<20; i++) {
            console.log(`${names[3*i]}${names[3*i+1]}${names[3*i+2]}`);
        }
    });

    it('“周”姓随机生成', async () => {
        let names = await nameGen.genName(20, 0, 0, "周", "", "", 0);
        for(var i=0; i<20; i++) {
            console.log(`${names[3*i]}${names[3*i+1]}${names[3*i+2]}`);
        }
    });

    it('“和”字辈两字名随机生成', async () => {
        let names = await nameGen.genName(20, 0, 2, "", "和", "", 0);
        for(var i=0; i<20; i++) {
            console.log(`${names[3*i]}${names[3*i+1]}${names[3*i+2]}`);
        }
    });

    it('“和”字辈随机生成', async () => {
        let names = await nameGen.genName(20, 0, 0, "", "和", "", 0);
        for(var i=0; i<20; i++) {
            console.log(`${names[3*i]}${names[3*i+1]}${names[3*i+2]}`);
        }
    });
});