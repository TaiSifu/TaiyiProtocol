import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldZoneBaseResources } from "../IWorldZoneBaseResources";
export declare class IWorldZoneBaseResources__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldZoneBaseResources;
}
