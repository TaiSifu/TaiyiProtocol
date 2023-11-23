import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Erc721Checkpointable } from "../Erc721Checkpointable";
export declare class Erc721Checkpointable__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Erc721Checkpointable;
}
