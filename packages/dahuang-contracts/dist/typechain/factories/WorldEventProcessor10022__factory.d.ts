import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10022 } from "../WorldEventProcessor10022";
export declare class WorldEventProcessor10022__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10022>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10022;
    connect(signer: Signer): WorldEventProcessor10022__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10022;
}
