import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60522 } from "../WorldEventProcessor60522";
export declare class WorldEventProcessor60522__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60522>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60522;
    connect(signer: Signer): WorldEventProcessor60522__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60522;
}
