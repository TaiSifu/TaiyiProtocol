import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Ierc1967 } from "../Ierc1967";
export declare class Ierc1967__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Ierc1967;
}
