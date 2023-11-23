import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorRelationshipProcessor } from "../IActorRelationshipProcessor";
export declare class IActorRelationshipProcessor__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorRelationshipProcessor;
}
