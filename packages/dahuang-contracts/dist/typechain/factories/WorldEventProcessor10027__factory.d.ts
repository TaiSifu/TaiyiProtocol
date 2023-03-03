import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10027 } from "../WorldEventProcessor10027";
export declare class WorldEventProcessor10027__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10027>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10027;
    connect(signer: Signer): WorldEventProcessor10027__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10027;
}
