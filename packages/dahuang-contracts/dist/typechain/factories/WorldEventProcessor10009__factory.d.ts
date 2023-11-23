import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10009 } from "../WorldEventProcessor10009";
export declare class WorldEventProcessor10009__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10009>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10009;
    connect(signer: Signer): WorldEventProcessor10009__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10009;
}
