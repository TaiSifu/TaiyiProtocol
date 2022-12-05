import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    ActorAttributes, ActorAttributes__factory, ActorAttributesConstants, ActorAttributesConstants__factory,
    ActorNames, ActorNames__factory, Actors, Actors__factory, ActorSocialIdentity, ActorSocialIdentity__factory,    
    WorldFungible, WorldFungible__factory, ShejiTu, ShejiTu__factory, SifusToken,
    WorldConstants, WorldConstants__factory, WorldContractRoute, WorldContractRoute__factory, WorldRandom, WorldRandom__factory, 
    WorldItems, WorldItems__factory, WorldZones, WorldZones__factory, WorldEvents, WorldEvents__factory, 
    ActorCharmAttributesConstants, ActorCharmAttributesConstants__factory, ActorCoreAttributesConstants, 
    ActorCoreAttributesConstants__factory, ActorMoodAttributesConstants, ActorMoodAttributesConstants__factory,
    ActorBehaviorAttributesConstants, ActorBehaviorAttributesConstants__factory, SifusDescriptor__factory, ActorTalents, 
    ActorTalents__factory, ActorCharmAttributes, ActorCharmAttributes__factory, ActorCoreAttributes, ActorCoreAttributes__factory, 
    ActorMoodAttributes, ActorMoodAttributes__factory, ActorBehaviorAttributes, ActorBehaviorAttributes__factory, WorldSeasons, 
    WorldSeasons__factory, ActorBornPlaces, ActorBornPlaces__factory, ActorPrelifes, ActorPrelifes__factory, ActorLocations, 
    ActorLocations__factory, WorldVillages, WorldVillages__factory, WorldBuildings, WorldBuildings__factory, ActorRelationship, 
    ActorRelationship__factory, WorldZoneBaseResources, WorldZoneBaseResources__factory, Trigrams, Trigrams__factory, 
    TrigramsRender, TrigramsRender__factory, ShejiTuProxyAdmin__factory, ShejiTuProxy__factory, SifusToken__factory, 
    SifusDescriptor, SifusSeeder, SifusSeeder__factory, WorldNontransferableFungible__factory, WorldNontransferableFungible,
} from '../typechain';
import { BigNumber, BigNumberish, Contract as EthersContract } from 'ethers';
import { initSIDNames } from './initSocialIdentity';
import { deployTalentProcessors, initTalents } from './initTalents';
import { initRelations } from './initRelationship';
import { initItemTypes } from './initItemTypes';
import { initBuildingTypes } from './initBuildingTypes';
import { initEvents } from './initEvents';
import { initTimeline } from './initTimeline';
import { initZones } from './initZones';
import { default as ShejiTuABI } from '../abi/contracts/ShejiTu.sol/ShejiTu.json';
import { Interface } from 'ethers/lib/utils';
import ImageData from '../files/image-data.json';
import { chunkArray } from './chunkArray';

