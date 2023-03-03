import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldContractRoute } from "../WorldContractRoute";
export declare class WorldContractRoute__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldContractRoute>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldContractRoute;
    connect(signer: Signer): WorldContractRoute__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldContractRoute;
}
