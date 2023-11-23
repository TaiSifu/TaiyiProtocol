import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEvents } from "../WorldEvents";
export declare class WorldEvents__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_oneAgeVSecond: BigNumberish, _route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEvents>;
    getDeployTransaction(_oneAgeVSecond: BigNumberish, _route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEvents;
    connect(signer: Signer): WorldEvents__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEvents;
}
