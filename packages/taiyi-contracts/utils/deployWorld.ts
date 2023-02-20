import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    ActorAttributes, ActorAttributes__factory, ShejiTu__factory, SifusToken,
    ActorNames, ActorNames__factory, Actors, Actors__factory, ActorSocialIdentity, ActorSocialIdentity__factory,        
    WorldConstants, WorldConstants__factory, WorldContractRoute, WorldContractRoute__factory, WorldRandom, WorldRandom__factory, 
    WorldItems, WorldItems__factory, WorldZones, WorldZones__factory, WorldEvents, WorldEvents__factory, 
    SifusDescriptor__factory, ActorTalents, ActorTalents__factory, ActorBornPlaces, ActorBornPlaces__factory, 
    ActorPrelifes, ActorPrelifes__factory, ActorLocations, ActorLocations__factory, ActorRelationship, 
    ActorRelationship__factory, Trigrams, Trigrams__factory, TrigramsRender, TrigramsRender__factory, 
    ShejiTuProxyAdmin__factory, ShejiTuProxy__factory, SifusToken__factory, SifusDescriptor, SifusSeeder, 
    SifusSeeder__factory, WorldYemings, WorldYemings__factory, AssetDaoli__factory, AssetDaoli, WorldStorylines, WorldStorylines__factory, ParameterizedStorylines, ParameterizedStorylines__factory, GlobalStoryRegistry, GlobalStoryRegistry__factory, NameGenerator, NameGenerator__factory,
} from '../typechain';
import { BigNumberish, Contract as EthersContract } from 'ethers';
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

export const deployWorldYemings = async (taiyiDAO: string, deployer: SignerWithAddress): Promise<WorldYemings> => {
    const factory = new WorldYemings__factory(deployer);
    return (await factory.deploy(taiyiDAO)).deployed();
};

export const deployActors = async (taiyiDAO: string, mintStart: BigNumberish, coinContract: string,
route: WorldContractRoute, deployer: SignerWithAddress): Promise<Actors> => {
    const factory = new Actors__factory(deployer);
    return (await factory.deploy(taiyiDAO, mintStart, coinContract)).deployed();
};

export const deployShejiTu = async (name: string, desc: string, moduleID: BigNumberish, actors: Actors, locations: ActorLocations,
    zones: WorldZones, attributes: ActorAttributes, evts: WorldEvents, talents: ActorTalents, trigrams: Trigrams,
    random: WorldRandom, deployer: SignerWithAddress) => {
    let shejituImpl = await (await (new ShejiTu__factory(deployer)).deploy()).deployed();    
    let shejituProxyAdmin = await (await (new ShejiTuProxyAdmin__factory(deployer)).deploy()).deployed();
    const shejituProxyFactory = new ShejiTuProxy__factory(deployer);
    let shejituProxyArgs = [
        shejituImpl.address,
        shejituProxyAdmin.address,
        new Interface(ShejiTuABI).encodeFunctionData('initialize', [
            name, desc, moduleID,
            actors.address,
            locations.address,
            zones.address,
            attributes.address,
            evts.address,
            talents.address,
            trigrams.address,
            random.address])];
    let shejituProxy = await shejituProxyFactory.deploy(shejituProxyArgs[0], shejituProxyArgs[1], shejituProxyArgs[2]);
    return [await shejituProxy.deployed(), shejituProxyAdmin, shejituImpl, shejituProxyArgs];
}

