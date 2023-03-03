import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1020012 } from "../WorldEventProcessor1020012";
export declare class WorldEventProcessor1020012__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1020012>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1020012;
    connect(signer: Signer): WorldEventProcessor1020012__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1020012;
}
