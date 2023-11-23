import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1020014 } from "../WorldEventProcessor1020014";
export declare class WorldEventProcessor1020014__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1020014>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1020014;
    connect(signer: Signer): WorldEventProcessor1020014__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1020014;
}
