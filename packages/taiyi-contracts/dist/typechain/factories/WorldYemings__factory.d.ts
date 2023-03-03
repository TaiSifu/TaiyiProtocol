import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldYemings } from "../WorldYemings";
export declare class WorldYemings__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_taiyiDAO: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldYemings>;
    getDeployTransaction(_taiyiDAO: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldYemings;
    connect(signer: Signer): WorldYemings__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldYemings;
}
