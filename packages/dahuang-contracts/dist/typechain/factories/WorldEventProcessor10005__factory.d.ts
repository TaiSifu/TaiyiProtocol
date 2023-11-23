import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10005 } from "../WorldEventProcessor10005";
export declare class WorldEventProcessor10005__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10005>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10005;
    connect(signer: Signer): WorldEventProcessor10005__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10005;
}
