import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldItemsHelpers } from "../WorldItemsHelpers";
export declare class WorldItemsHelpers__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldItemsHelpers>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldItemsHelpers;
    connect(signer: Signer): WorldItemsHelpers__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldItemsHelpers;
}
