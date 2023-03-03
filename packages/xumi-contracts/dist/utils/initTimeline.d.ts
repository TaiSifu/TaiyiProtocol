import { BigNumber, Signer } from 'ethers';
import { ShejiTu } from "@taiyi/contracts/dist/typechain";
export declare function addTimeline(timeline: ShejiTu, age: BigNumber, ageEvts: any): Promise<void>;
export declare function initTimeline(timelineAddress: string, operator: Signer): Promise<void>;
