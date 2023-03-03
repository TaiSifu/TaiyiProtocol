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
exports.deployDahuangWorld = exports.deployActorBornFamilies = exports.deployActorsGender = exports.deployWorldDeadActors = exports.deployWorldZoneBaseResources = exports.deployWorldBuildings = exports.deployWorldVillages = exports.deployWorldSeasons = exports.deployActorBehaviorAttributes = exports.deployActorMoodAttributes = exports.deployActorCoreAttributes = exports.deployActorCharmAttributes = exports.deployAssetPrestige = exports.deployAssetHerb = exports.deployAssetFabric = exports.deployAssetGold = exports.deployAssetWood = exports.deployAssetFood = exports.deployDahuangConstants = void 0;
const typechain_1 = require("../typechain");
const utils_1 = require("@taiyi/contracts/dist/utils");
const initSocialIdentity_1 = require("./initSocialIdentity");
const initTalents_1 = require("./initTalents");
const initRelationship_1 = require("./initRelationship");
const initItemTypes_1 = require("./initItemTypes");
const initBuildingTypes_1 = require("./initBuildingTypes");
const initEvents_1 = require("./initEvents");
const initTimeline_1 = require("./initTimeline");
const initZones_1 = require("./initZones");
const typechain_2 = require("@taiyi/contracts/dist/typechain");
const utils_2 = require("@taiyi/contracts/dist/utils");
const deployDahuangConstants = (deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.DahuangConstants__factory(deployer);
    return (yield factory.deploy()).deployed();
});
exports.deployDahuangConstants = deployDahuangConstants;
const deployAssetFood = (worldConst, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_2.WorldFungible__factory(deployer);
    return (yield factory.deploy("Taiyi Food", "TYFOOD", yield worldConst.WORLD_MODULE_FOOD(), route.address)).deployed();
});
exports.deployAssetFood = deployAssetFood;
const deployAssetWood = (worldConst, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_2.WorldFungible__factory(deployer);
    return (yield factory.deploy("Taiyi Wood", "TYWOOD", yield worldConst.WORLD_MODULE_WOOD(), route.address)).deployed();
});
exports.deployAssetWood = deployAssetWood;
const deployAssetGold = (worldConst, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_2.WorldFungible__factory(deployer);
    return (yield factory.deploy("Taiyi Gold", "TYGOLD", yield worldConst.WORLD_MODULE_GOLD(), route.address)).deployed();
});
exports.deployAssetGold = deployAssetGold;
const deployAssetFabric = (worldConst, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_2.WorldFungible__factory(deployer);
    return (yield factory.deploy("Taiyi Fabric", "TYFABRIC", yield worldConst.WORLD_MODULE_FABRIC(), route.address)).deployed();
});
exports.deployAssetFabric = deployAssetFabric;
const deployAssetHerb = (worldConst, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_2.WorldFungible__factory(deployer);
    return (yield factory.deploy("Taiyi Herb", "TYHERB", yield worldConst.WORLD_MODULE_HERB(), route.address)).deployed();
});
exports.deployAssetHerb = deployAssetHerb;
const deployAssetPrestige = (worldConst, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_2.WorldNontransferableFungible__factory(deployer);
    return (yield factory.deploy("Taiyi Prestige", "TYPRESTIGE", yield worldConst.WORLD_MODULE_PRESTIGE(), route.address)).deployed();
});
exports.deployAssetPrestige = deployAssetPrestige;
const deployActorCharmAttributes = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorCharmAttributes__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorCharmAttributes = deployActorCharmAttributes;
const deployActorCoreAttributes = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorCoreAttributes__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorCoreAttributes = deployActorCoreAttributes;
const deployActorMoodAttributes = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorMoodAttributes__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorMoodAttributes = deployActorMoodAttributes;
const deployActorBehaviorAttributes = (actRecoverTimeDay, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`deploy ActorBehaviorAttributes with actRecoverTimeDay=${actRecoverTimeDay}`);
    const factory = new typechain_1.ActorBehaviorAttributes__factory(deployer);
    return (yield factory.deploy(actRecoverTimeDay, route.address)).deployed();
});
exports.deployActorBehaviorAttributes = deployActorBehaviorAttributes;
const deployWorldSeasons = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldSeasons__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployWorldSeasons = deployWorldSeasons;
const deployWorldVillages = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldVillages__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployWorldVillages = deployWorldVillages;
const deployWorldBuildings = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldBuildings__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployWorldBuildings = deployWorldBuildings;
const deployWorldZoneBaseResources = (zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, route, deployer, isTest) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`deploy WorldZoneBaseResources with zoneResourceGrowTimeDay=${zoneResourceGrowTimeDay}, zoneResourceGrowQuantityScale=${zoneResourceGrowQuantityScale}`);
    const factory = isTest ? (new typechain_1.WorldZoneBaseResourcesTest__factory(deployer)) : (new typechain_1.WorldZoneBaseResourcesRandom__factory(deployer));
    return (yield factory.deploy(zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, route.address)).deployed();
});
exports.deployWorldZoneBaseResources = deployWorldZoneBaseResources;
const deployWorldDeadActors = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldDeadActors__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployWorldDeadActors = deployWorldDeadActors;
const deployActorsGender = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorsGender__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorsGender = deployActorsGender;
const deployActorBornFamilies = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorBornFamilies__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorBornFamilies = deployActorBornFamilies;
;
;
const deployDahuangWorld = (oneAgeVSecond, actRecoverTimeDay, zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, route, worldConstants, actors, locations, yemings, zones, attributes, trigrams, random, worldItems, actorSIDs, deployer, operatorDAO, flags, verbose) => __awaiter(void 0, void 0, void 0, function* () {
    let routeByPanGu = route.connect(operatorDAO);
    if (verbose)
        console.log("Deploy Constants...");
    let dahuangConstants = yield (0, exports.deployDahuangConstants)(deployer);
    if (verbose)
        console.log("Deploy WorldEvents...");
    let moduleId = yield dahuangConstants.WORLD_MODULE_EVENTS();
    let worldEvents = yield (0, utils_1.deployWorldEvents)(oneAgeVSecond, moduleId, routeByPanGu, deployer);
    let worldEventsArgs = [oneAgeVSecond, route.address, Number(moduleId)];
    yield (yield routeByPanGu.registerModule(moduleId, worldEvents.address)).wait();
    if (verbose)
        console.log("Deploy ActorTalents...");
    moduleId = yield dahuangConstants.WORLD_MODULE_TALENTS();
    let actorTalents = yield (0, utils_1.deployActorTalents)(moduleId, routeByPanGu, deployer);
    let actorTalentsArgs = [route.address, Number(moduleId)];
    yield (yield routeByPanGu.registerModule(moduleId, actorTalents.address)).wait();
    if (verbose)
        console.log("Deploy Shejitu...");
    moduleId = yield dahuangConstants.WORLD_MODULE_TIMELINE();
    let shejiTuPkg = yield (0, utils_2.deployShejiTu)("大荒", "所在时间线：大荒", moduleId, actors, locations, zones, attributes, worldEvents, actorTalents, trigrams, random, deployer);
    let shejiTuProxyArgs = shejiTuPkg[3];
    let shejiTu = typechain_2.ShejiTu__factory.connect(shejiTuPkg[0].address, deployer); //CAST proxy as ShejiTu
    yield (yield routeByPanGu.registerModule(moduleId, shejiTu.address)).wait();
    let shejiTuOperator = yield actors.nextActor();
    yield (yield actors.connect(deployer).mintActor(0)).wait();
    yield (yield actors.connect(deployer).approve(shejiTu.address, shejiTuOperator)).wait();
    yield (yield shejiTu.initOperator(shejiTuOperator)).wait();
    yield (yield yemings.connect(operatorDAO).setYeMing(shejiTuOperator, shejiTu.address)).wait();
    if (verbose)
        console.log(`Mint Shejitu YeMing as actor#${yield shejiTu.operator()}.`);
    //deploy actor attributes
    if (verbose)
        console.log("--------- Acotr Attributes ---------");
    yield (yield shejiTu.registerAttributeModule(attributes.address)).wait();
    if (verbose)
        console.log("Deploy ActorCharmAttributes...");
    let actorCharmAttributes = yield (0, exports.deployActorCharmAttributes)(routeByPanGu, deployer);
    let actorCharmAttributesArgs = [route.address];
    yield (yield routeByPanGu.registerModule(yield dahuangConstants.WORLD_MODULE_CHARM_ATTRIBUTES(), actorCharmAttributes.address)).wait();
    yield (yield shejiTu.registerAttributeModule(actorCharmAttributes.address)).wait();
    if (verbose)
        console.log("Deploy ActorCoreAttributes...");
    let actorCoreAttributes = yield (0, exports.deployActorCoreAttributes)(routeByPanGu, deployer);
    let actorCoreAttributesArgs = [route.address];
    yield (yield routeByPanGu.registerModule(yield dahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES(), actorCoreAttributes.address)).wait();
    yield (yield shejiTu.registerAttributeModule(actorCoreAttributes.address)).wait();
    if (verbose)
        console.log("Deploy ActorMoodAttributes...");
    let actorMoodAttributes = yield (0, exports.deployActorMoodAttributes)(routeByPanGu, deployer);
    let actorMoodAttributesArgs = [route.address];
    yield (yield routeByPanGu.registerModule(yield dahuangConstants.WORLD_MODULE_MOOD_ATTRIBUTES(), actorMoodAttributes.address)).wait();
    yield (yield shejiTu.registerAttributeModule(actorMoodAttributes.address)).wait();
    if (verbose)
        console.log("Deploy ActorBehaviorAttributes...");
    let actorBehaviorAttributes = yield (0, exports.deployActorBehaviorAttributes)(actRecoverTimeDay, routeByPanGu, deployer);
    let actorBehaviorAttributesArgs = [actRecoverTimeDay, route.address];
    yield (yield routeByPanGu.registerModule(yield dahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES(), actorBehaviorAttributes.address)).wait();
    yield (yield shejiTu.registerAttributeModule(actorBehaviorAttributes.address)).wait();
    //deploy assets
    if (verbose)
        console.log("--------- Assets ---------");
    if (verbose)
        console.log("Deploy AssetsFood...");
    let assetFood = yield (0, exports.deployAssetFood)(dahuangConstants, routeByPanGu, deployer);
    moduleId = yield dahuangConstants.WORLD_MODULE_FOOD();
    let assetFoodArgs = ["Taiyi Food", "TYFOOD", Number(moduleId), route.address];
    yield (yield routeByPanGu.registerModule(moduleId, assetFood.address)).wait();
    if (verbose)
        console.log("Deploy AssetsWood...");
    let assetWood = yield (0, exports.deployAssetWood)(dahuangConstants, routeByPanGu, deployer);
    moduleId = yield dahuangConstants.WORLD_MODULE_WOOD();
    let assetWoodArgs = ["Taiyi Wood", "TYWOOD", Number(moduleId), route.address];
    yield (yield routeByPanGu.registerModule(moduleId, assetWood.address)).wait();
    if (verbose)
        console.log("Deploy AssetsGold...");
    let assetGold = yield (0, exports.deployAssetGold)(dahuangConstants, routeByPanGu, deployer);
    moduleId = yield dahuangConstants.WORLD_MODULE_GOLD();
    let assetGoldArgs = ["Taiyi Gold", "TYGOLD", Number(moduleId), route.address];
    yield (yield routeByPanGu.registerModule(moduleId, assetGold.address)).wait();
    if (verbose)
        console.log("Deploy AssetsFabric...");
    let assetFabric = yield (0, exports.deployAssetFabric)(dahuangConstants, routeByPanGu, deployer);
    moduleId = yield dahuangConstants.WORLD_MODULE_FABRIC();
    let assetFabricArgs = ["Taiyi Fabric", "TYFABRIC", Number(moduleId), route.address];
    yield (yield routeByPanGu.registerModule(moduleId, assetFabric.address)).wait();
    if (verbose)
        console.log("Deploy AssetsHerb...");
    let assetHerb = yield (0, exports.deployAssetHerb)(dahuangConstants, routeByPanGu, deployer);
    moduleId = yield dahuangConstants.WORLD_MODULE_HERB();
    let assetHerbArgs = ["Taiyi Herb", "TYHERB", Number(moduleId), route.address];
    yield (yield routeByPanGu.registerModule(moduleId, assetHerb.address)).wait();
    if (verbose)
        console.log("Deploy AssetsPrestige...");
    let assetPrestige = yield (0, exports.deployAssetPrestige)(dahuangConstants, routeByPanGu, deployer);
    moduleId = yield dahuangConstants.WORLD_MODULE_PRESTIGE();
    let assetPrestigeArgs = ["Taiyi Prestige", "TYPRESTIGE", Number(moduleId), route.address];
    yield (yield routeByPanGu.registerModule(moduleId, assetPrestige.address)).wait();
    if (verbose)
        console.log("--------- Datasets ---------");
    if (verbose)
        console.log("Deploy WorldSeasons...");
    let worldSeasons = yield (0, exports.deployWorldSeasons)(routeByPanGu, deployer);
    let worldSeasonsArgs = [route.address];
    yield (yield routeByPanGu.registerModule(yield dahuangConstants.WORLD_MODULE_SEASONS(), worldSeasons.address)).wait();
    if (verbose)
        console.log("Deploy ActorBornPlaces...");
    moduleId = yield dahuangConstants.WORLD_MODULE_BORN_PLACES();
    let actorBornPlaces = yield (0, utils_1.deployActorBornPlaces)(moduleId, routeByPanGu, deployer);
    let actorBornPlacesArgs = [route.address, Number(moduleId)];
    yield (yield routeByPanGu.registerModule(moduleId, actorBornPlaces.address)).wait();
    if (verbose)
        console.log("Deploy WorldVillages...");
    let worldVillages = yield (0, exports.deployWorldVillages)(routeByPanGu, deployer);
    let worldVillagesArgs = [route.address];
    yield (yield routeByPanGu.registerModule(yield dahuangConstants.WORLD_MODULE_VILLAGES(), worldVillages.address)).wait();
    if (verbose)
        console.log("Deploy WorldBuildings...");
    let worldBuildings = yield (0, exports.deployWorldBuildings)(routeByPanGu, deployer);
    let worldBuildingsArgs = [route.address];
    yield (yield routeByPanGu.registerModule(yield dahuangConstants.WORLD_MODULE_BUILDINGS(), worldBuildings.address)).wait();
    if (verbose)
        console.log("Deploy ActorRelationship...");
    moduleId = yield dahuangConstants.WORLD_MODULE_RELATIONSHIP();
    let actorRelationships = yield (0, utils_1.deployActorRelationship)(moduleId, routeByPanGu, deployer);
    let actorRelationshipsArgs = [route.address, Number(moduleId)];
    yield (yield routeByPanGu.registerModule(moduleId, actorRelationships.address)).wait();
    if (verbose)
        console.log("Deploy WorldZoneBaseResources...");
    let worldZoneBaseResources = yield (0, exports.deployWorldZoneBaseResources)(zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, routeByPanGu, deployer, flags === null || flags === void 0 ? void 0 : flags.isTest);
    let worldZoneBaseResourcesArgs = [zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, route.address];
    let worldZoneBaseResourceOperator = yield actors.nextActor();
    yield (yield actors.connect(deployer).mintActor(0)).wait();
    yield (yield actors.connect(deployer).approve(worldZoneBaseResources.address, worldZoneBaseResourceOperator)).wait();
    yield (yield worldZoneBaseResources.initOperator(worldZoneBaseResourceOperator)).wait();
    if (verbose)
        console.log(`Mint GuanGong as actor#${yield worldZoneBaseResources.ACTOR_GUANGONG()}.`);
    yield (yield routeByPanGu.registerModule(yield dahuangConstants.WORLD_MODULE_ZONE_BASE_RESOURCES(), worldZoneBaseResources.address)).wait();
    if (verbose)
        console.log("Deploy WorldDeadActors...");
    let worldDeadActors = yield (0, exports.deployWorldDeadActors)(routeByPanGu, deployer);
    let worldDeadActorsArgs = [route.address];
    yield (yield routeByPanGu.registerModule(219, worldDeadActors.address)).wait();
    if (verbose)
        console.log("Deploy ActorsGender...");
    let actorsGender = yield (0, exports.deployActorsGender)(routeByPanGu, deployer);
    let actorsGenderArgs = [route.address];
    yield (yield routeByPanGu.registerModule(220, actorsGender.address)).wait();
    if (verbose)
        console.log("Deploy ActorBornFamilies...");
    let actorBornFamilies = yield (0, exports.deployActorBornFamilies)(routeByPanGu, deployer);
    let actorBornFamiliesArgs = [route.address];
    yield (yield routeByPanGu.registerModule(221, actorBornFamilies.address)).wait();
    if (verbose)
        console.log("Deploy WorldStorylines...");
    let worldStorylines = yield (0, utils_1.deployWorldStorylines)(222, routeByPanGu, deployer);
    let worldStorylinesArgs = [route.address, Number(222)];
    yield (yield routeByPanGu.registerModule(222, worldStorylines.address)).wait();
    if (verbose)
        console.log("Deploy ParameterizedStorylines...");
    let parameterizedStorylines = yield (0, utils_1.deployParameterizedStorylines)(223, routeByPanGu, deployer);
    let parameterizedStorylinesArgs = [route.address, Number(223)];
    yield (yield routeByPanGu.registerModule(223, parameterizedStorylines.address)).wait();
    if (verbose)
        console.log("Deploy GlobalStoryRegistry...");
    let globalStoryRegistry = yield (0, utils_1.deployGlobalStoryRegistry)(224, routeByPanGu, deployer);
    let globalStoryRegistryArgs = [route.address, Number(224)];
    yield (yield routeByPanGu.registerModule(224, globalStoryRegistry.address)).wait();
    //init SocialIdentity Names
    if (flags === null || flags === void 0 ? void 0 : flags.noSIDNames)
        null;
    else {
        if (verbose)
            console.log("Initialize Social Identity Names...");
        yield (0, initSocialIdentity_1.initSIDNames)(actorSIDs.address, operatorDAO);
    }
    //init talents
    if (flags === null || flags === void 0 ? void 0 : flags.noTalents)
        null;
    else {
        if (verbose)
            console.log("Initialize Talents...");
        yield (0, initTalents_1.initTalents)(actorTalents.address, operatorDAO, worldConstants, dahuangConstants);
    }
    //deploy talent processors
    if (flags === null || flags === void 0 ? void 0 : flags.noTalentProcessors)
        null;
    else {
        if (verbose)
            console.log("Initialize Talent Processors...");
        yield (0, initTalents_1.deployTalentProcessors)(actorTalents.address, operatorDAO, route, deployer);
    }
    //init relationships
    if (flags === null || flags === void 0 ? void 0 : flags.noRelations)
        null;
    else {
        if (verbose)
            console.log("Initialize Relationship Names...");
        yield (0, initRelationship_1.initRelations)(actorRelationships.address, operatorDAO);
    }
    //init item types
    if (flags === null || flags === void 0 ? void 0 : flags.noItemTypes)
        null;
    else {
        if (verbose)
            console.log("Initialize Item Types...");
        yield (0, initItemTypes_1.initItemTypes)(worldItems.address, operatorDAO);
    }
    //init building types
    if (flags === null || flags === void 0 ? void 0 : flags.noBuildingTypes)
        null;
    else {
        if (verbose)
            console.log("Initialize Building Types...");
        yield (0, initBuildingTypes_1.initBuildingTypes)(worldBuildings.address, operatorDAO);
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
            console.log("Initialize Dahuang Timeline...");
        yield (0, initTimeline_1.initTimeline)(shejiTu.address, deployer);
    }
    //init zones
    if (flags === null || flags === void 0 ? void 0 : flags.noZones)
        null;
    else {
        if (verbose)
            console.log("Initialize Zones...");
        let actorPanGu = yield worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing
        yield (yield yemings.connect(operatorDAO).setYeMing(actorPanGu, operatorDAO.address)).wait(); //fake address for PanGu
        //bind timeline to a zone
        let dahuangZone = yield zones.nextZone();
        yield (yield zones.connect(operatorDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu)).wait();
        yield (yield shejiTu.setStartZone(dahuangZone)).wait();
        //born PanGu
        yield (yield actors.connect(operatorDAO).approve(shejiTu.address, actorPanGu)).wait();
        yield (yield shejiTu.connect(operatorDAO).bornActor(actorPanGu)).wait();
        //init zones by PanGu
        yield (0, initZones_1.initZones)(worldConstants, shejiTu.address, operatorDAO);
    }
    if (verbose)
        console.log("Dahuang Contracts Deployment Done.");
    let contracts = {
        DahuangConstants: { instance: dahuangConstants },
        ShejiTuProxy: { instance: shejiTuPkg[0], constructorArguments: shejiTuProxyArgs },
        ShejiTuProxyAdmin: { instance: shejiTuPkg[1] },
        ShejiTu: { instance: shejiTuPkg[2] },
        WorldEvents: { instance: worldEvents, constructorArguments: worldEventsArgs },
        AssetFood: { instance: assetFood, constructorArguments: assetFoodArgs },
        AssetWood: { instance: assetWood, constructorArguments: assetWoodArgs },
        AssetGold: { instance: assetGold, constructorArguments: assetGoldArgs },
        AssetFabric: { instance: assetFabric, constructorArguments: assetFabricArgs },
        AssetHerb: { instance: assetHerb, constructorArguments: assetHerbArgs },
        AssetPrestige: { instance: assetPrestige, constructorArguments: assetPrestigeArgs },
        ActorTalents: { instance: actorTalents, constructorArguments: actorTalentsArgs },
        ActorCharmAttributes: { instance: actorCharmAttributes, constructorArguments: actorCharmAttributesArgs },
        ActorCoreAttributes: { instance: actorCoreAttributes, constructorArguments: actorCoreAttributesArgs },
        ActorMoodAttributes: { instance: actorMoodAttributes, constructorArguments: actorMoodAttributesArgs },
        ActorBehaviorAttributes: { instance: actorBehaviorAttributes, constructorArguments: actorBehaviorAttributesArgs },
        WorldSeasons: { instance: worldSeasons, constructorArguments: worldSeasonsArgs },
        ActorBornPlaces: { instance: actorBornPlaces, constructorArguments: actorBornPlacesArgs },
        WorldVillages: { instance: worldVillages, constructorArguments: worldVillagesArgs },
        WorldBuildings: { instance: worldBuildings, constructorArguments: worldBuildingsArgs },
        WorldZoneBaseResources: { instance: worldZoneBaseResources, constructorArguments: worldZoneBaseResourcesArgs },
        ActorRelationship: { instance: actorRelationships, constructorArguments: actorRelationshipsArgs },
        WorldDeadActors: { instance: worldDeadActors, constructorArguments: worldDeadActorsArgs },
        ActorsGender: { instance: actorsGender, constructorArguments: actorsGenderArgs },
        ActorBornFamilies: { instance: actorBornFamilies, constructorArguments: actorBornFamiliesArgs },
        WorldStorylines: { instance: worldStorylines, constructorArguments: worldStorylinesArgs },
        ParameterizedStorylines: { instance: parameterizedStorylines, constructorArguments: parameterizedStorylinesArgs },
        GlobalStoryRegistry: { instance: globalStoryRegistry, constructorArguments: globalStoryRegistryArgs },
    };
    return { worldContracts: contracts, eventProcessorAddressBook: _eventProcessorAddressBook };
});
exports.deployDahuangWorld = deployDahuangWorld;
