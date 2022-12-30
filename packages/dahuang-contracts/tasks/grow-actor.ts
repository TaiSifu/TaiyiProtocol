//npx hardhat node
//yarn task:grow-actor --network hard
import fs from 'fs-extra';
import { task, types } from 'hardhat/config';
import {
    Actors__factory, ActorNames__factory, ActorTalents__factory, WorldFungible__factory, 
    ShejiTu__factory, WorldZones__factory, ActorAttributes__factory, WorldEvents__factory,
} from '@taiyi/contracts/dist/typechain';
import { 
    ActorBehaviorAttributes__factory, ActorCharmAttributes__factory, ActorCoreAttributes__factory,
    ActorMoodAttributes__factory, 
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


task('grow-actor', '成长角色')
    .addOptionalParam('actor', 'The token ID of actor', 0, types.int)
    .setAction(async (args, { ethers }) => {        
        const [deployer, taisifu, operator1, operator2] = await ethers.getSigners();

        let addressBook:{[index: string]:any} = await getContractAddress(process_args.network?process_args.network:"hard");

        let actors = Actors__factory.connect(addressBook.Actors, operator1);
        let names = ActorNames__factory.connect(addressBook.ActorNames, operator1);
        let talents = ActorTalents__factory.connect(addressBook.ActorTalents, operator1);
        let dahuang = ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
        let events = WorldEvents__factory.connect(addressBook.WorldEvents, operator1);
        let golds = WorldFungible__factory.connect(addressBook.AssetGold, operator1);
        let zones = WorldZones__factory.connect(addressBook.WorldZones, operator1);
        let baseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, operator1);        
        let charmAttributes = ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, operator1);
        let behaviorAttributes = ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, operator1);
        let coreAttributes = ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, operator1);
        let moodAttributes = ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, operator1);

        let actor = args.actor;
        
        let _age = (await events.ages(actor)).toNumber();
        console.log(`wait and try grow to age${_age+1} ...`);
        //授权时间线
        console.log(`approve actor#${actor.toString()} to Shejitu`);
        await (await actors.approve(dahuang.address, actor)).wait();
        //授权actor的gold给时间线
        await golds.approveActor(actor, await dahuang.operator(), BigInt(1000e18));
        
        let res = await dahuang.grow(actor, { gasLimit: 5000000 });

        console.log(`Taiyi actor #${actor.toString()} age${_age} uri by render mode 1:`);
        let uri = await actors.tokenURIByMode(actor, 1);
        logURI(uri);

        console.log(`switch to render mode 0...`);
        await actors.changeActorRenderMode(actor, 0);
        uri = await actors.tokenURI(actor);
        console.log(`Taiyi actor #${actor.toString()} age${_age} uri:`);
        logURI(uri);
        
        console.log(`switch to render mode 1...`);
        await actors.changeActorRenderMode(actor, 1);
        uri = await actors.tokenURI(actor);
        logURI(uri);
   });
