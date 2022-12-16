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
    SifusSeeder__factory, WorldYemings, WorldYemings__factory, AssetDaoli__factory, AssetDaoli
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
    let shejituProxy = await shejituProxyFactory.deploy(
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
            random.address]));
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
    | 'Trigrams';

export interface WorldContract {
    instance: EthersContract;
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

    if(verbose) console.log("Deploy Actors...");
    let actors = await deployActors(operatorDAO.address, actorMintStart, assetDaoli.address, worldContractRoute, deployer);
    await worldContractRoute.registerActors(actors.address);

    //PanGu should be mint at first, or you can not register any module
    if(verbose) console.log(`Mint PanGu as actor#${await actors.nextActor()}.`);
    //await actors.nextActor() == await worldConstants.ACTOR_PANGU()
    await actors.connect(operatorDAO).mintActor(0);

    //Register Daoli
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_COIN(), assetDaoli.address);

    if(verbose) console.log("Deploy SifusToken...");
    let sifusDescriptor = await deploySifusDescriptor(deployer);
    let sifusSeeder = await deploySifusSeeder(deployer);
    let sifusToken = await deploySifusToken(worldContractRoute, operatorDAO.address, sifusDescriptor.address, sifusSeeder.address, deployer);
    await populateDescriptor(sifusDescriptor);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_SIFUS(), sifusToken.address);

    if(verbose) console.log("Deploy WorldRandom...");
    let worldRandom = await deployWorldRandom(deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address);

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

    if(verbose) console.log("Deploy WorldYemings...");
    let worldYemings = await deployWorldYemings(operatorDAO.address, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address);

    if(verbose) console.log("Deploy Actor Attributes...");
    let actorAttributes = await deployActorAttributes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address);

    if(verbose) console.log("Deploy ActorLocations...");
    let actorLocations = await deployActorLocations(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ACTOR_LOCATIONS(), actorLocations.address);

    if(verbose) console.log("Deploy Prelifes...");
    let actorPrelifes = await deployActorPrelifes(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_PRELIFES(), actorPrelifes.address);

    if(verbose) console.log("Deploy Trigrams...");
    let trigrams = await deployTrigrams(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TRIGRAMS(), trigrams.address);
    let trigramsRender = await deployTrigramsRender(routeByPanGu, deployer);
    await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TRIGRAMS_RENDER(), trigramsRender.address);

    //render modules
    await actors.connect(operatorDAO).setRenderModule(1, trigramsRender.address);

    let contracts: Record<TaiyiContractName, WorldContract> = {        
        WorldConstants: {instance: worldConstants},
        WorldContractRoute: {instance: worldContractRoute},
        Actors: {instance: actors},
        WorldRandom: {instance: worldRandom},
        ActorNames: {instance: actorNames},
        WorldYemings: {instance: worldYemings},
        WorldItems: {instance: worldItems},
        ActorSocialIdentity: {instance: actorSIDs},
        WorldZones: {instance: worldZones},
        AssetDaoli: {instance: assetDaoli},
        ActorAttributes: {instance: actorAttributes},
        ActorPrelifes: {instance: actorPrelifes},
        ActorLocations: {instance: actorLocations},
        Trigrams: {instance: trigrams},
        SifusDescriptor: {instance: sifusDescriptor},
        SifusSeeder: {instance: sifusSeeder},
        SifusToken: {instance: sifusToken},
    };

    return contracts;
};
