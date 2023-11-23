import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor70000 } from "../WorldEventProcessor70000";
export declare class WorldEventProcessor70000__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor70000>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor70000;
    connect(signer: Signer): WorldEventProcessor70000__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor70000;
}
