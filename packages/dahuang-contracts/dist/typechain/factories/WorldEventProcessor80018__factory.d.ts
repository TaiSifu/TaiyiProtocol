import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80018 } from "../WorldEventProcessor80018";
export declare class WorldEventProcessor80018__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80018>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80018;
    connect(signer: Signer): WorldEventProcessor80018__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80018;
}