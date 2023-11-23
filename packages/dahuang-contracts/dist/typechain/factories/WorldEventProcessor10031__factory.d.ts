import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10031 } from "../WorldEventProcessor10031";
export declare class WorldEventProcessor10031__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10031>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10031;
    connect(signer: Signer): WorldEventProcessor10031__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10031;
}
