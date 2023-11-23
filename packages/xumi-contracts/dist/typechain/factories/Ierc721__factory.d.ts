import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Ierc721 } from "../Ierc721";
export declare class Ierc721__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Ierc721;
}
