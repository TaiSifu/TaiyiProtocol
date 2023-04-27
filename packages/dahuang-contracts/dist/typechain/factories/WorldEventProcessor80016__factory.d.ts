import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80016 } from "../WorldEventProcessor80016";
export declare class WorldEventProcessor80016__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80016>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80016;
    connect(signer: Signer): WorldEventProcessor80016__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80016;
}
