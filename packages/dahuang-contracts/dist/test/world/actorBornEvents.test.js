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
describe('角色出生序列事件测试', () => {
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
    let actorPrelifes;
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
    }));
    describe('基本出生序列事件测试', () => {
        let bornTimestamp;
        before(reset);
        it('部署出生序列事件', () => __awaiter(void 0, void 0, void 0, function* () {
            let eventsByPanGu = worldEvents.connect(taiyiDAO);
            const evt10001 = yield (yield (new typechain_2.WorldEventProcessor10001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10001, evt10001.address);
            const evt60002 = yield (yield (new typechain_2.WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60002, evt60002.address);
            const evt60003 = yield (yield (new typechain_2.WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60003, evt60003.address);
            const evt60004 = yield (yield (new typechain_2.WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60004, evt60004.address);
            const evt60005 = yield (yield (new typechain_2.WorldEventProcessor60005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60005, evt60005.address);
        }));
        it('配置时间线', () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield shejiTu.connect(deployer).addAgeEvent(0, 10001, 1)).wait()).eventually.fulfilled;
        }));
        it('创建新角色', () => __awaiter(void 0, void 0, void 0, function* () {
            testActor = yield newActor(operator1);
        }));
        it('角色未授权给社稷图，无法在社稷图出生', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(shejiTu.connect(operator1).bornActor(testActor)).to.be.revertedWith("not approved or owner of actor");
        }));
        it('角色被授权给社稷图', () => __awaiter(void 0, void 0, void 0, function* () {
            yield actors.connect(operator1).approve(shejiTu.address, testActor);
            //await actors.connect(operator1).setApprovalForAll(shejiTu.address, true);
        }));
        it('角色在社稷图出生', () => __awaiter(void 0, void 0, void 0, function* () {
            const receipt = yield (yield shejiTu.connect(operator1).bornActor(testActor)).wait();
            bornTimestamp = yield (0, utils_1.blockTimestamp)(ethers_1.BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));
        }));
        it('角色在社稷图首次成长（百日礼）', () => __awaiter(void 0, void 0, void 0, function* () {
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
            expect(yield worldEvents.ages(testActor)).to.eq(0);
            expect(yield actorSIDs.balanceOf((yield actors.getActor(testActor)).account)).to.equal(2);
        }));
        it("给角色命名", () => __awaiter(void 0, void 0, void 0, function* () {
            let nameId = yield names.nextName();
            expect((yield names.connect(operator1).claim(`小拼`, `李`, testActor)).wait()).eventually.fulfilled;
            expect(yield names.ownerOf(nameId)).to.eq((yield actors.getActor(testActor)).account);
        }));
        it('角色URI-基本', () => __awaiter(void 0, void 0, void 0, function* () {
            let uriObj = yield parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
        }));
        it('角色URI-增加名称模块', () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield actors.connect(taiyiDAO).registerURIPartModule(names.address)).wait()).eventually.fulfilled;
            let uriObj = yield parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(yield worldConstants.WORLD_MODULE_NAMES()).to.eq(2);
            expect(uriObj.data.m_2.fullName).to.eq("李小拼");
            expect(uriObj.data.m_2.firstName).to.eq("小拼");
            expect(uriObj.data.m_2.lastName).to.eq("李");
        }));
        it('角色URI-增加社会身份模块', () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address)).wait()).eventually.fulfilled;
            let uriObj = yield parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(yield worldConstants.WORLD_MODULE_SIDS()).to.eq(6);
            expect(uriObj.data.m_6.length).to.eq(2);
            expect(uriObj.data.m_6[0]).to.eq(1);
            expect(uriObj.data.m_6[1]).to.eq(2);
        }));
        it('角色URI-增加时间线模块', () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address)).wait()).eventually.fulfilled;
            let uriObj = yield parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(yield worldConstants.WORLD_MODULE_ATTRIBUTES()).to.eq(13);
            expect(uriObj.data.m_200.m_13.HLH).to.eq(100);
            expect(yield dahuangConstants.WORLD_MODULE_TALENTS()).to.eq(202);
            expect(yield dahuangConstants.WORLD_MODULE_EVENTS()).to.eq(201);
            expect(uriObj.data.m_200.m_201.age).to.eq(0);
            expect(uriObj.data.m_200.m_201.bornTime).to.eq(bornTimestamp);
            expect(uriObj.data.m_200.m_201.events.length).to.eq(5);
        }));
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe('10012出生事件测试-男孩情况', () => {
        let evt10012;
        before(reset);
        it('部署出生序列事件', () => __awaiter(void 0, void 0, void 0, function* () {
            let eventsByPanGu = worldEvents.connect(taiyiDAO);
            const evt10001 = yield (yield (new typechain_2.WorldEventProcessor10001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10001, evt10001.address);
            const evt60002 = yield (yield (new typechain_2.WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60002, evt60002.address);
            const evt60003 = yield (yield (new typechain_2.WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60003, evt60003.address);
            const evt60004 = yield (yield (new typechain_2.WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60004, evt60004.address);
            const evt60005 = yield (yield (new typechain_2.WorldEventProcessor60005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60005, evt60005.address);
            evt10012 = yield (yield (new typechain_2.WorldEventProcessor10012__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10012, evt10012.address);
        }));
        it('配置时间线', () => __awaiter(void 0, void 0, void 0, function* () {
            yield shejiTu.connect(deployer).addAgeEvent(0, 10001, 1);
        }));
        it('创建角色在社稷图出生', () => __awaiter(void 0, void 0, void 0, function* () {
            testActor = yield newActor(operator1);
            yield actors.connect(operator1).approve(shejiTu.address, testActor);
            yield shejiTu.connect(operator1).bornActor(testActor);
            //grow brithday
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
        }));
        it('男孩不会发生10012事件', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt10012.checkOccurrence(testActor, 0)).to.eq(false);
        }));
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe('10012出生事件测试-女孩情况', () => {
        let evt10009;
        let evt10012;
        let should10009;
        let girl;
        before(reset);
        it('部署出生序列事件', () => __awaiter(void 0, void 0, void 0, function* () {
            let eventsByPanGu = worldEvents.connect(taiyiDAO);
            const evt10002 = yield (yield (new typechain_2.WorldEventProcessor10002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10002, evt10002.address);
            evt10009 = yield (yield (new typechain_2.WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10009, evt10009.address);
            const evt60002 = yield (yield (new typechain_2.WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60002, evt60002.address);
            const evt60003 = yield (yield (new typechain_2.WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60003, evt60003.address);
            const evt60004 = yield (yield (new typechain_2.WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60004, evt60004.address);
            const evt60005 = yield (yield (new typechain_2.WorldEventProcessor60005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60005, evt60005.address);
            evt10012 = yield (yield (new typechain_2.WorldEventProcessor10012__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10012, evt10012.address);
            //register actors uri modules
            yield actors.connect(taiyiDAO).registerURIPartModule(names.address);
            yield actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
            yield actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
        }));
        it('配置10012操作角色', () => __awaiter(void 0, void 0, void 0, function* () {
            let newOne = yield newActor(deployer);
            yield actors.connect(deployer).approve(evt10012.address, newOne);
            yield evt10012.initOperator(newOne);
            expect(yield evt10012.eventOperator()).to.eq(newOne);
            expect(yield actors.ownerOf(newOne)).to.eq(evt10012.address);
        }));
        it('配置时间线', () => __awaiter(void 0, void 0, void 0, function* () {
            yield shejiTu.connect(deployer).addAgeEvent(0, 10002, 1);
            yield shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);
            yield shejiTu.connect(deployer).addAgeEvent(2, 10012, 1);
        }));
        it('创建角色在社稷图出生', () => __awaiter(void 0, void 0, void 0, function* () {
            testActor = yield newActor(operator1, true);
            yield actors.connect(operator1).approve(shejiTu.address, testActor);
            yield shejiTu.connect(operator1).bornActor(testActor);
            //grow brithday
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
        }));
        it('前置事件：10009', () => __awaiter(void 0, void 0, void 0, function* () {
            should10009 = yield evt10009.checkOccurrence(testActor, 0);
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 }); //age 1
            if (should10009) {
                console.log("前置事件10009已经发生");
                expect(yield worldEvents.actorEventCount(testActor, 10009)).to.eq(1);
            }
            else
                console.log("前置事件10009没有发生");
        }));
        it('10012容错性检查', () => __awaiter(void 0, void 0, void 0, function* () {
            //should not claim
            expect(yield actors.balanceOf(operator1.address)).to.eq(1);
            yield expect(evt10012.connect(operator1).claimActor(testActor)).to.be.revertedWith('no actors need to claim.');
            if (should10009 == false)
                expect(yield evt10012.checkOccurrence(testActor, 0)).to.eq(false);
        }));
        it('10012时间线资金检查', () => __awaiter(void 0, void 0, void 0, function* () {
            if (should10009) {
                //no daoli
                expect(yield evt10012.checkOccurrence(testActor, 0)).to.eq(false);
                //transfer daoli to yeming
                yield assetDaoli.connect(taiyiDAO).transfer((yield actors.getActor(yield shejiTu.operator())).account, BigInt(500e18));
                expect(yield evt10012.checkOccurrence(testActor, 0)).to.eq(true);
            }
        }));
        it('10012事件', () => __awaiter(void 0, void 0, void 0, function* () {
            girl = yield actors.nextActor();
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 }); //age 2
            if (should10009) {
                console.log("事件10012已经发生");
                expect(yield actors.ownerOf(girl)).to.eq(evt10012.address);
                expect(yield worldEvents.actorEventCount(testActor, 10012)).to.eq(1);
            }
        }));
        it('提取10012事件的新人', () => __awaiter(void 0, void 0, void 0, function* () {
            if (should10009) {
                expect((yield evt10012.connect(operator1).claimActor(testActor)).wait()).eventually.fulfilled;
                expect(yield actors.ownerOf(girl)).to.eq(operator1.address);
                expect(yield actors.balanceOf(operator1.address)).to.eq(2);
            }
        }));
        it('10012事件新人关系检查', () => __awaiter(void 0, void 0, void 0, function* () {
            if (should10009) {
                expect(yield actorRelationship.actorRelations(testActor, girl)).to.eq(5);
                expect(yield actorRelationship.actorRelations(girl, testActor)).to.eq(5);
                expect((yield actorRelationship.actorRelationPeople(girl, 5)).length).to.eq(1);
                expect((yield actorRelationship.actorRelationPeople(girl, 5))[0]).to.eq(testActor);
            }
        }));
        it('10012事件的新人出生', () => __awaiter(void 0, void 0, void 0, function* () {
            if (should10009) {
                expect((yield actors.connect(operator1).approve(shejiTu.address, girl)).wait()).eventually.fulfilled;
                expect((yield shejiTu.connect(operator1).bornActor(girl)).wait()).eventually.fulfilled;
            }
        }));
        it('10012事件的新人成长', () => __awaiter(void 0, void 0, void 0, function* () {
            if (should10009) {
                expect((yield shejiTu.connect(operator1).grow(girl, { gasLimit: 5000000 })).wait()).eventually.fulfilled;
            }
        }));
        it('角色URI', () => __awaiter(void 0, void 0, void 0, function* () {
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe('10014出生事件测试-男孩情况', () => {
        let evt10014;
        before(reset);
        it('部署出生序列事件', () => __awaiter(void 0, void 0, void 0, function* () {
            let eventsByPanGu = worldEvents.connect(taiyiDAO);
            const evt10001 = yield (yield (new typechain_2.WorldEventProcessor10001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10001, evt10001.address);
            const evt60002 = yield (yield (new typechain_2.WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60002, evt60002.address);
            const evt60003 = yield (yield (new typechain_2.WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60003, evt60003.address);
            const evt60004 = yield (yield (new typechain_2.WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60004, evt60004.address);
            const evt60005 = yield (yield (new typechain_2.WorldEventProcessor60005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60005, evt60005.address);
            evt10014 = yield (yield (new typechain_2.WorldEventProcessor10014__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10014, evt10014.address);
        }));
        it('配置时间线', () => __awaiter(void 0, void 0, void 0, function* () {
            yield shejiTu.connect(deployer).addAgeEvent(0, 10001, 1);
        }));
        it('创建角色在社稷图出生', () => __awaiter(void 0, void 0, void 0, function* () {
            testActor = yield newActor(operator1);
            yield actors.connect(operator1).approve(shejiTu.address, testActor);
            yield shejiTu.connect(operator1).bornActor(testActor);
            //grow brithday
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
        }));
        it('男孩不会发生10014事件', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt10014.checkOccurrence(testActor, 0)).to.eq(false);
        }));
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe('10014出生事件测试-女孩情况', () => {
        let evt10009;
        let evt10014;
        let should10009;
        let girl;
        before(reset);
        it('部署出生序列事件', () => __awaiter(void 0, void 0, void 0, function* () {
            let eventsByPanGu = worldEvents.connect(taiyiDAO);
            const evt10002 = yield (yield (new typechain_2.WorldEventProcessor10002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10002, evt10002.address);
            evt10009 = yield (yield (new typechain_2.WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10009, evt10009.address);
            const evt60002 = yield (yield (new typechain_2.WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60002, evt60002.address);
            const evt60003 = yield (yield (new typechain_2.WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60003, evt60003.address);
            const evt60004 = yield (yield (new typechain_2.WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60004, evt60004.address);
            const evt60005 = yield (yield (new typechain_2.WorldEventProcessor60005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60005, evt60005.address);
            evt10014 = yield (yield (new typechain_2.WorldEventProcessor10014__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10014, evt10014.address);
            //register actors uri modules
            yield actors.connect(taiyiDAO).registerURIPartModule(names.address);
            yield actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
            yield actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
        }));
        it('配置10014操作角色', () => __awaiter(void 0, void 0, void 0, function* () {
            let newOne = yield newActor(deployer);
            yield actors.connect(deployer).approve(evt10014.address, newOne);
            yield evt10014.initOperator(newOne);
            expect(yield evt10014.eventOperator()).to.eq(newOne);
            expect(yield actors.ownerOf(newOne)).to.eq(evt10014.address);
        }));
        it('配置时间线', () => __awaiter(void 0, void 0, void 0, function* () {
            yield shejiTu.connect(deployer).addAgeEvent(0, 10002, 1);
            yield shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);
            yield shejiTu.connect(deployer).addAgeEvent(2, 10014, 1);
        }));
        it('创建角色在社稷图出生', () => __awaiter(void 0, void 0, void 0, function* () {
            testActor = yield newActor(operator1, true);
            yield actors.connect(operator1).approve(shejiTu.address, testActor);
            yield shejiTu.connect(operator1).bornActor(testActor);
            //grow brithday
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
        }));
        it('前置事件：10009', () => __awaiter(void 0, void 0, void 0, function* () {
            should10009 = yield evt10009.checkOccurrence(testActor, 0);
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 }); //age 1
            if (should10009) {
                console.log("前置事件10009已经发生");
                expect(yield worldEvents.actorEventCount(testActor, 10009)).to.eq(1);
            }
            else
                console.log("前置事件10009没有发生");
        }));
        it('10014容错性检查', () => __awaiter(void 0, void 0, void 0, function* () {
            //should not claim
            expect(yield actors.balanceOf(operator1.address)).to.eq(1);
            yield expect(evt10014.connect(operator1).claimActor(testActor)).to.be.revertedWith('no actors need to claim.');
            if (should10009 == false)
                expect(yield evt10014.checkOccurrence(testActor, 0)).to.eq(false);
        }));
        it('10014时间线资金检查', () => __awaiter(void 0, void 0, void 0, function* () {
            if (should10009) {
                //no daoli
                expect(yield evt10014.checkOccurrence(testActor, 0)).to.eq(false);
                //transfer daoli to yeming
                yield assetDaoli.connect(taiyiDAO).transfer((yield actors.getActor(yield shejiTu.operator())).account, BigInt(500e18));
                expect(yield evt10014.checkOccurrence(testActor, 0)).to.eq(true);
            }
        }));
        it('10014事件', () => __awaiter(void 0, void 0, void 0, function* () {
            girl = yield actors.nextActor();
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 }); //age 2
            if (should10009) {
                console.log("事件10014已经发生");
                expect(yield actors.ownerOf(girl)).to.eq(evt10014.address);
                expect(yield worldEvents.actorEventCount(testActor, 10014)).to.eq(1);
            }
        }));
        it('提取10014事件的新人', () => __awaiter(void 0, void 0, void 0, function* () {
            if (should10009) {
                expect((yield evt10014.connect(operator1).claimActor(testActor)).wait()).eventually.fulfilled;
                expect(yield actors.ownerOf(girl)).to.eq(operator1.address);
                expect(yield actors.balanceOf(operator1.address)).to.eq(2);
            }
        }));
        it('10014事件新人关系检查', () => __awaiter(void 0, void 0, void 0, function* () {
            if (should10009) {
                expect(yield actorRelationship.actorRelations(testActor, girl)).to.eq(3);
                expect(yield actorRelationship.actorRelations(girl, testActor)).to.eq(3);
                expect((yield actorRelationship.actorRelationPeople(girl, 3)).length).to.eq(1);
                expect((yield actorRelationship.actorRelationPeople(girl, 3))[0]).to.eq(testActor);
            }
        }));
        it('10014事件的新人出生', () => __awaiter(void 0, void 0, void 0, function* () {
            if (should10009) {
                expect((yield actors.connect(operator1).approve(shejiTu.address, girl)).wait()).eventually.fulfilled;
                expect((yield shejiTu.connect(operator1).bornActor(girl)).wait()).eventually.fulfilled;
            }
        }));
        it('10014事件的新人成长', () => __awaiter(void 0, void 0, void 0, function* () {
            if (should10009) {
                expect((yield shejiTu.connect(operator1).grow(girl, { gasLimit: 5000000 })).wait()).eventually.fulfilled;
            }
        }));
        it('角色URI', () => __awaiter(void 0, void 0, void 0, function* () {
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe('60508出生事件测试', () => {
        let evt60508;
        let newOne;
        before(reset);
        it('部署出生序列事件', () => __awaiter(void 0, void 0, void 0, function* () {
            let eventsByPanGu = worldEvents.connect(taiyiDAO);
            const evt10002 = yield (yield (new typechain_2.WorldEventProcessor10002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10002, evt10002.address);
            const evt60002 = yield (yield (new typechain_2.WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60002, evt60002.address);
            const evt60003 = yield (yield (new typechain_2.WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60003, evt60003.address);
            const evt60004 = yield (yield (new typechain_2.WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60004, evt60004.address);
            const evt60005 = yield (yield (new typechain_2.WorldEventProcessor60005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60005, evt60005.address);
            //死亡
            const evt10000 = yield (yield (new typechain_2.WorldEventProcessor10000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(10000, evt10000.address);
            //转世
            evt60508 = yield (yield (new typechain_2.WorldEventProcessor60508__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            yield eventsByPanGu.setEventProcessor(60508, evt60508.address);
            //register actors uri modules
            yield actors.connect(taiyiDAO).registerURIPartModule(names.address);
            yield actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
            yield actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
        }));
        it('配置60508操作角色', () => __awaiter(void 0, void 0, void 0, function* () {
            let newOne = yield newActor(deployer);
            yield actors.connect(deployer).approve(evt60508.address, newOne);
            yield evt60508.initOperator(newOne);
            expect(yield evt60508.eventOperator()).to.eq(newOne);
            expect(yield actors.ownerOf(newOne)).to.eq(evt60508.address);
        }));
        it('配置时间线', () => __awaiter(void 0, void 0, void 0, function* () {
            yield shejiTu.connect(deployer).addAgeEvent(0, 10002, 1);
            yield shejiTu.connect(deployer).addAgeEvent(1, 10000, 1);
        }));
        it('创建角色在社稷图出生', () => __awaiter(void 0, void 0, void 0, function* () {
            testActor = yield newActor(operator1, true);
            yield actors.connect(operator1).approve(shejiTu.address, testActor);
            yield shejiTu.connect(operator1).bornActor(testActor);
            //grow brithday
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
        }));
        it('60508容错性检查', () => __awaiter(void 0, void 0, void 0, function* () {
            //should not claim
            expect(yield actors.balanceOf(operator1.address)).to.eq(1);
            yield expect(evt60508.connect(operator1).claimActor(testActor)).to.be.revertedWith('no actors need to claim.');
        }));
        it('角色活着情况下60508不会发生', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield evt60508.checkOccurrence(testActor, 0)).to.eq(false);
            yield shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 }); //age 1, dead
            expect(yield worldEvents.ages(testActor)).to.eq(1);
            expect(yield baseAttributes.attributesScores(yield worldConstants.ATTR_HLH(), testActor)).to.eq(0);
        }));
        it('60508时间线资金检查', () => __awaiter(void 0, void 0, void 0, function* () {
            //no daoli
            expect(yield evt60508.checkOccurrence(testActor, 0)).to.eq(false);
            //transfer daoli to yeming
            yield assetDaoli.connect(taiyiDAO).transfer((yield actors.getActor(yield shejiTu.operator())).account, BigInt(500e18));
            expect(yield evt60508.checkOccurrence(testActor, 0)).to.eq(true);
        }));
        it('60508事件', () => __awaiter(void 0, void 0, void 0, function* () {
            newOne = yield actors.nextActor();
            yield shejiTu.connect(operator1).activeTrigger(60508, testActor, [], []);
            expect(yield actors.ownerOf(newOne)).to.eq(evt60508.address);
            expect(yield worldEvents.actorEventCount(testActor, 60508)).to.eq(1);
        }));
        it('提取60508事件的新人', () => __awaiter(void 0, void 0, void 0, function* () {
            expect((yield evt60508.connect(operator1).claimActor(testActor)).wait()).eventually.fulfilled;
            expect(yield actors.ownerOf(newOne)).to.eq(operator1.address);
            expect(yield actors.balanceOf(operator1.address)).to.eq(2);
        }));
        it('60508事件新人关系检查', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield actorPrelifes.preLifes(newOne)).to.eq(testActor);
            expect(yield actorPrelifes.postLifes(testActor)).to.eq(newOne);
        }));
        it('角色URI', () => __awaiter(void 0, void 0, void 0, function* () {
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        }));
    });
});
