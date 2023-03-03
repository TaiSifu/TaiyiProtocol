import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { OwnableUpgradeable } from "../OwnableUpgradeable";
export declare class OwnableUpgradeable__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): OwnableUpgradeable;
}
