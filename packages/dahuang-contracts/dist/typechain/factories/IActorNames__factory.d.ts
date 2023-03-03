import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorNames } from "../IActorNames";
export declare class IActorNames__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorNames;
}
