import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10033 } from "../WorldEventProcessor10033";
export declare class WorldEventProcessor10033__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10033>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10033;
    connect(signer: Signer): WorldEventProcessor10033__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10033;
}
