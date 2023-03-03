import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorLocations } from "../ActorLocations";
export declare class ActorLocations__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorLocations>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorLocations;
    connect(signer: Signer): ActorLocations__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorLocations;
}
