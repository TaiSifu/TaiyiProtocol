import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1000019 } from "../WorldEventProcessor1000019";
export declare class WorldEventProcessor1000019__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1000019>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1000019;
    connect(signer: Signer): WorldEventProcessor1000019__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1000019;
}
