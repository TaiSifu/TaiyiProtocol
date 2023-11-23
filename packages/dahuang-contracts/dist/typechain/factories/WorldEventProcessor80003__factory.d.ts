import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80003 } from "../WorldEventProcessor80003";
export declare class WorldEventProcessor80003__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80003>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80003;
    connect(signer: Signer): WorldEventProcessor80003__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80003;
}
