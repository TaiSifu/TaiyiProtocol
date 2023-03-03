import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { StoryEventProcessor } from "../StoryEventProcessor";
export declare class StoryEventProcessor__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): StoryEventProcessor;
}
