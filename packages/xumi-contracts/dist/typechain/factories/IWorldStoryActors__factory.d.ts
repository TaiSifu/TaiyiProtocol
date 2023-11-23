import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldStoryActors } from "../IWorldStoryActors";
export declare class IWorldStoryActors__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldStoryActors;
}
