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
//yarn task:deploy-event-processors --network hard
const fs_extra_1 = __importDefault(require("fs-extra"));
const config_1 = require("hardhat/config");
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const addressConfig_1 = require("../utils/addressConfig");
const typechain_2 = require("../typechain");
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
(0, config_1.task)('deploy-event-processors', '部署大荒事件合约')
    .setAction((args, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    let addressBook = yield getContractAddress(process_args.network ? process_args.network : "hard");
    let argsBook = yield getContractConstructArgs(process_args.network ? process_args.network : "hard");
    const [deployer, taisifu, operator1] = yield ethers.getSigners();
    console.log(`Deployer: ${deployer.address}`);
    console.log(`Taisifu: ${taisifu.address}`);
    console.log(`Operator1: ${operator1.address}`);
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
    let globalStoryRegistry = typechain_1.GlobalStoryRegistry__factory.connect(addressBook.GlobalStoryRegistry, taisifu);
    let charmAttributes = typechain_2.ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, taisifu);
    let behaviorAttributes = typechain_2.ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, taisifu);
    let coreAttributes = typechain_2.ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, taisifu);
    let moodAttributes = typechain_2.ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, taisifu);
    let actorPanGu = 1;
    //Deploy dahuang contracts
    console.log(`部署事件`);
    // let evt60505 = await (await (new WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    // let evt60505Args = [worldContractRoute.address];
    // await (await worldEvents.setEventProcessor(60505, evt60505.address)).wait();
    // let evt10032 = await (await (new WorldEventProcessor10032__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    // let evt10032Args = [worldContractRoute.address];
    // await (await worldEvents.setEventProcessor(10032, evt10032.address)).wait();
    // let evt10033 = await (await (new WorldEventProcessor10033__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    // let evt10033Args = [worldContractRoute.address];
    // await (await worldEvents.setEventProcessor(10033, evt10033.address)).wait();
    let evt80010 = yield (yield (new typechain_2.WorldEventProcessor80010__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    let evt80010Args = [worldContractRoute.address];
    yield (yield worldEvents.setEventProcessor(80010, evt80010.address)).wait();
    let evt80011 = yield (yield (new typechain_2.WorldEventProcessor80011__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    let evt80011Args = [worldContractRoute.address];
    yield (yield worldEvents.setEventProcessor(80011, evt80011.address)).wait();
    let evt80012 = yield (yield (new typechain_2.WorldEventProcessor80012__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    let evt80012Args = [worldContractRoute.address];
    yield (yield worldEvents.setEventProcessor(80012, evt80012.address)).wait();
    let evt80013 = yield (yield (new typechain_2.WorldEventProcessor80013__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    let evt80013Args = [worldContractRoute.address];
    yield (yield worldEvents.setEventProcessor(80013, evt80013.address)).wait();
    let evt80014 = yield (yield (new typechain_2.WorldEventProcessor80014__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    let evt80014Args = [worldContractRoute.address];
    yield (yield worldEvents.setEventProcessor(80014, evt80014.address)).wait();
    let evt80015 = yield (yield (new typechain_2.WorldEventProcessor80015__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    let evt80015Args = [worldContractRoute.address];
    yield (yield worldEvents.setEventProcessor(80015, evt80015.address)).wait();
    let evt80016 = yield (yield (new typechain_2.WorldEventProcessor80016__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    let evt80016Args = [worldContractRoute.address];
    yield (yield worldEvents.setEventProcessor(80016, evt80016.address)).wait();
    let evt80017 = yield (yield (new typechain_2.WorldEventProcessor80017__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    let evt80017Args = [worldContractRoute.address];
    yield (yield worldEvents.setEventProcessor(80017, evt80017.address)).wait();
    let evt80018 = yield (yield (new typechain_2.WorldEventProcessor80018__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    let evt80018Args = [worldContractRoute.address];
    yield (yield worldEvents.setEventProcessor(80018, evt80018.address)).wait();
    let evt80019 = yield (yield (new typechain_2.WorldEventProcessor80019__factory(deployer)).deploy(worldContractRoute.address)).deployed();
    let evt80019Args = [worldContractRoute.address];
    yield (yield worldEvents.setEventProcessor(80019, evt80019.address)).wait();
    //save contract address
    //addressBook.WorldEventProcessor60505 = evt60505.address;
    // addressBook.WorldEventProcessor10032 = evt10032.address;
    // addressBook.WorldEventProcessor10033 = evt10033.address;
    addressBook.WorldEventProcessor80010 = evt80010.address;
    addressBook.WorldEventProcessor80011 = evt80011.address;
    addressBook.WorldEventProcessor80012 = evt80012.address;
    addressBook.WorldEventProcessor80013 = evt80013.address;
    addressBook.WorldEventProcessor80014 = evt80014.address;
    addressBook.WorldEventProcessor80015 = evt80015.address;
    addressBook.WorldEventProcessor80016 = evt80016.address;
    addressBook.WorldEventProcessor80017 = evt80017.address;
    addressBook.WorldEventProcessor80018 = evt80018.address;
    addressBook.WorldEventProcessor80019 = evt80019.address;
    const sharedAddressPath = (0, addressConfig_1.getAddressBookShareFilePath)(process_args.network ? process_args.network : "hard");
    yield fs_extra_1.default.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
    console.log(`contract deployed book:`);
    console.log(JSON.stringify(addressBook, null, 2));
    //save constructor arguments
    //argsBook.WorldEventProcessor60505 = evt60505Args;
    // argsBook.WorldEventProcessor10032 = evt10032Args;
    // argsBook.WorldEventProcessor10033 = evt10033Args;
    argsBook.WorldEventProcessor80010 = evt80010Args;
    argsBook.WorldEventProcessor80011 = evt80011Args;
    argsBook.WorldEventProcessor80012 = evt80012Args;
    argsBook.WorldEventProcessor80013 = evt80013Args;
    argsBook.WorldEventProcessor80014 = evt80014Args;
    argsBook.WorldEventProcessor80015 = evt80015Args;
    argsBook.WorldEventProcessor80016 = evt80016Args;
    argsBook.WorldEventProcessor80017 = evt80017Args;
    argsBook.WorldEventProcessor80018 = evt80018Args;
    argsBook.WorldEventProcessor80019 = evt80019Args;
    const sharedArgsPath = (0, addressConfig_1.getConstructorArgumentsBookShareFilePath)(process_args.network ? process_args.network : "hard");
    yield fs_extra_1.default.writeFile(sharedArgsPath, JSON.stringify(argsBook, null, 2));
    console.log(`contract constructor arguments book:`);
    console.log(JSON.stringify(argsBook, null, 2));
    //////增加事件
    // console.log(`配置时间线2岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(2, 10031, 1)).wait();
    // console.log(`配置时间线3岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(3, 10032, 1)).wait();
    // console.log(`配置时间线4岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(4, 10032, 1)).wait();
    // console.log(`配置时间线5岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(5, 10032, 200)).wait();
    // console.log(`配置时间线6岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(6, 10032, 200)).wait();
    // console.log(`配置时间线7岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(7, 10032, 100)).wait();
    // console.log(`配置时间线8岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(8, 10032, 100)).wait();
    // console.log(`配置时间线9岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(9, 10032, 100)).wait();
    // console.log(`配置时间线10岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(10, 10032, 100)).wait();
    // console.log(`配置时间线11岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(11, 10032, 100)).wait();
    // console.log(`配置时间线12岁`);
    // await (await shejiTu.connect(deployer).addAgeEvent(12, 10032, 100)).wait();
    //////编辑事件概率
    // console.log(`配置时间线2岁`);
    // await (await shejiTu.connect(deployer).setAgeEventProb(2, 60001, 0)).wait();
    // console.log(`配置时间线3岁`);
    // await (await shejiTu.connect(deployer).setAgeEventProb(3, 60001, 0)).wait();
    // console.log(`配置时间线4岁`);
    // await (await shejiTu.connect(deployer).setAgeEventProb(4, 60001, 0)).wait();
    // console.log(`配置时间线5岁`);
    // await (await shejiTu.connect(deployer).setAgeEventProb(5, 60001, 0)).wait();
    // console.log(`配置时间线6岁`);
    // await (await shejiTu.connect(deployer).setAgeEventProb(6, 60001, 0)).wait();
    // console.log(`配置时间线7岁`);
    // await (await shejiTu.connect(deployer).setAgeEventProb(7, 10032, 100)).wait();
    // console.log(`配置时间线8岁`);
    // await (await shejiTu.connect(deployer).setAgeEventProb(8, 10032, 100)).wait();
    // console.log(`配置时间线9岁`);
    // await (await shejiTu.connect(deployer).setAgeEventProb(9, 10032, 100)).wait();
    // console.log(`配置时间线10岁`);
    // await (await shejiTu.connect(deployer).setAgeEventProb(10, 60001, 0)).wait();
    // console.log(`配置时间线11岁`);
    // await (await shejiTu.connect(deployer).setAgeEventProb(11, 60001, 0)).wait();
    //注册全局剧情起始事件
    console.log(`注册全局剧情起始事件80010`);
    yield (yield globalStoryRegistry.connect(taisifu).registerStory(actorPanGu, 80010, 0)).wait();
    //入驻角色
    // let newOP = 63;
    // console.log(`入驻角色${newOP}`);
    // await (await actors.connect(operator1).transferFrom(operator1.address, deployer.address, newOP)).wait();
    // await (await actors.connect(deployer).approve(evt60505.address, newOP)).wait();
    // await (await evt60505.initOperator(newOP)).wait();
    //60505配置属性模块
    // console.log("配置属性模块");
    // await (await evt60505.registerAttributeModule(baseAttributes.address)).wait();
    // await (await evt60505.registerAttributeModule(charmAttributes.address)).wait();
    // await (await evt60505.registerAttributeModule(coreAttributes.address)).wait();
    // await (await evt60505.registerAttributeModule(moodAttributes.address)).wait();
    // await (await evt60505.registerAttributeModule(behaviorAttributes.address)).wait();
}));
