import { Signer, BytesLike, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ShejiTuProxy } from "../ShejiTuProxy";
export declare class ShejiTuProxy__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(logic: string, admin: string, data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ShejiTuProxy>;
    getDeployTransaction(logic: string, admin: string, data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ShejiTuProxy;
    connect(signer: Signer): ShejiTuProxy__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ShejiTuProxy;
}
