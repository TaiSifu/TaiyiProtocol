import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorSocialIdentity } from "../ActorSocialIdentity";
export declare class ActorSocialIdentity__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorSocialIdentity>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorSocialIdentity;
    connect(signer: Signer): ActorSocialIdentity__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorSocialIdentity;
}
