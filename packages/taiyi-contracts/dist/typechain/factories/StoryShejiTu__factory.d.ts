import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { StoryShejiTu } from "../StoryShejiTu";
export declare class StoryShejiTu__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<StoryShejiTu>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): StoryShejiTu;
    connect(signer: Signer): StoryShejiTu__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): StoryShejiTu;
}
