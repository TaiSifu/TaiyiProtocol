import { task, types } from 'hardhat/config';

task(
    'advance-blocks',
    'advance blocks for debug',
)
    .addOptionalParam('blocks', 'the blocks to be advanced', 28800, types.int)
    .setAction(async (args, { ethers, run }) => {
        console.log(`${await ethers.provider.getBlockNumber()}...`);
        for (let i = 0; i < args.blocks; i++) {
            await ethers.provider.send('evm_mine', []);
        }
        console.log(`...${await ethers.provider.getBlockNumber()}`);
    });
