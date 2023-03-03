import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor1030003 } from "../WorldEventProcessor1030003";
export declare class WorldEventProcessor1030003__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor1030003>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor1030003;
    connect(signer: Signer): WorldEventProcessor1030003__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor1030003;
}
