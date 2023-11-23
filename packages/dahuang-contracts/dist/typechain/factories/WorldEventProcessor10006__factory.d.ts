import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10006 } from "../WorldEventProcessor10006";
export declare class WorldEventProcessor10006__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10006>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10006;
    connect(signer: Signer): WorldEventProcessor10006__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10006;
}
