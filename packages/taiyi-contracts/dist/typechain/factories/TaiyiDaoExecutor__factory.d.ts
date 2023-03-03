import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TaiyiDaoExecutor } from "../TaiyiDaoExecutor";
export declare class TaiyiDaoExecutor__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(admin_: string, delay_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TaiyiDaoExecutor>;
    getDeployTransaction(admin_: string, delay_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TaiyiDaoExecutor;
    connect(signer: Signer): TaiyiDaoExecutor__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TaiyiDaoExecutor;
}
