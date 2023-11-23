import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80015 } from "../WorldEventProcessor80015";
export declare class WorldEventProcessor80015__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80015>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80015;
    connect(signer: Signer): WorldEventProcessor80015__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80015;
}
