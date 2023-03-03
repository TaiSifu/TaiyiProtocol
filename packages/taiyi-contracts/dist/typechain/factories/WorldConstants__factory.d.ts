import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldConstants } from "../WorldConstants";
export declare class WorldConstants__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldConstants>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldConstants;
    connect(signer: Signer): WorldConstants__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldConstants;
}
