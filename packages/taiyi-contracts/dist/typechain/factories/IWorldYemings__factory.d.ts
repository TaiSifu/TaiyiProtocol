import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldYemings } from "../IWorldYemings";
export declare class IWorldYemings__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldYemings;
}
