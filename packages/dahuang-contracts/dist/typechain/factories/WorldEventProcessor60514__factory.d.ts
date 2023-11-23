import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60514 } from "../WorldEventProcessor60514";
export declare class WorldEventProcessor60514__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_taiyiZone: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60514>;
    getDeployTransaction(_taiyiZone: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60514;
    connect(signer: Signer): WorldEventProcessor60514__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60514;
}
