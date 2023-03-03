import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ProxyAdmin } from "../ProxyAdmin";
export declare class ProxyAdmin__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ProxyAdmin>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ProxyAdmin;
    connect(signer: Signer): ProxyAdmin__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ProxyAdmin;
}
