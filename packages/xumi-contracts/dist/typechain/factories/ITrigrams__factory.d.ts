import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITrigrams } from "../ITrigrams";
export declare class ITrigrams__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ITrigrams;
}
