import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorTalentProcessor1049 } from "../ActorTalentProcessor1049";
export declare class ActorTalentProcessor1049__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorTalentProcessor1049>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorTalentProcessor1049;
    connect(signer: Signer): ActorTalentProcessor1049__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorTalentProcessor1049;
}
