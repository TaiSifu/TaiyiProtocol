import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TaiyiDaoEvents } from "../TaiyiDaoEvents";
export declare class TaiyiDaoEvents__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TaiyiDaoEvents>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TaiyiDaoEvents;
    connect(signer: Signer): TaiyiDaoEvents__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TaiyiDaoEvents;
}
