import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10018 } from "../WorldEventProcessor10018";
export declare class WorldEventProcessor10018__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10018>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10018;
    connect(signer: Signer): WorldEventProcessor10018__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10018;
}
