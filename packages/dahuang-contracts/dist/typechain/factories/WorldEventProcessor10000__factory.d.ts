import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10000 } from "../WorldEventProcessor10000";
export declare class WorldEventProcessor10000__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10000>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10000;
    connect(signer: Signer): WorldEventProcessor10000__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10000;
}
