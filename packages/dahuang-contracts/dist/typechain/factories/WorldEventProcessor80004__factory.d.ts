import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor80004 } from "../WorldEventProcessor80004";
export declare class WorldEventProcessor80004__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor80004>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor80004;
    connect(signer: Signer): WorldEventProcessor80004__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor80004;
}
