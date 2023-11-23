import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorPrelifes } from "../IActorPrelifes";
export declare class IActorPrelifes__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorPrelifes;
}
