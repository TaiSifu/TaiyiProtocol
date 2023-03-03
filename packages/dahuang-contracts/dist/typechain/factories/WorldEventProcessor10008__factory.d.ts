import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10008 } from "../WorldEventProcessor10008";
export declare class WorldEventProcessor10008__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10008>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10008;
    connect(signer: Signer): WorldEventProcessor10008__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10008;
}
