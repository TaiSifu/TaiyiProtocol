import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10001 } from "../WorldEventProcessor10001";
export declare class WorldEventProcessor10001__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10001>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10001;
    connect(signer: Signer): WorldEventProcessor10001__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10001;
}
