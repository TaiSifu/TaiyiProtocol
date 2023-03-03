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
//yarn task:grow-actor --network hard --actor 1
const fs_extra_1 = __importDefault(require("fs-extra"));
const config_1 = require("hardhat/config");
const typechain_1 = require("@taiyi/contracts/dist/typechain");
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
(0, config_1.task)('grow-actor', '成长角色')
    .addOptionalParam('actor', 'The token ID of actor', 0, config_1.types.int)
    .setAction((args, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    const [deployer, taisifu, operator1, operator2] = yield ethers.getSigners();
    let addressBook = yield getContractAddress(process_args.network ? process_args.network : "hard");
    let actors = typechain_1.Actors__factory.connect(addressBook.Actors, operator1);
    let names = typechain_1.ActorNames__factory.connect(addressBook.ActorNames, operator1);
    let talents = typechain_1.ActorTalents__factory.connect(addressBook.ActorTalents, operator1);
    let dahuang = typechain_1.ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
    let events = typechain_1.WorldEvents__factory.connect(addressBook.WorldEvents, operator1);
    let golds = typechain_1.WorldFungible__factory.connect(addressBook.AssetGold, operator1);
    let daoli = typechain_1.AssetDaoli__factory.connect(addressBook.AssetDaoli, operator1);
    let prestiges = typechain_1.WorldFungible__factory.connect(addressBook.AssetPrestige, operator1);
    let actor = args.actor;
    let _age = (yield events.ages(actor)).toNumber();
    console.log(`wait and try grow to age ${_age + 1} ...`);
    //授权时间线
    console.log(`approve actor#${actor.toString()} to Shejitu`);
    if ((yield actors.getApproved(actor)) != dahuang.address)
        yield (yield actors.approve(dahuang.address, actor)).wait();
    //授权actor的gold给时间线
    let yeming = yield dahuang.operator();
    if ((yield golds.allowanceActor(actor, yeming)).lt(BigInt(1e29)))
        yield (yield golds.approveActor(actor, yeming, BigInt(1e29))).wait();
    if ((yield daoli.allowanceActor(actor, yeming)).lt(BigInt(1e29)))
        yield (yield daoli.approveActor(actor, yeming, BigInt(1e29))).wait();
    if ((yield prestiges.allowanceActor(actor, yeming)).lt(BigInt(1e29)))
        yield (yield prestiges.approveActor(actor, yeming, BigInt(1e29))).wait();
    let res = yield (yield dahuang.grow(actor, { gasLimit: 5000000 })).wait();
    // console.log(`Taiyi actor #${actor.toString()} age ${_age} uri by render mode 1:`);
    // let uri = await actors.tokenURIByMode(actor, 1);
    // logURI(uri);
    // console.log(`switch to render mode 1...`);
    // await (await actors.changeActorRenderMode(actor, 1)).wait();
    // console.log(`Taiyi actor #${actor.toString()} age${_age} uri:`);
    // uri = await actors.tokenURI(actor);
    // logURI(uri);
    // console.log(`switch to render mode 0...`);
    // await (await actors.changeActorRenderMode(actor, 0)).wait();
    // console.log(`Taiyi actor #${actor.toString()} age${_age} uri:`);
    // uri = await actors.tokenURI(actor);
    // logURI(uri);
}));
