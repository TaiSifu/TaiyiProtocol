import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TrigramsRender } from "../TrigramsRender";
export declare class TrigramsRender__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TrigramsRender>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TrigramsRender;
    connect(signer: Signer): TrigramsRender__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TrigramsRender;
}
