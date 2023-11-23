import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1000004 } from "../WorldEventProcessor1000004";
export declare class WorldEventProcessor1000004__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1000004>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1000004;
    connect(signer: Signer): WorldEventProcessor1000004__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1000004;
}
