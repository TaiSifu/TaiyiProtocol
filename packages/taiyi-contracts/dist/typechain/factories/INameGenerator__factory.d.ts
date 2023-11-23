import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { INameGenerator } from "../INameGenerator";
export declare class INameGenerator__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): INameGenerator;
}
