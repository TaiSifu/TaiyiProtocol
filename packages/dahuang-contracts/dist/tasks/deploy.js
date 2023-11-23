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
//yarn task:deploy --network hard
const fs_extra_1 = __importDefault(require("fs-extra"));
const config_1 = require("hardhat/config");
const typechain_1 = require("@taiyi/contracts/dist/typechain");
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
(0, config_1.task)('deploy', '部署全套大荒合约')
    .addOptionalParam('oneAgeVSecond', '生长1岁的间隔期 (seconds)', 60 * 60 * 24, config_1.types.int) // Default: 1 day
    .addOptionalParam('actRecoverTimeDay', '行动力恢复期 (seconds)', 60 * 60 * 24, config_1.types.int) // Default: 1 day
    .addOptionalParam('zoneResourceGrowTimeDay', '野外区域资源生长期 (seconds)', 60 * 60 * 24, config_1.types.int) // Default: 1 day
    .addOptionalParam('zoneResourceGrowQuantityScale', '资源生长系数 (基点1000=1.0)', 1000, config_1.types.int) // Default: 1.0
    .addOptionalParam('worldConstants', '基础合约常量地址', "0x00", config_1.types.string)
    .addOptionalParam('worldContractRoute', '太乙路由合约地址', "0x00", config_1.types.string)
    .addOptionalParam('actors', '角色合约地址', "0x00", config_1.types.string)
    .addOptionalParam('worldRandom', '随机数合约地址', "0x00", config_1.types.string)
    .addOptionalParam('worldZones', '区域合约地址', "0x00", config_1.types.string)
    .addOptionalParam('worldYemings', '噎明记录合约地址', "0x00", config_1.types.string)
    .addOptionalParam('actorAttributes', '角色基础属性合约地址', "0x00", config_1.types.string)
    .addOptionalParam('actorSocialIdentity', '角色社会身份合约地址', "0x00", config_1.types.string)
    .addOptionalParam('actorLocations', '角色定位合约地址', "0x00", config_1.types.string)
    .addOptionalParam('trigrams', '符文合约地址', "0x00", config_1.types.string)
    .addOptionalParam('worldItems', '物品合约地址', "0x00", config_1.types.string)
    .setAction((args, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    //const network = await ethers.provider.getNetwork();        
    // if (network.chainId !== 31337) {
    //     console.log(`Invalid chain id. Expected 31337. Got: ${network.chainId}.`);
    //     return;
    // }
    let addressBook = yield getContractAddress(process_args.network ? process_args.network : "hard");
    const [deployer, taisifu] = yield ethers.getSigners();
    console.log(`Deployer: ${deployer.address}`);
    console.log(`Taisifu: ${taisifu.address}`);
    let worldConstants = typechain_1.WorldConstants__factory.connect(args.worldConstants == "0x00" ? addressBook.WorldConstants : args.worldConstants, taisifu);
    let worldContractRoute = typechain_1.WorldContractRoute__factory.connect(args.worldContractRoute == "0x00" ? addressBook.WorldContractRoute : args.worldContractRoute, taisifu);
    let actors = typechain_1.Actors__factory.connect(args.actors == "0x00" ? addressBook.Actors : args.actors, taisifu);
    let zones = typechain_1.WorldZones__factory.connect(args.worldZones == "0x00" ? addressBook.WorldZones : args.worldZones, taisifu);
    let worldYemings = typechain_1.WorldYemings__factory.connect(args.worldYemings == "0x00" ? addressBook.WorldYemings : args.worldYemings, taisifu);
    let baseAttributes = typechain_1.ActorAttributes__factory.connect(args.actorAttributes == "0x00" ? addressBook.ActorAttributes : args.actorAttributes, taisifu);
    let actorSIDs = typechain_1.ActorSocialIdentity__factory.connect(args.actorSocialIdentity == "0x00" ? addressBook.ActorSocialIdentity : args.actorSocialIdentity, taisifu);
    let worldRandom = typechain_1.WorldRandom__factory.connect(args.worldRandom == "0x00" ? addressBook.WorldRandom : args.worldRandom, taisifu);
    let actorLocations = typechain_1.ActorLocations__factory.connect(args.actorLocations == "0x00" ? addressBook.ActorLocations : args.actorLocations, taisifu);
    let trigrams = typechain_1.Trigrams__factory.connect(args.trigrams == "0x00" ? addressBook.Trigrams : args.trigrams, taisifu);
    let worldItems = typechain_1.WorldItems__factory.connect(args.worldItems == "0x00" ? addressBook.WorldItems : args.worldItems, taisifu);
    //Deploy dahuang world
    let worldDeployed = yield (0, utils_1.deployDahuangWorld)(args.oneAgeVSecond, args.actRecoverTimeDay, args.zoneResourceGrowTimeDay, args.zoneResourceGrowQuantityScale, worldContractRoute, worldConstants, actors, actorLocations, worldYemings, zones, baseAttributes, trigrams, worldRandom, worldItems, actorSIDs, deployer, taisifu, {
        noSIDNames: true,
        noTalents: true,
        noTalentProcessors: true,
        noRelations: true,
        noItemTypes: true,
        noBuildingTypes: true,
        noEventProcessors: true,
        noTimelineEvents: true,
        noZones: true
    }, false);
    let dahuangContracts = worldDeployed.worldContracts;
    //register actors uri modules
    yield (yield actors.registerURIPartModule(dahuangContracts.ShejiTuProxy.instance.address)).wait();
    const contracts = {
        ShejiTu: dahuangContracts.ShejiTu,
        ShejiTuProxyAdmin: dahuangContracts.ShejiTuProxyAdmin,
        ShejiTuProxy: dahuangContracts.ShejiTuProxy,
    };
    const sharedAddressPath = (0, addressConfig_1.getAddressBookShareFilePath)(process_args.network ? process_args.network : "hard");
    for (const [name, contract] of Object.entries(dahuangContracts))
        addressBook[name] = contract.instance.address;
    for (const [name, contract] of Object.entries(contracts)) {
        if (addressBook[name] != contract.instance.address)
            addressBook[name] = contract.instance.address;
    }
    addressBook = Object.assign(addressBook, addressBook, worldDeployed.eventProcessorAddressBook);
    yield fs_extra_1.default.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
    console.log(`contract deployed book:`);
    console.log(JSON.stringify(addressBook, null, 2));
    //constructor arguments
    const sharedArgsPath = (0, addressConfig_1.getConstructorArgumentsBookShareFilePath)(process_args.network ? process_args.network : "hard");
    let argsBook = {};
    for (const [name, contract] of Object.entries(dahuangContracts))
        argsBook[name] = contract.constructorArguments;
    for (const [name, contract] of Object.entries(contracts))
        argsBook[name] = contract.constructorArguments;
    yield fs_extra_1.default.writeFile(sharedArgsPath, JSON.stringify(argsBook, null, 2));
    console.log(`contract constructor arguments book:`);
    console.log(JSON.stringify(argsBook, null, 2));
    return contracts;
}));
