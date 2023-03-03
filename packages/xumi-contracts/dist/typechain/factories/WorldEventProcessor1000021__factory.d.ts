import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1000021 } from "../WorldEventProcessor1000021";
export declare class WorldEventProcessor1000021__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1000021>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1000021;
    connect(signer: Signer): WorldEventProcessor1000021__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1000021;
}
