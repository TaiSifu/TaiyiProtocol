import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldFungible } from "../WorldFungible";
export declare class WorldFungible__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_name: string, _symbol: string, _moduleID: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldFungible>;
    getDeployTransaction(_name: string, _symbol: string, _moduleID: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldFungible;
    connect(signer: Signer): WorldFungible__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldFungible;
}
