import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1050001 } from "../WorldEventProcessor1050001";
export declare class WorldEventProcessor1050001__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1050001>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1050001;
    connect(signer: Signer): WorldEventProcessor1050001__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1050001;
}
