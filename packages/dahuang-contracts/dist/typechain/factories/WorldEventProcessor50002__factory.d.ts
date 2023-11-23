import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor50002 } from "../WorldEventProcessor50002";
export declare class WorldEventProcessor50002__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor50002>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor50002;
    connect(signer: Signer): WorldEventProcessor50002__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor50002;
}
