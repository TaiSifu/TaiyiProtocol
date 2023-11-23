import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldEvents } from "../IWorldEvents";
export declare class IWorldEvents__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldEvents;
}
