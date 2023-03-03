import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10011 } from "../WorldEventProcessor10011";
export declare class WorldEventProcessor10011__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10011>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10011;
    connect(signer: Signer): WorldEventProcessor10011__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10011;
}
