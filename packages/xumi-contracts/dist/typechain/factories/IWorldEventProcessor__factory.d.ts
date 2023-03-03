import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldEventProcessor } from "../IWorldEventProcessor";
export declare class IWorldEventProcessor__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldEventProcessor;
}
