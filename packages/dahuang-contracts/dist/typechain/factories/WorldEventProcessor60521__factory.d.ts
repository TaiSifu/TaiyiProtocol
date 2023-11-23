import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60521 } from "../WorldEventProcessor60521";
export declare class WorldEventProcessor60521__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60521>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60521;
    connect(signer: Signer): WorldEventProcessor60521__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60521;
}
