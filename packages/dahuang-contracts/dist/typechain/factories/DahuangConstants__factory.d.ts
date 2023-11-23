import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DahuangConstants } from "../DahuangConstants";
export declare class DahuangConstants__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<DahuangConstants>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): DahuangConstants;
    connect(signer: Signer): DahuangConstants__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): DahuangConstants;
}
