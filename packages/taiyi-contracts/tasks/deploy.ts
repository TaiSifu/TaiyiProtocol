//npx hardhat node
//yarn task:deploy --network hard
import fs from 'fs-extra';
import { Block } from '@ethersproject/abstract-provider';
import { task, types } from 'hardhat/config';
import { deployTaiyiWorld, WorldContract } from '../utils/deployWorld';
import { Actors__factory, TaiyiDaoExecutor__factory, TaiyiDaoLogicV1__factory, TaiyiDaoProxy__factory } from '../typechain';
import { BigNumber } from 'ethers';
import { getAddressBookShareFilePath } from '../utils/addressConfig';

const process_args = require('minimist')(process.argv.slice(2));

type ContractName =
    //| 'WETH'
    | 'MultiPartRLEToSVG'
    | 'SifusDescriptor'
    | 'SifusSeeder'
    | 'SifusToken'
    | 'TaiyiDAOExecutor'
    | 'TaiyiDAOLogicV1'
    | 'TaiyiDAOProxy';

task('deploy', '部署太乙基础合约')
    .addOptionalParam('actorMintStartTime', '角色发行起始时间 (block timestamp)', '', types.string) // Default: immediately
    .addOptionalParam('timelockDelay', '赏善罚恶令执行延迟 (seconds)', 60 * 60 * 24 * 2, types.int) // Default: 2 days
    .addOptionalParam('votingPeriod', '投票期 (blocks)', 4 * 60 * 24 * 3, types.int) // Default: 3 days
    .addOptionalParam('votingDelay', '投票延迟开始 (blocks)', 1, types.int) // Default: 1 block
    .addOptionalParam('proposalThresholdBps', '提案者持票阈值 (基点10000=100%)', 500, types.int) // Default: 5%
    .addOptionalParam('quorumVotesBps', '法定投票占比 (基点10000=100%)', 1_000, types.int) // Default: 10%
    .setAction(async (args, { ethers }) => {
        //const network = await ethers.provider.getNetwork();        
        // if (network.chainId !== 31337) {
        //     console.log(`Invalid chain id. Expected 31337. Got: ${network.chainId}.`);
        //     return;
        // }

        const [deployer, taisifu] = await ethers.getSigners();
        console.log(`Deployer: ${deployer.address}`);
        console.log(`Taisifu: ${taisifu.address}`);

        let multiPartRLEToSVG = await (await ethers.getContractFactory('MultiPartRLEToSVG', deployer)).deploy();

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
                
        //Deploy Taiyi World
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        let worldContracts = await deployTaiyiWorld(timestamp, deployer, taisifu || deployer, true);

        //register actors uri modules
        const actors = Actors__factory.connect(worldContracts.Actors.instance.address, taisifu);
        await actors.registerURIPartModule(worldContracts.ActorNames.instance.address);
        await actors.registerURIPartModule(worldContracts.ActorSocialIdentity.instance.address);
        
    
        //CALCULATE Gov Delegate, takes place after 2 transactions
        const expectedTaiyiDAOProxyAddress = ethers.utils.getContractAddress({
            from: deployer.address,
            nonce: (await deployer.getTransactionCount()) + 2,
        });

        //DEPLOY TaiyiDAOExecutor with pre-computed Delegator address
        const timelock = await (await new TaiyiDaoExecutor__factory(deployer).deploy(
            expectedTaiyiDAOProxyAddress,
            args.timelockDelay,
        )).deployed();

        //DEPLOY Delegate
        const govDelegate = await (await new TaiyiDaoLogicV1__factory(deployer).deploy()).deployed();

        //DEPLOY Delegator
        const taiyiDAOProxy = await (await new TaiyiDaoProxy__factory(deployer).deploy(
            timelock.address,
            worldContracts.SifusToken.instance.address,
            taisifu.address,
            timelock.address,
            govDelegate.address,
            args.votingPeriod,
            args.votingDelay,
            args.proposalThresholdBps,
            args.quorumVotesBps,
        )).deployed();

        const contracts: Record<ContractName, WorldContract> = {
            MultiPartRLEToSVG : { instance : multiPartRLEToSVG },
            SifusDescriptor : worldContracts.SifusDescriptor,
            SifusSeeder : worldContracts.SifusSeeder,
            SifusToken : worldContracts.SifusToken,
            TaiyiDAOExecutor: { instance : timelock },
            TaiyiDAOLogicV1: { instance : govDelegate },
            TaiyiDAOProxy: { instance : taiyiDAOProxy },
        };

        const sharedAddressPath = getAddressBookShareFilePath(process_args.network?process_args.network:"hard");
        let addressBook:{[index: string]:any} = {};
        for (const [name, contract] of Object.entries(worldContracts)) 
            addressBook[name] = contract.instance.address;
        for (const [name, contract] of Object.entries(contracts)) 
        {
            if(addressBook[name] != contract.instance.address)
                addressBook[name] = contract.instance.address;
        }
        await fs.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
        console.log(`contract deployed book:`);
        console.log(JSON.stringify(addressBook, null, 2));

        return contracts;
    });
