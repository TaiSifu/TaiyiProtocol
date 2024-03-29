//npx hardhat node
//pnpm task:deploy-event-processors --network hard
import fs from 'fs-extra';
import { Block } from '@ethersproject/abstract-provider';
import { task, types } from 'hardhat/config';
import {
    WorldContractRoute__factory, Actors__factory, WorldConstants__factory, WorldZones__factory, ActorAttributes__factory, 
    ActorSocialIdentity__factory, WorldYemings__factory, WorldRandom__factory, ActorLocations__factory, Trigrams__factory,
    WorldItems__factory, WorldEvents__factory, ActorTalents__factory, ShejiTu__factory, ShejiTuProxy, ShejiTuProxyAdmin,
    ShejiTu, AssetDaoli__factory, GlobalStoryRegistry__factory,
} from '@taiyi/contracts/dist/typechain';
import { BigNumber } from 'ethers';
import { getAddressBookShareFilePath, getConstructorArgumentsBookShareFilePath } from '../utils/addressConfig';
import { 
    deployActorBehaviorAttributes, deployActorCharmAttributes, deployActorCoreAttributes, deployActorMoodAttributes, 
    deployAssetFabric, deployAssetFood, deployAssetGold, deployAssetHerb, deployAssetPrestige, deployAssetWood, 
    deployDahuangConstants, deployDahuangWorld, deployTalentProcessors, deployWorldBuildings, deployWorldDeadActors, deployWorldSeasons, 
    deployWorldVillages, deployWorldZoneBaseResources, initBuildingTypes, initEvents, initItemTypes, initRelations, initSIDNames, initTalents, initTimeline, initZones, WorldContract } from '../utils';
