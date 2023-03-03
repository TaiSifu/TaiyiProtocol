import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TaiyiDaoExecutorTest } from "../TaiyiDaoExecutorTest";
export declare class TaiyiDaoExecutorTest__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(admin_: string, delay_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TaiyiDaoExecutorTest>;
    getDeployTransaction(admin_: string, delay_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TaiyiDaoExecutorTest;
    connect(signer: Signer): TaiyiDaoExecutorTest__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TaiyiDaoExecutorTest;
}
