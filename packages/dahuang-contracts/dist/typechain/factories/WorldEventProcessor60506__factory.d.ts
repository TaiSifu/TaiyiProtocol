import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60506 } from "../WorldEventProcessor60506";
export declare class WorldEventProcessor60506__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60506>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60506;
    connect(signer: Signer): WorldEventProcessor60506__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60506;
}
