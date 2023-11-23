import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60002 } from "../WorldEventProcessor60002";
export declare class WorldEventProcessor60002__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60002>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60002;
    connect(signer: Signer): WorldEventProcessor60002__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60002;
}