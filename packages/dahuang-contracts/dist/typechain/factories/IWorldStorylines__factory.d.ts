import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldStorylines } from "../IWorldStorylines";
export declare class IWorldStorylines__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldStorylines;
}
