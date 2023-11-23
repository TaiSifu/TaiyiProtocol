import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10028 } from "../WorldEventProcessor10028";
export declare class WorldEventProcessor10028__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10028>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10028;
    connect(signer: Signer): WorldEventProcessor10028__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10028;
}
