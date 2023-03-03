import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITrigramsRender } from "../ITrigramsRender";
export declare class ITrigramsRender__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ITrigramsRender;
}
