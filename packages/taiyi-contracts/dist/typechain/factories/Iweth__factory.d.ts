import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Iweth } from "../Iweth";
export declare class Iweth__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Iweth;
}
