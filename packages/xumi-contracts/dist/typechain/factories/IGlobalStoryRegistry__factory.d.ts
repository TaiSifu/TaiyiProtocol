import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IGlobalStoryRegistry } from "../IGlobalStoryRegistry";
export declare class IGlobalStoryRegistry__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IGlobalStoryRegistry;
}
