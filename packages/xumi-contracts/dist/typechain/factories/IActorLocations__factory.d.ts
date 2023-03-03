import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorLocations } from "../IActorLocations";
export declare class IActorLocations__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorLocations;
}
