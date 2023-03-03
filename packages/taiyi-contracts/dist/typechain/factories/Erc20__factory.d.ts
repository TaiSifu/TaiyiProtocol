import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Erc20 } from "../Erc20";
export declare class Erc20__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(name_: string, symbol_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Erc20>;
    getDeployTransaction(name_: string, symbol_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Erc20;
    connect(signer: Signer): Erc20__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Erc20;
}
