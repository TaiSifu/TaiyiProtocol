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
//npx hardhat node
//yarn task:deploy-single --network hard
const fs_extra_1 = __importDefault(require("fs-extra"));
const config_1 = require("hardhat/config");
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const addressConfig_1 = require("../utils/addressConfig");
const typechain_2 = require("../typechain");
const utils_1 = require("@taiyi/contracts/dist/utils");
const process_args = require('minimist')(process.argv.slice(2));
function getContractAddress(net) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const sharedAddressPath = (0, addressConfig_1.getAddressBookShareFilePath)(net);
        return JSON.parse(fs_extra_1.default.readFileSync(sharedAddressPath, { encoding: "ascii" }));
    });
}
function getContractConstructArgs(net) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const sharedAddressPath = (0, addressConfig_1.getConstructorArgumentsBookShareFilePath)(net);
        return JSON.parse(fs_extra_1.default.readFileSync(sharedAddressPath, { encoding: "ascii" }));
    });
}
(0, config_1.task)('deploy-single', '部署单一大荒合约')
    .setAction((args, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    let addressBook = yield getContractAddress(process_args.network ? process_args.network : "hard");
    let argsBook = yield getContractConstructArgs(process_args.network ? process_args.network : "hard");
    const [deployer, taisifu, operator1] = yield ethers.getSigners();
    console.log(`Deployer: ${deployer.address}`);
    console.log(`Taisifu: ${taisifu.address}`);
    console.log(`operator 1: ${operator1.address}`);
    let worldConstants = typechain_1.WorldConstants__factory.connect(addressBook.WorldConstants, taisifu);
    let worldContractRoute = typechain_1.WorldContractRoute__factory.connect(addressBook.WorldContractRoute, taisifu);
    let actors = typechain_1.Actors__factory.connect(addressBook.Actors, taisifu);
    let zones = typechain_1.WorldZones__factory.connect(addressBook.WorldZones, taisifu);
    let worldYemings = typechain_1.WorldYemings__factory.connect(addressBook.WorldYemings, taisifu);
    let baseAttributes = typechain_1.ActorAttributes__factory.connect(addressBook.ActorAttributes, taisifu);
    let actorSIDs = typechain_1.ActorSocialIdentity__factory.connect(addressBook.ActorSocialIdentity, taisifu);
    let worldRandom = typechain_1.WorldRandom__factory.connect(addressBook.WorldRandom, taisifu);
    let actorLocations = typechain_1.ActorLocations__factory.connect(addressBook.ActorLocations, taisifu);
    let trigrams = typechain_1.Trigrams__factory.connect(addressBook.Trigrams, taisifu);
    let worldItems = typechain_1.WorldItems__factory.connect(addressBook.WorldItems, taisifu);
    let assetDaoli = typechain_1.AssetDaoli__factory.connect(addressBook.AssetDaoli, taisifu);
    let dahuangConstants = typechain_2.DahuangConstants__factory.connect(addressBook.DahuangConstants, taisifu);
    let worldEvents = typechain_1.WorldEvents__factory.connect(addressBook.WorldEvents, taisifu);
    let shejiTu = typechain_1.ShejiTu__factory.connect(addressBook.ShejiTuProxy, taisifu);
    if (1) {
        //Deploy dahuang contracts
        console.log("Deploy WorldStorylines...");
        let worldStorylines = yield (0, utils_1.deployWorldStorylines)(222, worldContractRoute, deployer);
        let worldStorylinesArgs = [worldContractRoute.address, Number(222)];
        yield (yield worldContractRoute.registerModule(222, worldStorylines.address)).wait();
        console.log("Deploy ParameterizedStorylines...");
        let parameterizedStorylines = yield (0, utils_1.deployParameterizedStorylines)(223, worldContractRoute, deployer);
        let parameterizedStorylinesArgs = [worldContractRoute.address, Number(223)];
        yield (yield worldContractRoute.registerModule(223, parameterizedStorylines.address)).wait();
        // console.log("Deploy GlobalStoryRegistry...");
        // let globalStoryRegistry = await deployGlobalStoryRegistry(224, worldContractRoute, deployer);
        // let globalStoryRegistryArgs = [worldContractRoute.address, Number(224)];
        // await (await worldContractRoute.registerModule(224, globalStoryRegistry.address)).wait();
        //save contract address
        addressBook.WorldStorylines = worldStorylines.address;
        addressBook.ParameterizedStorylines = parameterizedStorylines.address;
        //addressBook.GlobalStoryRegistry = globalStoryRegistry.address;
        const sharedAddressPath = (0, addressConfig_1.getAddressBookShareFilePath)(process_args.network ? process_args.network : "hard");
        yield fs_extra_1.default.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
        console.log(`contract deployed book:`);
        console.log(JSON.stringify(addressBook, null, 2));
        //save constructor arguments
        argsBook.WorldStorylines = worldStorylinesArgs;
        argsBook.ParameterizedStorylines = parameterizedStorylinesArgs;
        //argsBook.GlobalStoryRegistry = globalStoryRegistryArgs;
        const sharedArgsPath = (0, addressConfig_1.getConstructorArgumentsBookShareFilePath)(process_args.network ? process_args.network : "hard");
        yield fs_extra_1.default.writeFile(sharedArgsPath, JSON.stringify(argsBook, null, 2));
        console.log(`contract constructor arguments book:`);
        console.log(JSON.stringify(argsBook, null, 2));
    }
    if (0) {
        let evt10014 = typechain_2.WorldEventProcessor10014__factory.connect(addressBook.WorldEventProcessor10014, taisifu);
        yield (yield actors.connect(operator1).transferFrom(operator1.address, deployer.address, 18)).wait();
        yield (yield actors.connect(deployer).approve(evt10014.address, 18)).wait();
        yield (yield evt10014.connect(deployer).initOperator(18)).wait();
    }
}));
