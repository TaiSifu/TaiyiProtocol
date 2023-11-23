import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80019 } from "../WorldEventProcessor80019";
export declare class WorldEventProcessor80019__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80019>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80019;
    connect(signer: Signer): WorldEventProcessor80019__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80019;
}
