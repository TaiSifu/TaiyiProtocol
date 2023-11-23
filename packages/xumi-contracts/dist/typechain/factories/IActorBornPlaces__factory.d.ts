import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorBornPlaces } from "../IActorBornPlaces";
export declare class IActorBornPlaces__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorBornPlaces;
}
