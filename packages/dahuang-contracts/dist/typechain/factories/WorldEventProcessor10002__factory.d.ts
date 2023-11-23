import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10002 } from "../WorldEventProcessor10002";
export declare class WorldEventProcessor10002__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10002>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10002;
    connect(signer: Signer): WorldEventProcessor10002__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10002;
}
