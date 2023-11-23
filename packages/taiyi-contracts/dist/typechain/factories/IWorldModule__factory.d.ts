import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldModule } from "../IWorldModule";
export declare class IWorldModule__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldModule;
}
