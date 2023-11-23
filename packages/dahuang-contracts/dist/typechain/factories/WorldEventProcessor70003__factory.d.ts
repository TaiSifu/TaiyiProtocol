import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor70003 } from "../WorldEventProcessor70003";
export declare class WorldEventProcessor70003__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor70003>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor70003;
    connect(signer: Signer): WorldEventProcessor70003__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor70003;
}
