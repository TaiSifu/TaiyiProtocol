//npx hardhat node
//pnpm task:new-name --network hard --first 蓉 --last 黄
import fs from 'fs-extra';
import { task, types } from 'hardhat/config';
import {
    Actors__factory, ActorNames__factory, ActorTalents__factory, WorldFungible__factory, 
    ShejiTu__factory, WorldZones__factory, ActorAttributes__factory, 
} from '@taiyi/contracts/dist/typechain';
import { getAddressBookShareFilePath } from '../utils';
import { ActorBehaviorAttributes__factory, ActorCharmAttributes__factory, ActorCoreAttributes__factory, ActorMoodAttributes__factory } from '../typechain';

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

task('new-name', 'Claim a name')
    .addOptionalParam('first', '名', "", types.string)
    .addOptionalParam('last', '姓', "", types.string)
    .setAction(async (args, { ethers }) => {        
        const [deployer, taisifu, operator1, operator2] = await ethers.getSigners();

        let addressBook:{[index: string]:any} = await getContractAddress(process_args.network?process_args.network:"hard");

        let actors = Actors__factory.connect(addressBook.Actors, operator1);
        let names = ActorNames__factory.connect(addressBook.ActorNames, operator1);
        let talents = ActorTalents__factory.connect(addressBook.ActorTalents, operator1);
        let dahuang = ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
        let daoli = WorldFungible__factory.connect(addressBook.AssetDaoli, operator1);
        let zones = WorldZones__factory.connect(addressBook.WorldZones, operator1);
        let baseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, operator1);        
        let charmAttributes = ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, operator1);
        let behaviorAttributes = ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, operator1);
        let coreAttributes = ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, operator1);
        let moodAttributes = ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, operator1);
        
        //let actorNameId = await names.nextName();
        let firstName = args.first==""?`小拼${Math.round(Math.random()*100)}`:args.first;
        let lastName = args.last==""?`李`:args.last;
        console.log(`申请姓名\"${lastName}${firstName}\"...`);
        await (await names.claim(firstName, lastName, 0)).wait();
   });
