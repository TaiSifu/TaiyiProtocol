import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldStoryActors } from "../WorldStoryActors";
export declare class WorldStoryActors__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldStoryActors>;
    getDeployTransaction(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldStoryActors;
    connect(signer: Signer): WorldStoryActors__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldStoryActors;
}