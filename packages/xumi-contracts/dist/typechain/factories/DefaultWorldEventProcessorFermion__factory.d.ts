import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { DefaultWorldEventProcessorFermion } from "../DefaultWorldEventProcessorFermion";
export declare class DefaultWorldEventProcessorFermion__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): DefaultWorldEventProcessorFermion;
}
