import { ShejiTu } from '@taiyi/contracts/dist/typechain';
import { BigNumber, Signer } from 'ethers';
export declare function addTimeline(timeline: ShejiTu, age: BigNumber, ageEvts: any): Promise<void>;
export declare function initTimeline(timelineAddress: string, operator: Signer): Promise<void>;
