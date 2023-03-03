import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldRandom } from "../WorldRandom";
export declare class WorldRandom__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldRandom>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldRandom;
    connect(signer: Signer): WorldRandom__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldRandom;
}
