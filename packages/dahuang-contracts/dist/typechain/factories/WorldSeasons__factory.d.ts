import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldSeasons } from "../WorldSeasons";
export declare class WorldSeasons__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldSeasons>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldSeasons;
    connect(signer: Signer): WorldSeasons__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldSeasons;
}
