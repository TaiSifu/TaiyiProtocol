import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldDeadActors } from "../WorldDeadActors";
export declare class WorldDeadActors__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldDeadActors>;
    getDeployTransaction(_route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldDeadActors;
    connect(signer: Signer): WorldDeadActors__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldDeadActors;
}
