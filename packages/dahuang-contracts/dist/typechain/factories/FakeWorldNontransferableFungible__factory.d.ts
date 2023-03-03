import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FakeWorldNontransferableFungible } from "../FakeWorldNontransferableFungible";
export declare class FakeWorldNontransferableFungible__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_name: string, _symbol: string, _moduleID: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<FakeWorldNontransferableFungible>;
    getDeployTransaction(_name: string, _symbol: string, _moduleID: BigNumberish, _route: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): FakeWorldNontransferableFungible;
    connect(signer: Signer): FakeWorldNontransferableFungible__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): FakeWorldNontransferableFungible;
}
