import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10024 } from "../WorldEventProcessor10024";
export declare class WorldEventProcessor10024__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10024>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10024;
    connect(signer: Signer): WorldEventProcessor10024__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10024;
}
