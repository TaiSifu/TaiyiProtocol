import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60516 } from "../WorldEventProcessor60516";
export declare class WorldEventProcessor60516__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60516>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60516;
    connect(signer: Signer): WorldEventProcessor60516__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60516;
}
