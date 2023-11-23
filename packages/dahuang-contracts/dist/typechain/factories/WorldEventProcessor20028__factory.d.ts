import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor20028 } from "../WorldEventProcessor20028";
export declare class WorldEventProcessor20028__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor20028>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor20028;
    connect(signer: Signer): WorldEventProcessor20028__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor20028;
}
