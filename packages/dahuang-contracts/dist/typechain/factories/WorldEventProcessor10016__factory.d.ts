import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10016 } from "../WorldEventProcessor10016";
export declare class WorldEventProcessor10016__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10016>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10016;
    connect(signer: Signer): WorldEventProcessor10016__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10016;
}
