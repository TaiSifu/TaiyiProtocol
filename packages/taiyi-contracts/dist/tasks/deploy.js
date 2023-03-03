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
const deployWorld_1 = require("../utils/deployWorld");
const typechain_1 = require("../typechain");
const ethers_1 = require("ethers");
const addressConfig_1 = require("../utils/addressConfig");
const process_args = require('minimist')(process.argv.slice(2));
(0, config_1.task)('deploy', '部署太乙基础合约')
    .addOptionalParam('actorMintStartTime', '角色发行起始时间 (block timestamp)', '', config_1.types.string) // Default: immediately
    .addOptionalParam('timelockDelay', '赏善罚恶令执行延迟 (seconds)', 60 * 60 * 24 * 2, config_1.types.int) // Default: 2 days
    .addOptionalParam('votingPeriod', '投票期 (blocks)', 4 * 60 * 24 * 3, config_1.types.int) // Default: 3 days
    .addOptionalParam('votingDelay', '投票延迟开始 (blocks)', 1, config_1.types.int) // Default: 1 block
    .addOptionalParam('proposalThresholdBps', '提案者持票阈值 (基点10000=100%)', 500, config_1.types.int) // Default: 5%
    .addOptionalParam('quorumVotesBps', '法定投票占比 (基点10000=100%)', 1000, config_1.types.int) // Default: 10%
    .setAction((args, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    //const network = await ethers.provider.getNetwork();        
    // if (network.chainId !== 31337) {
    //     console.log(`Invalid chain id. Expected 31337. Got: ${network.chainId}.`);
    //     return;
    // }
    const [deployer, taisifu] = yield ethers.getSigners();
    console.log(`Deployer: ${deployer.address}`);
    console.log(`Taisifu: ${taisifu.address}`);
    let multiPartRLEToSVG = yield (yield ethers.getContractFactory('MultiPartRLEToSVG', deployer)).deploy();
    const blockNumber = (parse = true) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield ethers.provider.send('eth_blockNumber', []);
        return parse ? parseInt(result.toString()) : result;
    });
    const blockByNumber = (n) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ethers.provider.send('eth_getBlockByNumber', [n, false]);
    });
    const blockTimestamp = (n, parse = true) => __awaiter(void 0, void 0, void 0, function* () {
        const block = yield blockByNumber(n);
        return parse ? parseInt(block.timestamp.toString()) : block.timestamp;
    });
    //Deploy Taiyi World
    const timestamp = yield blockTimestamp(ethers_1.BigNumber.from(yield blockNumber()).toHexString().replace("0x0", "0x"));
    let worldContracts = yield (0, deployWorld_1.deployTaiyiWorld)(timestamp, deployer, taisifu || deployer, true);
    //register actors uri modules
    const actors = typechain_1.Actors__factory.connect(worldContracts.Actors.instance.address, taisifu);
    yield (yield actors.registerURIPartModule(worldContracts.ActorNames.instance.address)).wait();
    yield (yield actors.registerURIPartModule(worldContracts.ActorSocialIdentity.instance.address)).wait();
    //CALCULATE Gov Delegate, takes place after 2 transactions
    const expectedTaiyiDAOProxyAddress = ethers.utils.getContractAddress({
        from: deployer.address,
        nonce: (yield deployer.getTransactionCount()) + 2,
    });
    //DEPLOY TaiyiDAOExecutor with pre-computed Delegator address
    console.log("Deploy TaiyiDaoExecutor...");
    const timelock = yield (yield new typechain_1.TaiyiDaoExecutor__factory(deployer).deploy(expectedTaiyiDAOProxyAddress, args.timelockDelay)).deployed();
    const timelockArgs = [expectedTaiyiDAOProxyAddress, args.timelockDelay];
    //DEPLOY Delegate
    console.log("Deploy TaiyiDaoLogicV1...");
    const govDelegate = yield (yield new typechain_1.TaiyiDaoLogicV1__factory(deployer).deploy()).deployed();
    //DEPLOY Delegator
    console.log("Deploy TaiyiDaoProxy...");
    const taiyiDAOProxy = yield (yield new typechain_1.TaiyiDaoProxy__factory(deployer).deploy(timelock.address, worldContracts.SifusToken.instance.address, taisifu.address, timelock.address, govDelegate.address, args.votingPeriod, args.votingDelay, args.proposalThresholdBps, args.quorumVotesBps)).deployed();
    const taiyiDAOProxyArgs = [timelock.address,
        worldContracts.SifusToken.instance.address,
        taisifu.address,
        timelock.address,
        govDelegate.address,
        args.votingPeriod,
        args.votingDelay,
        args.proposalThresholdBps,
        args.quorumVotesBps];
    const contracts = {
        MultiPartRLEToSVG: { instance: multiPartRLEToSVG },
        SifusDescriptor: worldContracts.SifusDescriptor,
        SifusSeeder: worldContracts.SifusSeeder,
        SifusToken: worldContracts.SifusToken,
        TaiyiDAOExecutor: { instance: timelock, constructorArguments: timelockArgs },
        TaiyiDAOLogicV1: { instance: govDelegate },
        TaiyiDAOProxy: { instance: taiyiDAOProxy, constructorArguments: taiyiDAOProxyArgs },
    };
    const sharedAddressPath = (0, addressConfig_1.getAddressBookShareFilePath)(process_args.network ? process_args.network : "hard");
    let addressBook = {};
    for (const [name, contract] of Object.entries(worldContracts))
        addressBook[name] = contract.instance.address;
    for (const [name, contract] of Object.entries(contracts)) {
        if (addressBook[name] != contract.instance.address)
            addressBook[name] = contract.instance.address;
    }
    yield fs_extra_1.default.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
    console.log(`contract deployed book:`);
    console.log(JSON.stringify(addressBook, null, 2));
    //constructor arguments
    const sharedArgsPath = (0, addressConfig_1.getConstructorArgumentsBookShareFilePath)(process_args.network ? process_args.network : "hard");
    let argsBook = {};
    for (const [name, contract] of Object.entries(worldContracts))
        argsBook[name] = contract.constructorArguments;
    for (const [name, contract] of Object.entries(contracts))
        argsBook[name] = contract.constructorArguments;
    yield fs_extra_1.default.writeFile(sharedArgsPath, JSON.stringify(argsBook, null, 2));
    console.log(`contract constructor arguments book:`);
    console.log(JSON.stringify(argsBook, null, 2));
    return contracts;
}));
