import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60004 } from "../WorldEventProcessor60004";
export declare class WorldEventProcessor60004__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60004>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60004;
    connect(signer: Signer): WorldEventProcessor60004__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60004;
}
