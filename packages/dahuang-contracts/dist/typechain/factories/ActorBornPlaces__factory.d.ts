import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorBornPlaces } from "../ActorBornPlaces";
export declare class ActorBornPlaces__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorBornPlaces>;
    getDeployTransaction(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorBornPlaces;
    connect(signer: Signer): ActorBornPlaces__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorBornPlaces;
}
