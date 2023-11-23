import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60517 } from "../WorldEventProcessor60517";
export declare class WorldEventProcessor60517__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60517>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60517;
    connect(signer: Signer): WorldEventProcessor60517__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60517;
}
