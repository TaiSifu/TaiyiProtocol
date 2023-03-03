import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorBehaviorAttributes } from "../ActorBehaviorAttributes";
export declare class ActorBehaviorAttributes__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_actRecoverTimeDay: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorBehaviorAttributes>;
    getDeployTransaction(_actRecoverTimeDay: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorBehaviorAttributes;
    connect(signer: Signer): ActorBehaviorAttributes__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorBehaviorAttributes;
}
