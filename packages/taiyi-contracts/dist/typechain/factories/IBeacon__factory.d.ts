import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IBeacon } from "../IBeacon";
export declare class IBeacon__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IBeacon;
}
