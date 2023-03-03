import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldZoneBaseResourcesTest } from "../WorldZoneBaseResourcesTest";
export declare class WorldZoneBaseResourcesTest__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_growTimeDay: BigNumberish, _growQuantityScale: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldZoneBaseResourcesTest>;
    getDeployTransaction(_growTimeDay: BigNumberish, _growQuantityScale: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldZoneBaseResourcesTest;
    connect(signer: Signer): WorldZoneBaseResourcesTest__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldZoneBaseResourcesTest;
}
