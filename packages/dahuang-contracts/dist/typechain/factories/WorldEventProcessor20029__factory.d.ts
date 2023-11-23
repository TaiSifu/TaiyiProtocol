import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor20029 } from "../WorldEventProcessor20029";
export declare class WorldEventProcessor20029__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor20029>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor20029;
    connect(signer: Signer): WorldEventProcessor20029__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor20029;
}
