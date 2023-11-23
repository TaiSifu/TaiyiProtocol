import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldSeasons } from "../IWorldSeasons";
export declare class IWorldSeasons__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldSeasons;
}
