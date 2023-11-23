"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = require("../utils");
const process_args = require('minimist')(process.argv.slice(2));
function getContractAddress(net) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const sharedAddressPath = (0, utils_1.getAddressBookShareFilePath)(net);
        return JSON.parse(fs_extra_1.default.readFileSync(sharedAddressPath, { encoding: "ascii" }));
    });
}
function getContractConstructArgs(net) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const sharedAddressPath = (0, utils_1.getConstructorArgumentsBookShareFilePath)(net);
        return JSON.parse(fs_extra_1.default.readFileSync(sharedAddressPath, { encoding: "ascii" }));
    });
}
(0, config_1.task)('verify-etherscan', 'Verify the Solidity contracts on Etherscan').setAction((_, hre) => __awaiter(void 0, void 0, void 0, function* () {
    const [deployer, taisifu] = yield hre.ethers.getSigners();
    console.log(`deployer=${deployer.address}`);
    console.log(`taisifu=${taisifu.address}`);
    let addressBook = yield getContractAddress(process_args.network ? process_args.network : "hard");
    let argsBook = yield getContractConstructArgs(process_args.network ? process_args.network : "hard");
    let contracts = {
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
            yield hre.run('verify:verify', Object.assign({}, args));
        }
        catch (e) {
            console.error(e);
        }
    }
}));
