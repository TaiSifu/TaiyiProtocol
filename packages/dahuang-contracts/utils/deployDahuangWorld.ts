import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, BigNumberish, Contract as EthersContract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import { chunkArray } from '@taiyi/contracts/utils/chunkArray';
import { 
    ActorCharmAttributes, ActorCharmAttributes__factory, ActorCoreAttributes, ActorCoreAttributes__factory, 
    ActorMoodAttributes, ActorMoodAttributes__factory, ActorBehaviorAttributes, ActorBehaviorAttributes__factory, WorldSeasons, 
    WorldSeasons__factory, DahuangConstants, DahuangConstants__factory, WorldVillages, WorldVillages__factory, WorldBuildings, 
    WorldBuildings__factory, WorldZoneBaseResources, WorldZoneBaseResources__factory
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
    WorldNontransferableFungible, WorldYemings, ActorSocialIdentity
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

export const deployWorldZoneBaseResources = async (zoneResourceGrowTimeDay: number, zoneResourceGrowQuantityScale: number, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldZoneBaseResources> => {
    console.log(`deploy WorldZoneBaseResources with zoneResourceGrowTimeDay=${zoneResourceGrowTimeDay}, zoneResourceGrowQuantityScale=${zoneResourceGrowQuantityScale}`);
    const factory = new WorldZoneBaseResources__factory(deployer);
    return (await factory.deploy(zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, route.address)).deployed();
};

export type DahuangContractName =
    | 'DahuangConstants'
    | 'Shejitu'
    | 'ShejituProxy'
    | 'ShejituProxyAdmin'
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
    | 'ActorRelationship';

export interface WorldContract {
    instance: EthersContract;
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
    let worldEvents = await deployWorldEvents(oneAgeVSecond, await dahuangConstants.WORLD_MODULE_EVENTS(), routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_EVENTS(), worldEvents.address);

    if(verbose) console.log("Deploy ActorTalents...");
    let actorTalents = await deployActorTalents(await dahuangConstants.WORLD_MODULE_TALENTS(), routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_TALENTS(), actorTalents.address);

    if(verbose) console.log("Deploy Shejitu...");
    let shejiTuPkg = await deployShejiTu("大荒", "所在时间线：大荒", await dahuangConstants.WORLD_MODULE_TIMELINE(),
        actors, locations, zones, attributes, worldEvents, actorTalents, trigrams, random, deployer);
    let shejiTu = ShejiTu__factory.connect(shejiTuPkg[0].address, deployer); //CAST proxy as ShejiTu
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_TIMELINE(), shejiTu.address);

    let shejiTuOperator = await actors.nextActor();
    await actors.connect(deployer).mintActor(0);
    await actors.connect(deployer).approve(shejiTu.address, shejiTuOperator);
    await shejiTu.initOperator(shejiTuOperator);
    await yemings.connect(operatorDAO).setYeMing(shejiTuOperator, shejiTu.address);
    if(verbose) console.log(`Mint Shejitu YeMing as actor#${await shejiTu.operator()}.`);

    //deploy actor attributes
    if(verbose) console.log("Deploy Actor Attributes...");
    await shejiTu.registerAttributeModule(attributes.address);
    let actorCharmAttributes = await deployActorCharmAttributes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_CHARM_ATTRIBUTES(), actorCharmAttributes.address);
    await shejiTu.registerAttributeModule(actorCharmAttributes.address);
    let actorCoreAttributes = await deployActorCoreAttributes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES(), actorCoreAttributes.address);
    await shejiTu.registerAttributeModule(actorCoreAttributes.address);
    let actorMoodAttributes = await deployActorMoodAttributes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_MOOD_ATTRIBUTES(), actorMoodAttributes.address);
    await shejiTu.registerAttributeModule(actorMoodAttributes.address);
    let actorBehaviorAttributes = await deployActorBehaviorAttributes(actRecoverTimeDay, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES(), actorBehaviorAttributes.address);
    await shejiTu.registerAttributeModule(actorBehaviorAttributes.address);

    //deploy assets
    if(verbose) console.log("Deploy Assets...");
    let assetFood = await deployAssetFood(dahuangConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_FOOD(), assetFood.address);
    let assetWood = await deployAssetWood(dahuangConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_WOOD(), assetWood.address);
    let assetGold = await deployAssetGold(dahuangConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_GOLD(), assetGold.address);
    let assetFabric = await deployAssetFabric(dahuangConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_FABRIC(), assetFabric.address);
    let assetHerb = await deployAssetHerb(dahuangConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_HERB(), assetHerb.address);
    let assetPrestige = await deployAssetPrestige(dahuangConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_PRESTIGE(), assetPrestige.address);

    if(verbose) console.log("Deploy Other World Modules...");
    let worldSeasons = await deployWorldSeasons(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_SEASONS(), worldSeasons.address);
    let actorBornPlaces = await deployActorBornPlaces(await dahuangConstants.WORLD_MODULE_BORN_PLACES(), routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_BORN_PLACES(), actorBornPlaces.address);
    let worldVillages = await deployWorldVillages(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_VILLAGES(), worldVillages.address);
    let worldBuildings = await deployWorldBuildings(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_BUILDINGS(), worldBuildings.address);
    let actorRelationships = await deployActorRelationship(await dahuangConstants.WORLD_MODULE_RELATIONSHIP(), routeByPanGu, deployer);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_RELATIONSHIP(), actorRelationships.address);
    let worldZoneBaseResources = await deployWorldZoneBaseResources(zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, routeByPanGu, deployer);
    let worldZoneBaseResourceOperator = await actors.nextActor();
    await actors.connect(deployer).mintActor(0);
    await actors.connect(deployer).approve(worldZoneBaseResources.address, worldZoneBaseResourceOperator);
    await worldZoneBaseResources.initOperator(worldZoneBaseResourceOperator);
    if(verbose) console.log(`Mint GuanGong as actor#${await worldZoneBaseResources.ACTOR_GUANGONG()}.`);
    await routeByPanGu.registerModule(await dahuangConstants.WORLD_MODULE_ZONE_BASE_RESOURCES(), worldZoneBaseResources.address);

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
        await initTalents(actorTalents.address, operatorDAO, dahuangConstants);
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
        if(verbose) console.log("Initialize Global Timeline...");
        await initTimeline(shejiTu.address, deployer);
    }

    //init zones
    if(flags?.noZones)
        null;
    else {
        if(verbose) console.log("Initialize Zones...");
        await actors.connect(operatorDAO).approve(shejiTu.address, await worldConstants.ACTOR_PANGU());
        await initZones(worldConstants, shejiTu.address, operatorDAO);

        //bind shejitu to first zone
        await shejiTu.setStartZone(1);
    }

    let contracts: Record<DahuangContractName, WorldContract> = {        
        DahuangConstants: {instance: dahuangConstants},
        ShejituProxy: {instance: shejiTuPkg[0]},
        ShejituProxyAdmin: {instance: shejiTuPkg[1]},
        Shejitu: {instance: shejiTuPkg[2]},
        WorldEvents: {instance: worldEvents},
        AssetFood: {instance: assetFood},
        AssetWood: {instance: assetWood},
        AssetGold: {instance: assetGold},
        AssetFabric: {instance: assetFabric},
        AssetHerb: {instance: assetHerb},
        AssetPrestige: {instance: assetPrestige},
        ActorTalents: {instance: actorTalents},
        ActorCharmAttributes: {instance: actorCharmAttributes},
        ActorCoreAttributes: {instance: actorCoreAttributes},
        ActorMoodAttributes: {instance: actorMoodAttributes},
        ActorBehaviorAttributes: {instance: actorBehaviorAttributes},
        WorldSeasons: {instance: worldSeasons},
        ActorBornPlaces: {instance: actorBornPlaces},
        WorldVillages: {instance: worldVillages},
        WorldBuildings: {instance: worldBuildings},
        WorldZoneBaseResources: {instance: worldZoneBaseResources},
        ActorRelationship: {instance: actorRelationships},        
    };

    return { worldContracts: contracts, eventProcessorAddressBook: _eventProcessorAddressBook};
};
