import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1020006 } from "../WorldEventProcessor1020006";
export declare class WorldEventProcessor1020006__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1020006>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1020006;
    connect(signer: Signer): WorldEventProcessor1020006__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1020006;
}
