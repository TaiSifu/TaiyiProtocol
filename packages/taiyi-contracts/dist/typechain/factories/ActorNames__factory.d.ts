import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorNames } from "../ActorNames";
export declare class ActorNames__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorNames>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorNames;
    connect(signer: Signer): ActorNames__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorNames;
}
