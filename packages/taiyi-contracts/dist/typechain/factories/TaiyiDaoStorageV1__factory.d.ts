import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TaiyiDaoStorageV1 } from "../TaiyiDaoStorageV1";
export declare class TaiyiDaoStorageV1__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TaiyiDaoStorageV1>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TaiyiDaoStorageV1;
    connect(signer: Signer): TaiyiDaoStorageV1__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TaiyiDaoStorageV1;
}
