import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor70002 } from "../WorldEventProcessor70002";
export declare class WorldEventProcessor70002__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor70002>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor70002;
    connect(signer: Signer): WorldEventProcessor70002__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor70002;
}
