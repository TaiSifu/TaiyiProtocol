import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1020005 } from "../WorldEventProcessor1020005";
export declare class WorldEventProcessor1020005__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1020005>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1020005;
    connect(signer: Signer): WorldEventProcessor1020005__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1020005;
}
