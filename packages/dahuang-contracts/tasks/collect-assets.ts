//npx hardhat node
//pnpm task:collect-assets --network hard --actor 5
import fs from 'fs-extra';
import { task, types } from 'hardhat/config';
import {
    Actors__factory, ActorNames__factory, ActorTalents__factory, WorldFungible__factory, 
    ShejiTu__factory, WorldZones__factory, ActorAttributes__factory, WorldEvents__factory, ActorLocations__factory, ParameterizedStorylines__factory,
} from '@taiyi/contracts/dist/typechain';
import { 
    ActorBehaviorAttributes__factory, ActorCharmAttributes__factory, ActorCoreAttributes__factory,
    ActorMoodAttributes__factory,
    WorldEventProcessor60505__factory, 
} from '../typechain';
import { getAddressBookShareFilePath } from '../utils';

const process_args = require('minimist')(process.argv.slice(2));

async function getContractAddress(net: string) : Promise<{[index: string]:any}> {
    // @ts-ignore
    const sharedAddressPath = getAddressBookShareFilePath(net);
    return JSON.parse(fs.readFileSync(sharedAddressPath, { encoding: "ascii"}));
}

let logURI = (uri : string) => {
    let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
    console.log(JSON.stringify(JSON.parse(uriDecode), null, 2));
};


task('collect-assets', '采集资源')
    .addOptionalParam('actor', 'The token ID of actor', 0, types.int)
    .addOptionalParam('zoneId', '采集地点', 0, types.int) //默认是角色当前所在地点
    .setAction(async (args, { ethers }) => {        
        const [deployer, taisifu, operator1, operator2] = await ethers.getSigners();

        let addressBook:{[index: string]:any} = await getContractAddress(process_args.network?process_args.network:"hard");

        let actors = Actors__factory.connect(addressBook.Actors, operator1);
        let names = ActorNames__factory.connect(addressBook.ActorNames, operator1);
        let talents = ActorTalents__factory.connect(addressBook.ActorTalents, operator1);
        let zones = WorldZones__factory.connect(addressBook.WorldZones, operator1);
        let baseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, operator1);        
        let locations = ActorLocations__factory.connect(addressBook.ActorLocations, operator1);
        
        let dahuang = ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
        let events = WorldEvents__factory.connect(addressBook.WorldEvents, operator1);
        let golds = WorldFungible__factory.connect(addressBook.AssetGold, operator1);
        let charmAttributes = ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, operator1);
        let behaviorAttributes = ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, operator1);
        let coreAttributes = ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, operator1);
        let moodAttributes = ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, operator1);
        let parameterizedStorylines = ParameterizedStorylines__factory.connect(addressBook.ParameterizedStorylines, operator1);

        let actor = args.actor;
        
        let evt60505 = WorldEventProcessor60505__factory.connect(addressBook.WorldEventProcessor60505, operator1);        
        console.log(`事件经手人：#${(await evt60505.eventOperator()).toNumber()}`);

        //恢复体力
        console.log("恢复体力...");
        await (await behaviorAttributes.recoverAct(actor)).wait();

        if(await evt60505.checkOccurrence(actor, 0)) {
            console.log("采集资源...");
            let zoneId = args.zoneId;
            if(zoneId == 0) {
                let lcs = await locations.actorLocations(actor);
                zoneId = lcs[1];
            }
            //授权角色给剧情
            console.log(`授权角色#${actor}……`);
            await (await actors.approve(dahuang.address, actor)).wait();
            console.log(`角色#${actor}正在采集资源……`);
            await (await dahuang.activeTrigger(60505, actor, [zoneId], [], { gasLimit: 20000000 })).wait();
        }
        else {
            console.log("event check occurrence failed!");
        }
});
