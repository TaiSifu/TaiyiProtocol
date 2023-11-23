import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldVillages } from "../IWorldVillages";
export declare class IWorldVillages__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldVillages;
}
