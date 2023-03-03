import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorCoreAttributes } from "../ActorCoreAttributes";
export declare class ActorCoreAttributes__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorCoreAttributes>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorCoreAttributes;
    connect(signer: Signer): ActorCoreAttributes__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorCoreAttributes;
}
