import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorRelationship } from "../ActorRelationship";
export declare class ActorRelationship__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorRelationship>;
    getDeployTransaction(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorRelationship;
    connect(signer: Signer): ActorRelationship__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorRelationship;
}
