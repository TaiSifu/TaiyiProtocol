import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorCharmAttributes } from "../ActorCharmAttributes";
export declare class ActorCharmAttributes__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorCharmAttributes>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorCharmAttributes;
    connect(signer: Signer): ActorCharmAttributes__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorCharmAttributes;
}
