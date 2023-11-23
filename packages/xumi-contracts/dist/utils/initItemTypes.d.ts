import { WorldItems } from '@taiyi/contracts/dist/typechain';
import { Signer } from 'ethers';
export declare function addItemTypes(items: WorldItems, _types: any): Promise<void>;
export declare function initItemTypes(itemsAddress: string, operator: Signer): Promise<void>;
