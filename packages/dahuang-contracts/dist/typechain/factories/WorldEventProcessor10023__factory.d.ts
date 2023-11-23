import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10023 } from "../WorldEventProcessor10023";
export declare class WorldEventProcessor10023__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10023>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10023;
    connect(signer: Signer): WorldEventProcessor10023__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10023;
}
