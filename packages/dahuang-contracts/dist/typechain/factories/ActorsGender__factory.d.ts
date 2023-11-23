import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorsGender } from "../ActorsGender";
export declare class ActorsGender__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorsGender>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorsGender;
    connect(signer: Signer): ActorsGender__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorsGender;
}
