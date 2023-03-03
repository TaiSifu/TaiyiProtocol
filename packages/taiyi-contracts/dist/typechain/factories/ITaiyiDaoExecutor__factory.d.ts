import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITaiyiDaoExecutor } from "../ITaiyiDaoExecutor";
export declare class ITaiyiDaoExecutor__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ITaiyiDaoExecutor;
}
