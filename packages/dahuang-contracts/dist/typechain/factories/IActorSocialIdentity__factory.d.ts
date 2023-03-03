import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IActorSocialIdentity } from "../IActorSocialIdentity";
export declare class IActorSocialIdentity__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IActorSocialIdentity;
}
