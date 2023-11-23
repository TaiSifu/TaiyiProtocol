import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Ierc721Receiver } from "../Ierc721Receiver";
export declare class Ierc721Receiver__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Ierc721Receiver;
}
