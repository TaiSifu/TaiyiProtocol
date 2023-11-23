import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1020016 } from "../WorldEventProcessor1020016";
export declare class WorldEventProcessor1020016__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1020016>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1020016;
    connect(signer: Signer): WorldEventProcessor1020016__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1020016;
}
