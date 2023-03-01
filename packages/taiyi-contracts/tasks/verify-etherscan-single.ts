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
        "WorldStorylines": {
            address: "0xa1dd31b38992251DDfE6b6758A3E70aA3A4b4B9A",
            constructorArguments:  [
                "0x816a1b3066e70DbF842f8ebC42cfdB1D737f3D03",
                222
              ]
        },
        "ParameterizedStorylines": {
            address: "0x9D85E0ca488bC593Cc0DEb1FA9a4CDfe2078e404",
            constructorArguments:  [
                "0x816a1b3066e70DbF842f8ebC42cfdB1D737f3D03",
                223
              ]
        },
        "GlobalStoryRegistry": {
            address: "0x5e600Cc528BC682824d277403bAcaE12e7AdBD4C",
            constructorArguments:  [
                "0x816a1b3066e70DbF842f8ebC42cfdB1D737f3D03",
                224
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
