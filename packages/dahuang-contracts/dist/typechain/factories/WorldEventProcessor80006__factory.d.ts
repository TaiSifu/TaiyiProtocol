import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80006 } from "../WorldEventProcessor80006";
export declare class WorldEventProcessor80006__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80006>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80006;
    connect(signer: Signer): WorldEventProcessor80006__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80006;
}
