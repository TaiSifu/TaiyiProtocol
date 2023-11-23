import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorHolder } from "../ActorHolder";
export declare class ActorHolder__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_actors: string, _actor: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorHolder>;
    getDeployTransaction(_actors: string, _actor: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorHolder;
    connect(signer: Signer): ActorHolder__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorHolder;
}
