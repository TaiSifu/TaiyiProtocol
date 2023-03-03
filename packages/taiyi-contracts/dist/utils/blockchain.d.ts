import { providers } from 'ethers';
export declare class Blockchain {
    private _snapshotId;
    private _provider;
    constructor(provider: providers.JsonRpcProvider);
    saveSnapshotAsync(): Promise<void>;
    revertAsync(): Promise<void>;
    resetAsync(): Promise<void>;
    increaseTimeAsync(duration: number): Promise<any>;
    waitBlocksAsync(count: number): Promise<void>;
    private sendJSONRpcRequestAsync;
}
