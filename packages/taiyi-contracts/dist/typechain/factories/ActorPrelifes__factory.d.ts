import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorPrelifes } from "../ActorPrelifes";
export declare class ActorPrelifes__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorPrelifes>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorPrelifes;
    connect(signer: Signer): ActorPrelifes__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorPrelifes;
}
