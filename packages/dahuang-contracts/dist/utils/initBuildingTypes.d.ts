import { WorldBuildings } from '../typechain';
import { Signer } from 'ethers';
export declare function addBuildingTypes(buildings: WorldBuildings, _types: any): Promise<void>;
export declare function initBuildingTypes(buildingsAddress: string, operator: Signer): Promise<void>;
