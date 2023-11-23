import { task } from 'hardhat/config';
import fs from 'fs-extra';
import { TaiyiContractName, getAddressBookShareFilePath, getConstructorArgumentsBookShareFilePath } from '../utils';

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

task('verify-etherscan', 'Verify the Solidity contracts on Etherscan').setAction(async (_, hre) => {    
    const [deployer, taisifu] = await hre.ethers.getSigners();
    console.log(`deployer=${deployer.address}`);
    console.log(`taisifu=${taisifu.address}`);
    let addressBook: { [index: string]: any } = await getContractAddress(process_args.network ? process_args.network : "hard");
    let argsBook: { [index: string]: any } = await getContractConstructArgs(process_args.network ? process_args.network : "hard");

    let contracts: Record<TaiyiContractName, VerifyArgs> = {
        SifusDescriptor: {
            address: addressBook.SifusDescriptor,
            // libraries: {
            //   MultiPartRLEToSVG: addressBook.MultiPartRLEToSVG,
            // },
        },
        SifusSeeder: {
            address: addressBook.SifusSeeder,
        },
        SifusToken: {
            address: addressBook.SifusToken,
            constructorArguments: argsBook.SifusToken,
        },
        WorldConstants: {
            address: addressBook.WorldConstants,
        },
        WorldContractRoute: {
            address: addressBook.WorldContractRoute,
        },
        Actors: {
            address: addressBook.Actors,
            constructorArguments: argsBook.Actors,
        },
        WorldRandom: {
            address: addressBook.WorldRandom,
        },
        ActorNames: {
            address: addressBook.ActorNames,
            constructorArguments: argsBook.ActorNames,
        },
        WorldYemings: {
            address: addressBook.WorldYemings,
            constructorArguments: argsBook.WorldYemings,
        },
        WorldItems: {
            address: addressBook.WorldItems,
            constructorArguments: argsBook.WorldItems,
        },
        ActorSocialIdentity: {
            address: addressBook.ActorSocialIdentity,
            constructorArguments: argsBook.ActorSocialIdentity,
        },
        WorldZones: {
            address: addressBook.WorldZones,
            constructorArguments: argsBook.WorldZones,
        },
        AssetDaoli: {
            address: addressBook.AssetDaoli,
            constructorArguments: argsBook.AssetDaoli,
        },
        ActorAttributes: {
            address: addressBook.ActorAttributes,
            constructorArguments: argsBook.ActorAttributes,
        },
        ActorPrelifes: {
            address: addressBook.ActorPrelifes,
            constructorArguments: argsBook.ActorPrelifes,
        },
        ActorLocations: {
            address: addressBook.ActorLocations,
            constructorArguments: argsBook.ActorLocations,
        },
        Trigrams: {
            address: addressBook.Trigrams,
            constructorArguments: argsBook.Trigrams,
        },
        TrigramsRender: {
            address: addressBook.TrigramsRender,
            constructorArguments: argsBook.TrigramsRender,
        },
        NameGenerator: {
            address: addressBook.NameGenerator,
            constructorArguments: argsBook.NameGenerator,
        }
    };

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
