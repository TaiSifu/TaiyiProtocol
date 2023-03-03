import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10062 } from "../WorldEventProcessor10062";
export declare class WorldEventProcessor10062__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10062>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10062;
    connect(signer: Signer): WorldEventProcessor10062__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10062;
}
