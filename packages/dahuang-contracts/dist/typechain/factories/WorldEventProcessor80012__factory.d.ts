import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80012 } from "../WorldEventProcessor80012";
export declare class WorldEventProcessor80012__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80012>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80012;
    connect(signer: Signer): WorldEventProcessor80012__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80012;
}
