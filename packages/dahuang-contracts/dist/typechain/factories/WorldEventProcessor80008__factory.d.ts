import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80008 } from "../WorldEventProcessor80008";
export declare class WorldEventProcessor80008__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80008>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80008;
    connect(signer: Signer): WorldEventProcessor80008__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80008;
}
