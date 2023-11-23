import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { XumiConstants } from "../XumiConstants";
export declare class XumiConstants__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<XumiConstants>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): XumiConstants;
    connect(signer: Signer): XumiConstants__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): XumiConstants;
}
