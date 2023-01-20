//npx hardhat node
//yarn task:deploy-event-processors --network hard
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
import { 
    deployActorBehaviorAttributes, deployActorCharmAttributes, deployActorCoreAttributes, deployActorMoodAttributes, 
    deployAssetFabric, deployAssetFood, deployAssetGold, deployAssetHerb, deployAssetPrestige, deployAssetWood, 
    deployDahuangConstants, deployDahuangWorld, deployTalentProcessors, deployWorldBuildings, deployWorldDeadActors, deployWorldSeasons, 
    deployWorldVillages, deployWorldZoneBaseResources, initBuildingTypes, initEvents, initItemTypes, initRelations, initSIDNames, initTalents, initTimeline, initZones, WorldContract } from '../utils';
import { 
    ActorRelationship__factory, DahuangConstants__factory, WorldBuildings__factory, WorldEventProcessor10000__factory, 
    WorldEventProcessor10001__factory, WorldEventProcessor10002__factory, WorldEventProcessor10003__factory, 
    WorldEventProcessor10008__factory, WorldEventProcessor10016__factory, WorldEventProcessor10017__factory, 
    WorldEventProcessor10018__factory, WorldEventProcessor10019__factory, WorldEventProcessor10020__factory, 
    WorldEventProcessor10021__factory, WorldEventProcessor10022__factory, WorldEventProcessor10023__factory, 
    WorldEventProcessor10024__factory, WorldEventProcessor10025__factory, WorldEventProcessor10026__factory, 
    WorldEventProcessor10027__factory, WorldEventProcessor10028__factory, WorldEventProcessor10029__factory, 
    WorldEventProcessor10030__factory, WorldEventProcessor10031__factory, WorldEventProcessor10062__factory, 
    WorldEventProcessor10110__factory, WorldEventProcessor10111__factory, WorldEventProcessor20028__factory, 
    WorldEventProcessor20029__factory, WorldEventProcessor60510__factory, WorldEventProcessor60514__factory, 
    WorldEventProcessor60515__factory, WorldEventProcessor60516__factory, WorldEventProcessor60517__factory, 
    WorldEventProcessor60518__factory, WorldEventProcessor60519__factory, WorldEventProcessor60520__factory,
    WorldEventProcessor60521__factory, WorldEventProcessor60522__factory, WorldEventProcessor60523__factory,
 } from '../typechain';
import { deployActorBornPlaces, deployActorRelationship, deployActorTalents, deployShejiTu, deployWorldEvents } from '@taiyi/contracts/dist/utils';

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

task('deploy-event-processors', '部署大荒事件合约')
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

        //Deploy dahuang contracts
        console.log(`部署事件`);
        let evt60519 = await (await (new WorldEventProcessor60519__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt60519Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(60519, evt60519.address)).wait();
        let evt60520 = await (await (new WorldEventProcessor60520__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt60520Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(60520, evt60520.address)).wait();
        let evt60521 = await (await (new WorldEventProcessor60521__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt60521Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(60521, evt60521.address)).wait();
        let evt60522 = await (await (new WorldEventProcessor60522__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt60522Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(60522, evt60522.address)).wait();
        let evt60523 = await (await (new WorldEventProcessor60523__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt60523Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(60523, evt60523.address)).wait();
                    
        //save contract address
        addressBook.WorldEventProcessor60519 = evt60519.address;
        addressBook.WorldEventProcessor60520 = evt60520.address;
        addressBook.WorldEventProcessor60521 = evt60521.address;
        addressBook.WorldEventProcessor60522 = evt60522.address;
        addressBook.WorldEventProcessor60523 = evt60523.address;
        const sharedAddressPath = getAddressBookShareFilePath(process_args.network?process_args.network:"hard");
        await fs.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
        console.log(`contract deployed book:`);
        console.log(JSON.stringify(addressBook, null, 2));

        //save constructor arguments
        argsBook.WorldEventProcessor60519 = evt60519Args;
        argsBook.WorldEventProcessor60520 = evt60520Args;
        argsBook.WorldEventProcessor60521 = evt60521Args;
        argsBook.WorldEventProcessor60522 = evt60522Args;
        argsBook.WorldEventProcessor60523 = evt60523Args;
        const sharedArgsPath = getConstructorArgumentsBookShareFilePath(process_args.network?process_args.network:"hard");
        await fs.writeFile(sharedArgsPath, JSON.stringify(argsBook, null, 2));
        console.log(`contract constructor arguments book:`);
        console.log(JSON.stringify(argsBook, null, 2));

        //////增加事件
        // console.log(`配置时间线2岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(2, 10031, 1)).wait();
        // console.log(`配置时间线3岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(3, 10031, 1)).wait();
        // console.log(`配置时间线4岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(4, 10031, 1)).wait();
        // console.log(`配置时间线5岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(5, 10031, 200)).wait();
        // console.log(`配置时间线6岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(6, 10031, 200)).wait();
        // console.log(`配置时间线7岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(7, 10031, 100)).wait();
        // console.log(`配置时间线8岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(8, 10031, 100)).wait();
        // console.log(`配置时间线9岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(9, 10031, 100)).wait();
        // console.log(`配置时间线10岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(10, 10031, 100)).wait();
        // console.log(`配置时间线11岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(11, 10031, 100)).wait();
        // console.log(`配置时间线12岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(12, 60001, 100)).wait();

        //////编辑事件概率

        // console.log(`配置时间线2岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(2, 60001, 0)).wait();
        // console.log(`配置时间线3岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(3, 60001, 0)).wait();
        // console.log(`配置时间线4岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(4, 60001, 0)).wait();
        // console.log(`配置时间线5岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(5, 60001, 0)).wait();
        // console.log(`配置时间线6岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(6, 60001, 0)).wait();
        // console.log(`配置时间线7岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(7, 60001, 0)).wait();
        // console.log(`配置时间线8岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(8, 60001, 0)).wait();
        // console.log(`配置时间线9岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(9, 60001, 0)).wait();
        // console.log(`配置时间线10岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(10, 60001, 0)).wait();
        // console.log(`配置时间线11岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(11, 60001, 0)).wait();

        //入驻角色
        // let newOP = 30;
        // console.log(`入驻角色${newOP}`);
        // await (await actors.connect(operator1).transferFrom(operator1.address, deployer.address, newOP)).wait();
        // await (await actors.connect(deployer).approve(evt60517.address, newOP)).wait();
        // await (await evt60517.initOperator(newOP)).wait();
    });
