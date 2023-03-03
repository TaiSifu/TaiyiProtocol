import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldStorylines } from "../WorldStorylines";
export declare class WorldStorylines__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldStorylines>;
    getDeployTransaction(_route: string, _moduleID: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldStorylines;
    connect(signer: Signer): WorldStorylines__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldStorylines;
}
