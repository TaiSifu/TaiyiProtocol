import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1000008 } from "../WorldEventProcessor1000008";
export declare class WorldEventProcessor1000008__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1000008>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1000008;
    connect(signer: Signer): WorldEventProcessor1000008__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1000008;
}
