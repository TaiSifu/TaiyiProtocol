import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IParameterizedStorylines } from "../IParameterizedStorylines";
export declare class IParameterizedStorylines__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IParameterizedStorylines;
}
