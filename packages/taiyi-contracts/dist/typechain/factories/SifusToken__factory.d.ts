import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SifusToken } from "../SifusToken";
export declare class SifusToken__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_taiyiDAO: string, _descriptor: string, _seeder: string, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<SifusToken>;
    getDeployTransaction(_taiyiDAO: string, _descriptor: string, _seeder: string, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): SifusToken;
    connect(signer: Signer): SifusToken__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): SifusToken;
}
