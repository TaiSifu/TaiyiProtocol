import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10007 } from "../WorldEventProcessor10007";
export declare class WorldEventProcessor10007__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10007>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10007;
    connect(signer: Signer): WorldEventProcessor10007__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10007;
}
