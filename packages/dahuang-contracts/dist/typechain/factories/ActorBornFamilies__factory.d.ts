import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorBornFamilies } from "../ActorBornFamilies";
export declare class ActorBornFamilies__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorBornFamilies>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorBornFamilies;
    connect(signer: Signer): ActorBornFamilies__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorBornFamilies;
}
