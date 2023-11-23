import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldBuildings } from "../IWorldBuildings";
export declare class IWorldBuildings__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldBuildings;
}
