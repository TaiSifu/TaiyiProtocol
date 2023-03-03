import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Vrgda } from "../Vrgda";
export declare class Vrgda__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Vrgda;
}
