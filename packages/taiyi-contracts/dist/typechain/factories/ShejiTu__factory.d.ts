import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ShejiTu } from "../ShejiTu";
export declare class ShejiTu__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ShejiTu>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ShejiTu;
    connect(signer: Signer): ShejiTu__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ShejiTu;
}
