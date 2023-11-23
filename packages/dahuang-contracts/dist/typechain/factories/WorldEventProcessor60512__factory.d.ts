import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60512 } from "../WorldEventProcessor60512";
export declare class WorldEventProcessor60512__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(baseBuildTime: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60512>;
    getDeployTransaction(baseBuildTime: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60512;
    connect(signer: Signer): WorldEventProcessor60512__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60512;
}
