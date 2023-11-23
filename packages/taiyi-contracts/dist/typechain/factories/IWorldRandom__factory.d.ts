import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldRandom } from "../IWorldRandom";
export declare class IWorldRandom__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldRandom;
}
