import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorMoodAttributes } from "../ActorMoodAttributes";
export declare class ActorMoodAttributes__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorMoodAttributes>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorMoodAttributes;
    connect(signer: Signer): ActorMoodAttributes__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorMoodAttributes;
}
