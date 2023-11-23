import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IProxyRegistry } from "../IProxyRegistry";
export declare class IProxyRegistry__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IProxyRegistry;
}
