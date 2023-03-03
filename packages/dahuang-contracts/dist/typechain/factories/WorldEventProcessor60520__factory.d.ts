import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60520 } from "../WorldEventProcessor60520";
export declare class WorldEventProcessor60520__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60520>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60520;
    connect(signer: Signer): WorldEventProcessor60520__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60520;
}
