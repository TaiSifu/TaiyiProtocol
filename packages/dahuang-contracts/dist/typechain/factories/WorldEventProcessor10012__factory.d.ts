import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10012 } from "../WorldEventProcessor10012";
export declare class WorldEventProcessor10012__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10012>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10012;
    connect(signer: Signer): WorldEventProcessor10012__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10012;
}
