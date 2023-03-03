import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Erc721Holder } from "../Erc721Holder";
export declare class Erc721Holder__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Erc721Holder>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Erc721Holder;
    connect(signer: Signer): Erc721Holder__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Erc721Holder;
}
