import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Initializable } from "../Initializable";
export declare class Initializable__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Initializable;
}
