import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Ierc165 } from "../Ierc165";
export declare class Ierc165__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Ierc165;
}
