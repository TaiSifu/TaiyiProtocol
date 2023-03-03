import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10017 } from "../WorldEventProcessor10017";
export declare class WorldEventProcessor10017__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10017>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10017;
    connect(signer: Signer): WorldEventProcessor10017__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10017;
}
