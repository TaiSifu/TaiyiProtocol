import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10013 } from "../WorldEventProcessor10013";
export declare class WorldEventProcessor10013__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10013>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10013;
    connect(signer: Signer): WorldEventProcessor10013__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10013;
}
