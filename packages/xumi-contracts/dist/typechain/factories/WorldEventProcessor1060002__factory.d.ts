import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1060002 } from "../WorldEventProcessor1060002";
export declare class WorldEventProcessor1060002__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1060002>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1060002;
    connect(signer: Signer): WorldEventProcessor1060002__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1060002;
}
