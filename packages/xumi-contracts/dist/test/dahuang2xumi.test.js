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
const typechain_2 = require("@taiyi/dahuang-contracts/dist/typechain");
const utils_3 = require("@taiyi/dahuang-contracts/dist/utils");
const typechain_3 = require("../typechain");
const utils_4 = require("../utils");
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
const OneAgeVSecond = 1;
const ActRecoverTimeDay = 60;
const ZoneResourceGrowTimeDay = 60;
const ZoneResourceGrowQuantityScale = 10 * 1000; //10.0f
const BaseTravelTime = 3000;
describe('大荒到须弥', () => {
    let deployer;
    let taiyiDAO;
    let operator1;
    let operator2;
    let snapshotId;
    let taiyiContracts;
    let dahuangEventProcessorAddressBook;
    let dahuangContracts;
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
    //dahuang
    let dahuangConstants;
    let dahuangTalents;
    let dahuang;
    let golds;
    let woods;
    let fabrics;
    let prestiges;
    let charmAttributes;
    let behaviorAttributes;
    let coreAttributes;
    let moodAttributes;
    let dahuangActorRelationship;
    let dahuangWorldEvents;
    let worldBuildings;
    let actorPanGu;
    let testActor;
    let dahuangZone;
    let xumiZone;
    let enterItem;
    let evt60513;
    ///// 须弥相关
    let xumiContracts;
    let xumiEventProcessorAddressBook;
    let xumiConstants;
    let xumi;
    let xumiTalents;
    let actorXumiAttributes;
    let assetEnergy;
    let xumiActorRelationship;
    let xumiWorldEvents;
    let evt1050001;
    let makeMoney = (toWho, amount) => __awaiter(void 0, void 0, void 0, function* () {
        yield assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, amount);
        yield assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, amount);
        if (toWho != taiyiDAO.address)
            yield assetDaoli.connect(taiyiDAO).transfer(toWho, amount);
    });
    let newXumiActor = (toWho, randomName) => __awaiter(void 0, void 0, void 0, function* () {
        //deal coin
        yield makeMoney(taiyiDAO.address, BigInt(1000e18));
        yield assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = yield actors.nextActor();
        yield actors.connect(taiyiDAO).mintActor(BigInt(100e18));
        if (randomName) {
            let firstName = `${Math.round(Math.random() * 100)}`;
            yield names.connect(taiyiDAO).claim(firstName, "赛博", _actor);
        }
        yield actors.connect(taiyiDAO).approve(xumi.address, _actor);
        yield xumi.connect(taiyiDAO).bornActor(_actor);
        if (toWho.address != taiyiDAO.address)
            yield actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
        return _actor;
    });
    let newDahuangActor = (toWho, randomName) => __awaiter(void 0, void 0, void 0, function* () {
        //deal coin
        yield makeMoney(taiyiDAO.address, BigInt(1000e18));
        yield assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = yield actors.nextActor();
        yield actors.connect(taiyiDAO).mintActor(BigInt(100e18));
        if (randomName) {
            let firstName = `小拼${Math.round(Math.random() * 100)}`;
            yield names.connect(taiyiDAO).claim(firstName, "李", _actor);
        }
        yield actors.connect(taiyiDAO).approve(dahuang.address, _actor);
        yield dahuang.connect(taiyiDAO).bornActor(_actor);
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
        //Deploy dahuang world
        let worldDeployed = yield (0, utils_3.deployDahuangWorld)(OneAgeVSecond, ActRecoverTimeDay, ZoneResourceGrowTimeDay, ZoneResourceGrowQuantityScale, worldContractRoute, worldConstants, actors, actorLocations, worldYemings, zones, baseAttributes, trigrams, worldRandom, worldItems, actorSIDs, deployer, taiyiDAO, {
            isTest: true,
            noSIDNames: true,
            noTalents: true,
            noTalentProcessors: true,
            noRelations: true,
            noItemTypes: true,
            noBuildingTypes: true,
            noEventProcessors: true,
            noTimelineEvents: true,
            noZones: true
        }, false);
        dahuangContracts = worldDeployed.worldContracts;
        dahuangEventProcessorAddressBook = worldDeployed.eventProcessorAddressBook;
        dahuangConstants = typechain_2.DahuangConstants__factory.connect(dahuangContracts.DahuangConstants.instance.address, operator1);
        dahuangTalents = typechain_1.ActorTalents__factory.connect(dahuangContracts.ActorTalents.instance.address, operator1);
        dahuangWorldEvents = typechain_1.WorldEvents__factory.connect(dahuangContracts.WorldEvents.instance.address, operator1);
        dahuang = typechain_1.ShejiTu__factory.connect(dahuangContracts.ShejiTuProxy.instance.address, operator1);
        golds = typechain_1.WorldFungible__factory.connect(dahuangContracts.AssetGold.instance.address, operator1);
        woods = typechain_1.WorldFungible__factory.connect(dahuangContracts.AssetWood.instance.address, operator1);
        fabrics = typechain_1.WorldFungible__factory.connect(dahuangContracts.AssetFabric.instance.address, operator1);
        prestiges = typechain_1.WorldFungible__factory.connect(dahuangContracts.AssetPrestige.instance.address, operator1);
        charmAttributes = typechain_2.ActorCharmAttributes__factory.connect(dahuangContracts.ActorCharmAttributes.instance.address, operator1);
        behaviorAttributes = typechain_2.ActorBehaviorAttributes__factory.connect(dahuangContracts.ActorBehaviorAttributes.instance.address, operator1);
        coreAttributes = typechain_2.ActorCoreAttributes__factory.connect(dahuangContracts.ActorCoreAttributes.instance.address, operator1);
        moodAttributes = typechain_2.ActorMoodAttributes__factory.connect(dahuangContracts.ActorMoodAttributes.instance.address, operator1);
        dahuangActorRelationship = typechain_1.ActorRelationship__factory.connect(dahuangContracts.ActorRelationship.instance.address, operator1);
        worldBuildings = typechain_2.WorldBuildings__factory.connect(dahuangContracts.WorldBuildings.instance.address, operator1);
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //bind timeline to a zone
        dahuangZone = yield zones.nextZone();
        yield zones.connect(taiyiDAO).claim(actorPanGu, "大荒", dahuang.address, actorPanGu);
        yield dahuang.connect(deployer).setStartZone(dahuangZone);
        //born PanGu
        yield actors.connect(taiyiDAO).approve(dahuang.address, actorPanGu);
        yield dahuang.connect(taiyiDAO).bornActor(actorPanGu);
        //部署大荒出生序列
        let eventsByPanGu = dahuangWorldEvents.connect(taiyiDAO);
        const evt10001 = yield (yield (new typechain_2.WorldEventProcessor10001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(10001, evt10001.address);
        const evt60001 = yield (yield (new typechain_2.WorldEventProcessor60001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(60001, evt60001.address);
        const evt60002 = yield (yield (new typechain_2.WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(60002, evt60002.address);
        const evt60003 = yield (yield (new typechain_2.WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(60003, evt60003.address);
        const evt60004 = yield (yield (new typechain_2.WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(60004, evt60004.address);
        const evt60005 = yield (yield (new typechain_2.WorldEventProcessor60005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        yield eventsByPanGu.setEventProcessor(60005, evt60005.address);
        //配置时间线出生事件
        yield dahuang.connect(deployer).addAgeEvent(0, 10001, 1);
        //Deploy Xumi world
        let xumiWorldDeployed = yield (0, utils_4.deployXumiWorld)(OneAgeVSecond, worldContractRoute, worldConstants, actors, actorLocations, zones, baseAttributes, trigrams, worldRandom, worldItems, operator1, taiyiDAO, {}, false);
        xumiContracts = xumiWorldDeployed.worldContracts;
        xumiEventProcessorAddressBook = xumiWorldDeployed.eventProcessorAddressBook;
        xumiConstants = typechain_3.XumiConstants__factory.connect(xumiContracts.XumiConstants.instance.address, operator1);
        xumi = typechain_1.ShejiTu__factory.connect(xumiContracts.XumiProxy.instance.address, operator1);
        actorXumiAttributes = typechain_3.ActorXumiAttributes__factory.connect(xumiContracts.ActorXumiAttributes.instance.address, operator1);
        assetEnergy = typechain_1.WorldFungible__factory.connect(xumiContracts.AssetEnergy.instance.address, operator1);
        xumiTalents = typechain_1.ActorTalents__factory.connect(xumiContracts.ActorTalents.instance.address, operator1);
        xumiWorldEvents = typechain_1.WorldEvents__factory.connect(xumiContracts.WorldEvents.instance.address, operator1);
        xumiActorRelationship = typechain_1.ActorRelationship__factory.connect(xumiContracts.ActorRelationship.instance.address, operator1);
        //register actors uri modules
        yield actors.connect(taiyiDAO).registerURIPartModule(names.address);
        yield actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
        yield actors.connect(taiyiDAO).registerURIPartModule(dahuang.address);
        yield actors.connect(taiyiDAO).registerURIPartModule(xumi.address);
        testActor = yield newDahuangActor(operator1, true);
    }));
    describe('配置须弥域', () => {
        it(`配置须弥操作员`, () => __awaiter(void 0, void 0, void 0, function* () {
            let newActor = yield newDahuangActor(operator1);
            yield worldYemings.connect(taiyiDAO).setYeMing(newActor, xumi.address);
            yield actors.approve(xumi.address, newActor);
            expect((yield xumi.initOperator(newActor)).wait()).eventually.fulfilled;
            expect(yield worldYemings.isYeMing(yield xumi.operator())).to.eq(true);
            expect(yield actors.ownerOf(yield xumi.operator())).to.eq(xumi.address);
        }));
        it(`噎明铸造新区域绑定须弥时间线`, () => __awaiter(void 0, void 0, void 0, function* () {
            xumiZone = yield zones.nextZone();
            expect((yield zones.connect(taiyiDAO).claim(actorPanGu, "须弥域", xumi.address, yield xumi.operator())).wait()).eventually.fulfilled;
            expect(yield zones.ownerOf(xumiZone)).to.eq((yield actors.getActor(yield xumi.operator())).account);
            expect((yield xumi.setStartZone(xumiZone)).wait()).eventually.fulfilled;
            expect(yield xumi.startZone()).to.eq(xumiZone);
        }));
    });
    describe('出生在大荒', () => {
        it(`部署大荒事件线`, () => __awaiter(void 0, void 0, void 0, function* () {
            let evt50002 = yield (yield (new typechain_2.WorldEventProcessor50002__factory(operator1)).deploy(worldContractRoute.address)).deployed();
            yield dahuangWorldEvents.connect(taiyiDAO).setEventProcessor(50002, evt50002.address);
            evt60513 = yield (yield (new typechain_2.WorldEventProcessor60513__factory(operator1)).deploy(worldContractRoute.address)).deployed();
            yield dahuangWorldEvents.connect(taiyiDAO).setEventProcessor(60513, evt60513.address);
            yield evt60513.setTargetZoneId(xumiZone);
            expect(yield evt60513.targetZone()).to.eq(xumiZone);
            yield dahuang.connect(deployer).addAgeEvent(1, 50002, 1);
            yield dahuang.connect(deployer).addAgeEvent(2, 60001, 1);
        }));
        it(`成长到0岁`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.approve(dahuang.address, testActor);
            yield dahuang.grow(testActor, { gasLimit: 5000000 }); //age 0
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`没有道具无法激活查看紫金米事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(dahuang.activeTrigger(60513, testActor, [1], [])).to.be.revertedWith("ERC721: owner query for nonexistent token");
        }));
        it(`成长到1岁`, () => __awaiter(void 0, void 0, void 0, function* () {
            enterItem = yield worldItems.nextItemId();
            yield dahuang.grow(testActor, { gasLimit: 5000000 }); //age 1
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`捡到紫金米`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield worldItems.itemTypes(enterItem)).to.eq(50);
            expect(yield worldItems.ownerOf(enterItem)).to.eq((yield actors.getActor(testActor)).account);
        }));
        it(`非道具持有者无法激活查看紫金米事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(dahuang.connect(taiyiDAO).activeTrigger(60513, actorPanGu, [enterItem], [])).to.be.revertedWith("item is not belongs to actor");
        }));
        it(`查看紫金米`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60513.checkOccurrence(testActor, 0)).to.eq(true);
            expect((yield dahuang.activeTrigger(60513, testActor, [enterItem], [])).wait()).eventually.fulfilled;
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`破碎虚空，传送到须弥域`, () => __awaiter(void 0, void 0, void 0, function* () {
            let currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(xumiZone);
        }));
        it(`年龄检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield xumiWorldEvents.ages(testActor)).to.eq(0);
            expect(yield dahuangWorldEvents.ages(testActor)).to.eq(1);
        }));
        it(`不能再在大荒成长`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(dahuang.grow(testActor, { gasLimit: 5000000 })).to.be.revertedWith("not in current timeline");
        }));
    });
    ///////////////////////////////////////////////////////////////////////////////////////////
    describe('生长在须弥', () => {
        it(`部署须弥事件线`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt1050001 = yield (yield (new typechain_3.WorldEventProcessor1050001__factory(operator1)).deploy(worldContractRoute.address)).deployed();
            yield xumiWorldEvents.connect(taiyiDAO).setEventProcessor(1050001, evt1050001.address);
            yield evt1050001.setTargetZoneId(dahuangZone);
            expect(yield evt1050001.targetZone()).to.eq(dahuangZone);
        }));
        it(`出生`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.connect(operator1).approve(xumi.address, testActor);
            yield xumi.connect(operator1).bornActor(testActor);
            yield assetEnergy.approveActor(testActor, yield xumi.operator(), BigInt(1000e18));
            yield xumi.grow(testActor, { gasLimit: 5000000 }); //age 0
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`成长到1岁`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield xumi.grow(testActor, { gasLimit: 5000000 }); //age 1
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`未达到2岁不能回大荒`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt1050001.checkOccurrence(testActor, 0)).to.eq(false);
        }));
        it(`成长到2岁`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield xumi.grow(testActor, { gasLimit: 5000000 }); //age 2
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`直接激活回大荒事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt1050001.checkOccurrence(testActor, 0)).to.eq(true);
            expect((yield xumi.activeTrigger(1050001, testActor, [], [])).wait()).eventually.fulfilled;
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`破碎虚空，传送回大荒`, () => __awaiter(void 0, void 0, void 0, function* () {
            let currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(dahuangZone);
        }));
        it(`年龄检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield dahuangWorldEvents.ages(testActor)).to.eq(1);
            expect(yield xumiWorldEvents.ages(testActor)).to.eq(2);
        }));
        it(`不能再在须弥成长`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(xumi.grow(testActor, { gasLimit: 5000000 })).to.be.revertedWith("not in current timeline");
        }));
    });
    ///////////////////////////////////////////////////////////////////////////////////////////
    describe('回大荒', () => {
        it(`在大荒成长到2岁`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.approve(dahuang.address, testActor);
            yield expect((yield dahuang.grow(testActor, { gasLimit: 5000000 })).wait()).eventually.fulfilled;
            expect(yield dahuangWorldEvents.ages(testActor)).to.eq(2);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
    });
});
