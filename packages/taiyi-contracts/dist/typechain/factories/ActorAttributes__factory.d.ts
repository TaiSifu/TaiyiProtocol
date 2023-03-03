import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorAttributes } from "../ActorAttributes";
export declare class ActorAttributes__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorAttributes>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorAttributes;
    connect(signer: Signer): ActorAttributes__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorAttributes;
}
