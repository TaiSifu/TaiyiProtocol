import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80011 } from "../WorldEventProcessor80011";
export declare class WorldEventProcessor80011__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80011>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80011;
    connect(signer: Signer): WorldEventProcessor80011__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80011;
}
