import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorRelationship } from "../IActorRelationship";
export declare class IActorRelationship__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorRelationship;
}
