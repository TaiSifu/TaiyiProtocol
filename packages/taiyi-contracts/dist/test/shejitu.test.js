"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npx hardhat node
//yarn test ./test/shejitu.test.ts --network hard
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
require("@openzeppelin/hardhat-upgrades");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const ethereum_waffle_1 = require("ethereum-waffle");
const typechain_1 = require("../typechain");
const utils_1 = require("./utils");
const utils_2 = require("../utils");
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
const OneAgeVSecond = 1;
describe('社稷图全局时间线测试', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let snapshotId;
    let sifusToken;
    let worldConstants;
    let worldContractRoute;
    let actors;
    let worldRandom;
    let worldYemings;
    let worldEvents;
    let assetDaoli;
    let shejiTu; //proxy
    let shejiTuImpl;
    let actorAttributes;
    let worldZones;
    let actorLocations;
    let actorTalents;
    let trigrams;
    let actorPanGu;
    const FAKE_MODULE_EVENTS = 101;
    const FAKE_MODULE_TIMELINE = 102;
    const FAKE_MODULE_TALENTS = 103;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        [deployer, taiyiDAO, operator1, operator2] = yield hardhat_1.ethers.getSigners();
        //Deploy Constants
        worldConstants = yield (0, utils_2.deployWorldConstants)(deployer);
        //Deploy WorldContractRoute
        worldContractRoute = yield (0, utils_2.deployWorldContractRoute)(deployer);
        //Deploy Taiyi Daoli ERC20
        assetDaoli = yield (0, utils_2.deployAssetDaoli)(worldConstants, worldContractRoute, deployer);
        //Deploy Actors
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        actors = yield (0, utils_2.deployActors)(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        yield worldContractRoute.registerActors(actors.address);
        //PanGu should be mint at first, or you can not register any module
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        expect(actorPanGu).to.eq(1);
        expect(yield actors.nextActor()).to.eq(actorPanGu);
        yield actors.connect(taiyiDAO).mintActor(0);
        //Deploy SifusToken
        sifusToken = yield (0, utils_1.deploySifusToken)(worldContractRoute.address, deployer, taiyiDAO.address, deployer.address);
        const descriptor = yield sifusToken.descriptor();
        yield (0, utils_1.populateDescriptor)(typechain_1.SifusDescriptor__factory.connect(descriptor, deployer));
        //deploy all basic modules pre shejitu
        let routeByPanGu = typechain_1.WorldContractRoute__factory.connect(worldContractRoute.address, taiyiDAO);
        worldRandom = yield (0, utils_2.deployWorldRandom)(deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address);
        worldYemings = yield (0, utils_2.deployWorldYemings)(taiyiDAO.address, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);
        actorAttributes = yield (0, utils_2.deployActorAttributes)(routeByPanGu, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address);
        worldEvents = yield (0, utils_2.deployWorldEvents)(OneAgeVSecond, FAKE_MODULE_EVENTS, worldContractRoute, deployer); //moduleId for test
        yield routeByPanGu.registerModule(FAKE_MODULE_EVENTS, worldEvents.address);
        actorLocations = yield (0, utils_2.deployActorLocations)(routeByPanGu, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ACTOR_LOCATIONS(), actorLocations.address);
        worldZones = yield (0, utils_2.deployWorldZones)(worldContractRoute, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ZONES(), worldZones.address);
        actorTalents = yield (0, utils_2.deployActorTalents)(FAKE_MODULE_TALENTS, routeByPanGu, deployer); //moduleId for test
        yield routeByPanGu.registerModule(FAKE_MODULE_TALENTS, actorTalents.address);
        trigrams = yield (0, utils_2.deployTrigrams)(routeByPanGu, deployer);
        yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_TRIGRAMS(), trigrams.address);
        let shejiTuPkg = yield (0, utils_2.deployShejiTu)("测试", "所在时间线：测试", FAKE_MODULE_TIMELINE, actors, actorLocations, worldZones, actorAttributes, worldEvents, actorTalents, trigrams, worldRandom, deployer);
        shejiTu = typechain_1.ShejiTu__factory.connect(shejiTuPkg[0].address, deployer);
        shejiTuImpl = typechain_1.ShejiTu__factory.connect(shejiTuPkg[2].address, deployer);
        yield routeByPanGu.registerModule(FAKE_MODULE_TIMELINE, shejiTu.address);
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
    }));
    it('不允许再次初始化', () => __awaiter(void 0, void 0, void 0, function* () {
        let shejiTuByDAO = typechain_1.ShejiTu__factory.connect(shejiTu.address, taiyiDAO);
        const tx = shejiTuByDAO.initialize("测试", "所在时间线：测试", FAKE_MODULE_TIMELINE, actors.address, actorLocations.address, worldZones.address, actorAttributes.address, worldEvents.address, actorTalents.address, trigrams.address, worldRandom.address);
        yield expect(tx).to.be.revertedWith('Initializable: contract is already initialized');
    }));
    it('时间线管理者-噎明', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield shejiTu.operator()).to.eq(0);
        let YeMing = yield actors.nextActor();
        yield actors.connect(deployer).mintActor(0);
        yield actors.connect(deployer).approve(shejiTu.address, YeMing);
        expect((yield shejiTu.connect(deployer).initOperator(YeMing)).wait()).eventually.fulfilled;
        const actorYeMing = yield actors.getActor(yield shejiTu.operator());
        expect(actorYeMing.owner).to.eq(shejiTu.address);
    }));
    it('盘古注册噎明', () => __awaiter(void 0, void 0, void 0, function* () {
        const actorYeMing = yield shejiTu.operator();
        expect(yield worldYemings.isYeMing(actorYeMing)).to.eq(false);
        yield expect(worldYemings.setYeMing(actorYeMing, shejiTuImpl.address)).to.be.rejectedWith("Sender is not Taiyi DAO");
        expect((yield worldYemings.connect(taiyiDAO).setYeMing(actorYeMing, shejiTuImpl.address)).wait()).eventually.fulfilled;
        expect(yield worldYemings.isYeMing(actorYeMing)).to.eq(true);
    }));
    describe('社稷图基本操作测试', () => {
        it('盘古注销噎明', () => __awaiter(void 0, void 0, void 0, function* () {
            snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
            const actorYeMing = yield shejiTu.operator();
            expect(yield worldYemings.isYeMing(actorYeMing)).to.eq(true);
            //should disable this actor as yeming
            yield worldYemings.connect(taiyiDAO).setYeMing(actorYeMing, "0x0000000000000000000000000000000000000000");
            expect(yield worldYemings.isYeMing(actorYeMing)).to.eq(false);
            yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
        }));
        it('角色出生-所有者未授权情况', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(shejiTu.connect(taiyiDAO).bornActor(yield worldConstants.ACTOR_PANGU())).to.be.revertedWith("not approved or owner of actor");
        }));
        it('角色出生-时间线未绑定出生区域', () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.connect(taiyiDAO).approve(shejiTu.address, yield worldConstants.ACTOR_PANGU());
            yield expect(shejiTu.connect(taiyiDAO).bornActor(yield worldConstants.ACTOR_PANGU())).to.be.revertedWith("start zone invalid");
        }));
        describe('出生角色', () => {
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                //创建区域并绑定时间线
                let zoneId = yield worldZones.nextZone();
                yield worldZones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
                yield shejiTu.connect(deployer).setStartZone(zoneId);
                //授权角色
                yield actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            }));
            it('角色出生', () => __awaiter(void 0, void 0, void 0, function* () {
                expect((yield shejiTu.connect(taiyiDAO).bornActor(actorPanGu)).wait()).eventually.fulfilled;
            }));
            it('未注册到角色URI模块的情况', () => __awaiter(void 0, void 0, void 0, function* () {
                let uri = yield actors.tokenURI(actorPanGu);
                let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
                let uriObj = JSON.parse(uriDecode);
                //console.log(JSON.stringify(uriObj, null, 2));
                expect(FAKE_MODULE_TIMELINE).to.eq(102);
                expect(uriObj.data.m_102).to.be.undefined;
            }));
            it('注册到角色URI模块的情况', () => __awaiter(void 0, void 0, void 0, function* () {
                //register timeline to be one part of Actor URI
                expect((yield actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address)).wait()).eventually.fulfilled;
                let uri = yield actors.tokenURI(actorPanGu);
                let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
                let uriObj = JSON.parse(uriDecode);
                //console.log(JSON.stringify(uriObj, null, 2));
                expect(FAKE_MODULE_TIMELINE).to.eq(102);
                expect(uriObj.data.m_102.base.name).to.eq("测试");
            }));
            it('角色生长-未配置事件', () => __awaiter(void 0, void 0, void 0, function* () {
                yield expect(shejiTu.connect(taiyiDAO).grow(actorPanGu)).to.be.revertedWith("not exist any event in this age!");
            }));
        });
    });
});
