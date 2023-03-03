import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1020008 } from "../WorldEventProcessor1020008";
export declare class WorldEventProcessor1020008__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1020008>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1020008;
    connect(signer: Signer): WorldEventProcessor1020008__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1020008;
}
