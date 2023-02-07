//npx hardhat node
//yarn task:do --network hard
import fs from 'fs-extra';
import { task, types } from 'hardhat/config';
import {
    Actors__factory, ActorNames__factory, ActorTalents__factory, WorldFungible__factory, 
    ShejiTu__factory, WorldZones__factory, ActorAttributes__factory, WorldEvents__factory, ActorLocations__factory, AssetDaoli, AssetDaoli__factory, WorldItems, WorldItems__factory,
} from '@taiyi/contracts/dist/typechain';
import { 
    ActorBehaviorAttributes__factory, ActorCharmAttributes__factory, ActorCoreAttributes__factory,
    ActorMoodAttributes__factory,
    WorldEventProcessor60505__factory,
    WorldEventProcessor60509__factory,
    WorldEventProcessor60510__factory,
    WorldEventProcessor60514__factory,
    WorldEventProcessor60515__factory,
    WorldEventProcessor60518__factory,
    WorldVillages__factory, 
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


task('do', '做一些事情')
    .setAction(async (args, { ethers }) => {        
        const [deployer, taisifu, operator1, operator2] = await ethers.getSigners();

        let addressBook:{[index: string]:any} = await getContractAddress(process_args.network?process_args.network:"hard");

        let actors = Actors__factory.connect(addressBook.Actors, operator1);
        let names = ActorNames__factory.connect(addressBook.ActorNames, operator1);
        let talents = ActorTalents__factory.connect(addressBook.ActorTalents, operator1);
        let zones = WorldZones__factory.connect(addressBook.WorldZones, operator1);
        let baseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, operator1);        
        let locations = ActorLocations__factory.connect(addressBook.ActorLocations, operator1);
        let daoli = AssetDaoli__factory.connect(addressBook.AssetDaoli, operator1);
        let items = WorldItems__factory.connect(addressBook.WorldItems, operator1);
        
        let dahuang = ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
        let events = WorldEvents__factory.connect(addressBook.WorldEvents, operator1);
        let golds = WorldFungible__factory.connect(addressBook.AssetGold, operator1);
        let woods = WorldFungible__factory.connect(addressBook.AssetWood, operator1);
        let charmAttributes = ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, operator1);
        let behaviorAttributes = ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, operator1);
        let coreAttributes = ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, operator1);
        let moodAttributes = ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, operator1);
        let worldVillages = WorldVillages__factory.connect(addressBook.WorldVillages, operator1);
        
        let shejiTu = ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);

        if(0) {
            console.log("兑换资源");
            let actor = 14;
            //恢复体力
            console.log("恢复体力...");
            await (await behaviorAttributes.recoverAct(actor)).wait();

            let evt60515 = WorldEventProcessor60515__factory.connect(addressBook.WorldEventProcessor60515, operator1);        
            if(await evt60515.checkOccurrence(actor, 0)) {
                console.log("开始行动...");
                let assetId = await woods.moduleID();
                let amount = await woods.balanceOfActor(actor);
                console.log(`amount=${amount}`);
                //let daoliBefore = await daoli.balanceOfActor(actor);
                await woods.approveActor(actor, await shejiTu.operator(), amount);
                await (await shejiTu.activeTrigger(60515, actor, [assetId, amount], [])).wait();
            }
            else {
                console.log("event check occurrence failed!");
            }
        }

        if(0) {
            console.log("移动到太乙村");
            let actor = 25;
            //恢复体力
            console.log("恢复体力...");
            await (await behaviorAttributes.recoverAct(actor)).wait();

            let evt60509 = WorldEventProcessor60509__factory.connect(addressBook.WorldEventProcessor60509, operator1);        
            if(await evt60509.checkOccurrence(actor, 0)) {
                console.log("开始行动...");
                let lcs = await locations.actorLocations(actor);
                await (await shejiTu.activeTrigger(60509, actor, [lcs[1], 2], [])).wait();
            }
            else {
                console.log("event check occurrence failed!");
            }
        }

        if(0) {
            console.log("结束旅行");
            let actor = 25;
            await (await locations.finishActorTravel(actor)).wait();
        }

        if(0) {
            console.log("制作木工箱");
            let actor = 25;
            //恢复体力
            console.log("恢复体力...");
            await (await behaviorAttributes.recoverAct(actor)).wait();

            let evt60510 = WorldEventProcessor60510__factory.connect(addressBook.WorldEventProcessor60510, operator1);        
            if(await evt60510.checkOccurrence(actor, 0)) {
                console.log("开始行动...");
                await golds.approveActor(actor, await shejiTu.operator(), BigInt(1e29));
                await woods.approveActor(actor, await shejiTu.operator(), BigInt(1e29));
                await (await shejiTu.activeTrigger(60510, actor, [], [])).wait();
            }
            else {
                console.log("event check occurrence failed!");
            }
        }

        if(1) {
            console.log("要求村长捐款");
            let fromActor = 21;
            let assetId = 209; //金石
            let evt60518 = WorldEventProcessor60518__factory.connect(addressBook.WorldEventProcessor60518, operator1);        
            if(await evt60518.checkOccurrence(1, 0)) {
                console.log("开始行动...");
                await (await shejiTu.connect(taisifu).activeTrigger(60518, 1, [fromActor, assetId, BigInt(150e18)], [])).wait();
            }
            else {
                console.log("event check occurrence failed!");
            }
        }

        if(0) {
            console.log("创建村庄");
            await (await worldVillages.connect(taisifu).createVillage(1, 3, 2)).wait();
        }

});
