import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldTimeline } from "../IWorldTimeline";
export declare class IWorldTimeline__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldTimeline;
}
