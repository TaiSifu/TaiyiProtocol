import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Trigrams } from "../Trigrams";
export declare class Trigrams__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Trigrams>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Trigrams;
    connect(signer: Signer): Trigrams__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Trigrams;
}
