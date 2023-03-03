import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10019 } from "../WorldEventProcessor10019";
export declare class WorldEventProcessor10019__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10019>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10019;
    connect(signer: Signer): WorldEventProcessor10019__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10019;
}
