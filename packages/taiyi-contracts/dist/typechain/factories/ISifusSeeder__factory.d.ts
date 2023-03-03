import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISifusSeeder } from "../ISifusSeeder";
export declare class ISifusSeeder__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ISifusSeeder;
}
