import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorAttributes } from "../IActorAttributes";
export declare class IActorAttributes__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorAttributes;
}
