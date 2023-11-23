import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldNontransferableFungible } from "../WorldNontransferableFungible";
export declare class WorldNontransferableFungible__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_name: string, _symbol: string, _moduleId: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldNontransferableFungible>;
    getDeployTransaction(_name: string, _symbol: string, _moduleId: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldNontransferableFungible;
    connect(signer: Signer): WorldNontransferableFungible__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldNontransferableFungible;
}
