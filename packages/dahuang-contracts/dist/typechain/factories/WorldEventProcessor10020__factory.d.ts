import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10020 } from "../WorldEventProcessor10020";
export declare class WorldEventProcessor10020__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10020>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10020;
    connect(signer: Signer): WorldEventProcessor10020__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10020;
}
