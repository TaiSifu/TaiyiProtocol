import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { SifusTokenLike } from "../SifusTokenLike";
export declare class SifusTokenLike__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): SifusTokenLike;
}
