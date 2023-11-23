import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60505 } from "../WorldEventProcessor60505";
export declare class WorldEventProcessor60505__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60505>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60505;
    connect(signer: Signer): WorldEventProcessor60505__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60505;
}
