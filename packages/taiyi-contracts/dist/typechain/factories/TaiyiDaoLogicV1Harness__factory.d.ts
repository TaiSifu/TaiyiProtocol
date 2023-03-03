import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TaiyiDaoLogicV1Harness } from "../TaiyiDaoLogicV1Harness";
export declare class TaiyiDaoLogicV1Harness__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TaiyiDaoLogicV1Harness>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TaiyiDaoLogicV1Harness;
    connect(signer: Signer): TaiyiDaoLogicV1Harness__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TaiyiDaoLogicV1Harness;
}
