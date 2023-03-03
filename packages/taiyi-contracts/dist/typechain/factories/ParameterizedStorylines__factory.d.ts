import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ParameterizedStorylines } from "../ParameterizedStorylines";
export declare class ParameterizedStorylines__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ParameterizedStorylines>;
    getDeployTransaction(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ParameterizedStorylines;
    connect(signer: Signer): ParameterizedStorylines__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ParameterizedStorylines;
}
