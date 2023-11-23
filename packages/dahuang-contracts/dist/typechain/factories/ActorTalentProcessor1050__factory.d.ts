import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorTalentProcessor1050 } from "../ActorTalentProcessor1050";
export declare class ActorTalentProcessor1050__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorTalentProcessor1050>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorTalentProcessor1050;
    connect(signer: Signer): ActorTalentProcessor1050__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorTalentProcessor1050;
}
