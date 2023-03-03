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
//yarn task:do --network hard
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
(0, config_1.task)('do', '做一些事情')
    .setAction((args, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    const [deployer, taisifu, operator1, operator2] = yield ethers.getSigners();
    let addressBook = yield getContractAddress(process_args.network ? process_args.network : "hard");
    let actors = typechain_1.Actors__factory.connect(addressBook.Actors, operator1);
    let names = typechain_1.ActorNames__factory.connect(addressBook.ActorNames, operator1);
    let talents = typechain_1.ActorTalents__factory.connect(addressBook.ActorTalents, operator1);
    let zones = typechain_1.WorldZones__factory.connect(addressBook.WorldZones, operator1);
    let baseAttributes = typechain_1.ActorAttributes__factory.connect(addressBook.ActorAttributes, operator1);
    let locations = typechain_1.ActorLocations__factory.connect(addressBook.ActorLocations, operator1);
    let daoli = typechain_1.AssetDaoli__factory.connect(addressBook.AssetDaoli, operator1);
    let items = typechain_1.WorldItems__factory.connect(addressBook.WorldItems, operator1);
    let dahuang = typechain_1.ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
    let events = typechain_1.WorldEvents__factory.connect(addressBook.WorldEvents, operator1);
    let golds = typechain_1.WorldFungible__factory.connect(addressBook.AssetGold, operator1);
    let woods = typechain_1.WorldFungible__factory.connect(addressBook.AssetWood, operator1);
    let charmAttributes = typechain_2.ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, operator1);
    let behaviorAttributes = typechain_2.ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, operator1);
    let coreAttributes = typechain_2.ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, operator1);
    let moodAttributes = typechain_2.ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, operator1);
    let worldVillages = typechain_2.WorldVillages__factory.connect(addressBook.WorldVillages, operator1);
    let shejiTu = typechain_1.ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
    if (0) {
        console.log("兑换资源");
        let actor = 14;
        //恢复体力
        console.log("恢复体力...");
        yield (yield behaviorAttributes.recoverAct(actor)).wait();
        let evt60515 = typechain_2.WorldEventProcessor60515__factory.connect(addressBook.WorldEventProcessor60515, operator1);
        if (yield evt60515.checkOccurrence(actor, 0)) {
            console.log("开始行动...");
            let assetId = yield woods.moduleID();
            let amount = yield woods.balanceOfActor(actor);
            console.log(`amount=${amount}`);
            //let daoliBefore = await daoli.balanceOfActor(actor);
            yield woods.approveActor(actor, yield shejiTu.operator(), amount);
            yield (yield shejiTu.activeTrigger(60515, actor, [assetId, amount], [])).wait();
        }
        else {
            console.log("event check occurrence failed!");
        }
    }
    if (0) {
        console.log("移动到太乙村");
        let actor = 25;
        //恢复体力
        console.log("恢复体力...");
        yield (yield behaviorAttributes.recoverAct(actor)).wait();
        let evt60509 = typechain_2.WorldEventProcessor60509__factory.connect(addressBook.WorldEventProcessor60509, operator1);
        if (yield evt60509.checkOccurrence(actor, 0)) {
            console.log("开始行动...");
            let lcs = yield locations.actorLocations(actor);
            yield (yield shejiTu.activeTrigger(60509, actor, [lcs[1], 2], [])).wait();
        }
        else {
            console.log("event check occurrence failed!");
        }
    }
    if (0) {
        console.log("结束旅行");
        let actor = 25;
        yield (yield locations.finishActorTravel(actor)).wait();
    }
    if (0) {
        console.log("制作木工箱");
        let actor = 25;
        //恢复体力
        console.log("恢复体力...");
        yield (yield behaviorAttributes.recoverAct(actor)).wait();
        let evt60510 = typechain_2.WorldEventProcessor60510__factory.connect(addressBook.WorldEventProcessor60510, operator1);
        if (yield evt60510.checkOccurrence(actor, 0)) {
            console.log("开始行动...");
            yield golds.approveActor(actor, yield shejiTu.operator(), BigInt(1e29));
            yield woods.approveActor(actor, yield shejiTu.operator(), BigInt(1e29));
            yield (yield shejiTu.activeTrigger(60510, actor, [], [])).wait();
        }
        else {
            console.log("event check occurrence failed!");
        }
    }
    if (0) {
        console.log("要求村长捐款");
        let fromActor = 21;
        let assetId = 209; //金石
        let evt60518 = typechain_2.WorldEventProcessor60518__factory.connect(addressBook.WorldEventProcessor60518, operator1);
        if (yield evt60518.checkOccurrence(1, 0)) {
            console.log("开始行动...");
            yield (yield shejiTu.connect(taisifu).activeTrigger(60518, 1, [fromActor, assetId, BigInt(150e18)], [])).wait();
        }
        else {
            console.log("event check occurrence failed!");
        }
    }
    if (0) {
        console.log("创建村庄");
        yield (yield worldVillages.connect(taisifu).createVillage(1, 3, 2)).wait();
    }
    if (1) {
        console.log("注册道具类型");
        yield (yield items.connect(taisifu).setTypeName(52, "《寻龙诀》")).wait();
        yield (yield items.connect(taisifu).setTypeName(53, "太乙村水酒")).wait();
        yield (yield items.connect(taisifu).setTypeName(54, "龙溪水")).wait();
    }
}));
