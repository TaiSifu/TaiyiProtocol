import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ReentrancyGuardUpgradeable } from "../ReentrancyGuardUpgradeable";
export declare class ReentrancyGuardUpgradeable__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ReentrancyGuardUpgradeable;
}
