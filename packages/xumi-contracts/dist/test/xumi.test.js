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
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const utils_1 = require("@taiyi/contracts/dist/test/utils");
const utils_2 = require("@taiyi/contracts/dist/utils");
const utils_3 = require("../utils");
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
const OneAgeVSecond = 1;
const ActRecoverTimeDay = 60;
const ZoneResourceGrowTimeDay = 60;
const ZoneResourceGrowQuantityScale = 10 * 1000; //10.0f
const BaseTravelTime = 3000;
describe('须弥时间线基础', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let snapshotId;
    let taiyiContracts;
    let eventProcessorAddressBook;
    let contracts;
    //taiyi basic
    let worldConstants;
    let worldContractRoute;
    let sifusToken;
    let actors;
    let names;
    let actorSIDs;
    let assetDaoli;
    let zones;
    let baseAttributes;
    let actorPrelifes;
    let worldYemings;
    let worldRandom;
    let actorLocations;
    let trigrams;
    let worldItems;
    // 须弥相关
    let xumiConstants;
    let talents;
    let xumi;
    let actorXumiAttributes;
    let actorRelationship;
    let worldEvents;
    let actorPanGu;
    let testActor;
    let newZone;
    let makeMoney = (toWho, amount) => __awaiter(void 0, void 0, void 0, function* () {
        yield assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, amount);
        yield assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, amount);
        if (toWho != taiyiDAO.address)
            yield assetDaoli.connect(taiyiDAO).transfer(toWho, amount);
    });
    let newActor = (toWho, randomName) => __awaiter(void 0, void 0, void 0, function* () {
        //deal coin
        yield makeMoney(taiyiDAO.address, BigInt(1000e18));
        yield assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = yield actors.nextActor();
        yield actors.connect(taiyiDAO).mintActor(BigInt(100e18));
        if (randomName) {
            let firstName = `${Math.round(Math.random() * 100)}`;
            yield names.connect(taiyiDAO).claim(firstName, "赛博", _actor);
        }
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
        //Deploy taiyi basic
        const timestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(yield (0, utils_1.blockNumber)()).toHexString().replace("0x0", "0x"));
        taiyiContracts = yield (0, utils_2.deployTaiyiWorld)(timestamp, deployer, taiyiDAO, false);
        sifusToken = typechain_1.SifusToken__factory.connect(taiyiContracts.SifusToken.instance.address, operator1);
        worldConstants = typechain_1.WorldConstants__factory.connect(taiyiContracts.WorldConstants.instance.address, operator1);
        worldContractRoute = typechain_1.WorldContractRoute__factory.connect(taiyiContracts.WorldContractRoute.instance.address, operator1);
        actors = typechain_1.Actors__factory.connect(taiyiContracts.Actors.instance.address, operator1);
        assetDaoli = typechain_1.WorldFungible__factory.connect(taiyiContracts.AssetDaoli.instance.address, operator1);
        names = typechain_1.ActorNames__factory.connect(taiyiContracts.ActorNames.instance.address, operator1);
        zones = typechain_1.WorldZones__factory.connect(taiyiContracts.WorldZones.instance.address, operator1);
        worldYemings = typechain_1.WorldYemings__factory.connect(taiyiContracts.WorldYemings.instance.address, operator1);
        baseAttributes = typechain_1.ActorAttributes__factory.connect(taiyiContracts.ActorAttributes.instance.address, operator1);
        actorSIDs = typechain_1.ActorSocialIdentity__factory.connect(taiyiContracts.ActorSocialIdentity.instance.address, operator1);
        worldRandom = typechain_1.WorldRandom__factory.connect(taiyiContracts.WorldRandom.instance.address, operator1);
        actorLocations = typechain_1.ActorLocations__factory.connect(taiyiContracts.ActorLocations.instance.address, operator1);
        trigrams = typechain_1.Trigrams__factory.connect(taiyiContracts.Trigrams.instance.address, operator1);
        worldItems = typechain_1.WorldItems__factory.connect(taiyiContracts.WorldItems.instance.address, operator1);
        actorPrelifes = typechain_1.ActorPrelifes__factory.connect(taiyiContracts.ActorPrelifes.instance.address, operator1);
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
    }));
    describe('构建须弥域合约组', () => {
        it(`部署常量库`, () => __awaiter(void 0, void 0, void 0, function* () {
            xumiConstants = yield (0, utils_3.deployXumiConstants)(operator1);
        }));
        it(`部署资源`, () => __awaiter(void 0, void 0, void 0, function* () {
            let assetEnergy = yield (0, utils_3.deployAssetEnergy)(xumiConstants, worldContractRoute, operator1);
            yield worldContractRoute.connect(taiyiDAO).registerModule(yield xumiConstants.WORLD_MODULE_XUMI_ENERGY(), assetEnergy.address);
            let assetElementH = yield (0, utils_3.deployAssetElementH)(xumiConstants, worldContractRoute, operator1);
            yield worldContractRoute.connect(taiyiDAO).registerModule(yield xumiConstants.WORLD_MODULE_XUMI_ELEMENT_H(), assetElementH.address);
        }));
        it(`部署属性`, () => __awaiter(void 0, void 0, void 0, function* () {
            actorXumiAttributes = yield (0, utils_3.deployActorXumiAttributes)(worldContractRoute, operator1);
            yield worldContractRoute.connect(taiyiDAO).registerModule(yield xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES(), actorXumiAttributes.address);
        }));
        it(`部署天赋模块`, () => __awaiter(void 0, void 0, void 0, function* () {
            talents = yield (0, utils_2.deployActorTalents)(yield xumiConstants.WORLD_MODULE_TALENTS(), worldContractRoute, deployer);
            yield worldContractRoute.connect(taiyiDAO).registerModule(yield xumiConstants.WORLD_MODULE_TALENTS(), talents.address);
        }));
        it(`部署事件模块`, () => __awaiter(void 0, void 0, void 0, function* () {
            worldEvents = yield (0, utils_2.deployWorldEvents)(OneAgeVSecond, yield xumiConstants.WORLD_MODULE_EVENTS(), worldContractRoute, deployer);
            yield worldContractRoute.connect(taiyiDAO).registerModule(yield xumiConstants.WORLD_MODULE_EVENTS(), worldEvents.address);
        }));
        it(`部署须弥时间线`, () => __awaiter(void 0, void 0, void 0, function* () {
            xumi = typechain_1.ShejiTu__factory.connect((yield (0, utils_2.deployShejiTu)("须弥", "所在时间线：须弥", yield xumiConstants.WORLD_MODULE_TIMELINE(), actors, actorLocations, zones, baseAttributes, worldEvents, talents, trigrams, worldRandom, operator1))[0].address, operator1);
            yield worldContractRoute.connect(taiyiDAO).registerModule(yield xumiConstants.WORLD_MODULE_TIMELINE(), xumi.address);
        }));
        it('不允许再次初始化', () => __awaiter(void 0, void 0, void 0, function* () {
            const tx = xumi.connect(operator1).initialize("须弥", "所在时间线：须弥", yield xumiConstants.WORLD_MODULE_TIMELINE(), actors.address, actorLocations.address, zones.address, baseAttributes.address, worldEvents.address, talents.address, trigrams.address, worldRandom.address);
            yield expect(tx).to.be.revertedWith('Initializable: contract is already initialized');
        }));
        it(`初始化天赋`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_3.initTalents)(talents.address, taiyiDAO, xumiConstants, worldConstants);
            let W_MODULE_XUMI_ATTRIBUTES = yield xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES();
            let STB = yield xumiConstants.ATTR_STB();
            expect(yield talents.talentNames(10004)).to.eq("跃迁达人");
            expect(yield talents.talentDescriptions(10004)).to.eq("运动可能自发突然变化，稳定性-10，属性点+40");
            expect((yield talents.talentAttributeModifiers(10004)).length).to.eq(2);
            expect((yield talents.talentAttributeModifiers(10004))[0]).to.eq(STB);
            expect((yield talents.talentAttributeModifiers(10004))[1]).to.eq(-10);
            expect(yield talents.talentAttrPointsModifiers(10004, W_MODULE_XUMI_ATTRIBUTES)).to.eq(40);
        }));
        it(`增加物品类型`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_3.initItemTypes)(worldItems.address, taiyiDAO);
            expect(yield worldItems.typeNames(100)).to.eq("小型恒星");
        }));
        it(`部署事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            let eventProcessorAddressBook = yield (0, utils_3.initEvents)(worldContractRoute, worldEvents.address, taiyiDAO, operator1);
        }));
        it(`配置时间线`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, utils_3.initTimeline)(xumi.address, operator1);
        }));
        it(`配置Actor URI模块`, () => __awaiter(void 0, void 0, void 0, function* () {
            //register actors uri modules
            yield actors.connect(taiyiDAO).registerURIPartModule(names.address);
            yield actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
            yield actors.connect(taiyiDAO).registerURIPartModule(xumi.address);
        }));
        it(`创建测试角色`, () => __awaiter(void 0, void 0, void 0, function* () {
            //deal coin
            yield makeMoney(operator1.address, BigInt(1000e18));
            yield assetDaoli.approve(actors.address, BigInt(1000e18));
            testActor = yield actors.nextActor();
            yield actors.mintActor(BigInt(100e18));
            let firstName = `${Math.round(Math.random() * 100)}`;
            yield names.claim(firstName, "赛博", testActor);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`须弥时间线未配置操作员不能出生角色`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.approve(xumi.address, testActor);
            yield expect(xumi.bornActor(testActor)).to.be.revertedWith("only YeMing");
        }));
        it(`配置须弥操作员`, () => __awaiter(void 0, void 0, void 0, function* () {
            let testActor = yield newActor(operator1);
            yield worldYemings.connect(taiyiDAO).setYeMing(testActor, xumi.address);
            yield actors.approve(xumi.address, testActor);
            expect((yield xumi.initOperator(testActor)).wait()).eventually.fulfilled;
            expect(yield worldYemings.isYeMing(yield xumi.operator())).to.eq(true);
            expect(yield actors.ownerOf(yield xumi.operator())).to.eq(xumi.address);
        }));
        it(`须弥时间线未绑定区域不能出生角色`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(xumi.bornActor(testActor)).to.be.revertedWith("start zone invalid");
        }));
        it(`噎明铸造新区域绑定须弥时间线`, () => __awaiter(void 0, void 0, void 0, function* () {
            newZone = yield zones.nextZone();
            expect((yield zones.connect(taiyiDAO).claim(actorPanGu, "须弥域", xumi.address, testActor)).wait()).eventually.fulfilled;
            expect(yield zones.ownerOf(newZone)).to.eq((yield actors.getActor(testActor)).account);
            expect((yield xumi.setStartZone(newZone)).wait()).eventually.fulfilled;
            expect(yield xumi.startZone()).to.eq(newZone);
        }));
        it(`出生在须弥时间线`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield xumi.bornActor(testActor)).wait()).eventually.fulfilled;
            expect((yield actorLocations.actorLocations(testActor))[0]).to.eq(newZone);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`角色在须弥时间线上成长`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.approve(xumi.address, testActor);
            yield xumi.grow(testActor, { gasLimit: 5000000 }); //age 0
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
            // await xumi.grow(testActor, { gasLimit: 5000000 });
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
            // await xumi.grow(testActor, { gasLimit: 5000000 });
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
            // await xumi.grow(testActor, { gasLimit: 5000000 });
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
            // await xumi.grow(testActor, { gasLimit: 5000000 });
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
            // await xumi.grow(testActor, { gasLimit: 5000000 });
            // console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
    });
});
