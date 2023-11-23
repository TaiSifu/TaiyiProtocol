import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80010 } from "../WorldEventProcessor80010";
export declare class WorldEventProcessor80010__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80010>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80010;
    connect(signer: Signer): WorldEventProcessor80010__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80010;
}
