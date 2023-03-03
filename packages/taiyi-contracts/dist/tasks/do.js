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
const typechain_1 = require("../typechain");
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
    let daoli = typechain_1.AssetDaoli__factory.connect(addressBook.AssetDaoli, operator1);
    let items = typechain_1.WorldItems__factory.connect(addressBook.WorldItems, operator1);
    let nameGen = typechain_1.NameGenerator__factory.connect(addressBook.NameGenerator, operator1);
    let actorPanGu = 1;
    if (0) {
        console.log("注册性别");
        yield (yield nameGen.connect(taisifu).registerGender(actorPanGu, ["男", "女"])).wait();
    }
    if (0) {
        let family = ["李", "王", "张", "刘"];
        console.log("注册姓");
        for (var i = 0; i < family.length;) {
            console.log(`${i}/${family.length}`);
            let start = i;
            let end = Math.min(family.length, start + 10);
            if (start == end)
                break;
            yield (yield nameGen.connect(taisifu).registerFamily(actorPanGu, family.slice(start, end))).wait();
            i = end;
        }
    }
    if (0) {
        let middle = ["之", "亦", "其", "如"];
        console.log("注册辈分");
        for (var i = 0; i < middle.length;) {
            console.log(`${i}/${middle.length}`);
            let start = i;
            let end = Math.min(middle.length, start + 20);
            if (start == end)
                break;
            yield (yield nameGen.connect(taisifu).registerMiddle(actorPanGu, middle.slice(start, end))).wait();
            i = end;
        }
    }
    if (0) {
        let male = ["国", "民", "邦", "杰"];
        console.log("注册男名");
        for (var i = 0; i < male.length;) {
            console.log(`${i}/${male.length}`);
            let start = i;
            let end = Math.min(male.length, start + 20);
            if (start == end)
                break;
            yield (yield nameGen.connect(taisifu).registerGiven(actorPanGu, "男", male.slice(start, end))).wait();
            i = end;
        }
    }
    if (0) {
        let famale = ["兮", "芳", "星", "清"];
        console.log("注册女名");
        for (var i = 0; i < famale.length;) {
            console.log(`${i}/${famale.length}`);
            let start = i;
            let end = Math.min(famale.length, start + 20);
            if (start == end)
                break;
            yield (yield nameGen.connect(taisifu).registerGiven(actorPanGu, "女", famale.slice(start, end))).wait();
            i = end;
        }
    }
    if (0) {
        let testNames = yield nameGen.genName(20, 0, 0, "", "", "", 0);
        for (var i = 0; i < 20; i++) {
            console.log(`${testNames[3 * i]}${testNames[3 * i + 1]}${testNames[3 * i + 2]}`);
        }
    }
}));
