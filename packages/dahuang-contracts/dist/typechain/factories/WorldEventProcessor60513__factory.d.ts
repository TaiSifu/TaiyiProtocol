import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60513 } from "../WorldEventProcessor60513";
export declare class WorldEventProcessor60513__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60513>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60513;
    connect(signer: Signer): WorldEventProcessor60513__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60513;
}
