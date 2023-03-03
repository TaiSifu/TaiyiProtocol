import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60518 } from "../WorldEventProcessor60518";
export declare class WorldEventProcessor60518__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60518>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60518;
    connect(signer: Signer): WorldEventProcessor60518__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60518;
}
