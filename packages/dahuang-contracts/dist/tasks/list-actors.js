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
//yarn task:list-actors --network hard
const fs_extra_1 = __importDefault(require("fs-extra"));
const config_1 = require("hardhat/config");
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const typechain_2 = require("../typechain");
const utils_1 = require("../utils");
const process_args = require('minimist')(process.argv.slice(2));
function getContractAddress(net) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const sharedAddressPath = (0, utils_1.getAddressBookShareFilePath)(net);
        return JSON.parse(fs_extra_1.default.readFileSync(sharedAddressPath, { encoding: "ascii" }));
    });
}
let logURI = (uri) => {
    let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
    console.log(JSON.stringify(JSON.parse(uriDecode), null, 2));
};
(0, config_1.task)('list-actors', '列出角色')
    .setAction((args, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    const [deployer, taisifu, operator1, operator2] = yield ethers.getSigners();
    let addressBook = yield getContractAddress(process_args.network ? process_args.network : "hard");
    let actors = typechain_1.Actors__factory.connect(addressBook.Actors, operator1);
    let names = typechain_1.ActorNames__factory.connect(addressBook.ActorNames, operator1);
    let talents = typechain_1.ActorTalents__factory.connect(addressBook.ActorTalents, operator1);
    let zones = typechain_1.WorldZones__factory.connect(addressBook.WorldZones, operator1);
    let baseAttributes = typechain_1.ActorAttributes__factory.connect(addressBook.ActorAttributes, operator1);
    let locations = typechain_1.ActorLocations__factory.connect(addressBook.ActorLocations, operator1);
    let dahuang = typechain_1.ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
    let events = typechain_1.WorldEvents__factory.connect(addressBook.WorldEvents, operator1);
    let golds = typechain_1.WorldFungible__factory.connect(addressBook.AssetGold, operator1);
    let charmAttributes = typechain_2.ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, operator1);
    let behaviorAttributes = typechain_2.ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, operator1);
    let coreAttributes = typechain_2.ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, operator1);
    let moodAttributes = typechain_2.ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, operator1);
    let parameterizedStorylines = typechain_1.ParameterizedStorylines__factory.connect(addressBook.ParameterizedStorylines, operator1);
    let shejiTu = typechain_1.ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
    let evt60505 = typechain_2.WorldEventProcessor60505__factory.connect(addressBook.WorldEventProcessor60505, operator1);
    let address = operator1.address;
    let ct = (yield actors.balanceOf(address)).toNumber();
    if (ct == 0) {
        console.log("没有角色");
        return;
    }
    let actorsStr = `拥有的角色号码有：`;
    for (var i = 0; i < ct; i++) {
        if (i == (ct - 1))
            actorsStr += `#${(yield actors.tokenOfOwnerByIndex(address, i)).toString()}。`;
        else
            actorsStr += `#${(yield actors.tokenOfOwnerByIndex(address, i)).toString()}，`;
    }
    console.log(actorsStr);
}));
