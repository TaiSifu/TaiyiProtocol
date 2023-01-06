import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, BigNumberish, Contract as EthersContract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import { chunkArray } from '@taiyi/contracts/utils/chunkArray';
import { 
    ActorCharmAttributes, ActorCharmAttributes__factory, ActorCoreAttributes, ActorCoreAttributes__factory, 
    ActorMoodAttributes, ActorMoodAttributes__factory, ActorBehaviorAttributes, ActorBehaviorAttributes__factory, WorldSeasons, 
    WorldSeasons__factory, DahuangConstants, DahuangConstants__factory, WorldVillages, WorldVillages__factory, WorldBuildings, 
    WorldBuildings__factory, WorldZoneBaseResources, WorldZoneBaseResources__factory, WorldZoneBaseResourcesTest__factory, WorldZoneBaseResourcesRandom__factory, WorldDeadActors, WorldDeadActors__factory
} from '../typechain';
import { deployActorBornPlaces, deployActorRelationship, deployActorTalents, deployWorldEvents } from '@taiyi/contracts/dist/utils';
import { initSIDNames } from './initSocialIdentity';
import { deployTalentProcessors, initTalents } from './initTalents';
import { initRelations } from './initRelationship';
import { initItemTypes } from './initItemTypes';
import { initBuildingTypes } from './initBuildingTypes';
import { initEvents } from './initEvents';
import { initTimeline } from './initTimeline';
import { initZones } from './initZones';
import {
    WorldConstants, WorldContractRoute, WorldFungible, WorldFungible__factory, Actors, ActorLocations, Trigrams, WorldRandom,
    WorldZones, ActorAttributes, WorldItems, ShejiTu__factory, WorldNontransferableFungible__factory, 
    WorldNontransferableFungible, WorldYemings, ActorSocialIdentity, ShejiTuProxy, ShejiTuProxyAdmin, ShejiTu
} from '@taiyi/contracts/dist/typechain';
import { deployShejiTu } from '@taiyi/contracts/dist/utils';

