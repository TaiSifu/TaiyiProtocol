import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorBornFamilies } from "../IActorBornFamilies";
export declare class IActorBornFamilies__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorBornFamilies;
}
