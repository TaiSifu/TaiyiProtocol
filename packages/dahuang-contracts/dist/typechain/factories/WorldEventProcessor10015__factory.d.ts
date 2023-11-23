import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10015 } from "../WorldEventProcessor10015";
export declare class WorldEventProcessor10015__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10015>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10015;
    connect(signer: Signer): WorldEventProcessor10015__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10015;
}
