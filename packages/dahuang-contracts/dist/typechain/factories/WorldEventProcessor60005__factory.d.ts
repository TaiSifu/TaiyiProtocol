import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60005 } from "../WorldEventProcessor60005";
export declare class WorldEventProcessor60005__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60005>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60005;
    connect(signer: Signer): WorldEventProcessor60005__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60005;
}
