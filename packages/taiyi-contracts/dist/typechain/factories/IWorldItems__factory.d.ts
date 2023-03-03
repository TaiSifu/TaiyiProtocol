import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldItems } from "../IWorldItems";
export declare class IWorldItems__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldItems;
}
