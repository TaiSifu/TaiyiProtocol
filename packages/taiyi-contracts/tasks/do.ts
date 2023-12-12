//npx hardhat node
//pnpm task:do --network hard
import fs from 'fs-extra';
import { task, types } from 'hardhat/config';
import {
    Actors__factory, ActorNames__factory, ActorTalents__factory, WorldFungible__factory, 
    ShejiTu__factory, WorldZones__factory, ActorAttributes__factory, WorldEvents__factory, ActorLocations__factory, AssetDaoli, AssetDaoli__factory, WorldItems, WorldItems__factory, NameGenerator__factory,
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
        let daoli = AssetDaoli__factory.connect(addressBook.AssetDaoli, operator1);
        let items = WorldItems__factory.connect(addressBook.WorldItems, operator1);
        let nameGen = NameGenerator__factory.connect(addressBook.NameGenerator, operator1);

        let actorPanGu = 1;
                
        if(0) {
            console.log("注册性别");
            await (await nameGen.connect(taisifu).registerGender(actorPanGu, ["男", "女"])).wait();
        }

        if(0) {
            let family = ["李", "王", "张", "刘"];
            console.log("注册姓");
            for(var i=0; i<family.length;) {
                console.log(`${i}/${family.length}`);
                let start = i;
                let end = Math.min(family.length, start + 10);
                if(start == end)
                    break;
                await (await nameGen.connect(taisifu).registerFamily(actorPanGu, family.slice(start, end))).wait();
                i = end;
            }
        }

        if(0) {
            let middle = ["之", "亦", "其", "如"];
            console.log("注册辈分");
            for(var i=0; i<middle.length;) {
                console.log(`${i}/${middle.length}`);
                let start = i;
                let end = Math.min(middle.length, start + 20);
                if(start == end)
                    break;
                await (await nameGen.connect(taisifu).registerMiddle(actorPanGu, middle.slice(start, end))).wait();
                i = end;
            }
        }

        if(0) {
            let male = ["国","民","邦","杰"];
            console.log("注册男名");
            for(var i=0; i<male.length;) {
                console.log(`${i}/${male.length}`);
                let start = i;
                let end = Math.min(male.length, start + 20);
                if(start == end)
                    break;
                await (await nameGen.connect(taisifu).registerGiven(actorPanGu, "男", male.slice(start, end))).wait();
                i = end;
            }
        }

        if(0) {
            let famale = ["兮","芳","星","清"];
            console.log("注册女名");
            for(var i=0; i<famale.length;) {
                console.log(`${i}/${famale.length}`);
                let start = i;
                let end = Math.min(famale.length, start + 20);
                if(start == end)
                    break;
                await (await nameGen.connect(taisifu).registerGiven(actorPanGu, "女", famale.slice(start, end))).wait();
                i = end;
            }
        }

        if(0) {
            let testNames = await nameGen.genName(20, 0, 0, "", "", "", 0);
            for(var i=0; i<20; i++) {
                console.log(`${testNames[3*i]}${testNames[3*i+1]}${testNames[3*i+2]}`);
            }
        }
    });
