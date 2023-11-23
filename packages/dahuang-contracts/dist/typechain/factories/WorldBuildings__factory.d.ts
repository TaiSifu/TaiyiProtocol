import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldBuildings } from "../WorldBuildings";
export declare class WorldBuildings__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldBuildings>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldBuildings;
    connect(signer: Signer): WorldBuildings__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldBuildings;
}
