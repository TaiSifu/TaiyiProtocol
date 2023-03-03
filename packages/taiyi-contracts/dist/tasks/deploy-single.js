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
const typechain_1 = require("../typechain");
const addressConfig_1 = require("../utils/addressConfig");
const utils_1 = require("../utils");
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
(0, config_1.task)('deploy-single', '部署单一合约')
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
    console.log("Deploy NameGenerator...");
    let nameGenerator = yield (0, utils_1.deployNameGenerator)(worldContractRoute, deployer);
    let nameGeneratorArg = [worldContractRoute.address];
    yield (yield worldContractRoute.registerModule(225, nameGenerator.address)).wait();
    //save contract address
    addressBook.NameGenerator = nameGenerator.address;
    const sharedAddressPath = (0, addressConfig_1.getAddressBookShareFilePath)(process_args.network ? process_args.network : "hard");
    yield fs_extra_1.default.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
    console.log(`contract deployed book:`);
    console.log(JSON.stringify(addressBook, null, 2));
    //save constructor arguments
    argsBook.NameGenerator = nameGeneratorArg;
    const sharedArgsPath = (0, addressConfig_1.getConstructorArgumentsBookShareFilePath)(process_args.network ? process_args.network : "hard");
    yield fs_extra_1.default.writeFile(sharedArgsPath, JSON.stringify(argsBook, null, 2));
    console.log(`contract constructor arguments book:`);
    console.log(JSON.stringify(argsBook, null, 2));
}));
