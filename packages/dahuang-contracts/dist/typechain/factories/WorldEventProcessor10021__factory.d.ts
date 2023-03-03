import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10021 } from "../WorldEventProcessor10021";
export declare class WorldEventProcessor10021__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10021>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10021;
    connect(signer: Signer): WorldEventProcessor10021__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10021;
}
