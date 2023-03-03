import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1000016 } from "../WorldEventProcessor1000016";
export declare class WorldEventProcessor1000016__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1000016>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1000016;
    connect(signer: Signer): WorldEventProcessor1000016__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1000016;
}
