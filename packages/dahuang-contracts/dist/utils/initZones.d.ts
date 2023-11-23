import { WorldConstants, ShejiTu } from '@taiyi/contracts/dist/typechain';
import { Signer } from 'ethers';
export declare function addZones(timeline: ShejiTu, _zones: any): Promise<void>;
export declare function initZones(worldConst: WorldConstants, timelineAddress: string, operator: Signer): Promise<void>;
