import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISifusDescriptor } from "../ISifusDescriptor";
export declare class ISifusDescriptor__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ISifusDescriptor;
}
