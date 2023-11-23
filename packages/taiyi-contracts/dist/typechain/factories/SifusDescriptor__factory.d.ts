import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SifusDescriptor } from "../SifusDescriptor";
export declare class SifusDescriptor__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<SifusDescriptor>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): SifusDescriptor;
    connect(signer: Signer): SifusDescriptor__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): SifusDescriptor;
}
