import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10003 } from "../WorldEventProcessor10003";
export declare class WorldEventProcessor10003__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10003>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10003;
    connect(signer: Signer): WorldEventProcessor10003__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10003;
}
