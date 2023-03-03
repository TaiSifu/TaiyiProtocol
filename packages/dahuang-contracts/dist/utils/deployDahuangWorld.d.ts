import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract as EthersContract } from 'ethers';
import { ActorCharmAttributes, ActorCoreAttributes, ActorMoodAttributes, ActorBehaviorAttributes, WorldSeasons, DahuangConstants, WorldVillages, WorldBuildings, WorldZoneBaseResources, WorldDeadActors, ActorsGender, ActorBornFamilies } from '../typechain';
import { WorldConstants, WorldContractRoute, WorldFungible, Actors, ActorLocations, Trigrams, WorldRandom, WorldZones, ActorAttributes, WorldItems, WorldNontransferableFungible, WorldYemings, ActorSocialIdentity } from '@taiyi/contracts/dist/typechain';
export declare const deployDahuangConstants: (deployer: SignerWithAddress) => Promise<DahuangConstants>;
export declare const deployAssetFood: (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldFungible>;
export declare const deployAssetWood: (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldFungible>;
export declare const deployAssetGold: (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldFungible>;
export declare const deployAssetFabric: (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldFungible>;
export declare const deployAssetHerb: (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldFungible>;
export declare const deployAssetPrestige: (worldConst: DahuangConstants, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldNontransferableFungible>;
export declare const deployActorCharmAttributes: (route: WorldContractRoute, deployer: SignerWithAddress) => Promise<ActorCharmAttributes>;
export declare const deployActorCoreAttributes: (route: WorldContractRoute, deployer: SignerWithAddress) => Promise<ActorCoreAttributes>;
export declare const deployActorMoodAttributes: (route: WorldContractRoute, deployer: SignerWithAddress) => Promise<ActorMoodAttributes>;
export declare const deployActorBehaviorAttributes: (actRecoverTimeDay: number, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<ActorBehaviorAttributes>;
export declare const deployWorldSeasons: (route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldSeasons>;
export declare const deployWorldVillages: (route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldVillages>;
export declare const deployWorldBuildings: (route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldBuildings>;
export declare const deployWorldZoneBaseResources: (zoneResourceGrowTimeDay: number, zoneResourceGrowQuantityScale: number, route: WorldContractRoute, deployer: SignerWithAddress, isTest?: boolean) => Promise<WorldZoneBaseResources>;
export declare const deployWorldDeadActors: (route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldDeadActors>;
export declare const deployActorsGender: (route: WorldContractRoute, deployer: SignerWithAddress) => Promise<ActorsGender>;
export declare const deployActorBornFamilies: (route: WorldContractRoute, deployer: SignerWithAddress) => Promise<ActorBornFamilies>;
export type DahuangContractName = 'DahuangConstants' | 'ShejiTu' | 'ShejiTuProxy' | 'ShejiTuProxyAdmin' | 'WorldEvents' | 'AssetFood' | 'AssetWood' | 'AssetGold' | 'AssetFabric' | 'AssetHerb' | 'AssetPrestige' | 'ActorTalents' | 'ActorCharmAttributes' | 'ActorCoreAttributes' | 'ActorMoodAttributes' | 'ActorBehaviorAttributes' | 'WorldSeasons' | 'ActorBornPlaces' | 'WorldVillages' | 'WorldZoneBaseResources' | 'WorldBuildings' | 'ActorRelationship' | 'WorldDeadActors' | 'ActorsGender' | 'ActorBornFamilies' | 'WorldStorylines' | 'ParameterizedStorylines' | 'GlobalStoryRegistry';
export interface WorldContract {
    instance: EthersContract;
    constructorArguments?: (string | number)[];
    libraries?: () => Record<string, string>;
}
export interface WorldDeployFlag {
    noSIDNames?: boolean;
    noTalents?: boolean;
    noTalentProcessors?: boolean;
    noRelations?: boolean;
    noItemTypes?: boolean;
    noBuildingTypes?: boolean;
    noEventProcessors?: boolean;
    noTimelineEvents?: boolean;
    noZones?: boolean;
    isTest?: boolean;
}
export declare const deployDahuangWorld: (oneAgeVSecond: number, actRecoverTimeDay: number, zoneResourceGrowTimeDay: number, zoneResourceGrowQuantityScale: number, route: WorldContractRoute, worldConstants: WorldConstants, actors: Actors, locations: ActorLocations, yemings: WorldYemings, zones: WorldZones, attributes: ActorAttributes, trigrams: Trigrams, random: WorldRandom, worldItems: WorldItems, actorSIDs: ActorSocialIdentity, deployer: SignerWithAddress, operatorDAO: SignerWithAddress, flags?: WorldDeployFlag, verbose?: Boolean) => Promise<{
    worldContracts: Record<DahuangContractName, WorldContract>;
    eventProcessorAddressBook: {
        [index: string]: any;
    };
}>;
