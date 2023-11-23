import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ShejiTuProxyAdmin } from "../ShejiTuProxyAdmin";
export declare class ShejiTuProxyAdmin__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ShejiTuProxyAdmin>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ShejiTuProxyAdmin;
    connect(signer: Signer): ShejiTuProxyAdmin__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ShejiTuProxyAdmin;
}
