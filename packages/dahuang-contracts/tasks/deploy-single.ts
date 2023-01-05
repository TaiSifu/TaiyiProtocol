//npx hardhat node
//yarn task:deploy-single --network hard
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
    deployDahuangConstants, deployDahuangWorld, deployTalentProcessors, deployWorldBuildings, deployWorldSeasons, 
    deployWorldVillages, deployWorldZoneBaseResources, initBuildingTypes, initEvents, initItemTypes, initRelations, initSIDNames, initTalents, initTimeline, initZones, WorldContract } from '../utils';
import { ActorRelationship__factory, DahuangConstants__factory, WorldBuildings__factory } from '../typechain';
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

task('deploy-single', '部署单一大荒合约')
    .setAction(async (args, { ethers }) => {
        let addressBook:{[index: string]:any} = await getContractAddress(process_args.network?process_args.network:"hard");
        let argsBook: { [index: string]: any } = await getContractConstructArgs(process_args.network ? process_args.network : "hard");

        const [deployer, taisifu] = await ethers.getSigners();
        console.log(`Deployer: ${deployer.address}`);
        console.log(`Taisifu: ${taisifu.address}`);

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

        let worldEvents = WorldEvents__factory.connect(addressBook.WorldEvents, taisifu);
        let shejiTu = ShejiTu__factory.connect(addressBook.ShejiTuProxy, taisifu);

        //Deploy dahuang contracts
        // console.log("Deploy WorldZoneBaseResources...");
        // let zoneResourceGrowTimeDay = 3600;
        // let zoneResourceGrowQuantityScale = 1000;
        // let worldZoneBaseResources = await deployWorldZoneBaseResources(zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, worldContractRoute, deployer);
        // let worldZoneBaseResourcesArgs = [zoneResourceGrowTimeDay, zoneResourceGrowQuantityScale, worldContractRoute.address];
        // let worldZoneBaseResourceOperator = await actors.nextActor();
        // await assetDaoli.connect(deployer).approve(actors.address, BigInt(100e18));
        // await (await actors.connect(deployer).mintActor(BigInt(100e18))).wait();
        // await (await actors.connect(deployer).approve(worldZoneBaseResources.address, worldZoneBaseResourceOperator)).wait();
        // await (await worldZoneBaseResources.initOperator(worldZoneBaseResourceOperator)).wait();
        // console.log(`Mint GuanGong as actor#${await worldZoneBaseResources.ACTOR_GUANGONG()}.`);
        // await (await worldContractRoute.registerModule(await dahuangConstants.WORLD_MODULE_ZONE_BASE_RESOURCES(), worldZoneBaseResources.address)).wait();
                    
        // //save contract address
        // addressBook.WorldZoneBaseResources = worldZoneBaseResources.address;
        // const sharedAddressPath = getAddressBookShareFilePath(process_args.network?process_args.network:"hard");
        // await fs.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
        // console.log(`contract deployed book:`);
        // console.log(JSON.stringify(addressBook, null, 2));

        // //save constructor arguments
        // argsBook.WorldZoneBaseResources = worldZoneBaseResourcesArgs;
        // const sharedArgsPath = getConstructorArgumentsBookShareFilePath(process_args.network?process_args.network:"hard");
        // await fs.writeFile(sharedArgsPath, JSON.stringify(argsBook, null, 2));
        // console.log(`contract constructor arguments book:`);
        // console.log(JSON.stringify(argsBook, null, 2));

        console.log("Initialize Dahuang Timeline...");
        await initTimeline(shejiTu.address, deployer);
    });
