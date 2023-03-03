import { Signer, BytesLike, ContractFactory, PayableOverrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TransparentUpgradeableProxy } from "../TransparentUpgradeableProxy";
export declare class TransparentUpgradeableProxy__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_logic: string, admin_: string, _data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<TransparentUpgradeableProxy>;
    getDeployTransaction(_logic: string, admin_: string, _data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TransparentUpgradeableProxy;
    connect(signer: Signer): TransparentUpgradeableProxy__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TransparentUpgradeableProxy;
}
