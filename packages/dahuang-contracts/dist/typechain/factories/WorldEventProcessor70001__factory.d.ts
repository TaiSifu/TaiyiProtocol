import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor70001 } from "../WorldEventProcessor70001";
export declare class WorldEventProcessor70001__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor70001>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor70001;
    connect(signer: Signer): WorldEventProcessor70001__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor70001;
}
