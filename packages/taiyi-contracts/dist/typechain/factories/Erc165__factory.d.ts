import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Erc165 } from "../Erc165";
export declare class Erc165__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Erc165;
}
