import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Multicall2 } from "../Multicall2";
export declare class Multicall2__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Multicall2>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Multicall2;
    connect(signer: Signer): Multicall2__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Multicall2;
}
