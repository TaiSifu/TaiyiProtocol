import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1030001 } from "../WorldEventProcessor1030001";
export declare class WorldEventProcessor1030001__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1030001>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1030001;
    connect(signer: Signer): WorldEventProcessor1030001__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1030001;
}
