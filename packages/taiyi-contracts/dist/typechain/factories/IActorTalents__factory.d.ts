import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorTalents } from "../IActorTalents";
export declare class IActorTalents__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorTalents;
}
