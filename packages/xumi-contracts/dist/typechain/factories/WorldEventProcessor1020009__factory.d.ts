import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1020009 } from "../WorldEventProcessor1020009";
export declare class WorldEventProcessor1020009__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1020009>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1020009;
    connect(signer: Signer): WorldEventProcessor1020009__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1020009;
}
