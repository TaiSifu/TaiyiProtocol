import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TaiyiDaoLogicV1 } from "../TaiyiDaoLogicV1";
export declare class TaiyiDaoLogicV1__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TaiyiDaoLogicV1>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TaiyiDaoLogicV1;
    connect(signer: Signer): TaiyiDaoLogicV1__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TaiyiDaoLogicV1;
}
