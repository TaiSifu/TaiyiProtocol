//yarn task:advance-timestamp --network hard

import { BigNumber } from 'ethers';
import { task, types } from 'hardhat/config';
import { Block } from '@ethersproject/abstract-provider';

task(
    'advance-timestamp',
    '加速时间',
)
    .addOptionalParam('time', 'seconds', 86400, types.int)
    .setAction(async (args, { ethers, run }) => {
        const blockNumber = async (parse = true): Promise<number> => {
            const result = await ethers.provider.send('eth_blockNumber', []);
            return parse ? parseInt(result.toString()) : result;
        };
        const blockByNumber = async (n: number | string): Promise<Block> => {
            return await ethers.provider.send('eth_getBlockByNumber', [n, false]);
        };        
        const blockTimestamp = async (n: number | string, parse = true): Promise<number | string> => {
            const block = await blockByNumber(n);
            return parse ? parseInt(block.timestamp.toString()) : block.timestamp;
        };
        let timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        console.log(`${timestamp}...`);
        await ethers.provider.send('evm_increaseTime', [args.time]);
        await ethers.provider.send('evm_mine', []);
        timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        console.log(`...${timestamp}`);
    });
