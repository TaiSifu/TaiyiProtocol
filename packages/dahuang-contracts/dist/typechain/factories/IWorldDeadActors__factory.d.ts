import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWorldDeadActors } from "../IWorldDeadActors";
export declare class IWorldDeadActors__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IWorldDeadActors;
}
