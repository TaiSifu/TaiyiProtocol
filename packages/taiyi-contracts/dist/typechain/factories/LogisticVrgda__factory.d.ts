import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { LogisticVrgda } from "../LogisticVrgda";
export declare class LogisticVrgda__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): LogisticVrgda;
}
