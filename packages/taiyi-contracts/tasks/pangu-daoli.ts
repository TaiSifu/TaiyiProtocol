//npx hardhat node
//pnpm task:pangu-daoli --network hard
import fs from 'fs-extra';
import { task, types } from 'hardhat/config';
import { 
    ActorAttributes__factory, ActorNames__factory, Actors__factory,
    WorldConstants__factory, WorldFungible__factory, WorldYemings__factory, WorldZones__factory 
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


task('pangu-daoli', '盘古铸造一些道理给指定角色')
    .addOptionalParam('actor', 'The token ID of actor', 1, types.int) //目标角色，默认是盘古自己
    .addOptionalParam('address', '取出到指定地址', "0x", types.string) //取出到目标地址，如果地址有效，则忽略actor参数
    .addOptionalParam('amount', '铸造数量', "100.0", types.string) //Ether表示
    .setAction(async (args, { ethers }) => {        
        const [deployer, taisifu, operator1, operator2] = await ethers.getSigners();
        console.log(`deployer=${deployer.address}`);
        console.log(`taisifu=${taisifu.address}`);
        console.log(`operator1=${operator1.address}`);
        console.log(`operator2=${operator2.address}`);

        let addressBook:{[index: string]:any} = await getContractAddress(process_args.network?process_args.network:"hard");

        let worldConstants = WorldConstants__factory.connect(addressBook.WorldConstants, taisifu);
        let worldYemings = WorldYemings__factory.connect(addressBook.WorldYemings, taisifu);
        let actors = Actors__factory.connect(addressBook.Actors, taisifu);
        let names = ActorNames__factory.connect(addressBook.ActorNames, taisifu);
        let daoli = WorldFungible__factory.connect(addressBook.AssetDaoli, taisifu);
        let zones = WorldZones__factory.connect(addressBook.WorldZones, taisifu);
        let baseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, taisifu);        

        let actorPanGu = await worldConstants.ACTOR_PANGU();
        
        console.log("盘古铸币中...");
        let amount = ethers.utils.parseEther(args.amount);
        await (await daoli.claim(actorPanGu, actorPanGu, amount)).wait();

        let address = args.address;
        if(address != "0x") { 
            console.log("盘古提币中...");
            if(!(await worldYemings.isYeMing(actorPanGu)))
                await (await worldYemings.setYeMing(actorPanGu, taisifu.address)).wait(); //fake address

            await (await daoli.withdraw(actorPanGu, actorPanGu, amount)).wait();
            await (await daoli.transfer(address, amount)).wait();
            console.log(`${ethers.utils.formatEther(amount)}道理已经转给地址${address}。`);
            return;
        }

        let actor = args.actor || actorPanGu;
        if(actor != actorPanGu)
            await (await daoli.transferFromActor(actorPanGu, actorPanGu, actor, amount)).wait();
        console.log(`${ethers.utils.formatEther(amount)}道理已经转给角色#${actor}。`);
    });
