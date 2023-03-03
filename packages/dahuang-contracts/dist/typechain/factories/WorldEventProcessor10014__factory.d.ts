import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10014 } from "../WorldEventProcessor10014";
export declare class WorldEventProcessor10014__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10014>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10014;
    connect(signer: Signer): WorldEventProcessor10014__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10014;
}
