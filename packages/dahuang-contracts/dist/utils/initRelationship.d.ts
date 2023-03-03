import { ActorRelationship } from '@taiyi/contracts/dist/typechain';
import { Signer } from 'ethers';
export declare function addRelations(relationship: ActorRelationship, _relations: any): Promise<void>;
export declare function initRelations(relationshipAddress: string, operator: Signer): Promise<void>;
