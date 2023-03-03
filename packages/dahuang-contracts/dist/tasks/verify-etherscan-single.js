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
//yarn task:verify-etherscan-single --network arbitrumGoerli
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
(0, config_1.task)('verify-etherscan-single', 'Verify the Solidity contracts on Etherscan').setAction((_, hre) => __awaiter(void 0, void 0, void 0, function* () {
    const [deployer, taisifu] = yield hre.ethers.getSigners();
    console.log(`deployer=${deployer.address}`);
    console.log(`taisifu=${taisifu.address}`);
    let addressBook = yield getContractAddress(process_args.network ? process_args.network : "hard");
    let argsBook = yield getContractConstructArgs(process_args.network ? process_args.network : "hard");
    let contracts = {
        "WorldEventProcessor60515": {
            address: "0xE2d3047701B4A0eaEb462561dD9230A4fA2B673d",
            constructorArguments: [
                2,
                "0x9489b2fAB651E1438B08a9865814EB16B4cEF46e",
                "0x816a1b3066e70DbF842f8ebC42cfdB1D737f3D03"
            ]
        },
    };
    //no need to verify proxy of shejitu, since proxies will be interpreted by etherscan automatically
    //if need to verify contract not found in local, use ContractsForEtherscanVerify.sol to make fake contracts
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
