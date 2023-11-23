import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ActorXumiAttributes, XumiConstants } from '../typechain';
import { WorldContract } from '@taiyi/contracts/dist/utils';
import { WorldConstants, WorldContractRoute, WorldFungible, Actors, ActorLocations, Trigrams, WorldRandom, WorldZones, ActorAttributes, WorldItems } from '@taiyi/contracts/dist/typechain';
export declare const deployXumiConstants: (deployer: SignerWithAddress) => Promise<XumiConstants>;
export declare const deployAssetEnergy: (worldConst: XumiConstants, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldFungible>;
export declare const deployAssetElementH: (worldConst: XumiConstants, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<WorldFungible>;
export declare const deployActorXumiAttributes: (route: WorldContractRoute, deployer: SignerWithAddress) => Promise<ActorXumiAttributes>;
export type XumiContractName = 'XumiConstants' | 'ActorXumiAttributes' | 'XumiProxy' | 'XumiProxyAdmin' | 'Xumi' | 'ActorTalents' | 'WorldEvents' | 'ActorBornPlaces' | 'AssetEnergy' | 'AssetElementH' | 'ActorRelationship';
export interface XumiWorldDeployFlag {
    noSIDNames?: boolean;
    noTalents?: boolean;
    noTalentProcessors?: boolean;
    noRelations?: boolean;
    noItemTypes?: boolean;
    noBuildingTypes?: boolean;
    noEventProcessors?: boolean;
    noTimelineEvents?: boolean;
    noZones?: boolean;
}
export declare const deployXumiWorld: (oneAgeVSecond: number, route: WorldContractRoute, worldConstants: WorldConstants, actors: Actors, locations: ActorLocations, zones: WorldZones, attributes: ActorAttributes, trigrams: Trigrams, random: WorldRandom, worldItems: WorldItems, deployer: SignerWithAddress, operatorDAO: SignerWithAddress, flags?: XumiWorldDeployFlag, verbose?: Boolean) => Promise<{
    worldContracts: Record<XumiContractName, WorldContract>;
    eventProcessorAddressBook: {
        [index: string]: any;
    };
}>;
