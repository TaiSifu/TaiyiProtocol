import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FakeWorldFungible } from "../FakeWorldFungible";
export declare class FakeWorldFungible__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_name: string, _symbol: string, _moduleID: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<FakeWorldFungible>;
    getDeployTransaction(_name: string, _symbol: string, _moduleID: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): FakeWorldFungible;
    connect(signer: Signer): FakeWorldFungible__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): FakeWorldFungible;
}
