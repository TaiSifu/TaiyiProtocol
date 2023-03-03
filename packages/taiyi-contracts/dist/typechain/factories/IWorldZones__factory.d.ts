import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldZones } from "../IWorldZones";
export declare class IWorldZones__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldZones;
}
