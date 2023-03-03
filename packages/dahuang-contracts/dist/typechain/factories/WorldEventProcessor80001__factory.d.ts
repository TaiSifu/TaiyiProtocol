import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80001 } from "../WorldEventProcessor80001";
export declare class WorldEventProcessor80001__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80001>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80001;
    connect(signer: Signer): WorldEventProcessor80001__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80001;
}
