import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SifusSeeder } from "../SifusSeeder";
export declare class SifusSeeder__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<SifusSeeder>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): SifusSeeder;
    connect(signer: Signer): SifusSeeder__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): SifusSeeder;
}
