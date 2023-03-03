import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { GlobalStoryRegistry } from "../GlobalStoryRegistry";
export declare class GlobalStoryRegistry__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<GlobalStoryRegistry>;
    getDeployTransaction(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): GlobalStoryRegistry;
    connect(signer: Signer): GlobalStoryRegistry__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): GlobalStoryRegistry;
}
