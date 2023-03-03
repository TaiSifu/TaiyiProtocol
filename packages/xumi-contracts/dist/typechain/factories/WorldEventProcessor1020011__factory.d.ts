import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1020011 } from "../WorldEventProcessor1020011";
export declare class WorldEventProcessor1020011__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1020011>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1020011;
    connect(signer: Signer): WorldEventProcessor1020011__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1020011;
}
