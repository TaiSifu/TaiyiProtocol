import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorTalentProcessor } from "../IActorTalentProcessor";
export declare class IActorTalentProcessor__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorTalentProcessor;
}
