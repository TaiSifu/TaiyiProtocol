import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldVillages } from "../WorldVillages";
export declare class WorldVillages__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldVillages>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldVillages;
    connect(signer: Signer): WorldVillages__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldVillages;
}
