import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60509 } from "../WorldEventProcessor60509";
export declare class WorldEventProcessor60509__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(baseTravelTime: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60509>;
    getDeployTransaction(baseTravelTime: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60509;
    connect(signer: Signer): WorldEventProcessor60509__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60509;
}
