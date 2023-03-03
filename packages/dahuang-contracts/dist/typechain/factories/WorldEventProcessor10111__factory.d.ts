import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10111 } from "../WorldEventProcessor10111";
export declare class WorldEventProcessor10111__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10111>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10111;
    connect(signer: Signer): WorldEventProcessor10111__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10111;
}
