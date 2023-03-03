import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Administered } from "../Administered";
export declare class Administered__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Administered;
}
