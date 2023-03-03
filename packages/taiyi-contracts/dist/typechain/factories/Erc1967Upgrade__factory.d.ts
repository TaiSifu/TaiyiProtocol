import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Erc1967Upgrade } from "../Erc1967Upgrade";
export declare class Erc1967Upgrade__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Erc1967Upgrade;
}
