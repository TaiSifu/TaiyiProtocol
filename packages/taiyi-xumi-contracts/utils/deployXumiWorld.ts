import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, BigNumberish, Contract as EthersContract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import { chunkArray } from '@taiyi/contracts/utils/chunkArray';
import { 
    ActorXumiAttributes,
    ActorXumiAttributes__factory,
    XumiConstants, XumiConstants__factory 
} from '../typechain';
import { WorldContract } from '@taiyi/contracts/dist/utils';
import { deployTalentProcessors, initTalents } from './initTalents';
import { initItemTypes } from './initItemTypes';
import { initEvents } from './initEvents';
import { initTimeline } from './initTimeline';
import {
    WorldConstants, WorldContractRoute, WorldFungible, 
    WorldFungible__factory, Actors, ActorLocations, Trigrams, WorldRandom, WorldYemings, WorldZones,
    ActorTalents, ActorAttributes, WorldItems, WorldEvents, ShejiTu__factory
} from '@taiyi/contracts/dist/typechain';
import { deployShejiTu } from '@taiyi/contracts/dist/utils';

export const deployXumiConstants = async (deployer: SignerWithAddress): Promise<XumiConstants> => {
    const factory = new XumiConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployAssetEnergy = async (worldConst: XumiConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Xumi Energy", "XMENERGY", await worldConst.WORLD_MODULE_XUMI_ENERGY(), route.address)).deployed();
};

export const deployAssetElementH = async (worldConst: XumiConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Xumi Element H", "XMH", await worldConst.WORLD_MODULE_XUMI_ELEMENT_H(), route.address)).deployed();
};

export const deployActorXumiAttributes = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorXumiAttributes> => {
    const factory = new ActorXumiAttributes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export type XumiContractName =
    | 'XumiConstants'
    | 'ActorXumiAttributes'
    | 'XumiProxy'
    | 'XumiProxyAdmin'
    | 'Xumi'
    | 'AssetEnergy'
    | 'AssetElementH';

export interface XumiWorldDeployFlag {
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
    
export const deployXumiWorld = async (route: WorldContractRoute, worldConstants: WorldConstants, 
    actors: Actors, locations: ActorLocations,
    zones: WorldZones, attributes: ActorAttributes, talents: ActorTalents, trigrams: Trigrams,
    random: WorldRandom, worldItems: WorldItems, worldEvents: WorldEvents,
    deployer: SignerWithAddress, operatorDAO: SignerWithAddress, flags?:XumiWorldDeployFlag, verbose?:Boolean): Promise<{
        worldContracts: Record<XumiContractName, WorldContract>,
        eventProcessorAddressBook: {[index: string]:any}
    }> => {
    
    if(verbose) console.log("Deploy Constants...");
    let xumiConstants = await deployXumiConstants(deployer);

    //deploy actor attributes
    if(verbose) console.log("Deploy Actor Attributes...");
    let actorXumiAttributes = await deployActorXumiAttributes(route, deployer);
    await route.connect(operatorDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES(), actorXumiAttributes.address);

    //deploy assets
    if(verbose) console.log("Deploy Assets...");
    let assetEnergy = await deployAssetEnergy(xumiConstants, route, deployer);
    await route.connect(operatorDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_ENERGY(), assetEnergy.address);
    let assetElementH = await deployAssetElementH(xumiConstants, route, deployer);
    await route.connect(operatorDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_ELEMENT_H(), assetElementH.address);

    if(verbose) console.log("Deploy Xumi...");
    let xumiPkg = await deployShejiTu("须弥", "所在时间线：须弥", await xumiConstants.WORLD_MODULE_XUMI_TIMELINE(), 
        actors, locations, zones, attributes,
        worldEvents, talents, trigrams, random, deployer);
    let xumi = ShejiTu__factory.connect(xumiPkg[0].address, deployer); //CAST proxy as ShejiTu
    await route.connect(operatorDAO).registerModule(await xumiConstants.WORLD_MODULE_XUMI_TIMELINE(), xumi.address);
    await xumi.registerAttributeModule(actorXumiAttributes.address);

    //init talents
    if(flags?.noTalents)
        null;
    else {
        if(verbose) console.log("Initialize Talents...");
        await initTalents(talents.address, operatorDAO, xumiConstants, worldConstants);
    }

    //deploy talent processors
    if(flags?.noTalentProcessors)
        null;
    else {
        if(verbose) console.log("Initialize Talent Processors...");
        await deployTalentProcessors(talents.address, operatorDAO, route, deployer);
    }

    //init item types
    if(flags?.noItemTypes)
        null;
    else {
        if(verbose) console.log("Initialize Item Types...");
        await initItemTypes(worldItems.address, operatorDAO);
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
        await initTimeline(xumi.address, deployer);
    }

    let contracts: Record<XumiContractName, WorldContract> = {        
        XumiConstants: {instance: xumiConstants},
        XumiProxy: {instance: xumiPkg[0]},
        XumiProxyAdmin: {instance: xumiPkg[1]},
        Xumi: {instance: xumiPkg[2]},
        AssetEnergy: {instance: assetEnergy},
        AssetElementH: {instance: assetElementH},
        ActorXumiAttributes: {instance: actorXumiAttributes},
    };

    return { worldContracts: contracts, eventProcessorAddressBook: _eventProcessorAddressBook};
};
