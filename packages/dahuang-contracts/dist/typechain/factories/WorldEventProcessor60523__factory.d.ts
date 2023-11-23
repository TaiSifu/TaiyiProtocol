import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60523 } from "../WorldEventProcessor60523";
export declare class WorldEventProcessor60523__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60523>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60523;
    connect(signer: Signer): WorldEventProcessor60523__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60523;
}
