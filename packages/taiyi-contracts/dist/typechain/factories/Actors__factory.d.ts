import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Actors } from "../Actors";
export declare class Actors__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_taiyiDAO: string, _mintStart: BigNumberish, _coin: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Actors>;
    getDeployTransaction(_taiyiDAO: string, _mintStart: BigNumberish, _coin: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Actors;
    connect(signer: Signer): Actors__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Actors;
}
