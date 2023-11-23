import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldNonFungible } from "../WorldNonFungible";
export declare class WorldNonFungible__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_name: string, _symbol: string, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldNonFungible>;
    getDeployTransaction(_name: string, _symbol: string, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldNonFungible;
    connect(signer: Signer): WorldNonFungible__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldNonFungible;
}
