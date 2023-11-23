import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10026 } from "../WorldEventProcessor10026";
export declare class WorldEventProcessor10026__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10026>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10026;
    connect(signer: Signer): WorldEventProcessor10026__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10026;
}
