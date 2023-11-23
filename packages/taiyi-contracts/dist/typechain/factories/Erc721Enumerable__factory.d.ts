import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Erc721Enumerable } from "../Erc721Enumerable";
export declare class Erc721Enumerable__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Erc721Enumerable;
}
