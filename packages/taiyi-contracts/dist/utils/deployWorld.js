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
exports.deployTaiyiWorld = exports.deployWorldStoryActors = exports.deployNameGenerator = exports.deployGlobalStoryRegistry = exports.deployParameterizedStorylines = exports.deployWorldStorylines = exports.populateDescriptor = exports.deploySifusSeeder = exports.deploySifusDescriptor = exports.deploySifusToken = exports.deployTrigramsRender = exports.deployTrigrams = exports.deployActorRelationship = exports.deployActorLocations = exports.deployActorBornPlaces = exports.deployActorPrelifes = exports.deployWorldEvents = exports.deployActorTalents = exports.deployWorldZones = exports.deployWorldItems = exports.deployActorSocialIdentity = exports.deployActorNames = exports.deployAssetDaoli = exports.deployActorAttributes = exports.deployWorldRandom = exports.deployShejiTu = exports.deployActors = exports.deployWorldYemings = exports.deployWorldConstants = exports.deployWorldContractRoute = void 0;
const typechain_1 = require("../typechain");
const ShejiTu_json_1 = __importDefault(require("../abi/contracts/ShejiTu.sol/ShejiTu.json"));
const utils_1 = require("ethers/lib/utils");
const image_data_json_1 = __importDefault(require("../files/image-data.json"));
const chunkArray_1 = require("./chunkArray");
const deployWorldContractRoute = (deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldContractRoute__factory(deployer);
    return (yield factory.deploy()).deployed();
});
exports.deployWorldContractRoute = deployWorldContractRoute;
const deployWorldConstants = (deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldConstants__factory(deployer);
    return (yield factory.deploy()).deployed();
});
exports.deployWorldConstants = deployWorldConstants;
const deployWorldYemings = (taiyiDAO, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldYemings__factory(deployer);
    return (yield factory.deploy(taiyiDAO)).deployed();
});
exports.deployWorldYemings = deployWorldYemings;
const deployActors = (taiyiDAO, mintStart, coinContract, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.Actors__factory(deployer);
    return (yield factory.deploy(taiyiDAO, mintStart, coinContract)).deployed();
});
exports.deployActors = deployActors;
const deployShejiTu = (name, desc, moduleID, actors, locations, zones, attributes, evts, talents, trigrams, random, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    let shejituImpl = yield (yield (new typechain_1.ShejiTu__factory(deployer)).deploy()).deployed();
    let shejituProxyAdmin = yield (yield (new typechain_1.ShejiTuProxyAdmin__factory(deployer)).deploy()).deployed();
    const shejituProxyFactory = new typechain_1.ShejiTuProxy__factory(deployer);
    let shejituProxyArgs = [
        shejituImpl.address,
        shejituProxyAdmin.address,
        new utils_1.Interface(ShejiTu_json_1.default).encodeFunctionData('initialize', [
            name, desc, moduleID,
            actors.address,
            locations.address,
            zones.address,
            attributes.address,
            evts.address,
            talents.address,
            trigrams.address,
            random.address
        ])
    ];
    let shejituProxy = yield shejituProxyFactory.deploy(shejituProxyArgs[0], shejituProxyArgs[1], shejituProxyArgs[2]);
    return [yield shejituProxy.deployed(), shejituProxyAdmin, shejituImpl, shejituProxyArgs];
});
exports.deployShejiTu = deployShejiTu;
const deployWorldRandom = (deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldRandom__factory(deployer);
    return (yield factory.deploy()).deployed();
});
exports.deployWorldRandom = deployWorldRandom;
const deployActorAttributes = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorAttributes__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorAttributes = deployActorAttributes;
const deployAssetDaoli = (worldConst, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.AssetDaoli__factory(deployer);
    return (yield factory.deploy("Taiyi Daoli", "DAOLI", yield worldConst.WORLD_MODULE_COIN(), route.address)).deployed();
});
exports.deployAssetDaoli = deployAssetDaoli;
const deployActorNames = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorNames__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorNames = deployActorNames;
const deployActorSocialIdentity = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorSocialIdentity__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorSocialIdentity = deployActorSocialIdentity;
const deployWorldItems = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldItems__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployWorldItems = deployWorldItems;
const deployWorldZones = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldZones__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployWorldZones = deployWorldZones;
const deployActorTalents = (moduleId, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorTalents__factory(deployer);
    return (yield factory.deploy(route.address, moduleId)).deployed();
});
exports.deployActorTalents = deployActorTalents;
const deployWorldEvents = (oneAgeVSecond, moduleId, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`deploy WorldEvents with oneAgeVSecond=${oneAgeVSecond}`);
    const factory = new typechain_1.WorldEvents__factory(deployer);
    return (yield factory.deploy(oneAgeVSecond, route.address, moduleId)).deployed();
});
exports.deployWorldEvents = deployWorldEvents;
const deployActorPrelifes = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorPrelifes__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorPrelifes = deployActorPrelifes;
const deployActorBornPlaces = (moduleId, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorBornPlaces__factory(deployer);
    return (yield factory.deploy(route.address, moduleId)).deployed();
});
exports.deployActorBornPlaces = deployActorBornPlaces;
const deployActorLocations = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorLocations__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployActorLocations = deployActorLocations;
const deployActorRelationship = (moduleId, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ActorRelationship__factory(deployer);
    return (yield factory.deploy(route.address, moduleId)).deployed();
});
exports.deployActorRelationship = deployActorRelationship;
const deployTrigrams = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.Trigrams__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployTrigrams = deployTrigrams;
const deployTrigramsRender = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.TrigramsRender__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployTrigramsRender = deployTrigramsRender;
const deploySifusToken = (route, taiyiDAO, descriptor, seeder, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.SifusToken__factory(deployer);
    return (yield factory.deploy(taiyiDAO, descriptor, seeder, route.address)).deployed();
});
exports.deploySifusToken = deploySifusToken;
const deploySifusDescriptor = (deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const sifusDescriptorFactory = new typechain_1.SifusDescriptor__factory(deployer);
    return (yield sifusDescriptorFactory.deploy()).deployed();
});
exports.deploySifusDescriptor = deploySifusDescriptor;
const deploySifusSeeder = (deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.SifusSeeder__factory(deployer);
    return (yield factory.deploy()).deployed();
});
exports.deploySifusSeeder = deploySifusSeeder;
const populateDescriptor = (sifusDescriptor) => __awaiter(void 0, void 0, void 0, function* () {
    const { bgcolors, palette, images } = image_data_json_1.default;
    const { bodies, accessories, heads, glasses } = images;
    // Split up head and accessory population due to high gas usage
    yield Promise.all([
        sifusDescriptor.addManyBackgrounds(bgcolors),
        sifusDescriptor.addManyColorsToPalette(0, palette),
        sifusDescriptor.addManyPart1s(bodies.map(({ data }) => data)),
        (0, chunkArray_1.chunkArray)(accessories, 10).map(chunk => sifusDescriptor.addManyPart2s(chunk.map(({ data }) => data))),
        (0, chunkArray_1.chunkArray)(heads, 10).map(chunk => sifusDescriptor.addManyPart3s(chunk.map(({ data }) => data))),
        sifusDescriptor.addManyPart4s(glasses.map(({ data }) => data)),
    ]);
});
exports.populateDescriptor = populateDescriptor;
const deployWorldStorylines = (moduleId, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldStorylines__factory(deployer);
    return (yield factory.deploy(route.address, moduleId)).deployed();
});
exports.deployWorldStorylines = deployWorldStorylines;
const deployParameterizedStorylines = (moduleId, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.ParameterizedStorylines__factory(deployer);
    return (yield factory.deploy(route.address, moduleId)).deployed();
});
exports.deployParameterizedStorylines = deployParameterizedStorylines;
const deployGlobalStoryRegistry = (moduleId, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.GlobalStoryRegistry__factory(deployer);
    return (yield factory.deploy(route.address, moduleId)).deployed();
});
exports.deployGlobalStoryRegistry = deployGlobalStoryRegistry;
const deployNameGenerator = (route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.NameGenerator__factory(deployer);
    return (yield factory.deploy(route.address)).deployed();
});
exports.deployNameGenerator = deployNameGenerator;
const deployWorldStoryActors = (moduleId, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.WorldStoryActors__factory(deployer);
    return (yield factory.deploy(route.address, moduleId)).deployed();
});
exports.deployWorldStoryActors = deployWorldStoryActors;
;
const deployTaiyiWorld = (actorMintStart, deployer, operatorDAO, verbose) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose)
        console.log("Deploy Constants...");
    let worldConstants = yield (0, exports.deployWorldConstants)(deployer);
    if (verbose)
        console.log("Deploy WorldContractRoute...");
    let worldContractRoute = yield (0, exports.deployWorldContractRoute)(deployer);
    //connect route to PanGu's operator
    let routeByPanGu = typechain_1.WorldContractRoute__factory.connect(worldContractRoute.address, operatorDAO);
    if (verbose)
        console.log("Deploy Daoli...");
    let assetDaoli = yield (0, exports.deployAssetDaoli)(worldConstants, worldContractRoute, deployer);
    let assetDaoliArg = ["Taiyi Daoli", "DAOLI", (yield worldConstants.WORLD_MODULE_COIN()).toNumber(), worldContractRoute.address];
    if (verbose)
        console.log(`Deploy Actors...(mintstart=${actorMintStart.toString()})`);
    let actors = yield (0, exports.deployActors)(operatorDAO.address, actorMintStart, assetDaoli.address, worldContractRoute, deployer);
    let actorsArg = [operatorDAO.address, Number(actorMintStart), assetDaoli.address];
    yield (yield worldContractRoute.registerActors(actors.address)).wait();
    //PanGu should be mint at first, or you can not register any module
    if (verbose)
        console.log(`Mint PanGu as actor#${yield actors.nextActor()}.`);
    //await actors.nextActor() == await worldConstants.ACTOR_PANGU()
    yield (yield actors.connect(operatorDAO).mintActor(0)).wait();
    //Register Daoli
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_COIN(), assetDaoli.address)).wait();
    if (verbose)
        console.log("Deploy SifusToken...");
    let sifusDescriptor = yield (0, exports.deploySifusDescriptor)(deployer);
    let sifusSeeder = yield (0, exports.deploySifusSeeder)(deployer);
    let sifusToken = yield (0, exports.deploySifusToken)(worldContractRoute, operatorDAO.address, sifusDescriptor.address, sifusSeeder.address, deployer);
    let sifusTokenArg = [operatorDAO.address, sifusDescriptor.address, sifusSeeder.address, worldContractRoute.address];
    //await populateDescriptor(sifusDescriptor);
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_SIFUS(), sifusToken.address)).wait();
    if (verbose)
        console.log("Deploy WorldRandom...");
    let worldRandom = yield (0, exports.deployWorldRandom)(deployer);
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address)).wait();
    if (verbose)
        console.log("Deploy ActorNames...");
    let actorNames = yield (0, exports.deployActorNames)(routeByPanGu, deployer);
    let actorNamesArg = [routeByPanGu.address];
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_NAMES(), actorNames.address)).wait();
    if (verbose)
        console.log("Deploy WorldItems...");
    let worldItems = yield (0, exports.deployWorldItems)(routeByPanGu, deployer);
    let worldItemsArg = [routeByPanGu.address];
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ITEMS(), worldItems.address)).wait();
    if (verbose)
        console.log("Deploy ActorSocialIdentity...");
    let actorSIDs = yield (0, exports.deployActorSocialIdentity)(routeByPanGu, deployer);
    let actorSIDsArg = [routeByPanGu.address];
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_SIDS(), actorSIDs.address)).wait();
    if (verbose)
        console.log("Deploy WorldZones...");
    let worldZones = yield (0, exports.deployWorldZones)(routeByPanGu, deployer);
    let worldZonesArg = [routeByPanGu.address];
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ZONES(), worldZones.address)).wait();
    if (verbose)
        console.log("Deploy WorldYemings...");
    let worldYemings = yield (0, exports.deployWorldYemings)(operatorDAO.address, deployer);
    let worldYemingsArg = [operatorDAO.address];
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address)).wait();
    if (verbose)
        console.log("Deploy Actor Attributes...");
    let actorAttributes = yield (0, exports.deployActorAttributes)(routeByPanGu, deployer);
    let actorAttributesArg = [routeByPanGu.address];
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address)).wait();
    if (verbose)
        console.log("Deploy ActorLocations...");
    let actorLocations = yield (0, exports.deployActorLocations)(routeByPanGu, deployer);
    let actorLocationsArg = [routeByPanGu.address];
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_ACTOR_LOCATIONS(), actorLocations.address)).wait();
    if (verbose)
        console.log("Deploy Prelifes...");
    let actorPrelifes = yield (0, exports.deployActorPrelifes)(routeByPanGu, deployer);
    let actorPrelifesArg = [routeByPanGu.address];
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_PRELIFES(), actorPrelifes.address)).wait();
    if (verbose)
        console.log("Deploy Trigrams...");
    let trigrams = yield (0, exports.deployTrigrams)(routeByPanGu, deployer);
    let trigramsArg = [routeByPanGu.address];
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_TRIGRAMS(), trigrams.address)).wait();
    if (verbose)
        console.log("Deploy TrigramsRender...");
    let trigramsRender = yield (0, exports.deployTrigramsRender)(routeByPanGu, deployer);
    let trigramsRenderArg = [routeByPanGu.address];
    yield (yield routeByPanGu.registerModule(yield worldConstants.WORLD_MODULE_TRIGRAMS_RENDER(), trigramsRender.address)).wait();
    if (verbose)
        console.log("Deploy NameGenerator...");
    let nameGenerator = yield (0, exports.deployNameGenerator)(routeByPanGu, deployer);
    let nameGeneratorArg = [routeByPanGu.address];
    yield (yield routeByPanGu.registerModule(225, nameGenerator.address)).wait();
    //render modules
    yield (yield actors.connect(operatorDAO).setRenderModule(1, trigramsRender.address)).wait();
    if (verbose)
        console.log("Taiyi Base Contracts Deployment Done.");
    let contracts = {
        WorldConstants: { instance: worldConstants },
        WorldContractRoute: { instance: worldContractRoute },
        Actors: { instance: actors, constructorArguments: actorsArg },
        WorldRandom: { instance: worldRandom },
        ActorNames: { instance: actorNames, constructorArguments: actorNamesArg },
        WorldYemings: { instance: worldYemings, constructorArguments: worldYemingsArg },
        WorldItems: { instance: worldItems, constructorArguments: worldItemsArg },
        ActorSocialIdentity: { instance: actorSIDs, constructorArguments: actorSIDsArg },
        WorldZones: { instance: worldZones, constructorArguments: worldZonesArg },
        AssetDaoli: { instance: assetDaoli, constructorArguments: assetDaoliArg },
        ActorAttributes: { instance: actorAttributes, constructorArguments: actorAttributesArg },
        ActorPrelifes: { instance: actorPrelifes, constructorArguments: actorPrelifesArg },
        ActorLocations: { instance: actorLocations, constructorArguments: actorLocationsArg },
        Trigrams: { instance: trigrams, constructorArguments: trigramsArg },
        SifusDescriptor: { instance: sifusDescriptor },
        SifusSeeder: { instance: sifusSeeder },
        SifusToken: { instance: sifusToken, constructorArguments: sifusTokenArg },
        TrigramsRender: { instance: trigramsRender, constructorArguments: trigramsRenderArg },
        NameGenerator: { instance: nameGenerator, constructorArguments: nameGeneratorArg },
    };
    return contracts;
});
exports.deployTaiyiWorld = deployTaiyiWorld;
