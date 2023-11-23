import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60003 } from "../WorldEventProcessor60003";
export declare class WorldEventProcessor60003__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60003>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60003;
    connect(signer: Signer): WorldEventProcessor60003__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60003;
}
