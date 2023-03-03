import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorTalentProcessor1010 } from "../ActorTalentProcessor1010";
export declare class ActorTalentProcessor1010__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorTalentProcessor1010>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorTalentProcessor1010;
    connect(signer: Signer): ActorTalentProcessor1010__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorTalentProcessor1010;
}
