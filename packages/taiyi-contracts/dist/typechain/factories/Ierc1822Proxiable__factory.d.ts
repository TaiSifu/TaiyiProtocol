import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Ierc1822Proxiable } from "../Ierc1822Proxiable";
export declare class Ierc1822Proxiable__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Ierc1822Proxiable;
}
