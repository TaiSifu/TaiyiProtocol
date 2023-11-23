import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1000001 } from "../WorldEventProcessor1000001";
export declare class WorldEventProcessor1000001__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1000001>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1000001;
    connect(signer: Signer): WorldEventProcessor1000001__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1000001;
}