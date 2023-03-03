import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActorXumiAttributes } from "../ActorXumiAttributes";
export declare class ActorXumiAttributes__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ActorXumiAttributes>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ActorXumiAttributes;
    connect(signer: Signer): ActorXumiAttributes__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ActorXumiAttributes;
}
