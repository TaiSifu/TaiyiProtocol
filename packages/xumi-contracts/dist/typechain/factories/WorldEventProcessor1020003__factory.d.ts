import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1020003 } from "../WorldEventProcessor1020003";
export declare class WorldEventProcessor1020003__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1020003>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1020003;
    connect(signer: Signer): WorldEventProcessor1020003__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1020003;
}