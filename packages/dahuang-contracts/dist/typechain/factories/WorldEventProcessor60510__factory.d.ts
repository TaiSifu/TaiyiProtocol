import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60510 } from "../WorldEventProcessor60510";
export declare class WorldEventProcessor60510__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60510>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60510;
    connect(signer: Signer): WorldEventProcessor60510__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60510;
}
