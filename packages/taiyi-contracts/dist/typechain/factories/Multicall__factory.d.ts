import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Multicall } from "../Multicall";
export declare class Multicall__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Multicall>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Multicall;
    connect(signer: Signer): Multicall__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Multicall;
}
