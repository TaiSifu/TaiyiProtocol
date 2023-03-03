import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1000010 } from "../WorldEventProcessor1000010";
export declare class WorldEventProcessor1000010__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1000010>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1000010;
    connect(signer: Signer): WorldEventProcessor1000010__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1000010;
}
