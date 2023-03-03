import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldFungible } from "../IWorldFungible";
export declare class IWorldFungible__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldFungible;
}
