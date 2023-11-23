import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1060001 } from "../WorldEventProcessor1060001";
export declare class WorldEventProcessor1060001__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1060001>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1060001;
    connect(signer: Signer): WorldEventProcessor1060001__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1060001;
}
