import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80014 } from "../WorldEventProcessor80014";
export declare class WorldEventProcessor80014__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80014>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80014;
    connect(signer: Signer): WorldEventProcessor80014__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80014;
}
