import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DefaultWorldEventProcessor } from "../DefaultWorldEventProcessor";
export declare class DefaultWorldEventProcessor__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, _defaultBranchEvent: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<DefaultWorldEventProcessor>;
    getDeployTransaction(_route: string, _defaultBranchEvent: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): DefaultWorldEventProcessor;
    connect(signer: Signer): DefaultWorldEventProcessor__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): DefaultWorldEventProcessor;
}
