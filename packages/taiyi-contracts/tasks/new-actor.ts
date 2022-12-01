//npx hardhat node
//yarn task:grow-actor --network hard
import fs from 'fs-extra';
import { task, types } from 'hardhat/config';
import { 
    ActorAttributes__factory, ActorBehaviorAttributes__factory, ActorCharmAttributes__factory, ActorCoreAttributes__factory,
    ActorMoodAttributes__factory, ActorNames__factory, Actors__factory, ActorTalents__factory, ShejiTu__factory,
    WorldFungible__factory, WorldZones__factory 
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

task('new-actor', 'Mint an actor')
    .setAction(async (args, { ethers }) => {        
        const [deployer, taisifu, operator1, operator2] = await ethers.getSigners();

        let addressBook:{[index: string]:any} = await getContractAddress(process_args.network?process_args.network:"hard");

        let actors = Actors__factory.connect(addressBook.Actors, operator1);
        let names = ActorNames__factory.connect(addressBook.ActorNames, operator1);
        let talents = ActorTalents__factory.connect(addressBook.ActorTalents, operator1);
        let shejitu = ShejiTu__factory.connect(addressBook.ShejituProxy, operator1);
        let daoli = WorldFungible__factory.connect(addressBook.AssetDaoli, operator1);
        let golds = WorldFungible__factory.connect(addressBook.AssetGold, operator1);
        let zones = WorldZones__factory.connect(addressBook.WorldZones, operator1);
        let baseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, operator1);        
        let charmAttributes = ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, operator1);
        let behaviorAttributes = ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, operator1);
        let coreAttributes = ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, operator1);
        let moodAttributes = ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, operator1);
        
        let actor = await actors.nextActor();
        console.log("授权道理扣费权给角色合约...");
        await daoli.approve(actors.address, BigInt(1000e18));
        console.log("铸造角色...");
        await actors.mintActor(BigInt(1000e18));
        console.log("角色出生在社稷图...");
        await actors.approve(shejitu.address, actor);
        await shejitu.bornActor(actor);

        console.log("角色随机取名...");
        let actorNameId = await names.nextName();
        let firstName = `小拼${Math.round(Math.random()*100)}`;
        await names.claim(firstName, "李", actor);

        console.log("初始化角色天赋...");
        await talents.talentActor(actor);

        console.log("初始化角色属性...");
        await baseAttributes.pointActor(actor);
        await charmAttributes.pointActor(actor);
        await coreAttributes.pointActor(actor);
        await moodAttributes.pointActor(actor);
        await behaviorAttributes.pointActor(actor);        

        console.log(`Actor#${actor} has been minted with name \"${(await names.actorName(actor))._name}\" to address ${await actors.ownerOf(actor)}.`);
        console.log(`Taiyi actor #${actor.toString()} uri:`);
        logURI(await actors.tokenURI(actor));
   });
