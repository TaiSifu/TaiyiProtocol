import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { DefaultWorldEventProcessorBoson } from "../DefaultWorldEventProcessorBoson";
export declare class DefaultWorldEventProcessorBoson__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): DefaultWorldEventProcessorBoson;
}
