import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldConfigurable } from "../WorldConfigurable";
export declare class WorldConfigurable__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldConfigurable>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldConfigurable;
    connect(signer: Signer): WorldConfigurable__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldConfigurable;
}
