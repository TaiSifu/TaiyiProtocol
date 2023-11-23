import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldEventProcessor60515 } from "../WorldEventProcessor60515";
export declare class WorldEventProcessor60515__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_taiyiZone: BigNumberish, _evt60514Address: string, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldEventProcessor60515>;
    getDeployTransaction(_taiyiZone: BigNumberish, _evt60514Address: string, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldEventProcessor60515;
    connect(signer: Signer): WorldEventProcessor60515__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldEventProcessor60515;
}
