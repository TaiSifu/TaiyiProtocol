import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WorldZoneBaseResources } from "../WorldZoneBaseResources";
export declare class WorldZoneBaseResources__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_growTimeDay: BigNumberish, _growQuantityScale: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WorldZoneBaseResources>;
    getDeployTransaction(_growTimeDay: BigNumberish, _growQuantityScale: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WorldZoneBaseResources;
    connect(signer: Signer): WorldZoneBaseResources__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WorldZoneBaseResources;
}
