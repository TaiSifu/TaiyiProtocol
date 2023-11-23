import { Signer, BytesLike, ContractFactory, PayableOverrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Erc1967Proxy } from "../Erc1967Proxy";
export declare class Erc1967Proxy__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_logic: string, _data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<Erc1967Proxy>;
    getDeployTransaction(_logic: string, _data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Erc1967Proxy;
    connect(signer: Signer): Erc1967Proxy__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Erc1967Proxy;
}
