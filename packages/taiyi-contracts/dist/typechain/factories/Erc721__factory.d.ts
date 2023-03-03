import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Erc721 } from "../Erc721";
export declare class Erc721__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(name_: string, symbol_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Erc721>;
    getDeployTransaction(name_: string, symbol_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Erc721;
    connect(signer: Signer): Erc721__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Erc721;
}
