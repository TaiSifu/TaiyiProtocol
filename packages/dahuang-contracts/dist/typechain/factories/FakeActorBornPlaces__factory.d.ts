import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FakeActorBornPlaces } from "../FakeActorBornPlaces";
export declare class FakeActorBornPlaces__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<FakeActorBornPlaces>;
    getDeployTransaction(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): FakeActorBornPlaces;
    connect(signer: Signer): FakeActorBornPlaces__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): FakeActorBornPlaces;
}
