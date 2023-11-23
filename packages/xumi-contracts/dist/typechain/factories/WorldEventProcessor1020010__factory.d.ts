import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1020010 } from "../WorldEventProcessor1020010";
export declare class WorldEventProcessor1020010__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1020010>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1020010;
    connect(signer: Signer): WorldEventProcessor1020010__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1020010;
}
