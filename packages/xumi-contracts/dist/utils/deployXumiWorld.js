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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployXumiWorld = exports.deployActorXumiAttributes = exports.deployAssetElementH = exports.deployAssetEnergy = exports.deployXumiConstants = void 0;
const typechain_1 = require("../typechain");
const utils_1 = require("@taiyi/contracts/dist/utils");
const initTalents_1 = require("./initTalents");
const initItemTypes_1 = require("./initItemTypes");
const initEvents_1 = require("./initEvents");
const initTimeline_1 = require("./initTimeline");
const typechain_2 = require("@taiyi/contracts/dist/typechain");
const utils_2 = require("@taiyi/contracts/dist/utils");
const deployXumiConstants = (deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.XumiConstants__factory(deployer);
    return (yield factory.deploy()).deployed();
});
exports.deployXumiConstants = deployXumiConstants;
const deployAssetEnergy = (worldConst, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_2.WorldFungible__factory(deployer);
    return (yield factory.deploy("Xumi Energy", "XMENERGY", yield worldConst.WORLD_MODULE_XUMI_ENERGY(), route.address)).deployed();
});
exports.deployAssetEnergy = deployAssetEnergy;
const deployAssetElementH = (worldConst, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_2.WorldFungible__factory(deployer);
    return (yield factory.deploy("Xumi Element H", "XMH", yield worldConst.WORLD_MODULE_XUMI_ELEMENT_H(), route.address)).deployed();
});
exports.deployAssetElementH = deployAssetElementH;
const deployActorXumiAttributes = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorXumiAttributes__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorXumiAttributes = deployActorXumiAttributes;
;
const deployXumiWorld = (oneAgeVSecond, route, worldConstants, actors, locations, zones, attributes, trigrams, random, worldItems, deployer, operatorDAO, flags, verbose) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose)
        console.log("Deploy Constants...");
    let xumiConstants = yield (0, exports.deployXumiConstants)(deployer);
    //deploy actor attributes
    if (verbose)
        console.log("Deploy Actor Attributes...");
    let actorXumiAttributes = yield (0, exports.deployActorXumiAttributes)(route, deployer);
    yield route.connect(operatorDAO).registerModule(yield xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES(), actorXumiAttributes.address);
    //deploy assets
    if (verbose)
        console.log("Deploy Assets...");
    let assetEnergy = yield (0, exports.deployAssetEnergy)(xumiConstants, route, deployer);
    yield route.connect(operatorDAO).registerModule(yield xumiConstants.WORLD_MODULE_XUMI_ENERGY(), assetEnergy.address);
    let assetElementH = yield (0, exports.deployAssetElementH)(xumiConstants, route, deployer);
    yield route.connect(operatorDAO).registerModule(yield xumiConstants.WORLD_MODULE_XUMI_ELEMENT_H(), assetElementH.address);
    if (verbose)
        console.log("Deploy WorldEvents...");
    let worldEvents = yield (0, utils_1.deployWorldEvents)(oneAgeVSecond, yield xumiConstants.WORLD_MODULE_EVENTS(), route, deployer);
    yield route.connect(operatorDAO).registerModule(yield xumiConstants.WORLD_MODULE_EVENTS(), worldEvents.address);
    if (verbose)
        console.log("Deploy ActorTalents...");
    let actorTalents = yield (0, utils_1.deployActorTalents)(yield xumiConstants.WORLD_MODULE_TALENTS(), route, deployer);
    yield route.connect(operatorDAO).registerModule(yield xumiConstants.WORLD_MODULE_TALENTS(), actorTalents.address);
    if (verbose)
        console.log("Deploy Xumi...");
    let xumiPkg = yield (0, utils_2.deployShejiTu)("须弥", "所在时间线：须弥", yield xumiConstants.WORLD_MODULE_TIMELINE(), actors, locations, zones, attributes, worldEvents, actorTalents, trigrams, random, deployer);
    let xumi = typechain_2.ShejiTu__factory.connect(xumiPkg[0].address, deployer); //CAST proxy as ShejiTu
    yield route.connect(operatorDAO).registerModule(yield xumiConstants.WORLD_MODULE_TIMELINE(), xumi.address);
    yield xumi.registerAttributeModule(actorXumiAttributes.address);
    if (verbose)
        console.log("Deploy ActorBornPlaces...");
    let actorBornPlaces = yield (0, utils_1.deployActorBornPlaces)(yield xumiConstants.WORLD_MODULE_BORN_PLACES(), route, deployer);
    yield route.connect(operatorDAO).registerModule(yield xumiConstants.WORLD_MODULE_BORN_PLACES(), actorBornPlaces.address);
    if (verbose)
        console.log("Deploy ActorRelationShip...");
    let actorRelationships = yield (0, utils_1.deployActorRelationship)(yield xumiConstants.WORLD_MODULE_RELATIONSHIP(), route, deployer);
    yield route.connect(operatorDAO).registerModule(yield xumiConstants.WORLD_MODULE_RELATIONSHIP(), actorRelationships.address);
    //init talents
    if (flags === null || flags === void 0 ? void 0 : flags.noTalents)
        null;
    else {
        if (verbose)
            console.log("Initialize Talents...");
        yield (0, initTalents_1.initTalents)(actorTalents.address, operatorDAO, xumiConstants, worldConstants);
    }
    //deploy talent processors
    if (flags === null || flags === void 0 ? void 0 : flags.noTalentProcessors)
        null;
    else {
        if (verbose)
            console.log("Initialize Talent Processors...");
        yield (0, initTalents_1.deployTalentProcessors)(actorTalents.address, operatorDAO, route, deployer);
    }
    //init item types
    if (flags === null || flags === void 0 ? void 0 : flags.noItemTypes)
        null;
    else {
        if (verbose)
            console.log("Initialize Item Types...");
        yield (0, initItemTypes_1.initItemTypes)(worldItems.address, operatorDAO);
    }
    //init event processors
    let _eventProcessorAddressBook;
    if (flags === null || flags === void 0 ? void 0 : flags.noEventProcessors)
        null;
    else {
        if (verbose)
            console.log("Initialize Events...");
        _eventProcessorAddressBook = yield (0, initEvents_1.initEvents)(route, worldEvents.address, operatorDAO, deployer);
    }
    //init timeline events
    if (flags === null || flags === void 0 ? void 0 : flags.noTimelineEvents)
        null;
    else {
        if (verbose)
            console.log("Initialize Xumi Timeline...");
        yield (0, initTimeline_1.initTimeline)(xumi.address, deployer);
    }
    let contracts = {
        XumiConstants: { instance: xumiConstants },
        XumiProxy: { instance: xumiPkg[0] },
        XumiProxyAdmin: { instance: xumiPkg[1] },
        Xumi: { instance: xumiPkg[2] },
        AssetEnergy: { instance: assetEnergy },
        AssetElementH: { instance: assetElementH },
        ActorXumiAttributes: { instance: actorXumiAttributes },
        ActorTalents: { instance: actorTalents },
        WorldEvents: { instance: worldEvents },
        ActorBornPlaces: { instance: actorBornPlaces },
        ActorRelationship: { instance: actorRelationships },
    };
    return { worldContracts: contracts, eventProcessorAddressBook: _eventProcessorAddressBook };
});
exports.deployXumiWorld = deployXumiWorld;
