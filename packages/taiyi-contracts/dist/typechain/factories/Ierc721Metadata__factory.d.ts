import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Ierc721Metadata } from "../Ierc721Metadata";
export declare class Ierc721Metadata__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Ierc721Metadata;
}
