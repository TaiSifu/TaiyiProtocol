import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldZoneBaseResourcesRandom } from "../WorldZoneBaseResourcesRandom";
export declare class WorldZoneBaseResourcesRandom__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_growTimeDay: BigNumberish, _growQuantityScale: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldZoneBaseResourcesRandom>;
    getDeployTransaction(_growTimeDay: BigNumberish, _growQuantityScale: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldZoneBaseResourcesRandom;
    connect(signer: Signer): WorldZoneBaseResourcesRandom__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldZoneBaseResourcesRandom;
}
