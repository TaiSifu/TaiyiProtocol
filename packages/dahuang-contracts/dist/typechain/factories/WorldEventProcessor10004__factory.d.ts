import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10004 } from "../WorldEventProcessor10004";
export declare class WorldEventProcessor10004__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10004>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10004;
    connect(signer: Signer): WorldEventProcessor10004__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10004;
}
