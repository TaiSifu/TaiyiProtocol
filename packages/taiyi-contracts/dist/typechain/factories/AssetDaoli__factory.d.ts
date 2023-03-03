import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AssetDaoli } from "../AssetDaoli";
export declare class AssetDaoli__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_name: string, _symbol: string, _moduleID: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<AssetDaoli>;
    getDeployTransaction(_name: string, _symbol: string, _moduleID: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): AssetDaoli;
    connect(signer: Signer): AssetDaoli__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): AssetDaoli;
}
