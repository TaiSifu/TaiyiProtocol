import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TaiyiDaoProxyStorage } from "../TaiyiDaoProxyStorage";
export declare class TaiyiDaoProxyStorage__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TaiyiDaoProxyStorage>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TaiyiDaoProxyStorage;
    connect(signer: Signer): TaiyiDaoProxyStorage__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TaiyiDaoProxyStorage;
}
