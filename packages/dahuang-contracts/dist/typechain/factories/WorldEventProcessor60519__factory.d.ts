import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60519 } from "../WorldEventProcessor60519";
export declare class WorldEventProcessor60519__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60519>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60519;
    connect(signer: Signer): WorldEventProcessor60519__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60519;
}
