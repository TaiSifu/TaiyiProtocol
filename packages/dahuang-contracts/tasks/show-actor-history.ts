//npx hardhat node
//pnpm task:show-actor-history --network hard --actor 5
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


task('show-actor-history', '显示角色经历')
    .addOptionalParam('actor', 'The token ID of actor', 0, types.int)
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
        
        let shejiTu = ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
        let evt60505 = WorldEventProcessor60505__factory.connect(addressBook.WorldEventProcessor60505, operator1);        

        if((await actors.mintTime(actor)).eq(0)) {
            console.log(`角色#${actor}不存在。`);
            return;
        }
    
        let currentAge = (await events.ages(actor)).toNumber();
        let name = (await names.actorName(actor))._name;
        name = (name==""?"无名氏":name);

        console.log(`${name}(角色#${actor})的成长经历：`);
        for (var a = 0; a <= currentAge; a++) {
            console.log(`${a==0?"出生":(a+"岁")}：`);
            let evts = await events.actorEvent(actor, a);
            for(var e = 0; e < evts.length; e++) {
                let eventId = evts[e];
                let eventInfo = await events.eventInfo(eventId, actor);
                console.log(`-[${eventId.toString()}]` + eventInfo);
            }
        }
});
