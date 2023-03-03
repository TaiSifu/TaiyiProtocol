import { ActorSocialIdentity } from '@taiyi/contracts/dist/typechain';
import { Signer } from 'ethers';
export declare function setSIDNames(sids: ActorSocialIdentity, names: any): Promise<void>;
export declare function initSIDNames(sidsAddress: string, operator: Signer): Promise<void>;
