import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10029 } from "../WorldEventProcessor10029";
export declare class WorldEventProcessor10029__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10029>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10029;
    connect(signer: Signer): WorldEventProcessor10029__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10029;
}