import { 
    ActorBehaviorAttributes__factory,
    ActorCharmAttributes__factory,
    ActorCoreAttributes__factory,
    ActorMoodAttributes__factory,
    ActorRelationship__factory, DahuangConstants__factory, WorldBuildings__factory, WorldEventProcessor10000__factory, 
    WorldEventProcessor10001__factory, WorldEventProcessor10002__factory, WorldEventProcessor10003__factory, 
    WorldEventProcessor10008__factory, WorldEventProcessor10016__factory, WorldEventProcessor10017__factory, 
    WorldEventProcessor10018__factory, WorldEventProcessor10019__factory, WorldEventProcessor10020__factory, 
    WorldEventProcessor10021__factory, WorldEventProcessor10022__factory, WorldEventProcessor10023__factory, 
    WorldEventProcessor10024__factory, WorldEventProcessor10025__factory, WorldEventProcessor10026__factory, 
    WorldEventProcessor10027__factory, WorldEventProcessor10028__factory, WorldEventProcessor10029__factory, 
    WorldEventProcessor10030__factory, WorldEventProcessor10031__factory, WorldEventProcessor10032__factory, WorldEventProcessor10033__factory, WorldEventProcessor10062__factory, 
    WorldEventProcessor10110__factory, WorldEventProcessor10111__factory, WorldEventProcessor20028__factory, 
    WorldEventProcessor20029__factory, WorldEventProcessor60505__factory, WorldEventProcessor60510__factory, WorldEventProcessor60514__factory, 
    WorldEventProcessor60515__factory, WorldEventProcessor60516__factory, WorldEventProcessor60517__factory, 
    WorldEventProcessor60518__factory, WorldEventProcessor60519__factory, WorldEventProcessor60520__factory,
    WorldEventProcessor60521__factory, WorldEventProcessor60522__factory, WorldEventProcessor60523__factory, WorldEventProcessor80001__factory, WorldEventProcessor80002__factory, WorldEventProcessor80003__factory, WorldEventProcessor80004__factory, WorldEventProcessor80005__factory, WorldEventProcessor80006__factory, WorldEventProcessor80007__factory, WorldEventProcessor80008__factory, WorldEventProcessor80010__factory, WorldEventProcessor80011__factory, WorldEventProcessor80012__factory, WorldEventProcessor80013__factory, WorldEventProcessor80014__factory, WorldEventProcessor80015__factory, WorldEventProcessor80016__factory, WorldEventProcessor80017__factory, WorldEventProcessor80018__factory, WorldEventProcessor80019__factory,
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
        let globalStoryRegistry = GlobalStoryRegistry__factory.connect(addressBook.GlobalStoryRegistry, taisifu);
        let charmAttributes = ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, taisifu);
        let behaviorAttributes = ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, taisifu);
        let coreAttributes = ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, taisifu);
        let moodAttributes = ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, taisifu);

        let actorPanGu = 1;

        //Deploy dahuang contracts
        console.log(`部署事件`);
        // let evt60505 = await (await (new WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        // let evt60505Args = [worldContractRoute.address];
        // await (await worldEvents.setEventProcessor(60505, evt60505.address)).wait();
        // let evt10032 = await (await (new WorldEventProcessor10032__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        // let evt10032Args = [worldContractRoute.address];
        // await (await worldEvents.setEventProcessor(10032, evt10032.address)).wait();
        // let evt10033 = await (await (new WorldEventProcessor10033__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        // let evt10033Args = [worldContractRoute.address];
        // await (await worldEvents.setEventProcessor(10033, evt10033.address)).wait();
        let evt80010 = await (await (new WorldEventProcessor80010__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt80010Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(80010, evt80010.address)).wait();
        let evt80011 = await (await (new WorldEventProcessor80011__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt80011Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(80011, evt80011.address)).wait();
        let evt80012 = await (await (new WorldEventProcessor80012__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt80012Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(80012, evt80012.address)).wait();
        let evt80013 = await (await (new WorldEventProcessor80013__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt80013Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(80013, evt80013.address)).wait();
        let evt80014 = await (await (new WorldEventProcessor80014__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt80014Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(80014, evt80014.address)).wait();
        let evt80015 = await (await (new WorldEventProcessor80015__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt80015Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(80015, evt80015.address)).wait();
        let evt80016 = await (await (new WorldEventProcessor80016__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt80016Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(80016, evt80016.address)).wait();
        let evt80017 = await (await (new WorldEventProcessor80017__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt80017Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(80017, evt80017.address)).wait();
        let evt80018 = await (await (new WorldEventProcessor80018__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt80018Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(80018, evt80018.address)).wait();
        let evt80019 = await (await (new WorldEventProcessor80019__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        let evt80019Args = [worldContractRoute.address];
        await (await worldEvents.setEventProcessor(80019, evt80019.address)).wait();

        
        //save contract address
        //addressBook.WorldEventProcessor60505 = evt60505.address;
        // addressBook.WorldEventProcessor10032 = evt10032.address;
        // addressBook.WorldEventProcessor10033 = evt10033.address;
        addressBook.WorldEventProcessor80010 = evt80010.address;
        addressBook.WorldEventProcessor80011 = evt80011.address;
        addressBook.WorldEventProcessor80012 = evt80012.address;
        addressBook.WorldEventProcessor80013 = evt80013.address;
        addressBook.WorldEventProcessor80014 = evt80014.address;
        addressBook.WorldEventProcessor80015 = evt80015.address;
        addressBook.WorldEventProcessor80016 = evt80016.address;
        addressBook.WorldEventProcessor80017 = evt80017.address;
        addressBook.WorldEventProcessor80018 = evt80018.address;
        addressBook.WorldEventProcessor80019 = evt80019.address;
        const sharedAddressPath = getAddressBookShareFilePath(process_args.network?process_args.network:"hard");
        await fs.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
        console.log(`contract deployed book:`);
        console.log(JSON.stringify(addressBook, null, 2));

        //save constructor arguments
        //argsBook.WorldEventProcessor60505 = evt60505Args;
        // argsBook.WorldEventProcessor10032 = evt10032Args;
        // argsBook.WorldEventProcessor10033 = evt10033Args;
        argsBook.WorldEventProcessor80010 = evt80010Args;
        argsBook.WorldEventProcessor80011 = evt80011Args;
        argsBook.WorldEventProcessor80012 = evt80012Args;
        argsBook.WorldEventProcessor80013 = evt80013Args;
        argsBook.WorldEventProcessor80014 = evt80014Args;
        argsBook.WorldEventProcessor80015 = evt80015Args;
        argsBook.WorldEventProcessor80016 = evt80016Args;
        argsBook.WorldEventProcessor80017 = evt80017Args;
        argsBook.WorldEventProcessor80018 = evt80018Args;
        argsBook.WorldEventProcessor80019 = evt80019Args;
        const sharedArgsPath = getConstructorArgumentsBookShareFilePath(process_args.network?process_args.network:"hard");
        await fs.writeFile(sharedArgsPath, JSON.stringify(argsBook, null, 2));
        console.log(`contract constructor arguments book:`);
        console.log(JSON.stringify(argsBook, null, 2));

        //////增加事件
        // console.log(`配置时间线2岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(2, 10031, 1)).wait();
        // console.log(`配置时间线3岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(3, 10032, 1)).wait();
        // console.log(`配置时间线4岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(4, 10032, 1)).wait();
        // console.log(`配置时间线5岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(5, 10032, 200)).wait();
        // console.log(`配置时间线6岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(6, 10032, 200)).wait();
        // console.log(`配置时间线7岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(7, 10032, 100)).wait();
        // console.log(`配置时间线8岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(8, 10032, 100)).wait();
        // console.log(`配置时间线9岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(9, 10032, 100)).wait();
        // console.log(`配置时间线10岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(10, 10032, 100)).wait();
        // console.log(`配置时间线11岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(11, 10032, 100)).wait();
        // console.log(`配置时间线12岁`);
        // await (await shejiTu.connect(deployer).addAgeEvent(12, 10032, 100)).wait();

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
        // await (await shejiTu.connect(deployer).setAgeEventProb(7, 10032, 100)).wait();
        // console.log(`配置时间线8岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(8, 10032, 100)).wait();
        // console.log(`配置时间线9岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(9, 10032, 100)).wait();
        // console.log(`配置时间线10岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(10, 60001, 0)).wait();
        // console.log(`配置时间线11岁`);
        // await (await shejiTu.connect(deployer).setAgeEventProb(11, 60001, 0)).wait();

        //注册全局剧情起始事件
        console.log(`注册全局剧情起始事件80010`);
        await (await globalStoryRegistry.connect(taisifu).registerStory(actorPanGu, 80010, 0)).wait();


        //入驻角色
        // let newOP = 63;
        // console.log(`入驻角色${newOP}`);
        // await (await actors.connect(operator1).transferFrom(operator1.address, deployer.address, newOP)).wait();
        // await (await actors.connect(deployer).approve(evt60505.address, newOP)).wait();
        // await (await evt60505.initOperator(newOP)).wait();

        //60505配置属性模块
        // console.log("配置属性模块");
        // await (await evt60505.registerAttributeModule(baseAttributes.address)).wait();
        // await (await evt60505.registerAttributeModule(charmAttributes.address)).wait();
        // await (await evt60505.registerAttributeModule(coreAttributes.address)).wait();
        // await (await evt60505.registerAttributeModule(moodAttributes.address)).wait();
        // await (await evt60505.registerAttributeModule(behaviorAttributes.address)).wait();
    });
