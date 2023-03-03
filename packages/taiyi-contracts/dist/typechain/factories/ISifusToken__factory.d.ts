import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISifusToken } from "../ISifusToken";
export declare class ISifusToken__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ISifusToken;
}
