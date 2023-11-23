import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Ierc20Metadata } from "../Ierc20Metadata";
export declare class Ierc20Metadata__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Ierc20Metadata;
}
