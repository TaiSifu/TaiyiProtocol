import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10030 } from "../WorldEventProcessor10030";
export declare class WorldEventProcessor10030__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10030>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10030;
    connect(signer: Signer): WorldEventProcessor10030__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10030;
}
