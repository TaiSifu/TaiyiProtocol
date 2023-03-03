import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10010 } from "../WorldEventProcessor10010";
export declare class WorldEventProcessor10010__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10010>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10010;
    connect(signer: Signer): WorldEventProcessor10010__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10010;
}
