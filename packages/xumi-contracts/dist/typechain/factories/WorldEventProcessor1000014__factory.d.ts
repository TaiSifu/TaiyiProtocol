import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1000014 } from "../WorldEventProcessor1000014";
export declare class WorldEventProcessor1000014__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1000014>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1000014;
    connect(signer: Signer): WorldEventProcessor1000014__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1000014;
}
