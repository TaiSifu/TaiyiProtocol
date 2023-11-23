import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1000009 } from "../WorldEventProcessor1000009";
export declare class WorldEventProcessor1000009__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1000009>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1000009;
    connect(signer: Signer): WorldEventProcessor1000009__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1000009;
}
