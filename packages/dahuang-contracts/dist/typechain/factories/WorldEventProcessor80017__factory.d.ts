import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80017 } from "../WorldEventProcessor80017";
export declare class WorldEventProcessor80017__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80017>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80017;
    connect(signer: Signer): WorldEventProcessor80017__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80017;
}
