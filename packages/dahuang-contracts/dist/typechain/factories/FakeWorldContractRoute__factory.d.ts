import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FakeWorldContractRoute } from "../FakeWorldContractRoute";
export declare class FakeWorldContractRoute__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<FakeWorldContractRoute>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): FakeWorldContractRoute;
    connect(signer: Signer): FakeWorldContractRoute__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): FakeWorldContractRoute;
}
