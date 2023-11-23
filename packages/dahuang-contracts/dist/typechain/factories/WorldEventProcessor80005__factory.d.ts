import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80005 } from "../WorldEventProcessor80005";
export declare class WorldEventProcessor80005__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80005>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80005;
    connect(signer: Signer): WorldEventProcessor80005__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80005;
}
