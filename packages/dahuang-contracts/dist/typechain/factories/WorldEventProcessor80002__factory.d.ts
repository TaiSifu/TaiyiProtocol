import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80002 } from "../WorldEventProcessor80002";
export declare class WorldEventProcessor80002__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80002>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80002;
    connect(signer: Signer): WorldEventProcessor80002__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80002;
}
