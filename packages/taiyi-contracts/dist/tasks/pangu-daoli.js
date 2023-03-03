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
//yarn task:pangu-daoli --network hard
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
(0, config_1.task)('pangu-daoli', '盘古铸造一些道理给指定角色')
    .addOptionalParam('actor', 'The token ID of actor', 1, config_1.types.int) //目标角色，默认是盘古自己
    .addOptionalParam('address', '取出到指定地址', "0x", config_1.types.string) //取出到目标地址，如果地址有效，则忽略actor参数
    .addOptionalParam('amount', '铸造数量', "100.0", config_1.types.string) //Ether表示
    .setAction((args, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    const [deployer, taisifu, operator1, operator2] = yield ethers.getSigners();
    console.log(`deployer=${deployer.address}`);
    console.log(`taisifu=${taisifu.address}`);
    console.log(`operator1=${operator1.address}`);
    console.log(`operator2=${operator2.address}`);
    let addressBook = yield getContractAddress(process_args.network ? process_args.network : "hard");
    let worldConstants = typechain_1.WorldConstants__factory.connect(addressBook.WorldConstants, taisifu);
    let worldYemings = typechain_1.WorldYemings__factory.connect(addressBook.WorldYemings, taisifu);
    let actors = typechain_1.Actors__factory.connect(addressBook.Actors, taisifu);
    let names = typechain_1.ActorNames__factory.connect(addressBook.ActorNames, taisifu);
    let daoli = typechain_1.WorldFungible__factory.connect(addressBook.AssetDaoli, taisifu);
    let zones = typechain_1.WorldZones__factory.connect(addressBook.WorldZones, taisifu);
    let baseAttributes = typechain_1.ActorAttributes__factory.connect(addressBook.ActorAttributes, taisifu);
    let actorPanGu = yield worldConstants.ACTOR_PANGU();
    console.log("盘古铸币中...");
    let amount = ethers.utils.parseEther(args.amount);
    yield (yield daoli.claim(actorPanGu, actorPanGu, amount)).wait();
    let address = args.address;
    if (address != "0x") {
        console.log("盘古提币中...");
        if (!(yield worldYemings.isYeMing(actorPanGu)))
            yield (yield worldYemings.setYeMing(actorPanGu, taisifu.address)).wait(); //fake address
        yield (yield daoli.withdraw(actorPanGu, actorPanGu, amount)).wait();
        yield (yield daoli.transfer(address, amount)).wait();
        console.log(`${ethers.utils.formatEther(amount)}道理已经转给地址${address}。`);
        return;
    }
    let actor = args.actor || actorPanGu;
    if (actor != actorPanGu)
        yield (yield daoli.transferFromActor(actorPanGu, actorPanGu, actor, amount)).wait();
    console.log(`${ethers.utils.formatEther(amount)}道理已经转给角色#${actor}。`);
}));