export const deployWorldRandom = async (deployer: SignerWithAddress): Promise<WorldRandom> => {
    const factory = new WorldRandom__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployActorAttributes = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorAttributes> => {
    const factory = new ActorAttributes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployAssetDaoli = async (worldConst: WorldConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<AssetDaoli> => {
    const factory = new AssetDaoli__factory(deployer);
    return (await factory.deploy("Taiyi Daoli", "DAOLI", await worldConst.WORLD_MODULE_COIN(), route.address)).deployed();
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

export const deployActorTalents = async (moduleId: BigNumberish, route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorTalents> => {
    const factory = new ActorTalents__factory(deployer);
    return (await factory.deploy(route.address, moduleId)).deployed();
};

export const deployWorldEvents = async (oneAgeVSecond: number, moduleId: BigNumberish, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldEvents> => {
    console.log(`deploy WorldEvents with oneAgeVSecond=${oneAgeVSecond}`);
    const factory = new WorldEvents__factory(deployer);
    return (await factory.deploy(oneAgeVSecond, route.address, moduleId)).deployed();
};

export const deployActorPrelifes = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorPrelifes> => {
    const factory = new ActorPrelifes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployActorBornPlaces = async (moduleId: BigNumberish, route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorBornPlaces> => {
    const factory = new ActorBornPlaces__factory(deployer);
    return (await factory.deploy(route.address, moduleId)).deployed();
};

export const deployActorLocations = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorLocations> => {
    const factory = new ActorLocations__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployActorRelationship = async (moduleId:BigNumberish, route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorRelationship> => {
    const factory = new ActorRelationship__factory(deployer);
    return (await factory.deploy(route.address, moduleId)).deployed();
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

export const deployWorldStorylines = async (moduleId: BigNumberish, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldStorylines> => {
    const factory = new WorldStorylines__factory(deployer);
    return (await factory.deploy(route.address, moduleId)).deployed();
};

export const deployParameterizedStorylines = async (moduleId: BigNumberish, route: WorldContractRoute, deployer: SignerWithAddress): Promise<ParameterizedStorylines> => {
    const factory = new ParameterizedStorylines__factory(deployer);
    return (await factory.deploy(route.address, moduleId)).deployed();
};

export const deployGlobalStoryRegistry = async (moduleId: BigNumberish, route: WorldContractRoute, deployer: SignerWithAddress): Promise<GlobalStoryRegistry> => {
    const factory = new GlobalStoryRegistry__factory(deployer);
    return (await factory.deploy(route.address, moduleId)).deployed();
};

export const deployNameGenerator = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<NameGenerator> => {
    const factory = new NameGenerator__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export type TaiyiContractName =
    | 'SifusDescriptor'
    | 'SifusSeeder'
    | 'SifusToken'
    | 'WorldConstants'
    | 'WorldContractRoute' 
    | 'Actors' 
    | 'WorldRandom' 
    | 'ActorNames' 
    | 'WorldYemings'
    | 'WorldItems' 
    | 'ActorSocialIdentity' 
    | 'WorldZones' 
    | 'AssetDaoli'
    | 'ActorAttributes' 
    | 'ActorPrelifes' 
    | 'ActorLocations' 
    | 'Trigrams'
    | 'TrigramsRender'
    | 'NameGenerator';

export interface WorldContract {
    instance: EthersContract;
    constructorArguments?: (string | number)[];
    libraries?: () => Record<string, string>;
};
    
export const deployTaiyiWorld = async (actorMintStart : BigNumberish, deployer: SignerWithAddress,
    operatorDAO: SignerWithAddress, verbose?:Boolean): Promise<Record<TaiyiContractName, WorldContract>> => {
    
    if(verbose) console.log("Deploy Constants...");
    let worldConstants = await deployWorldConstants(deployer);

    if(verbose) console.log("Deploy WorldContractRoute...");
    let worldContractRoute = await deployWorldContractRoute(deployer);
    //connect route to PanGu's operator
    let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, operatorDAO);

    if(verbose) console.log("Deploy Daoli...");
    let assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);
    let assetDaoliArg = ["Taiyi Daoli", "DAOLI", (await worldConstants.WORLD_MODULE_COIN()).toNumber(), worldContractRoute.address];

    if(verbose) console.log(`Deploy Actors...(mintstart=${actorMintStart.toString()})`);
    let actors = await deployActors(operatorDAO.address, actorMintStart, assetDaoli.address, worldContractRoute, deployer);
    let actorsArg = [operatorDAO.address, Number(actorMintStart), assetDaoli.address];
    await (await worldContractRoute.registerActors(actors.address)).wait();

    //PanGu should be mint at first, or you can not register any module
    if(verbose) console.log(`Mint PanGu as actor#${await actors.nextActor()}.`);
    //await actors.nextActor() == await worldConstants.ACTOR_PANGU()
    await (await actors.connect(operatorDAO).mintActor(0)).wait();

    //Register Daoli
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address)).wait();

    if(verbose) console.log("Deploy SifusToken...");
    let sifusDescriptor = await deploySifusDescriptor(deployer);    
    let sifusSeeder = await deploySifusSeeder(deployer);
    let sifusToken = await deploySifusToken(worldContractRoute, operatorDAO.address, sifusDescriptor.address, sifusSeeder.address, deployer);
    let sifusTokenArg = [operatorDAO.address, sifusDescriptor.address, sifusSeeder.address, worldContractRoute.address];
    //await populateDescriptor(sifusDescriptor);
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_SIFUS(), sifusToken.address)).wait();

    if(verbose) console.log("Deploy WorldRandom...");
    let worldRandom = await deployWorldRandom(deployer);
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address)).wait();

    if(verbose) console.log("Deploy ActorNames...");
    let actorNames = await deployActorNames(routeByPanGu, deployer);
    let actorNamesArg = [routeByPanGu.address];
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_NAMES(), actorNames.address)).wait();

    if(verbose) console.log("Deploy WorldItems...");
    let worldItems = await deployWorldItems(routeByPanGu, deployer);
    let worldItemsArg = [routeByPanGu.address];
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ITEMS(), worldItems.address)).wait();

    if(verbose) console.log("Deploy ActorSocialIdentity...");
    let actorSIDs = await deployActorSocialIdentity(routeByPanGu, deployer);
    let actorSIDsArg = [routeByPanGu.address];
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_SIDS(), actorSIDs.address)).wait();

    if(verbose) console.log("Deploy WorldZones...");
    let worldZones = await deployWorldZones(routeByPanGu, deployer);
    let worldZonesArg = [routeByPanGu.address];
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ZONES(), worldZones.address)).wait();

    if(verbose) console.log("Deploy WorldYemings...");
    let worldYemings = await deployWorldYemings(operatorDAO.address, deployer);
    let worldYemingsArg = [operatorDAO.address];
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address)).wait();

    if(verbose) console.log("Deploy Actor Attributes...");
    let actorAttributes = await deployActorAttributes(routeByPanGu, deployer);
    let actorAttributesArg = [routeByPanGu.address];
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address)).wait();

    if(verbose) console.log("Deploy ActorLocations...");
    let actorLocations = await deployActorLocations(routeByPanGu, deployer);
    let actorLocationsArg = [routeByPanGu.address];
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ACTOR_LOCATIONS(), actorLocations.address)).wait();

    if(verbose) console.log("Deploy Prelifes...");
    let actorPrelifes = await deployActorPrelifes(routeByPanGu, deployer);
    let actorPrelifesArg = [routeByPanGu.address];
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_PRELIFES(), actorPrelifes.address)).wait();

    if(verbose) console.log("Deploy Trigrams...");
    let trigrams = await deployTrigrams(routeByPanGu, deployer);
    let trigramsArg = [routeByPanGu.address];
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TRIGRAMS(), trigrams.address)).wait();
    if(verbose) console.log("Deploy TrigramsRender...");
    let trigramsRender = await deployTrigramsRender(routeByPanGu, deployer);
    let trigramsRenderArg = [routeByPanGu.address];
    await (await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TRIGRAMS_RENDER(), trigramsRender.address)).wait();

    if(verbose) console.log("Deploy NameGenerator...");
    let nameGenerator = await deployNameGenerator(routeByPanGu, deployer);
    let nameGeneratorArg = [routeByPanGu.address];
    await (await routeByPanGu.registerModule(225, nameGenerator.address)).wait();

    //render modules
    await (await actors.connect(operatorDAO).setRenderModule(1, trigramsRender.address)).wait();
    if(verbose) console.log("Taiyi Base Contracts Deployment Done.");

    let contracts: Record<TaiyiContractName, WorldContract> = {        
        WorldConstants: {instance: worldConstants},
        WorldContractRoute: {instance: worldContractRoute},
        Actors: {instance: actors, constructorArguments: actorsArg},
        WorldRandom: {instance: worldRandom},
        ActorNames: {instance: actorNames, constructorArguments: actorNamesArg},
        WorldYemings: {instance: worldYemings, constructorArguments: worldYemingsArg},
        WorldItems: {instance: worldItems, constructorArguments: worldItemsArg},
        ActorSocialIdentity: {instance: actorSIDs, constructorArguments: actorSIDsArg},
        WorldZones: {instance: worldZones, constructorArguments: worldZonesArg},
        AssetDaoli: {instance: assetDaoli, constructorArguments: assetDaoliArg},
        ActorAttributes: {instance: actorAttributes, constructorArguments: actorAttributesArg},
        ActorPrelifes: {instance: actorPrelifes, constructorArguments: actorPrelifesArg},
        ActorLocations: {instance: actorLocations, constructorArguments: actorLocationsArg},
        Trigrams: {instance: trigrams, constructorArguments: trigramsArg},
        SifusDescriptor: {instance: sifusDescriptor},
        SifusSeeder: {instance: sifusSeeder},
        SifusToken: {instance: sifusToken, constructorArguments: sifusTokenArg},
        TrigramsRender: {instance: trigramsRender, constructorArguments: trigramsRenderArg},
        NameGenerator: {instance: nameGenerator, constructorArguments: nameGeneratorArg},
    };

    return contracts;
};
