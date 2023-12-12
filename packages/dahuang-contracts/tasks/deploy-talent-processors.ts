//npx hardhat node
//pnpm task:deploy-talent-processors --network hard
import fs from 'fs-extra';
import { Block } from '@ethersproject/abstract-provider';
import { task, types } from 'hardhat/config';
import {
    WorldContractRoute__factory, Actors__factory, WorldConstants__factory, WorldZones__factory, ActorAttributes__factory, 
    ActorSocialIdentity__factory, WorldYemings__factory, WorldRandom__factory, ActorLocations__factory, Trigrams__factory,
    WorldItems__factory, WorldEvents__factory, ActorTalents__factory, ShejiTu__factory, ShejiTuProxy, ShejiTuProxyAdmin,
    ShejiTu, AssetDaoli__factory,
} from '@taiyi/contracts/dist/typechain';
import { BigNumber } from 'ethers';
import { getAddressBookShareFilePath, getConstructorArgumentsBookShareFilePath } from '../utils/addressConfig';
import { WorldContract } from '../utils';
import { 
    ActorTalentProcessor1010__factory,
    ActorTalentProcessor1049__factory,
    DahuangConstants__factory, 
} from '../typechain';
import { deployActorTalents } from '@taiyi/contracts/dist/utils';

const process_args = require('minimist')(process.argv.slice(2));

async function getContractAddress(net: string) : Promise<{[index: string]:any}> {
    // @ts-ignore
    const sharedAddressPath = getAddressBookShareFilePath(net);
    return JSON.parse(fs.readFileSync(sharedAddressPath, { encoding: "ascii"}));
}    

async function getContractConstructArgs(net: string): Promise<{ [index: string]: any }> {
    // @ts-ignore
    const sharedAddressPath = getConstructorArgumentsBookShareFilePath(net);
    return JSON.parse(fs.readFileSync(sharedAddressPath, { encoding: "ascii" }));
}

task('deploy-talent-processors', '部署大荒天赋合约')
    .setAction(async (args, { ethers }) => {
        let addressBook:{[index: string]:any} = await getContractAddress(process_args.network?process_args.network:"hard");
        let argsBook: { [index: string]: any } = await getContractConstructArgs(process_args.network ? process_args.network : "hard");

        const [deployer, taisifu, operator1] = await ethers.getSigners();
        console.log(`Deployer: ${deployer.address}`);
        console.log(`Taisifu: ${taisifu.address}`);
        console.log(`Operator1: ${operator1.address}`);

        let worldConstants = WorldConstants__factory.connect(addressBook.WorldConstants, taisifu);
        let worldContractRoute = WorldContractRoute__factory.connect(addressBook.WorldContractRoute, taisifu);
        let actors = Actors__factory.connect(addressBook.Actors, taisifu);
        let zones = WorldZones__factory.connect(addressBook.WorldZones, taisifu);
        let worldYemings = WorldYemings__factory.connect(addressBook.WorldYemings, taisifu);
        let baseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, taisifu);
        let actorSIDs = ActorSocialIdentity__factory.connect(addressBook.ActorSocialIdentity, taisifu);
        let worldRandom = WorldRandom__factory.connect(addressBook.WorldRandom, taisifu);
        let actorLocations = ActorLocations__factory.connect(addressBook.ActorLocations, taisifu);
        let trigrams = Trigrams__factory.connect(addressBook.Trigrams, taisifu);
        let worldItems = WorldItems__factory.connect(addressBook.WorldItems, taisifu);
        let assetDaoli = AssetDaoli__factory.connect(addressBook.AssetDaoli, taisifu);

        let dahuangConstants = DahuangConstants__factory.connect(addressBook.DahuangConstants, taisifu);
        let worldEvents = WorldEvents__factory.connect(addressBook.WorldEvents, taisifu);
        let shejiTu = ShejiTu__factory.connect(addressBook.ShejiTuProxy, taisifu);
        let talents = ActorTalents__factory.connect(addressBook.ActorTalents, taisifu);

        //Deploy dahuang contracts
        console.log(`部署天赋`);
        let processor1010 = await (await (new ActorTalentProcessor1010__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let processor1010Args = [worldContractRoute.address];
        await (await talents.setTalentProcessor(1010, processor1010.address)).wait();
        let processor1049 = await (await (new ActorTalentProcessor1049__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let processor1049Args = [worldContractRoute.address];
        await (await talents.setTalentProcessor(1049, processor1049.address)).wait();
                    
        //save contract address
        addressBook.ActorTalentProcessor1010 = processor1010.address;
        addressBook.ActorTalentProcessor1049 = processor1049.address;
        const sharedAddressPath = getAddressBookShareFilePath(process_args.network?process_args.network:"hard");
        await fs.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
        console.log(`contract deployed book:`);
        console.log(JSON.stringify(addressBook, null, 2));

        //save constructor arguments
        argsBook.ActorTalentProcessor1010 = processor1010Args;
        argsBook.ActorTalentProcessor1049 = processor1049Args;
        const sharedArgsPath = getConstructorArgumentsBookShareFilePath(process_args.network?process_args.network:"hard");
        await fs.writeFile(sharedArgsPath, JSON.stringify(argsBook, null, 2));
        console.log(`contract constructor arguments book:`);
        console.log(JSON.stringify(argsBook, null, 2));

        //配置天赋

        //入驻角色
        // let newOP = 30;
        // console.log(`入驻角色${newOP}`);
        // await (await actors.connect(operator1).transferFrom(operator1.address, deployer.address, newOP)).wait();
        // await (await actors.connect(deployer).approve(evt60517.address, newOP)).wait();
        // await (await evt60517.initOperator(newOP)).wait();
    });
