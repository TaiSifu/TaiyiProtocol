//npx hardhat node
//yarn test ./test/shejitu.test.ts --network hard
import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, WorldContractRoute, WorldContractRoute__factory, Actors, ShejiTu, ShejiTu__factory, 
    ActorAttributes, SifusToken, SifusDescriptor__factory, WorldEvents, WorldFungible, WorldZones, WorldYemings, 
    WorldRandom, ActorLocations, ActorTalents, Trigrams, ShejiTuProxy,
} from '../typechain';
import {
    blockNumber,
    blockTimestamp,
    deploySifusToken,
    populateDescriptor,
} from './utils';
import {
    deployWorldConstants,
    deployWorldContractRoute,
    deployActors,
    deployWorldRandom,
    deployActorAttributes,
    deployAssetDaoli,
    deployShejiTu,
    deployWorldEvents,
    deployActorLocations,
    deployWorldZones,
    deployWorldYemings,
    deployActorTalents,
    deployTrigrams
} from '../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;

describe('社稷图全局时间线测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let sifusToken: SifusToken;

    let worldConstants: WorldConstants;

    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let worldRandom: WorldRandom;
    let worldYemings: WorldYemings;
    let worldEvents: WorldEvents;
    let assetDaoli: WorldFungible;
    let shejiTu: ShejiTu; //proxy
    let shejiTuImpl: ShejiTu;
    let actorAttributes: ActorAttributes;
    let worldZones: WorldZones;
    let actorLocations: ActorLocations;
    let actorTalents: ActorTalents;
    let trigrams: Trigrams;

    let actorPanGu: BigNumber;

    const FAKE_MODULE_EVENTS = 101;
    const FAKE_MODULE_TIMELINE = 102;
    const FAKE_MODULE_TALENTS = 103;

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
        actorPanGu = await worldConstants.ACTOR_PANGU();
        expect(actorPanGu).to.eq(1);
        expect(await actors.nextActor()).to.eq(actorPanGu);
        await actors.connect(taiyiDAO).mintActor(0);

        //Deploy SifusToken
        sifusToken = await deploySifusToken(worldContractRoute.address, deployer, taiyiDAO.address, deployer.address);
        const descriptor = await sifusToken.descriptor();
        await populateDescriptor(SifusDescriptor__factory.connect(descriptor, deployer));

        //deploy all basic modules pre shejitu
        let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, taiyiDAO);
        worldRandom = await deployWorldRandom(deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address);
        worldYemings = await deployWorldYemings(taiyiDAO.address, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address)
        actorAttributes = await deployActorAttributes(routeByPanGu, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address)
        worldEvents = await deployWorldEvents(OneAgeVSecond, FAKE_MODULE_EVENTS, worldContractRoute, deployer); //moduleId for test
        await routeByPanGu.registerModule(FAKE_MODULE_EVENTS, worldEvents.address);
        actorLocations = await deployActorLocations(routeByPanGu, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ACTOR_LOCATIONS(), actorLocations.address);
        worldZones = await deployWorldZones(worldContractRoute, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ZONES(), worldZones.address);
        actorTalents = await deployActorTalents(FAKE_MODULE_TALENTS, routeByPanGu, deployer); //moduleId for test
        await routeByPanGu.registerModule(FAKE_MODULE_TALENTS, actorTalents.address);
        trigrams = await deployTrigrams(routeByPanGu, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TRIGRAMS(), trigrams.address);
            
        let shejiTuPkg = await deployShejiTu("测试", "所在时间线：测试", FAKE_MODULE_TIMELINE, actors, actorLocations, worldZones, actorAttributes,
            worldEvents, actorTalents, trigrams, worldRandom, deployer);
        shejiTu = ShejiTu__factory.connect((shejiTuPkg[0] as ShejiTuProxy).address, deployer);
        shejiTuImpl = ShejiTu__factory.connect((shejiTuPkg[2] as ShejiTu).address, deployer);
        await routeByPanGu.registerModule(FAKE_MODULE_TIMELINE, shejiTu.address);

        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
    });

    it('不允许再次初始化', async () => {
        let shejiTuByDAO = ShejiTu__factory.connect(shejiTu.address, taiyiDAO);
        const tx = shejiTuByDAO.initialize("测试", "所在时间线：测试", FAKE_MODULE_TIMELINE, actors.address, actorLocations.address, worldZones.address,
            actorAttributes.address, worldEvents.address, actorTalents.address, trigrams.address, worldRandom.address);
        await expect(tx).to.be.revertedWith('Initializable: contract is already initialized');
    });

    it('时间线管理者-噎明', async () => {
        expect(await shejiTu.operator()).to.eq(0);
        let YeMing = await actors.nextActor();
        await actors.connect(deployer).mintActor(0);

        await actors.connect(deployer).approve(shejiTu.address, YeMing);
        expect((await shejiTu.connect(deployer).initOperator(YeMing)).wait()).eventually.fulfilled;
        const actorYeMing = await actors.getActor(await shejiTu.operator());
        expect(actorYeMing.owner).to.eq(shejiTu.address);
    });

    it('盘古注册噎明', async () => {
        const actorYeMing = await shejiTu.operator();
        expect(await worldYemings.isYeMing(actorYeMing)).to.eq(false);
        await expect(worldYemings.setYeMing(actorYeMing, shejiTuImpl.address)).to.be.rejectedWith("Sender is not Taiyi DAO");

        expect((await worldYemings.connect(taiyiDAO).setYeMing(actorYeMing, shejiTuImpl.address)).wait()).eventually.fulfilled;
        expect(await worldYemings.isYeMing(actorYeMing)).to.eq(true);
    });

    describe('社稷图基本操作测试', () => {

        it('盘古注销噎明', async () => {
            snapshotId = await ethers.provider.send('evm_snapshot', []);
            const actorYeMing = await shejiTu.operator();
            expect(await worldYemings.isYeMing(actorYeMing)).to.eq(true);
            //should disable this actor as yeming
            await worldYemings.connect(taiyiDAO).setYeMing(actorYeMing, "0x0000000000000000000000000000000000000000");
            expect(await worldYemings.isYeMing(actorYeMing)).to.eq(false);
            await ethers.provider.send('evm_revert', [snapshotId]);
        });

        it('角色出生-所有者未授权情况', async () => {
            await expect(shejiTu.connect(taiyiDAO).bornActor(await worldConstants.ACTOR_PANGU())).to.be.revertedWith("not approved or owner of actor");
        });

        it('角色出生-时间线未绑定出生区域', async () => {
            await actors.connect(taiyiDAO).approve(shejiTu.address, await worldConstants.ACTOR_PANGU());
            await expect(shejiTu.connect(taiyiDAO).bornActor(await worldConstants.ACTOR_PANGU())).to.be.revertedWith("start zone invalid");
        });        

        describe('出生角色', () => {

            before(async () => {
                //创建区域并绑定时间线
                let zoneId = await worldZones.nextZone();
                await worldZones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
                await shejiTu.connect(deployer).setStartZone(zoneId);
                //授权角色
                await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            });

            it('角色出生', async () => {
                expect((await shejiTu.connect(taiyiDAO).bornActor(actorPanGu)).wait()).eventually.fulfilled;
            });

            it('未注册到角色URI模块的情况', async () => {
                let uri = await actors.tokenURI(actorPanGu);
                let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
                let uriObj = JSON.parse(uriDecode);
                //console.log(JSON.stringify(uriObj, null, 2));
                expect(FAKE_MODULE_TIMELINE).to.eq(102);
                expect(uriObj.data.m_102).to.be.undefined;
            });

            it('注册到角色URI模块的情况', async () => {
                //register timeline to be one part of Actor URI
                expect((await actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address)).wait()).eventually.fulfilled;

                let uri = await actors.tokenURI(actorPanGu);
                let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
                let uriObj = JSON.parse(uriDecode);
                //console.log(JSON.stringify(uriObj, null, 2));
                expect(FAKE_MODULE_TIMELINE).to.eq(102);
                expect(uriObj.data.m_102.base.name).to.eq("测试");
            });

            it('角色生长-未配置事件', async () => {
                await expect(shejiTu.connect(taiyiDAO).grow(actorPanGu)).to.be.revertedWith("not exist any event in this age!");
            });
        });
    });
});