//npx hardhat node
//yarn task:run-log --network hard --start 400
import fs from 'fs-extra';
import { task, types } from 'hardhat/config';
import { run_bot } from '../src/index';

task('run-log', '启动日志机器人')
    .addOptionalParam('start', '起始块号', 1, types.int) //监控的起始块号
    .setAction(async (args, { ethers }) => {        
        
        await run_bot(args.start, ethers);

        await new Promise(() => {
            /* keep alive until this process is killed */
        });        
    });
