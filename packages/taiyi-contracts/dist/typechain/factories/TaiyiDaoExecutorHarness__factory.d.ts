import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TaiyiDaoExecutorHarness } from "../TaiyiDaoExecutorHarness";
export declare class TaiyiDaoExecutorHarness__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(admin_: string, delay_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TaiyiDaoExecutorHarness>;
    getDeployTransaction(admin_: string, delay_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TaiyiDaoExecutorHarness;
    connect(signer: Signer): TaiyiDaoExecutorHarness__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TaiyiDaoExecutorHarness;
}
