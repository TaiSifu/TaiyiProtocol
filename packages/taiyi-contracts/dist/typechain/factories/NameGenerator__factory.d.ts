import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NameGenerator } from "../NameGenerator";
export declare class NameGenerator__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<NameGenerator>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): NameGenerator;
    connect(signer: Signer): NameGenerator__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): NameGenerator;
}
