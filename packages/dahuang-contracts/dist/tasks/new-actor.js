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
//yarn task:new-actor --network hard --first 蓉 --last 黄
const fs_extra_1 = __importDefault(require("fs-extra"));
const config_1 = require("hardhat/config");
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const utils_1 = require("../utils");
const typechain_2 = require("../typechain");
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
(0, config_1.task)('new-actor', 'Mint an actor')
    .addOptionalParam('first', '名', "", config_1.types.string)
    .addOptionalParam('last', '姓', "", config_1.types.string)
    .setAction((args, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    const [deployer, taisifu, operator1, operator2] = yield ethers.getSigners();
    let addressBook = yield getContractAddress(process_args.network ? process_args.network : "hard");
    let actors = typechain_1.Actors__factory.connect(addressBook.Actors, operator1);
    let names = typechain_1.ActorNames__factory.connect(addressBook.ActorNames, operator1);
    let talents = typechain_1.ActorTalents__factory.connect(addressBook.ActorTalents, operator1);
    let dahuang = typechain_1.ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
    let daoli = typechain_1.WorldFungible__factory.connect(addressBook.AssetDaoli, operator1);
    let zones = typechain_1.WorldZones__factory.connect(addressBook.WorldZones, operator1);
    let baseAttributes = typechain_1.ActorAttributes__factory.connect(addressBook.ActorAttributes, operator1);
    let charmAttributes = typechain_2.ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, operator1);
    let behaviorAttributes = typechain_2.ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, operator1);
    let coreAttributes = typechain_2.ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, operator1);
    let moodAttributes = typechain_2.ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, operator1);
    let actor = yield actors.nextActor();
    console.log("授权道理扣费权给角色合约...");
    yield (yield daoli.approve(actors.address, BigInt(1000e18))).wait();
    console.log("铸造角色...");
    yield (yield actors.mintActor(BigInt(1000e18))).wait();
    //let actorNameId = await names.nextName();
    let firstName = args.first == "" ? `小拼${Math.round(Math.random() * 100)}` : args.first;
    let lastName = args.last == "" ? `李` : args.last;
    console.log(`角色取名\"${lastName}${firstName}\"...`);
    yield (yield names.claim(firstName, lastName, actor)).wait();
    console.log("角色出生在大荒...");
    yield (yield actors.approve(dahuang.address, actor)).wait();
    yield (yield dahuang.bornActor(actor)).wait();
    console.log(`Actor#${actor} has been minted with name \"${(yield names.actorName(actor))._name}\" to address ${yield actors.ownerOf(actor)}.`);
    console.log(`Taiyi actor #${actor.toString()} uri:`);
    logURI(yield actors.tokenURI(actor));
}));
