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
const typechain_2 = require("../../typechain");
const utils_3 = require("../../utils");
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
const OneAgeVSecond = 1;
const ActRecoverTimeDay = 60;
const ZoneResourceGrowTimeDay = 60;
const ZoneResourceGrowQuantityScale = 10 * 1000; //10.0f
const BaseTravelTime = 60;
const BaseBuildTime = 60;
describe('主动事件角色行为测试', () => {
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
    let talents;
    let shejiTu;
    let actorSIDs;
    let assetDaoli;
    let zones;
    let baseAttributes;
    let charmAttributes;
    let behaviorAttributes;
    let coreAttributes;
    let moodAttributes;
    let actorRelationship;
    let worldEvents;
    let worldYemings;
    let worldRandom;
    let actorLocations;
    let trigrams;
    let worldItems;
    //dahuang
    let dahuangConstants;
    let golds;
    let woods;
    let fabrics;
    let prestiges;
    let worldBuildings;
    let actorPanGu;
    let testActor;
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
        contracts = worldDeployed.worldContracts;
        eventProcessorAddressBook = worldDeployed.eventProcessorAddressBook;
        dahuangConstants = typechain_2.DahuangConstants__factory.connect(contracts.DahuangConstants.instance.address, operator1);
        talents = typechain_1.ActorTalents__factory.connect(contracts.ActorTalents.instance.address, operator1);
        worldEvents = typechain_1.WorldEvents__factory.connect(contracts.WorldEvents.instance.address, operator1);
        shejiTu = typechain_1.ShejiTu__factory.connect(contracts.ShejiTuProxy.instance.address, operator1);
        golds = typechain_1.WorldFungible__factory.connect(contracts.AssetGold.instance.address, operator1);
        woods = typechain_1.WorldFungible__factory.connect(contracts.AssetWood.instance.address, operator1);
        fabrics = typechain_1.WorldFungible__factory.connect(contracts.AssetFabric.instance.address, operator1);
        prestiges = typechain_1.WorldFungible__factory.connect(contracts.AssetPrestige.instance.address, operator1);
        charmAttributes = typechain_2.ActorCharmAttributes__factory.connect(contracts.ActorCharmAttributes.instance.address, operator1);
        behaviorAttributes = typechain_2.ActorBehaviorAttributes__factory.connect(contracts.ActorBehaviorAttributes.instance.address, operator1);
        coreAttributes = typechain_2.ActorCoreAttributes__factory.connect(contracts.ActorCoreAttributes.instance.address, operator1);
        moodAttributes = typechain_2.ActorMoodAttributes__factory.connect(contracts.ActorMoodAttributes.instance.address, operator1);
        actorRelationship = typechain_1.ActorRelationship__factory.connect(contracts.ActorRelationship.instance.address, operator1);
        worldBuildings = typechain_2.WorldBuildings__factory.connect(contracts.WorldBuildings.instance.address, operator1);
        actorPanGu = yield worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        yield worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test
        //bind timeline to a zone
        let zoneId = yield zones.nextZone();
        yield zones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
        yield shejiTu.connect(deployer).setStartZone(zoneId);
        //born PanGu
        yield actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
        yield shejiTu.connect(taiyiDAO).bornActor(actorPanGu);
        //register actors uri modules
        yield actors.connect(taiyiDAO).registerURIPartModule(names.address);
        yield actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
        yield actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
        //部署出生序列
        let eventsByPanGu = worldEvents.connect(taiyiDAO);
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
        yield shejiTu.connect(deployer).addAgeEvent(0, 10001, 1);
        yield shejiTu.connect(deployer).addAgeEvent(1, 60001, 1);
        yield shejiTu.connect(deployer).addAgeEvent(2, 60001, 1);
        yield shejiTu.connect(deployer).addAgeEvent(3, 60001, 1);
        yield shejiTu.connect(deployer).addAgeEvent(4, 60001, 1);
        yield shejiTu.connect(deployer).addAgeEvent(5, 60001, 1);
        testActor = yield newActor(operator1, true);
    }));
    describe('创建新区域和基础资源采集与兑换', () => {
        let evt70000;
        let evt60505;
        let evt60509;
        let evt60514;
        let evt60514Operator;
        let evt60515;
        let evt60515Operator;
        let newZone;
        before(reset);
        it(`部署区域事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            //区域专用事件
            evt70000 = yield (yield (new typechain_2.WorldEventProcessor70000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(70000, evt70000.address);
            evt60505 = yield (yield (new typechain_2.WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
            evt60509 = yield (yield (new typechain_2.WorldEventProcessor60509__factory(deployer)).deploy(BaseTravelTime, worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60509, evt60509.address);
        }));
        it(`非盘古无权创建新区域`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt70000.checkOccurrence(testActor, 0)).to.eq(false);
            yield expect(shejiTu.connect(operator1).activeTrigger(70000, testActor, [0], ["太乙村"])).to.be.revertedWith("event check occurrence failed.");
        }));
        it(`盘古创建新区域`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt70000.checkOccurrence(actorPanGu, 0)).to.eq(true);
            newZone = yield zones.nextZone();
            yield actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            expect((yield shejiTu.connect(taiyiDAO).activeTrigger(70000, actorPanGu, [0], ["太乙村"])).wait()).eventually.fulfilled;
        }));
        it(`行动力不够不能采集`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.approve(shejiTu.address, testActor);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(0);
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(false);
        }));
        it(`恢复行动力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
        }));
        it(`角色不在的区域采集资源`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
            yield expect(shejiTu.activeTrigger(60505, testActor, [newZone], [])).to.be.revertedWith("must collect at actor located zone");
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`角色在当前所在区域采集资源`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60505.checkOccurrence(testActor, 0)).to.eq(true);
            let lcs = yield actorLocations.actorLocations(testActor);
            while ((yield golds.balanceOfActor(testActor)).lt(BigInt(1e18)) || (yield woods.balanceOfActor(testActor)).lt(BigInt(1e18))) {
                console.log("make assets...");
                yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
                yield behaviorAttributes.recoverAct(testActor);
                yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], []);
            }
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`部署60514兑换合约`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt60514 = yield (yield (new typechain_2.WorldEventProcessor60514__factory(deployer)).deploy(newZone, worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60514, evt60514.address);
        }));
        it('配置60514经手人角色', () => __awaiter(void 0, void 0, void 0, function* () {
            evt60514Operator = yield newActor(deployer);
            yield actors.connect(deployer).approve(evt60514.address, evt60514Operator);
            yield evt60514.initOperator(evt60514Operator);
            expect(yield evt60514.eventOperator()).to.eq(evt60514Operator);
            expect(yield actors.ownerOf(evt60514Operator)).to.eq(evt60514.address);
        }));
        it(`60514经手人道理不够不能执行合约`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60514.checkOccurrence(testActor, 0)).to.eq(true);
            let assetId = yield golds.moduleID();
            let amount = yield golds.balanceOfActor(testActor);
            yield golds.approveActor(testActor, yield shejiTu.operator(), amount);
            yield expect(shejiTu.activeTrigger(60514, testActor, [assetId, amount], [])).to.be.rejectedWith('ERC20: transfer amount exceeds balance');
        }));
        it(`给60514经手人充值道理`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1000e18));
            yield assetDaoli.connect(taiyiDAO).transferActor(actorPanGu, evt60514Operator, BigInt(1000e18));
        }));
        it(`60514兑换合约执行，角色不在太乙村`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60514.checkOccurrence(testActor, 0)).to.eq(true);
            let assetId = yield golds.moduleID();
            let amount = (yield golds.balanceOfActor(testActor)).div(2);
            let daoliBefore = yield assetDaoli.balanceOfActor(testActor);
            yield (yield shejiTu.activeTrigger(60514, testActor, [assetId, amount], [])).wait();
            let daoliAfter = yield assetDaoli.balanceOfActor(testActor);
            expect(daoliAfter.sub(daoliBefore)).eq(amount.div(10));
        }));
        it(`角色到达太乙村`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield (yield behaviorAttributes.recoverAct(testActor)).wait();
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
            expect(yield evt60509.checkOccurrence(testActor, 0)).to.eq(true);
            let currentLc = yield actorLocations.actorLocations(testActor);
            let lA = currentLc[1];
            yield shejiTu.activeTrigger(60509, testActor, [lA, newZone], []);
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [BaseTravelTime]);
            expect((yield actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(false);
            currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(newZone);
            expect(currentLc[1]).to.eq(newZone);
        }));
        it(`因为60514代码问题，角色在太乙村时，太乙村兑换合约不能执行`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60514.checkOccurrence(testActor, 0)).to.eq(false);
        }));
        it(`部署60515兑换合约`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt60515 = yield (yield (new typechain_2.WorldEventProcessor60515__factory(deployer)).deploy(newZone, evt60514.address, worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60515, evt60515.address);
        }));
        it('配置60515经手人角色', () => __awaiter(void 0, void 0, void 0, function* () {
            evt60515Operator = yield newActor(deployer);
            yield actors.connect(deployer).approve(evt60515.address, evt60515Operator);
            yield evt60515.initOperator(evt60515Operator);
            expect(yield evt60515.eventOperator()).to.eq(evt60515Operator);
            expect(yield actors.ownerOf(evt60515Operator)).to.eq(evt60515.address);
        }));
        it(`检查60514和60515经手人资金情况`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield assetDaoli.balanceOfActor(yield evt60514.eventOperator())).to.gt(0);
            expect(yield assetDaoli.balanceOfActor(yield evt60515.eventOperator())).to.eq(0);
        }));
        it(`60515兑换合约执行，角色在太乙村`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60515.checkOccurrence(testActor, 0)).to.eq(true);
            let assetId = yield woods.moduleID();
            let amount = (yield woods.balanceOfActor(testActor)).div(2);
            yield woods.approveActor(testActor, yield shejiTu.operator(), amount);
            let daoliBefore = yield assetDaoli.balanceOfActor(testActor);
            yield (yield shejiTu.activeTrigger(60515, testActor, [assetId, amount], [])).wait();
            let daoliAfter = yield assetDaoli.balanceOfActor(testActor);
            expect(daoliAfter.sub(daoliBefore)).eq(amount.div(100));
        }));
        it(`检查60514和60515经手人资金情况`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield assetDaoli.balanceOfActor(yield evt60514.eventOperator())).to.eq(0);
            expect(yield assetDaoli.balanceOfActor(yield evt60515.eventOperator())).to.gt(0);
        }));
        it(`角色离开太乙村`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield (yield behaviorAttributes.recoverAct(testActor)).wait();
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
            expect(yield evt60509.checkOccurrence(testActor, 0)).to.eq(true);
            let currentLc = yield actorLocations.actorLocations(testActor);
            let lA = currentLc[1];
            yield shejiTu.activeTrigger(60509, testActor, [lA, 1], []);
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [BaseTravelTime]);
            expect((yield actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(false);
            currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(1);
            expect(currentLc[1]).to.eq(1);
        }));
        it(`角色不在太乙村时，太乙村兑换合约不能执行`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60515.checkOccurrence(testActor, 0)).to.eq(false);
        }));
    });
    describe('创建村庄和获取基础工具', () => {
        let evt70000;
        let evt60505;
        let evt60506;
        let evt60509;
        let evt60510;
        let newZone;
        let newVillage;
        before(reset);
        it(`部署区域事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt70000 = yield (yield (new typechain_2.WorldEventProcessor70000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(70000, evt70000.address);
            evt60505 = yield (yield (new typechain_2.WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
            evt60506 = yield (yield (new typechain_2.WorldEventProcessor60506__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60506, evt60506.address);
            evt60509 = yield (yield (new typechain_2.WorldEventProcessor60509__factory(deployer)).deploy(BaseTravelTime, worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60509, evt60509.address);
            //制作工具事件
            evt60510 = yield (yield (new typechain_2.WorldEventProcessor60510__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60510, evt60510.address);
        }));
        it(`设置初级工具`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield worldItems.connect(taiyiDAO).setTypeName(8, "木工箱");
        }));
        it(`创建测试区域`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt70000.checkOccurrence(actorPanGu, 0)).to.eq(true);
            newZone = yield zones.nextZone();
            yield actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            yield shejiTu.connect(taiyiDAO).activeTrigger(70000, actorPanGu, [0], ["北京"]);
        }));
        it(`采集一些资源`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.approve(shejiTu.address, testActor);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
            while ((yield golds.balanceOfActor(testActor)).lt(BigInt(1e18)) || (yield woods.balanceOfActor(testActor)).lt(BigInt(1e18))) {
                console.log("make assets...");
                yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
                yield behaviorAttributes.recoverAct(testActor);
                let lcs = yield actorLocations.actorLocations(testActor);
                yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], []);
            }
        }));
        it(`成长到有效年龄`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        }));
        it(`体力和威望检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60506.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`未授权威望消耗不能创建村庄`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(shejiTu.activeTrigger(60506, testActor, [], ["太乙村"])).to.be.revertedWith("transfer amount exceeds allowance");
        }));
        it(`创建一个村庄-太乙村`, () => __awaiter(void 0, void 0, void 0, function* () {
            newVillage = yield zones.nextZone();
            yield prestiges.approveActor(testActor, yield shejiTu.operator(), BigInt(1000e18));
            yield shejiTu.activeTrigger(60506, testActor, [], ["太乙村"]);
            expect(yield zones.names(newVillage)).to.eq("太乙村");
            expect(yield zones.ownerOf(newVillage)).to.eq((yield actors.getActor(testActor)).account);
        }));
        it(`体力不够不能移动`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60509.checkOccurrence(testActor, 0)).to.eq(false);
            let currentLc = yield actorLocations.actorLocations(testActor);
            yield expect(shejiTu.activeTrigger(60509, testActor, [currentLc[1], newZone], [])).to.be.revertedWith("event check occurrence failed.");
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        }));
        it(`移动到太乙村-开始`, () => __awaiter(void 0, void 0, void 0, function* () {
            let currentLc = yield actorLocations.actorLocations(testActor);
            let lA = currentLc[1];
            yield shejiTu.activeTrigger(60509, testActor, [lA, newVillage], []);
            currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(lA);
            expect(currentLc[1]).to.eq(newVillage);
        }));
        it(`移动到太乙村-移动时间未到`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(true);
            //finish call can success but no effect
            expect((yield actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(true);
        }));
        it(`移动到太乙村-移动时间达到`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [BaseTravelTime]);
            expect((yield actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(false);
            let currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(newVillage);
            expect(currentLc[1]).to.eq(newVillage);
        }));
        // it(`体力不够不能制作工具`, async ()=>{
        //     expect(await evt60510.checkOccurrence(testActor, 0)).to.eq(false);
        //     await expect(await shejiTu.activeTrigger(60510, testActor, [8], [])).to.be.revertedWith("event check occurrence failed.");
        // })
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        }));
        it(`制作工具-未授权资源消耗`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(shejiTu.activeTrigger(60510, testActor, [], [])).to.be.revertedWith("transfer amount exceeds allowance");
        }));
        it(`制作工具`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield golds.approveActor(testActor, yield shejiTu.operator(), BigInt(1000e18));
            yield woods.approveActor(testActor, yield shejiTu.operator(), BigInt(1000e18));
            let newItem = yield worldItems.nextItemId();
            expect((yield shejiTu.activeTrigger(60510, testActor, [], [])).wait()).eventually.fulfilled;
            expect(yield worldItems.itemTypes(newItem)).to.eq(8);
            expect(yield worldItems.itemWears(newItem)).to.eq(100);
            expect(yield worldItems.itemShapes(newItem)).to.eq(0);
            expect(yield worldItems.ownerOf(newItem)).to.eq((yield actors.getActor(testActor)).account);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
    });
    describe('申领商会初级资格', () => {
        let evt60507;
        before(reset);
        it(`部署商会资格事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt60507 = yield (yield (new typechain_2.WorldEventProcessor60507__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60507, evt60507.address);
        }));
        it(`设置商会资格`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield worldItems.connect(taiyiDAO).setTypeName(7, "公输坊资格");
        }));
        it(`成长到有效年龄`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.approve(shejiTu.address, testActor);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        }));
        it(`体力和威望检查`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield prestiges.balanceOfActor(testActor)).to.gte(BigInt(10e18));
            expect(yield evt60507.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it(`未授权威望消耗不能申领资格`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(shejiTu.activeTrigger(60507, testActor, [7], [], { gasLimit: 5000000 })).to.be.revertedWith("transfer amount exceeds allowance");
        }));
        it(`申领商会初级资格`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield prestiges.approveActor(testActor, yield shejiTu.operator(), BigInt(1000e18));
            let newItem = yield worldItems.nextItemId();
            expect((yield shejiTu.activeTrigger(60507, testActor, [7], [], { gasLimit: 5000000 })).wait()).eventually.fulfilled;
            expect(yield worldItems.balanceOf(operator1.address)).to.eq(0); //not in operator but account
            expect(yield worldItems.balanceOf((yield actors.getActor(testActor)).account)).to.eq(1);
            expect(yield worldItems.ownerOf(newItem)).to.eq((yield actors.getActor(testActor)).account);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
    });
    describe('修建基础建筑', () => {
        let evt70000;
        let evt60505;
        let evt60506;
        let evt60509;
        let evt60512;
        let newZone;
        let newVillage;
        let newItem;
        let newBuildingZone;
        before(reset);
        it(`部署建筑相关事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt70000 = yield (yield (new typechain_2.WorldEventProcessor70000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(70000, evt70000.address);
            evt60505 = yield (yield (new typechain_2.WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
            evt60506 = yield (yield (new typechain_2.WorldEventProcessor60506__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60506, evt60506.address);
            evt60509 = yield (yield (new typechain_2.WorldEventProcessor60509__factory(deployer)).deploy(BaseTravelTime, worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60509, evt60509.address);
            evt60512 = yield (yield (new typechain_2.WorldEventProcessor60512__factory(deployer)).deploy(BaseBuildTime, worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60512, evt60512.address);
        }));
        it(`设置建筑相关物品`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield worldItems.connect(taiyiDAO).setTypeName(20, "《木工房》");
            //设置建筑类型
            yield worldBuildings.connect(taiyiDAO).setTypeName(1, "木工房"); //20-19
        }));
        it(`创建测试区域`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt70000.checkOccurrence(actorPanGu, 0)).to.eq(true);
            newZone = yield zones.nextZone();
            yield actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            yield shejiTu.connect(taiyiDAO).activeTrigger(70000, actorPanGu, [0], ["北京"]);
        }));
        it(`成长到有效年龄`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.approve(shejiTu.address, testActor);
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            yield shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
        }));
        it(`采集一些资源`, () => __awaiter(void 0, void 0, void 0, function* () {
            while ((yield golds.balanceOfActor(testActor)).lt(BigInt(95e18)) ||
                (yield woods.balanceOfActor(testActor)).lt(BigInt(350e18)) ||
                (yield fabrics.balanceOfActor(testActor)).lt(BigInt(350e18))) {
                console.log("make assets...");
                yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
                yield behaviorAttributes.recoverAct(testActor);
                let lcs = yield actorLocations.actorLocations(testActor);
                yield shejiTu.activeTrigger(60505, testActor, [lcs[1]], []);
            }
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        }));
        it(`创建一个村庄-太乙村`, () => __awaiter(void 0, void 0, void 0, function* () {
            newVillage = yield zones.nextZone();
            yield prestiges.approveActor(testActor, yield shejiTu.operator(), BigInt(1000e18));
            yield shejiTu.activeTrigger(60506, testActor, [], ["太乙村"]);
            expect(yield zones.names(newVillage)).to.eq("太乙村");
            expect(yield zones.ownerOf(newVillage)).to.eq((yield actors.getActor(testActor)).account);
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        }));
        it(`移动到太乙村`, () => __awaiter(void 0, void 0, void 0, function* () {
            let currentLc = yield actorLocations.actorLocations(testActor);
            let lA = currentLc[1];
            yield shejiTu.activeTrigger(60509, testActor, [lA, newVillage], []);
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [BaseTravelTime]);
            expect((yield actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(false);
            currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(newVillage);
            expect(currentLc[1]).to.eq(newVillage);
        }));
        it(`申领建筑天书`, () => __awaiter(void 0, void 0, void 0, function* () {
            newItem = yield worldItems.nextItemId();
            expect((yield worldItems.connect(taiyiDAO).mint(actorPanGu, 20, 100, 0, testActor)).wait()).eventually.fulfilled;
            expect(yield worldItems.balanceOf(operator1.address)).to.eq(0); //not in operator but account
            expect(yield worldItems.balanceOf((yield actors.getActor(testActor)).account)).to.eq(1);
            expect(yield worldItems.ownerOf(newItem)).to.eq((yield actors.getActor(testActor)).account);
        }));
        it(`恢复体力`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield hardhat_1.ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            yield behaviorAttributes.recoverAct(testActor);
            expect(yield behaviorAttributes.attributesScores(yield dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        }));
        it(`未授权资源消耗不能修建建筑`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(shejiTu.activeTrigger(60512, testActor, [newItem], [])).to.be.revertedWith("transfer amount exceeds allowance");
            let actorYeMing = yield shejiTu.operator();
            yield golds.approveActor(testActor, actorYeMing, BigInt(1000e18));
            yield woods.approveActor(testActor, actorYeMing, BigInt(1000e18));
            yield fabrics.approveActor(testActor, actorYeMing, BigInt(1000e18));
        }));
        it(`修建木工房`, () => __awaiter(void 0, void 0, void 0, function* () {
            newBuildingZone = yield zones.nextZone();
            expect((yield shejiTu.activeTrigger(60512, testActor, [newItem], [])).wait()).eventually.fulfilled;
            yield expect(worldItems.ownerOf(newItem)).to.be.revertedWith("ERC721: owner query for nonexistent token");
            let currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(newBuildingZone);
            expect(yield zones.ownerOf(newBuildingZone)).to.eq((yield actors.getActor(testActor)).account);
            expect(yield worldBuildings.buildingTypes(newBuildingZone)).to.eq(1);
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(true);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
        it(`角色位置确认`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield actorLocations.isActorLocked(testActor)).to.eq(true);
            let currentLc = yield actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(newBuildingZone);
        }));
        it(`新建筑确认`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield zones.ownerOf(newBuildingZone)).to.eq((yield actors.getActor(testActor)).account);
            expect(yield worldBuildings.buildingTypes(newBuildingZone)).to.eq(1);
        }));
    });
    describe('提取道理（60516）', () => {
        let evt60516;
        before(reset);
        it(`部署相关事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt60516 = yield (yield (new typechain_2.WorldEventProcessor60516__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60516, evt60516.address);
        }));
        it(`角色获得道理`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(10e18));
            yield assetDaoli.connect(taiyiDAO).transferActor(actorPanGu, testActor, BigInt(1e18));
            expect(yield assetDaoli.balanceOfActor(testActor)).eq(BigInt(1e18));
        }));
        it(`提取道理`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60516.checkOccurrence(testActor, 0)).to.eq(true);
            yield actors.connect(operator1).approve(evt60516.address, testActor);
            yield shejiTu.connect(operator1).activeTrigger(60516, testActor, [BigInt(1e18)], []);
            expect(yield assetDaoli.balanceOf(operator1.address)).eq(BigInt(1e18));
        }));
    });
    describe('提取道理（60517）', () => {
        let evt60517;
        before(reset);
        it(`部署相关事件`, () => __awaiter(void 0, void 0, void 0, function* () {
            evt60517 = yield (yield (new typechain_2.WorldEventProcessor60517__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield worldEvents.connect(taiyiDAO).setEventProcessor(60517, evt60517.address);
            let evt60517Operator = yield newActor(deployer);
            yield actors.connect(deployer).approve(evt60517.address, evt60517Operator);
            yield evt60517.initOperator(evt60517Operator);
            expect(yield evt60517.eventOperator()).to.eq(evt60517Operator);
            expect(yield actors.ownerOf(evt60517Operator)).to.eq(evt60517.address);
        }));
        it(`角色获得道理`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(10e18));
            yield assetDaoli.connect(taiyiDAO).transferActor(actorPanGu, testActor, BigInt(1e18));
            expect(yield assetDaoli.balanceOfActor(testActor)).eq(BigInt(1e18));
        }));
        it(`提取道理`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60517.checkOccurrence(testActor, 0)).to.eq(true);
            yield assetDaoli.connect(operator1).approveActor(testActor, yield shejiTu.operator(), BigInt(1e18));
            yield shejiTu.connect(operator1).activeTrigger(60517, testActor, [BigInt(1e18)], []);
            expect(yield assetDaoli.balanceOf(operator1.address)).eq(BigInt(1e18));
        }));
    });
});
