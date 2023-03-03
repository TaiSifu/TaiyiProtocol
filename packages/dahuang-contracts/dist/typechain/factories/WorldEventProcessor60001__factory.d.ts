import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60001 } from "../WorldEventProcessor60001";
export declare class WorldEventProcessor60001__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60001>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60001;
    connect(signer: Signer): WorldEventProcessor60001__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60001;
}
