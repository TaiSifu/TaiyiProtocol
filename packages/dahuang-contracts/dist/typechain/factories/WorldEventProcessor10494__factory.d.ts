import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10494 } from "../WorldEventProcessor10494";
export declare class WorldEventProcessor10494__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10494>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10494;
    connect(signer: Signer): WorldEventProcessor10494__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10494;
}
