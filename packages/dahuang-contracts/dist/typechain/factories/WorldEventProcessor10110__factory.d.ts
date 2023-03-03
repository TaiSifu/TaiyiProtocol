import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10110 } from "../WorldEventProcessor10110";
export declare class WorldEventProcessor10110__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10110>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10110;
    connect(signer: Signer): WorldEventProcessor10110__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10110;
}
