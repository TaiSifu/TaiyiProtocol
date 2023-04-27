import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80013 } from "../WorldEventProcessor80013";
export declare class WorldEventProcessor80013__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80013>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80013;
    connect(signer: Signer): WorldEventProcessor80013__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80013;
}
