//npx hardhat node
//yarn task:deploy-demo --network hard
import fs from 'fs-extra';
import { Block } from '@ethersproject/abstract-provider';
import { task, types } from 'hardhat/config';
import {
    WorldContractRoute__factory, Actors__factory, WorldConstants__factory, WorldZones__factory, ActorAttributes__factory, 
    ActorSocialIdentity__factory, WorldYemings__factory, WorldRandom__factory, ActorLocations__factory, Trigrams__factory,
    WorldItems__factory,
} from '@taiyi/contracts/dist/typechain';
import { BigNumber } from 'ethers';
import { getAddressBookShareFilePath } from '../utils/addressConfig';
import { deployDahuangWorld, WorldContract } from '../utils';

const process_args = require('minimist')(process.argv.slice(2));

async function getContractAddress(net: string) : Promise<{[index: string]:any}> {
    // @ts-ignore
    const sharedAddressPath = getAddressBookShareFilePath(net);
    return JSON.parse(fs.readFileSync(sharedAddressPath, { encoding: "ascii"}));
}    

type ContractName =
    //| 'WETH'
    | 'ShejiTu'
    | 'ShejiTuProxyAdmin'
    | 'ShejiTuProxy';

task('deploy-demo', '部署全套大荒合约开发用例')
    .addOptionalParam('oneAgeVSecond', '生长1岁的间隔期 (seconds)', 60 * 60 * 24, types.int) // Default: 1 day
    .addOptionalParam('actRecoverTimeDay', '行动力恢复期 (seconds)', 60 * 60 * 24, types.int) // Default: 1 day
    .addOptionalParam('zoneResourceGrowTimeDay', '野外区域资源生长期 (seconds)', 60 * 60 * 24, types.int) // Default: 1 day
    .addOptionalParam('zoneResourceGrowQuantityScale', '资源生长系数 (基点1000=1.0)', 1000, types.int) // Default: 1.0
    .addOptionalParam('worldConstants', '基础合约常量地址', "0x00", types.string)
    .addOptionalParam('worldContractRoute', '太乙路由合约地址', "0x00", types.string)
    .addOptionalParam('actors', '角色合约地址', "0x00", types.string)
    .addOptionalParam('worldRandom', '随机数合约地址', "0x00", types.string)
    .addOptionalParam('worldZones', '区域合约地址', "0x00", types.string)
    .addOptionalParam('worldYemings', '噎明记录合约地址', "0x00", types.string)
    .addOptionalParam('actorAttributes', '角色基础属性合约地址', "0x00", types.string)
    .addOptionalParam('actorSocialIdentity', '角色社会身份合约地址', "0x00", types.string)
    .addOptionalParam('actorLocations', '角色定位合约地址', "0x00", types.string)
    .addOptionalParam('trigrams', '符文合约地址', "0x00", types.string)
    .addOptionalParam('worldItems', '物品合约地址', "0x00", types.string)
    .setAction(async (args, { ethers }) => {
        //const network = await ethers.provider.getNetwork();        
        // if (network.chainId !== 31337) {
        //     console.log(`Invalid chain id. Expected 31337. Got: ${network.chainId}.`);
        //     return;
        // }

        let addressBook:{[index: string]:any} = await getContractAddress(process_args.network?process_args.network:"hard");

        const [deployer, taisifu] = await ethers.getSigners();
        console.log(`Deployer: ${deployer.address}`);
        console.log(`Taisifu: ${taisifu.address}`);

        let worldConstants = WorldConstants__factory.connect(args.worldConstants=="0x00"?addressBook.WorldConstants:args.worldConstants, taisifu);
        let worldContractRoute = WorldContractRoute__factory.connect(args.worldContractRoute=="0x00"?addressBook.WorldContractRoute:args.worldContractRoute, taisifu);
        let actors = Actors__factory.connect(args.actors=="0x00"?addressBook.Actors:args.actors, taisifu);
        let zones = WorldZones__factory.connect(args.worldZones=="0x00"?addressBook.WorldZones:args.worldZones, taisifu);
        let worldYemings = WorldYemings__factory.connect(args.worldYemings=="0x00"?addressBook.WorldYemings:args.worldYemings, taisifu);
        let baseAttributes = ActorAttributes__factory.connect(args.actorAttributes=="0x00"?addressBook.ActorAttributes:args.actorAttributes, taisifu);
        let actorSIDs = ActorSocialIdentity__factory.connect(args.actorSocialIdentity=="0x00"?addressBook.ActorSocialIdentity:args.actorSocialIdentity, taisifu);
        let worldRandom = WorldRandom__factory.connect(args.worldRandom=="0x00"?addressBook.WorldRandom:args.worldRandom, taisifu);
        let actorLocations = ActorLocations__factory.connect(args.actorLocations=="0x00"?addressBook.ActorLocations:args.actorLocations, taisifu);
        let trigrams = Trigrams__factory.connect(args.trigrams=="0x00"?addressBook.Trigrams:args.trigrams, taisifu);
        let worldItems = WorldItems__factory.connect(args.worldItems=="0x00"?addressBook.WorldItems:args.worldItems, taisifu);

        //Deploy dahuang world
        let worldDeployed = await deployDahuangWorld(
            args.oneAgeVSecond,
            args.actRecoverTimeDay,
            args.zoneResourceGrowTimeDay,
            args.zoneResourceGrowQuantityScale,
            worldContractRoute, worldConstants, actors, actorLocations, worldYemings, zones, baseAttributes, trigrams, 
            worldRandom, worldItems, actorSIDs, 
            deployer, taisifu, 
            {}, true);
        let dahuangContracts = worldDeployed.worldContracts;

        //register actors uri modules
        await actors.registerURIPartModule(dahuangContracts.ShejituProxy.instance.address);
        
        const contracts: Record<ContractName, WorldContract> = {
            ShejiTu : dahuangContracts.Shejitu,
            ShejiTuProxyAdmin : dahuangContracts.ShejituProxyAdmin,
            ShejiTuProxy : dahuangContracts.ShejituProxy,
        };

        const sharedAddressPath = getAddressBookShareFilePath(process_args.network?process_args.network:"hard");
        for (const [name, contract] of Object.entries(dahuangContracts)) 
            addressBook[name] = contract.instance.address;
        for (const [name, contract] of Object.entries(contracts)) 
        {
            if(addressBook[name] != contract.instance.address)
                addressBook[name] = contract.instance.address;
        }
        addressBook = Object.assign(addressBook, addressBook, worldDeployed.eventProcessorAddressBook);
        await fs.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
        console.log(`contract deployed book:`);
        console.log(JSON.stringify(addressBook, null, 2));

        return contracts;
    });
