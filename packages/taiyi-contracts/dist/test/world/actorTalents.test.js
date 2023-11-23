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
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
require("@openzeppelin/hardhat-upgrades");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const ethereum_waffle_1 = require("ethereum-waffle");
const typechain_1 = require("../../typechain");
const utils_1 = require("../utils");
const utils_2 = require("../../utils");
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
const OneAgeVSecond = 1;
describe('角色天赋测试', () => {
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
    let names;
    let actorPanGu;
    let testActor;
    const FAKE_MODULE_EVENTS = 101;
    const FAKE_MODULE_TIMELINE = 102;
    const FAKE_MODULE_TALENTS = 103;
    let newActor = (toWho, randomName) => __awaiter(void 0, void 0, void 0, function* () {
        //deal coin
        yield assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1000e18));
        yield assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, BigInt(1000e18));
        yield assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = yield actors.nextActor();
        yield actors.connect(taiyiDAO).mintActor(BigInt(100e18));
        if (randomName) {
            let firstName = `小拼${Math.round(Math.random() * 100)}`;
            yield names.connect(taiyiDAO).claim(firstName, "李", _actor);
        }
        yield actors.connect(taiyiDAO).approve(shejiTu.address, _actor);
        yield shejiTu.connect(taiyiDAO).bornActor(_actor);
        if (toWho.address != taiyiDAO.address)
            yield actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
        return _actor;
    });
    let parseActorURI = (actor) => __awaiter(void 0, void 0, void 0, function* () {
        let uri = yield actors.tokenURI(actor);
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
        //console.log(uriDecode);
        return JSON.parse(uriDecode);
    });
    function reset() {
        return __awaiter(this, void 0, void 0, function* () {
            if (snapshotId) {
                yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
                snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
                return;
            }
            snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
        });
    }
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
        //Deploy ActorNames
        names = yield (0, utils_2.deployActorNames)(worldContractRoute, deployer);
        yield worldContractRoute.connect(taiyiDAO).registerModule(yield worldConstants.WORLD_MODULE_NAMES(), names.address);
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
        //set timeline YeMing
        let shejiTuOperator = yield actors.nextActor();
        yield actors.mintActor(0);
        yield actors.approve(shejiTu.address, shejiTuOperator);
        yield shejiTu.initOperator(shejiTuOperator);
        yield worldYemings.connect(taiyiDAO).setYeMing(shejiTuOperator, shejiTu.address);
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //bind timeline to a zone
        let zoneId = yield worldZones.nextZone();
        yield worldZones.connect(taiyiDAO).claim(actorPanGu, "测试区域", shejiTu.address, actorPanGu);
        yield shejiTu.connect(deployer).setStartZone(zoneId);
        //born PanGu
        yield actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
        yield shejiTu.connect(taiyiDAO).bornActor(actorPanGu);
        //register actors uri modules
        yield actors.connect(taiyiDAO).registerURIPartModule(names.address);
        yield actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
    }));
    it('非盘古无权设计角色天赋', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(actorTalents.setTalent(0, "Good Man", "Born as good man", [], [])).to.be.revertedWith('only PanGu');
    }));
    it('盘古设计角色天赋', () => __awaiter(void 0, void 0, void 0, function* () {
        let talentsByDAO = actorTalents.connect(taiyiDAO);
        let W_MODULE_ATTRIBUTES = yield worldConstants.WORLD_MODULE_ATTRIBUTES();
        let HLH = yield worldConstants.ATTR_HLH();
        yield talentsByDAO.setTalent(1010, "Good Man", "Born as good man", [HLH, ethers_1.BigNumber.from(10)], [W_MODULE_ATTRIBUTES, 20]);
        expect(yield talentsByDAO.talentNames(1010)).to.eq("Good Man");
        expect(yield talentsByDAO.talentDescriptions(1010)).to.eq("Born as good man");
        expect((yield talentsByDAO.talentAttributeModifiers(1010)).length).to.eq(2);
        expect((yield talentsByDAO.talentAttributeModifiers(1010))[0]).to.eq(HLH);
        expect((yield talentsByDAO.talentAttributeModifiers(1010))[1]).to.eq(10);
        expect(yield talentsByDAO.talentAttrPointsModifiers(1010, W_MODULE_ATTRIBUTES)).to.eq(20);
    }));
    it('角色天赋互斥', () => __awaiter(void 0, void 0, void 0, function* () {
        let talentsByDAO = actorTalents.connect(taiyiDAO);
        let W_MODULE_ATTRIBUTES = yield worldConstants.WORLD_MODULE_ATTRIBUTES();
        let HLH = yield worldConstants.ATTR_HLH();
        yield expect(talentsByDAO.setTalentExclusive(1010, [1002, 1020])).to.be.revertedWith('talent have not set');
        yield talentsByDAO.setTalent(1010, "Good Man", "Born as good man", [HLH, ethers_1.BigNumber.from(10)], [W_MODULE_ATTRIBUTES, 20]);
        yield talentsByDAO.setTalentExclusive(1010, [1002, 1020]);
        expect((yield talentsByDAO.talentExclusivity(1010)).length).to.eq(2);
        expect((yield talentsByDAO.talentExclusivity(1010))[0]).to.eq(1002);
        expect((yield talentsByDAO.talentExclusivity(1010))[1]).to.eq(1020);
    }));
    it('对角色赋予天赋', () => __awaiter(void 0, void 0, void 0, function* () {
        let actor = yield newActor(operator1, true);
        let talentsByDAO = actorTalents.connect(taiyiDAO);
        let W_MODULE_ATTRIBUTES = yield worldConstants.WORLD_MODULE_ATTRIBUTES();
        let HLH = yield worldConstants.ATTR_HLH();
        yield talentsByDAO.setTalent(1010, "Good Man", "Born as good man", [HLH, ethers_1.BigNumber.from(10)], [W_MODULE_ATTRIBUTES, 20]);
        yield talentsByDAO.setTalentExclusive(1010, [1002, 1020]);
        //should not talent actor by any one except owner or appoved.
        yield expect(talentsByDAO.talentActor(actor, actor)).to.be.revertedWith('only YeMing');
        yield talentsByDAO.talentActor(actorPanGu, actor);
        let actTlts = yield actorTalents.actorTalents(actor);
        if (actTlts.length >= 1) {
            expect(actTlts[0]).to.eq(1010);
            expect(yield actorTalents.actorAttributePointBuy(actor, W_MODULE_ATTRIBUTES)).to.be.eq(120);
        }
        else {
            expect(yield actorTalents.actorAttributePointBuy(actor, W_MODULE_ATTRIBUTES)).to.be.eq(100);
        }
    }));
});
