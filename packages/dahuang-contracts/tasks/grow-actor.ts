//npx hardhat node
//yarn task:grow-actor --network hard --actor 1
import fs from 'fs-extra';
import { task, types } from 'hardhat/config';
import {
    Actors__factory, ActorNames__factory, ActorTalents__factory, WorldFungible__factory, 
    ShejiTu__factory, WorldZones__factory, ActorAttributes__factory, WorldEvents__factory, AssetDaoli__factory,
} from '@taiyi/contracts/dist/typechain';
import { 
    ActorBehaviorAttributes__factory, ActorCharmAttributes__factory, ActorCoreAttributes__factory,
    ActorMoodAttributes__factory, 
} from '../typechain';
import { getAddressBookShareFilePath } from '../utils';
import { BigNumber } from 'ethers';

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
        let daoli = AssetDaoli__factory.connect(addressBook.AssetDaoli, operator1);

        let actor = args.actor;
        
        let _age = (await events.ages(actor)).toNumber();
        console.log(`wait and try grow to age ${_age+1} ...`);
        //授权时间线
        console.log(`approve actor#${actor.toString()} to Shejitu`);
        if((await actors.getApproved(actor)) != dahuang.address)
            await (await actors.approve(dahuang.address, actor)).wait();
        //授权actor的gold给时间线
        let yeming = await dahuang.operator();
        if((await golds.allowanceActor(actor, yeming)).lt(BigInt(1e29)))
            await (await golds.approveActor(actor, yeming, BigInt(1e29))).wait();
        if((await daoli.allowanceActor(actor, yeming)).lt(BigInt(1e29)))
            await (await daoli.approveActor(actor, yeming, BigInt(1e29))).wait();    
            
        let res = await (await dahuang.grow(actor, { gasLimit: 5000000 })).wait();

        // console.log(`Taiyi actor #${actor.toString()} age ${_age} uri by render mode 1:`);
        // let uri = await actors.tokenURIByMode(actor, 1);
        // logURI(uri);

        // console.log(`switch to render mode 1...`);
        // await (await actors.changeActorRenderMode(actor, 1)).wait();
        // console.log(`Taiyi actor #${actor.toString()} age${_age} uri:`);
        // uri = await actors.tokenURI(actor);
        // logURI(uri);

        // console.log(`switch to render mode 0...`);
        // await (await actors.changeActorRenderMode(actor, 0)).wait();
        // console.log(`Taiyi actor #${actor.toString()} age${_age} uri:`);
        // uri = await actors.tokenURI(actor);
        // logURI(uri);
});
