import { task } from 'hardhat/config';
import fs from 'fs-extra';
import { getAddressBookShareFilePath, getConstructorArgumentsBookShareFilePath } from '../utils';

const process_args = require('minimist')(process.argv.slice(2));

async function getContractAddress(net: string): Promise<{ [index: string]: any }> {
    // @ts-ignore
    const sharedAddressPath = getAddressBookShareFilePath(net);
    return JSON.parse(fs.readFileSync(sharedAddressPath, { encoding: "ascii" }));
}

async function getContractConstructArgs(net: string): Promise<{ [index: string]: any }> {
    // @ts-ignore
    const sharedAddressPath = getConstructorArgumentsBookShareFilePath(net);
    return JSON.parse(fs.readFileSync(sharedAddressPath, { encoding: "ascii" }));
}

interface VerifyArgs {
    address: string;
    constructorArguments?: (string | number)[];
    libraries?: Record<string, string>;
}

task('verify-etherscan-single', 'Verify the Solidity contracts on Etherscan').setAction(async (_, hre) => {    
    const [deployer, taisifu] = await hre.ethers.getSigners();
    console.log(`deployer=${deployer.address}`);
    console.log(`taisifu=${taisifu.address}`);
    let addressBook: { [index: string]: any } = await getContractAddress(process_args.network ? process_args.network : "hard");
    let argsBook: { [index: string]: any } = await getContractConstructArgs(process_args.network ? process_args.network : "hard");

    let contracts: Record<string, VerifyArgs> = {
        "ActorCharmAttributes": {
            address: "0x629d4Da3115D57eD512F29F968F88B4aA148093f",
            constructorArguments:  [
                "0x816a1b3066e70DbF842f8ebC42cfdB1D737f3D03"
              ]
        },
        "ActorCoreAttributes": {
            address: "0x6B0c4FDb82c56F8349741f5A617b15E078052f0A",
            constructorArguments:  [
                "0x816a1b3066e70DbF842f8ebC42cfdB1D737f3D03"
              ]
        },
        "ActorMoodAttributes": {
            address: "0x81C320117d4624E382A4977Ca3a2Aa6F356aEF9D",
            constructorArguments:  [
                "0x816a1b3066e70DbF842f8ebC42cfdB1D737f3D03"
              ]
        },
        "ActorBehaviorAttributes": {
            address: "0x685BE58af790dA413Ad75D5Bd724d3396Ca9AF9B",
            constructorArguments:  [
                3600,
                "0x816a1b3066e70DbF842f8ebC42cfdB1D737f3D03"
              ]
        },
    };

    //no need to verify proxy of shejitu, since proxies will be interpreted by etherscan automatically
    for (const [name, args] of Object.entries(contracts)) {
        console.log(`verifying ${name}...`);
        try {
            await hre.run('verify:verify', {
                ...args,
            });
        } catch (e) {
            console.error(e);
        }
    }
});