export const deployDahuangConstants = async (deployer: SignerWithAddress): Promise<DahuangConstants> => {
    const factory = new DahuangConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployAssetFood = async (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Food", "TYFOOD", await worldConst.WORLD_MODULE_FOOD(), route.address)).deployed();
};

export const deployAssetWood = async (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Wood", "TYWOOD", await worldConst.WORLD_MODULE_WOOD(), route.address)).deployed();
};

export const deployAssetGold = async (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Gold", "TYGOLD", await worldConst.WORLD_MODULE_GOLD(), route.address)).deployed();
};

export const deployAssetFabric = async (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Fabric", "TYFABRIC", await worldConst.WORLD_MODULE_FABRIC(), route.address)).deployed();
};

export const deployAssetHerb = async (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Herb", "TYHERB", await worldConst.WORLD_MODULE_HERB(), route.address)).deployed();
};

export const deployAssetPrestige = async (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldNontransferableFungible> => {
    const factory = new WorldNontransferableFungible__factory(deployer);
    return (await factory.deploy("Taiyi Prestige", "TYPRESTIGE", await worldConst.WORLD_MODULE_PRESTIGE(), route.address)).deployed();
};

export const deployActorCharmAttributes = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorCharmAttributes> => {
    const factory = new ActorCharmAttributes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployActorCoreAttributes = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorCoreAttributes> => {
    const factory = new ActorCoreAttributes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployActorMoodAttributes = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorMoodAttributes> => {
    const factory = new ActorMoodAttributes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployActorBehaviorAttributes = async (actRecoverTimeDay: number, route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorBehaviorAttributes> => {
    console.log(`deploy ActorBehaviorAttributes with actRecoverTimeDay=${actRecoverTimeDay}`);
    const factory = new ActorBehaviorAttributes__factory(deployer);
    return (await factory.deploy(actRecoverTimeDay, route.address)).deployed();
};

export const deployWorldSeasons = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldSeasons> => {
    const factory = new WorldSeasons__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldVillages = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldVillages> => {
    const factory = new WorldVillages__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldBuildings = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldBuildings> => {
    const factory = new WorldBuildings__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldZoneBaseResources = async (zoneResourceGrowTimeDay: number, zoneResourceGrowQuantityScale: number, route: WorldContractRoute, deployer: SignerWithAddress, isTest?: boolean): Promise<WorldZoneBaseResources> => {
    console.log(`deploy WorldZoneBaseResources with zoneResourceGrowTimeDay=${zoneResourceGrowTimeDay}, zoneResourceGrowQuantityScale=${zoneResourceGrowQuantityScale}`);
    const factory = isTest?(new WorldZoneBaseResourcesTest__factory(deployer)) : (new WorldZoneBaseResourcesRandom__factory(deployer));
    return (await factory.deploy(zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, route.address)).deployed();
};

export const deployWorldDeadActors = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldDeadActors> => {
    const factory = new WorldDeadActors__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export type DahuangContractName =
    | 'DahuangConstants'
    | 'ShejiTu'
    | 'ShejiTuProxy'
    | 'ShejiTuProxyAdmin'
    | 'WorldEvents'
    | 'AssetFood'
    | 'AssetWood'
    | 'AssetGold'
    | 'AssetFabric'
    | 'AssetHerb'
    | 'AssetPrestige'
    | 'ActorTalents' 
    | 'ActorCharmAttributes' 
    | 'ActorCoreAttributes' 
    | 'ActorMoodAttributes'
    | 'ActorBehaviorAttributes' 
    | 'WorldSeasons' 
    | 'ActorBornPlaces' 
    | 'WorldVillages'
    | 'WorldZoneBaseResources'
    | 'WorldBuildings'
    | 'ActorRelationship'
    | 'WorldDeadActors';

export interface WorldContract {
    instance: EthersContract;
    constructorArguments?: (string | number)[];
    libraries?: () => Record<string, string>;
};

export interface WorldDeployFlag {
    noSIDNames? : boolean;
    noTalents? : boolean;
    noTalentProcessors? : boolean;
    noRelations? : boolean;
    noItemTypes? : boolean;
    noBuildingTypes? : boolean;
    noEventProcessors? : boolean;
    noTimelineEvents? : boolean;
    noZones? : boolean;
    isTest?: boolean;
};
    
export const deployDahuangWorld = async (oneAgeVSecond : number, actRecoverTimeDay: number, zoneResourceGrowTimeDay : number, zoneResourceGrowQuantityScale: number,
    route: WorldContractRoute, worldConstants: WorldConstants, actors: Actors, locations: ActorLocations, yemings: WorldYemings,
    zones: WorldZones, attributes: ActorAttributes, trigrams: Trigrams, random: WorldRandom, worldItems: WorldItems,
    actorSIDs: ActorSocialIdentity,
    deployer: SignerWithAddress, operatorDAO: SignerWithAddress, flags?:WorldDeployFlag, verbose?:Boolean): Promise<{
        worldContracts: Record<DahuangContractName, WorldContract>,
        eventProcessorAddressBook: {[index: string]:any}
    }> => {

    let routeByPanGu = route.connect(operatorDAO);
    
    if(verbose) console.log("Deploy Constants...");
    let dahuangConstants = await deployDahuangConstants(deployer);

    if(verbose) console.log("Deploy WorldEvents...");
    let moduleId = await dahuangConstants.WORLD_MODULE_EVENTS();
    let worldEvents = await deployWorldEvents(oneAgeVSecond, moduleId, routeByPanGu, deployer);
    let worldEventsArgs = [oneAgeVSecond, route.address, Number(moduleId)];
    await (await routeByPanGu.registerModule(moduleId, worldEvents.address)).wait();

    if(verbose) console.log("Deploy ActorTalents...");
    moduleId = await dahuangConstants.WORLD_MODULE_TALENTS();
    let actorTalents = await deployActorTalents(moduleId, routeByPanGu, deployer);
    let actorTalentsArgs = [route.address, Number(moduleId)];
    await (await routeByPanGu.registerModule(moduleId, actorTalents.address)).wait();

    if(verbose) console.log("Deploy Shejitu...");
    moduleId = await dahuangConstants.WORLD_MODULE_TIMELINE();
    let shejiTuPkg = await deployShejiTu("大荒", "所在时间线：大荒", moduleId,
        actors, locations, zones, attributes, worldEvents, actorTalents, trigrams, random, deployer);
    let shejiTuProxyArgs = shejiTuPkg[3];
    let shejiTu = ShejiTu__factory.connect((shejiTuPkg[0] as ShejiTuProxy).address, deployer); //CAST proxy as ShejiTu
    await (await routeByPanGu.registerModule(moduleId, shejiTu.address)).wait();

    let shejiTuOperator = await actors.nextActor();
    await (await actors.connect(deployer).mintActor(0)).wait();
    await (await actors.connect(deployer).approve(shejiTu.address, shejiTuOperator)).wait();
    await (await shejiTu.initOperator(shejiTuOperator)).wait();
    await (await yemings.connect(operatorDAO).setYeMing(shejiTuOperator, shejiTu.address)).wait();
    if(verbose) console.log(`Mint Shejitu YeMing as actor#${await shejiTu.operator()}.`);

    //deploy actor attributes
    if(verbose) console.log("--------- Acotr Attributes ---------");
    await (await shejiTu.registerAttributeModule(attributes.address)).wait();
    if(verbose) console.log("Deploy ActorCharmAttributes...");
    let actorCharmAttributes = await deployActorCharmAttributes(routeByPanGu, deployer);
    let actorCharmAttributesArgs = [route.address];
    await (await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_CHARM_ATTRIBUTES(), actorCharmAttributes.address)).wait();
    await (await shejiTu.registerAttributeModule(actorCharmAttributes.address)).wait();
    if(verbose) console.log("Deploy ActorCoreAttributes...");
    let actorCoreAttributes = await deployActorCoreAttributes(routeByPanGu, deployer);
    let actorCoreAttributesArgs = [route.address];
    await (await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES(), actorCoreAttributes.address)).wait();
    await (await shejiTu.registerAttributeModule(actorCoreAttributes.address)).wait();
    if(verbose) console.log("Deploy ActorMoodAttributes...");
    let actorMoodAttributes = await deployActorMoodAttributes(routeByPanGu, deployer);
    let actorMoodAttributesArgs = [route.address];
    await (await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_MOOD_ATTRIBUTES(), actorMoodAttributes.address)).wait();
    await (await shejiTu.registerAttributeModule(actorMoodAttributes.address)).wait();
    if(verbose) console.log("Deploy ActorBehaviorAttributes...");
    let actorBehaviorAttributes = await deployActorBehaviorAttributes(actRecoverTimeDay, routeByPanGu, deployer);
    let actorBehaviorAttributesArgs = [actRecoverTimeDay, route.address];
    await (await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES(), actorBehaviorAttributes.address)).wait();
    await (await shejiTu.registerAttributeModule(actorBehaviorAttributes.address)).wait();

    //deploy assets
    if(verbose) console.log("--------- Assets ---------");
    if(verbose) console.log("Deploy AssetsFood...");
    let assetFood = await deployAssetFood(dahuangConstants, routeByPanGu, deployer);
    moduleId = await dahuangConstants.WORLD_MODULE_FOOD();
    let assetFoodArgs = ["Taiyi Food", "TYFOOD", Number(moduleId), route.address];
    await (await routeByPanGu.registerModule(moduleId, assetFood.address)).wait();
    if(verbose) console.log("Deploy AssetsWood...");
    let assetWood = await deployAssetWood(dahuangConstants, routeByPanGu, deployer);
    moduleId = await dahuangConstants.WORLD_MODULE_WOOD();
    let assetWoodArgs = ["Taiyi Wood", "TYWOOD", Number(moduleId), route.address];
    await (await routeByPanGu.registerModule(moduleId, assetWood.address)).wait();
    if(verbose) console.log("Deploy AssetsGold...");
    let assetGold = await deployAssetGold(dahuangConstants, routeByPanGu, deployer);
    moduleId = await dahuangConstants.WORLD_MODULE_GOLD();
    let assetGoldArgs = ["Taiyi Gold", "TYGOLD", Number(moduleId), route.address];
    await (await routeByPanGu.registerModule(moduleId, assetGold.address)).wait();
    if(verbose) console.log("Deploy AssetsFabric...");
    let assetFabric = await deployAssetFabric(dahuangConstants, routeByPanGu, deployer);
    moduleId = await dahuangConstants.WORLD_MODULE_FABRIC();
    let assetFabricArgs = ["Taiyi Fabric", "TYFABRIC", Number(moduleId), route.address];
    await (await routeByPanGu.registerModule(moduleId, assetFabric.address)).wait();
    if(verbose) console.log("Deploy AssetsHerb...");
    let assetHerb = await deployAssetHerb(dahuangConstants, routeByPanGu, deployer);
    moduleId = await dahuangConstants.WORLD_MODULE_HERB();
    let assetHerbArgs = ["Taiyi Herb", "TYHERB", Number(moduleId), route.address];
    await (await routeByPanGu.registerModule(moduleId, assetHerb.address)).wait();
    if(verbose) console.log("Deploy AssetsPrestige...");
    let assetPrestige = await deployAssetPrestige(dahuangConstants, routeByPanGu, deployer);
    moduleId = await dahuangConstants.WORLD_MODULE_PRESTIGE();
    let assetPrestigeArgs = ["Taiyi Prestige", "TYPRESTIGE", Number(moduleId), route.address];
    await (await routeByPanGu.registerModule(moduleId, assetPrestige.address)).wait();

    if(verbose) console.log("--------- Datasets ---------");
    if(verbose) console.log("Deploy WorldSeasons...");
    let worldSeasons = await deployWorldSeasons(routeByPanGu, deployer);
    let worldSeasonsArgs = [route.address];
    await (await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_SEASONS(), worldSeasons.address)).wait();
    if(verbose) console.log("Deploy ActorBornPlaces...");
    moduleId = await dahuangConstants.WORLD_MODULE_BORN_PLACES();
    let actorBornPlaces = await deployActorBornPlaces(moduleId, routeByPanGu, deployer);
    let actorBornPlacesArgs = [route.address, Number(moduleId)];
    await (await routeByPanGu.registerModule(moduleId, actorBornPlaces.address)).wait();
    if(verbose) console.log("Deploy WorldVillages...");
    let worldVillages = await deployWorldVillages(routeByPanGu, deployer);
    let worldVillagesArgs = [route.address];
    await (await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_VILLAGES(), worldVillages.address)).wait();
    if(verbose) console.log("Deploy WorldBuildings...");
    let worldBuildings = await deployWorldBuildings(routeByPanGu, deployer);
    let worldBuildingsArgs = [route.address];
    await (await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_BUILDINGS(), worldBuildings.address)).wait();
    if(verbose) console.log("Deploy ActorRelationship...");
    moduleId = await dahuangConstants.WORLD_MODULE_RELATIONSHIP();
    let actorRelationships = await deployActorRelationship(moduleId, routeByPanGu, deployer);
    let actorRelationshipsArgs = [route.address, Number(moduleId)];
    await (await routeByPanGu.registerModule(moduleId, actorRelationships.address)).wait();
    if(verbose) console.log("Deploy WorldZoneBaseResources...");
    let worldZoneBaseResources = await deployWorldZoneBaseResources(zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, routeByPanGu, deployer, flags?.isTest);
    let worldZoneBaseResourcesArgs = [zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, route.address];
    let worldZoneBaseResourceOperator = await actors.nextActor();
    await (await actors.connect(deployer).mintActor(0)).wait();
    await (await actors.connect(deployer).approve(worldZoneBaseResources.address, worldZoneBaseResourceOperator)).wait();
    await (await worldZoneBaseResources.initOperator(worldZoneBaseResourceOperator)).wait();
    if(verbose) console.log(`Mint GuanGong as actor#${await worldZoneBaseResources.ACTOR_GUANGONG()}.`);
    await (await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_ZONE_BASE_RESOURCES(), worldZoneBaseResources.address)).wait();

    if(verbose) console.log("Deploy WorldDeadActors...");
    let worldDeadActors = await deployWorldDeadActors(routeByPanGu, deployer);
    let worldDeadActorsArgs = [route.address];
    await (await routeByPanGu.registerModule(219, worldDeadActors.address)).wait();

    //init SocialIdentity Names
    if(flags?.noSIDNames)
        null;
    else {
        if(verbose) console.log("Initialize Social Identity Names...");
        await initSIDNames(actorSIDs.address, operatorDAO);
    }

    //init talents
    if(flags?.noTalents)
        null;
    else {
        if(verbose) console.log("Initialize Talents...");
        await initTalents(actorTalents.address, operatorDAO, worldConstants, dahuangConstants);
    }

    //deploy talent processors
    if(flags?.noTalentProcessors)
        null;
    else {
        if(verbose) console.log("Initialize Talent Processors...");
        await deployTalentProcessors(actorTalents.address, operatorDAO, route, deployer);
    }

    //init relationships
    if(flags?.noRelations)
        null;
    else {
        if(verbose) console.log("Initialize Relationship Names...");
        await initRelations(actorRelationships.address, operatorDAO);
    }

    //init item types
    if(flags?.noItemTypes)
        null;
    else {
        if(verbose) console.log("Initialize Item Types...");
        await initItemTypes(worldItems.address, operatorDAO);
    }

    //init building types
    if(flags?.noBuildingTypes)
        null;
    else {
        if(verbose) console.log("Initialize Building Types...");
        await initBuildingTypes(worldBuildings.address, operatorDAO);
    }

    //init event processors
    let _eventProcessorAddressBook : any;
    if(flags?.noEventProcessors)
        null;
    else {
        if(verbose) console.log("Initialize Events...");
        _eventProcessorAddressBook = await initEvents(route, worldEvents.address, operatorDAO, deployer);
    }

    //init timeline events
    if(flags?.noTimelineEvents)
        null;
    else {
        if(verbose) console.log("Initialize Dahuang Timeline...");
        await initTimeline(shejiTu.address, deployer);
    }

    //init zones
    if(flags?.noZones)
        null;
    else {
        if(verbose) console.log("Initialize Zones...");
        let actorPanGu = await worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing
        await (await yemings.connect(operatorDAO).setYeMing(actorPanGu, operatorDAO.address)).wait(); //fake address for PanGu
        //bind timeline to a zone
        let dahuangZone = await zones.nextZone();
        await (await zones.connect(operatorDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu)).wait();
        await (await shejiTu.setStartZone(dahuangZone)).wait();

        //born PanGu
        await (await actors.connect(operatorDAO).approve(shejiTu.address, actorPanGu)).wait();
        await (await shejiTu.connect(operatorDAO).bornActor(actorPanGu)).wait();
        
        //init zones by PanGu
        await initZones(worldConstants, shejiTu.address, operatorDAO);
    }

    if(verbose) console.log("Dahuang Contracts Deployment Done.");

    let contracts: Record<DahuangContractName, WorldContract> = {        
        DahuangConstants: {instance: dahuangConstants},
        ShejiTuProxy: {instance: shejiTuPkg[0] as ShejiTuProxy, constructorArguments: shejiTuProxyArgs as string[]},
        ShejiTuProxyAdmin: {instance: shejiTuPkg[1] as ShejiTuProxyAdmin},
        ShejiTu: {instance: shejiTuPkg[2] as ShejiTu},
        WorldEvents: {instance: worldEvents, constructorArguments: worldEventsArgs},
        AssetFood: {instance: assetFood, constructorArguments: assetFoodArgs},
        AssetWood: {instance: assetWood, constructorArguments: assetWoodArgs},
        AssetGold: {instance: assetGold, constructorArguments: assetGoldArgs},
        AssetFabric: {instance: assetFabric, constructorArguments: assetFabricArgs},
        AssetHerb: {instance: assetHerb, constructorArguments: assetHerbArgs},
        AssetPrestige: {instance: assetPrestige, constructorArguments: assetPrestigeArgs},
        ActorTalents: {instance: actorTalents, constructorArguments: actorTalentsArgs},
        ActorCharmAttributes: {instance: actorCharmAttributes, constructorArguments: actorCharmAttributesArgs},
        ActorCoreAttributes: {instance: actorCoreAttributes, constructorArguments: actorCoreAttributesArgs},
        ActorMoodAttributes: {instance: actorMoodAttributes, constructorArguments: actorMoodAttributesArgs},
        ActorBehaviorAttributes: {instance: actorBehaviorAttributes, constructorArguments: actorBehaviorAttributesArgs},
        WorldSeasons: {instance: worldSeasons, constructorArguments: worldSeasonsArgs},
        ActorBornPlaces: {instance: actorBornPlaces, constructorArguments: actorBornPlacesArgs},
        WorldVillages: {instance: worldVillages, constructorArguments: worldVillagesArgs},
        WorldBuildings: {instance: worldBuildings, constructorArguments: worldBuildingsArgs},
        WorldZoneBaseResources: {instance: worldZoneBaseResources, constructorArguments: worldZoneBaseResourcesArgs},
        ActorRelationship: {instance: actorRelationships, constructorArguments: actorRelationshipsArgs},
        WorldDeadActors: {instance: worldDeadActors, constructorArguments: worldDeadActorsArgs},
    };

    return { worldContracts: contracts, eventProcessorAddressBook: _eventProcessorAddressBook};
};
