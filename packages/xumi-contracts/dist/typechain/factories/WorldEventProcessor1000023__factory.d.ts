import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1000023 } from "../WorldEventProcessor1000023";
export declare class WorldEventProcessor1000023__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1000023>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1000023;
    connect(signer: Signer): WorldEventProcessor1000023__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1000023;
}
