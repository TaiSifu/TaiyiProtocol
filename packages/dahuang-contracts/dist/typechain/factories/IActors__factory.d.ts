import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActors } from "../IActors";
export declare class IActors__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActors;
}
