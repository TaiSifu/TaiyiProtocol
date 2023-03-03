import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor10025 } from "../WorldEventProcessor10025";
export declare class WorldEventProcessor10025__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_zoneTaiyi: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor10025>;
    getDeployTransaction(_zoneTaiyi: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor10025;
    connect(signer: Signer): WorldEventProcessor10025__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor10025;
}
