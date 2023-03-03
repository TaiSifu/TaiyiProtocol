import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60507 } from "../WorldEventProcessor60507";
export declare class WorldEventProcessor60507__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60507>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60507;
    connect(signer: Signer): WorldEventProcessor60507__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60507;
}
