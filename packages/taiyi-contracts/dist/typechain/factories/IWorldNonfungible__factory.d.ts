import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldNonfungible } from "../IWorldNonfungible";
export declare class IWorldNonfungible__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldNonfungible;
}