export const deployWorldContractRoute = async (deployer: SignerWithAddress): Promise<WorldContractRoute> => {
    const factory = new WorldContractRoute__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployWorldConstants = async (deployer: SignerWithAddress): Promise<WorldConstants> => {
    const factory = new WorldConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployActorAttributesConstants = async (deployer: SignerWithAddress): Promise<ActorAttributesConstants> => {
    const factory = new ActorAttributesConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployActorCharmAttributesConstants = async (deployer: SignerWithAddress): Promise<ActorCharmAttributesConstants> => {
    const factory = new ActorCharmAttributesConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};
export const deployActorCoreAttributesConstants = async (deployer: SignerWithAddress): Promise<ActorCoreAttributesConstants> => {
    const factory = new ActorCoreAttributesConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};
export const deployActorMoodAttributesConstants = async (deployer: SignerWithAddress): Promise<ActorMoodAttributesConstants> => {
    const factory = new ActorMoodAttributesConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};
export const deployActorBehaviorAttributesConstants = async (deployer: SignerWithAddress): Promise<ActorBehaviorAttributesConstants> => {
    const factory = new ActorBehaviorAttributesConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployActors = async (taiyiDAO: string, mintStart: BigNumberish, coinContract: string,
route: WorldContractRoute, deployer: SignerWithAddress): Promise<Actors> => {
    const factory = new Actors__factory(deployer);
    return (await factory.deploy(taiyiDAO, mintStart, coinContract, route.address)).deployed();
};

export const deployShejiTu = async (route: WorldContractRoute, deployer: SignerWithAddress) => {
    let shejituImpl = await (await (new ShejiTu__factory(deployer)).deploy()).deployed();    
    let shejituProxyAdmin = await (await (new ShejiTuProxyAdmin__factory(deployer)).deploy()).deployed();
    const shejituProxyFactory = new ShejiTuProxy__factory(deployer);
    let shejituProxy = await shejituProxyFactory.deploy(
        shejituImpl.address,
        shejituProxyAdmin.address,
        new Interface(ShejiTuABI).encodeFunctionData('initialize', [
            route.address]));
    return [await shejituProxy.deployed(), shejituProxyAdmin, shejituImpl];
}

export const deployWorldRandom = async (deployer: SignerWithAddress): Promise<WorldRandom> => {
    const factory = new WorldRandom__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployActorAttributes = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorAttributes> => {
    const factory = new ActorAttributes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
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

export const deployAssetDaoli = async (worldConst: WorldConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Daoli", "DAOLI", await worldConst.WORLD_MODULE_COIN(), route.address)).deployed();
};

export const deployAssetFood = async (worldConst: WorldConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Food", "TYFOOD", await worldConst.WORLD_MODULE_FOOD(), route.address)).deployed();
};

export const deployAssetWood = async (worldConst: WorldConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Wood", "TYWOOD", await worldConst.WORLD_MODULE_WOOD(), route.address)).deployed();
};

export const deployAssetGold = async (worldConst: WorldConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Gold", "TYGOLD", await worldConst.WORLD_MODULE_GOLD(), route.address)).deployed();
};

export const deployAssetFabric = async (worldConst: WorldConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Fabric", "TYFABRIC", await worldConst.WORLD_MODULE_FABRIC(), route.address)).deployed();
};

export const deployAssetHerb = async (worldConst: WorldConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Herb", "TYHERB", await worldConst.WORLD_MODULE_HERB(), route.address)).deployed();
};

export const deployAssetPrestige = async (worldConst: WorldConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldNontransferableFungible> => {
    const factory = new WorldNontransferableFungible__factory(deployer);
    return (await factory.deploy("Taiyi Prestige", "TYPRESTIGE", await worldConst.WORLD_MODULE_PRESTIGE(), route.address)).deployed();
};

export const deployActorNames = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorNames> => {
    const factory = new ActorNames__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployActorSocialIdentity = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorSocialIdentity> => {
    const factory = new ActorSocialIdentity__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldItems = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldItems> => {
    const factory = new WorldItems__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldZones = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldZones> => {
    const factory = new WorldZones__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployActorTalents = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorTalents> => {
    const factory = new ActorTalents__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldEvents = async (oneAgeVSecond: number, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldEvents> => {
    console.log(`deploy WorldEvents with oneAgeVSecond=${oneAgeVSecond}`);
    const factory = new WorldEvents__factory(deployer);
    return (await factory.deploy(oneAgeVSecond, route.address)).deployed();
};

export const deployActorPrelifes = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorPrelifes> => {
    const factory = new ActorPrelifes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldSeasons = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldSeasons> => {
    const factory = new WorldSeasons__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployActorBornPlaces = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorBornPlaces> => {
    const factory = new ActorBornPlaces__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployActorLocations = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorLocations> => {
    const factory = new ActorLocations__factory(deployer);
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

export const deployActorRelationship = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorRelationship> => {
    const factory = new ActorRelationship__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldZoneBaseResources = async (zoneResourceGrowTimeDay: number, zoneResourceGrowQuantityScale: number, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldZoneBaseResources> => {
    console.log(`deploy WorldZoneBaseResources with zoneResourceGrowTimeDay=${zoneResourceGrowTimeDay}, zoneResourceGrowQuantityScale=${zoneResourceGrowQuantityScale}`);
    const factory = new WorldZoneBaseResources__factory(deployer);
    return (await factory.deploy(zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, route.address)).deployed();
};

export const deployTrigrams = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<Trigrams> => {
    const factory = new Trigrams__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployTrigramsRender = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<TrigramsRender> => {
    const factory = new TrigramsRender__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deploySifusToken = async (route: WorldContractRoute, taiyiDAO: string, descriptor: string, seeder: string, deployer: SignerWithAddress): Promise<SifusToken> => {
    const factory = new SifusToken__factory(deployer);
    return (await factory.deploy(taiyiDAO, descriptor, seeder, route.address)).deployed();
};

export const deploySifusDescriptor = async (deployer: SignerWithAddress): Promise<SifusDescriptor> => {
    const sifusDescriptorFactory = new SifusDescriptor__factory(deployer);
    return (await sifusDescriptorFactory.deploy()).deployed();
};

export const deploySifusSeeder = async (deployer: SignerWithAddress): Promise<SifusSeeder> => {
    const factory = new SifusSeeder__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const populateDescriptor = async (sifusDescriptor: SifusDescriptor): Promise<void> => {
    const { bgcolors, palette, images } = ImageData;
    const { bodies, accessories, heads, glasses } = images;

    // Split up head and accessory population due to high gas usage
    await Promise.all([
        sifusDescriptor.addManyBackgrounds(bgcolors),
        sifusDescriptor.addManyColorsToPalette(0, palette),
        sifusDescriptor.addManyPart1s(bodies.map(({ data }) => data)),
        chunkArray(accessories, 10).map(chunk =>
            sifusDescriptor.addManyPart2s(chunk.map(({ data }) => data)),
        ),
        chunkArray(heads, 10).map(chunk => sifusDescriptor.addManyPart3s(chunk.map(({ data }) => data))),
        sifusDescriptor.addManyPart4s(glasses.map(({ data }) => data)),
    ]);
};

export type WorldContractName =
    | 'SifusDescriptor'
    | 'SifusSeeder'
    | 'SifusToken'
    | 'WorldConstants'
    | 'ActorAttributesConstants' 
    | 'ActorCharmAttributesConstants' 
    | 'ActorCoreAttributesConstants'
    | 'ActorMoodAttributesConstants' 
    | 'ActorBehaviorAttributesConstants' 
    | 'WorldContractRoute' 
    | 'Actors' 
    | 'WorldRandom' 
    | 'ActorNames' 
    | 'WorldItems' 
    | 'ActorSocialIdentity' 
    | 'WorldZones' 
    | 'Shejitu'
    | 'ShejituProxy'
    | 'ShejituProxyAdmin'
    | 'WorldEvents'
    | 'AssetFood'
    | 'AssetWood'
    | 'AssetGold'
    | 'AssetFabric'
    | 'AssetHerb'
    | 'AssetDaoli'
    | 'AssetPrestige'
    | 'ActorTalents' 
    | 'ActorAttributes' 
    | 'ActorCharmAttributes' 
    | 'ActorCoreAttributes' 
    | 'ActorMoodAttributes'
    | 'ActorBehaviorAttributes' 
    | 'ActorPrelifes' 
    | 'WorldSeasons' 
    | 'ActorBornPlaces' 
    | 'ActorLocations' 
    | 'WorldVillages'
    | 'WorldZoneBaseResources'
    | 'WorldBuildings'
    | 'ActorRelationship'
    | 'Trigrams';

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
    noCastShejitu? : boolean;
};
    
export const deployTaiyiWorld = async (actorMintStart : BigNumberish, oneAgeVSecond : number, actRecoverTimeDay: number, zoneResourceGrowTimeDay : number, zoneResourceGrowQuantityScale: number,
    deployer: SignerWithAddress, operatorDAO: SignerWithAddress, flags?:WorldDeployFlag, verbose?:Boolean): Promise<{
        worldContracts: Record<WorldContractName, WorldContract>,
        eventProcessorAddressBook: {[index: string]:any}
    }> => {
    
    if(verbose) console.log("Deploy Constants...");
    let worldConstants = await deployWorldConstants(deployer);
    let actorAttributesConstants = await deployActorAttributesConstants(deployer);
    let actorCharmAttributesConstants = await deployActorCharmAttributesConstants(deployer);
    let actorCoreAttributesConstants = await deployActorCoreAttributesConstants(deployer);
    let actorMoodAttributesConstants = await deployActorMoodAttributesConstants(deployer);
    let actorBehaviorAttributesConstants = await deployActorBehaviorAttributesConstants(deployer);

    if(verbose) console.log("Deploy WorldContractRoute...");
    let worldContractRoute = await deployWorldContractRoute(deployer);
    //connect route to PanGu's operator
    let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, operatorDAO);

    if(verbose) console.log("Deploy Daoli...");
    let assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);

    if(verbose) console.log("Deploy Actors...");
    let actors = await deployActors(operatorDAO.address, actorMintStart, assetDaoli.address, worldContractRoute, deployer);
    await worldContractRoute.registerActors(actors.address);

    //PanGu should be mint at first, or you can not register any module
    if(verbose) console.log(`Mint PanGu as actor#${await actors.nextActor()}.`);
    //await actors.nextActor() == await worldConstants.ACTOR_PANGU()
    await actors.connect(operatorDAO).mintActor(0);

    if(verbose) console.log("Deploy SifusToken...");
    let sifusDescriptor = await deploySifusDescriptor(deployer);
    let sifusSeeder = await deploySifusSeeder(deployer);
    let sifusToken = await deploySifusToken(worldContractRoute, operatorDAO.address, sifusDescriptor.address, sifusSeeder.address, deployer);
    await populateDescriptor(sifusDescriptor);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_SIFUS(), sifusToken.address);

    if(verbose) console.log("Deploy ActorNames...");
    let actorNames = await deployActorNames(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_NAMES(), actorNames.address);

    if(verbose) console.log("Deploy WorldItems...");
    let worldItems = await deployWorldItems(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ITEMS(), worldItems.address);

    if(verbose) console.log("Deploy ActorSocialIdentity...");
    let actorSIDs = await deployActorSocialIdentity(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_SIDS(), actorSIDs.address);

    if(verbose) console.log("Deploy WorldZones...");
    let worldZones = await deployWorldZones(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ZONES(), worldZones.address);

    if(verbose) console.log("Deploy Shejitu...");
    let shejiTuPkg = await deployShejiTu(worldContractRoute, deployer);
    let shejiTu = ShejiTu__factory.connect(shejiTuPkg[0].address, deployer); //CAST proxy as ShejiTu
    if(verbose) console.log(`Mint Shejitu YeMing as actor#${await shejiTu.operator()}.`);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TIMELINE(), shejiTu.address);
    await routeByPanGu.setYeMing(await shejiTu.operator(), shejiTu.address);

    //deploy actor attributes
    if(verbose) console.log("Deploy Actor Attributes...");
    let actorAttributes = await deployActorAttributes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address);
    await shejiTu.connect(operatorDAO).registerAttributeModule(actorAttributes.address);
    let actorCharmAttributes = await deployActorCharmAttributes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_CHARM_ATTRIBUTES(), actorCharmAttributes.address);
    await shejiTu.connect(operatorDAO).registerAttributeModule(actorCharmAttributes.address);
    let actorCoreAttributes = await deployActorCoreAttributes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_CORE_ATTRIBUTES(), actorCoreAttributes.address);
    await shejiTu.connect(operatorDAO).registerAttributeModule(actorCoreAttributes.address);
    let actorMoodAttributes = await deployActorMoodAttributes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_MOOD_ATTRIBUTES(), actorMoodAttributes.address);
    await shejiTu.connect(operatorDAO).registerAttributeModule(actorMoodAttributes.address);
    let actorBehaviorAttributes = await deployActorBehaviorAttributes(actRecoverTimeDay, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES(), actorBehaviorAttributes.address);
    await shejiTu.connect(operatorDAO).registerAttributeModule(actorBehaviorAttributes.address);

    //deploy assets
    if(verbose) console.log("Deploy Assets...");
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);
    let assetFood = await deployAssetFood(worldConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_FOOD(), assetFood.address);
    let assetWood = await deployAssetWood(worldConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_WOOD(), assetWood.address);
    let assetGold = await deployAssetGold(worldConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_GOLD(), assetGold.address);
    let assetFabric = await deployAssetFabric(worldConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_FABRIC(), assetFabric.address);
    let assetHerb = await deployAssetHerb(worldConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_HERB(), assetHerb.address);
    let assetPrestige = await deployAssetPrestige(worldConstants, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_PRESTIGE(), assetPrestige.address);

    if(verbose) console.log("Deploy World Modules...");
    let worldRandom = await deployWorldRandom(deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address);
    let actorTalents = await deployActorTalents(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TALENTS(), actorTalents.address);
    let actorPrelifes = await deployActorPrelifes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_PRELIFES(), actorPrelifes.address);
    let worldSeasons = await deployWorldSeasons(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_SEASONS(), worldSeasons.address);
    let actorBornPlaces = await deployActorBornPlaces(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_BORN_PLACES(), actorBornPlaces.address);
    let actorLocations = await deployActorLocations(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ACTOR_LOCATIONS(), actorLocations.address);
    let worldVillages = await deployWorldVillages(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_VILLAGES(), worldVillages.address);
    let worldBuildings = await deployWorldBuildings(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_BUILDINGS(), worldBuildings.address);
    let worldEvents = await deployWorldEvents(oneAgeVSecond, routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_EVENTS(), worldEvents.address);
    let actorRelationships = await deployActorRelationship(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RELATIONSHIP(), actorRelationships.address);
    let worldZoneBaseResources = await deployWorldZoneBaseResources(zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, routeByPanGu, deployer);
    if(verbose) console.log(`Mint GuanGong as actor#${await worldZoneBaseResources.ACTOR_GUANGONG()}.`);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ZONE_BASE_RESOURCES(), worldZoneBaseResources.address);
    let trigrams = await deployTrigrams(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TRIGRAMS(), trigrams.address);
    let trigramsRender = await deployTrigramsRender(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TRIGRAMS_RENDER(), trigramsRender.address);

    //render modules
    await actors.connect(operatorDAO).setRenderModule(1, trigramsRender.address);

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
        await initTalents(actorTalents.address, operatorDAO, worldConstants, actorAttributesConstants, actorCharmAttributesConstants, actorCoreAttributesConstants, actorMoodAttributesConstants);
    }

    //deploy talent processors
    if(flags?.noTalentProcessors)
        null;
    else {
        if(verbose) console.log("Initialize Talent Processors...");
        await deployTalentProcessors(actorTalents.address, operatorDAO, worldContractRoute, deployer);
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
        _eventProcessorAddressBook = await initEvents(worldContractRoute, worldEvents.address, operatorDAO, deployer);
    }

    //init timeline events
    if(flags?.noTimelineEvents)
        null;
    else {
        if(verbose) console.log("Initialize Global Timeline...");
        await initTimeline(shejiTu.address, operatorDAO);
    }

    //init zones
    if(flags?.noZones)
        null;
    else {
        if(verbose) console.log("Initialize Zones...");
        await actors.connect(operatorDAO).approve(shejiTu.address, await worldConstants.ACTOR_PANGU());
        await initZones(worldConstants, shejiTu.address, operatorDAO);
    }

    let contracts: Record<WorldContractName, WorldContract> = {        
        WorldConstants: {instance: worldConstants},
        ActorAttributesConstants: {instance: actorAttributesConstants},
        ActorCharmAttributesConstants: {instance: actorCharmAttributesConstants},
        ActorCoreAttributesConstants: {instance: actorCoreAttributesConstants},
        ActorMoodAttributesConstants: {instance: actorMoodAttributesConstants},
        ActorBehaviorAttributesConstants: {instance: actorBehaviorAttributesConstants},
        WorldContractRoute: {instance: worldContractRoute},
        Actors: {instance: actors},
        WorldRandom: {instance: worldRandom},
        ActorNames: {instance: actorNames},
        WorldItems: {instance: worldItems},
        ActorSocialIdentity: {instance: actorSIDs},
        WorldZones: {instance: worldZones},
        ShejituProxy: {instance: shejiTuPkg[0]},
        ShejituProxyAdmin: {instance: shejiTuPkg[1]},
        Shejitu: {instance: flags?.noCastShejitu ? shejiTuPkg[2] : shejiTu},
        WorldEvents: {instance: worldEvents},
        AssetFood: {instance: assetFood},
        AssetWood: {instance: assetWood},
        AssetGold: {instance: assetGold},
        AssetFabric: {instance: assetFabric},
        AssetHerb: {instance: assetHerb},
        AssetDaoli: {instance: assetDaoli},
        AssetPrestige: {instance: assetPrestige},
        ActorTalents: {instance: actorTalents},
        ActorAttributes: {instance: actorAttributes},
        ActorCharmAttributes: {instance: actorCharmAttributes},
        ActorCoreAttributes: {instance: actorCoreAttributes},
        ActorMoodAttributes: {instance: actorMoodAttributes},
        ActorBehaviorAttributes: {instance: actorBehaviorAttributes},
        ActorPrelifes: {instance: actorPrelifes},
        WorldSeasons: {instance: worldSeasons},
        ActorBornPlaces: {instance: actorBornPlaces},
        ActorLocations: {instance: actorLocations},
        WorldVillages: {instance: worldVillages},
        WorldBuildings: {instance: worldBuildings},
        WorldZoneBaseResources: {instance: worldZoneBaseResources},
        ActorRelationship: {instance: actorRelationships},
        Trigrams: {instance: trigrams},
        SifusDescriptor: {instance: sifusDescriptor},
        SifusSeeder: {instance: sifusSeeder},
        SifusToken: {instance: sifusToken},
    };

    return { worldContracts: contracts, eventProcessorAddressBook: _eventProcessorAddressBook};
};
