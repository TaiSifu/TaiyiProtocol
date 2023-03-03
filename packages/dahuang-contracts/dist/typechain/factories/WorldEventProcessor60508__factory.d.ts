import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60508 } from "../WorldEventProcessor60508";
export declare class WorldEventProcessor60508__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60508>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60508;
    connect(signer: Signer): WorldEventProcessor60508__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60508;
}
