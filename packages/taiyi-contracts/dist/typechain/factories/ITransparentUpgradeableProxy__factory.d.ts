import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITransparentUpgradeableProxy } from "../ITransparentUpgradeableProxy";
export declare class ITransparentUpgradeableProxy__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ITransparentUpgradeableProxy;
}
