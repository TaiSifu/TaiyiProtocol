import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ZoneTraversalEventProcessor } from "../ZoneTraversalEventProcessor";
export declare class ZoneTraversalEventProcessor__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ZoneTraversalEventProcessor;
}
