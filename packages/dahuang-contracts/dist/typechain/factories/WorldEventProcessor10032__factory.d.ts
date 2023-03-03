import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10032 } from "../WorldEventProcessor10032";
export declare class WorldEventProcessor10032__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10032>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10032;
    connect(signer: Signer): WorldEventProcessor10032__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10032;
}
