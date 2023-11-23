import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80007 } from "../WorldEventProcessor80007";
export declare class WorldEventProcessor80007__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80007>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80007;
    connect(signer: Signer): WorldEventProcessor80007__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80007;
}
