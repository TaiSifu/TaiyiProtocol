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
exports.address = exports.chainId = exports.mineBlock = exports.minerStart = exports.minerStop = exports.setNextBlockTimestamp = exports.blockTimestamp = exports.blockNumber = exports.advanceBlocks = exports.freezeTime = exports.increaseTime = exports.blockByNumber = exports.encodeParameters = exports.setTotalSupply = exports.MintSifus = exports.populateDescriptor = exports.deployWeth = exports.deploySifusToken = exports.deploySifusSeeder = exports.deploySifusDescriptor = exports.getSigners = void 0;
require("@nomiclabs/hardhat-ethers");
const hardhat_1 = require("hardhat");
const typechain_1 = require("../typechain");
const image_data_json_1 = __importDefault(require("../files/image-data.json"));
const utils_1 = require("../utils");
const getSigners = () => __awaiter(void 0, void 0, void 0, function* () {
    const [deployer, account0, account1, account2] = yield hardhat_1.ethers.getSigners();
    return {
        deployer,
        account0,
        account1,
        account2,
    };
});
exports.getSigners = getSigners;
const deploySifusDescriptor = (deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const signer = deployer || (yield (0, exports.getSigners)()).deployer;
    // const multiPartRLEToSVGLibraryFactory = await ethers.getContractFactory('MultiPartRLEToSVG', signer);
    // const multiPartRLEToSVGLibrary = await multiPartRLEToSVGLibraryFactory.deploy();
    const sifusDescriptorFactory = new typechain_1.SifusDescriptor__factory(signer);
    return sifusDescriptorFactory.deploy();
});
exports.deploySifusDescriptor = deploySifusDescriptor;
const deploySifusSeeder = (deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.SifusSeeder__factory(deployer || (yield (0, exports.getSigners)()).deployer);
    return factory.deploy();
});
exports.deploySifusSeeder = deploySifusSeeder;
const deploySifusToken = (worldRouteAddress, deployer, taiyiDAO, descriptor, seeder) => __awaiter(void 0, void 0, void 0, function* () {
    const signer = deployer || (yield (0, exports.getSigners)()).deployer;
    const factory = new typechain_1.SifusToken__factory(signer);
    return factory.deploy(taiyiDAO || signer.address, descriptor || (yield (0, exports.deploySifusDescriptor)(signer)).address, seeder || (yield (0, exports.deploySifusSeeder)(signer)).address, worldRouteAddress);
});
exports.deploySifusToken = deploySifusToken;
const deployWeth = (deployer) => __awaiter(void 0, void 0, void 0, function* () {
    const factory = new typechain_1.Weth__factory(deployer || (yield yield (0, exports.getSigners)()).deployer);
    return factory.deploy();
});
exports.deployWeth = deployWeth;
const populateDescriptor = (sifusDescriptor) => __awaiter(void 0, void 0, void 0, function* () {
    const { bgcolors, palette, images } = image_data_json_1.default;
    const { bodies, accessories, heads, glasses } = images;
    // Split up head and accessory population due to high gas usage
    yield Promise.all([
        sifusDescriptor.addManyBackgrounds(bgcolors),
        sifusDescriptor.addManyColorsToPalette(0, palette),
        sifusDescriptor.addManyPart1s(bodies.map(({ data }) => data)),
        (0, utils_1.chunkArray)(accessories, 10).map(chunk => sifusDescriptor.addManyPart2s(chunk.map(({ data }) => data))),
        (0, utils_1.chunkArray)(heads, 10).map(chunk => sifusDescriptor.addManyPart3s(chunk.map(({ data }) => data))),
        sifusDescriptor.addManyPart4s(glasses.map(({ data }) => data)),
    ]);
});
exports.populateDescriptor = populateDescriptor;
/**
 * Return a function used to mint `amount` Sifus on the provided `token`
 * @param token The Sifu ERC721 token
 * @param amount The number of Sifus to mint
 */
const MintSifus = (operator, token, burnTaisifusTokens = true) => {
    return (amount) => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < amount; i++) {
            yield token.mint(operator);
        }
        if (!burnTaisifusTokens)
            return;
        yield (0, exports.setTotalSupply)(operator, token, amount);
    });
};
exports.MintSifus = MintSifus;
/**
 * Mints or burns tokens to target a total supply. Due to Taiyidao's rewards tokens may be burned and tokenIds will not be sequential
 */
const setTotalSupply = (operator, token, newTotalSupply) => __awaiter(void 0, void 0, void 0, function* () {
    const totalSupply = (yield token.totalSupply()).toNumber();
    if (totalSupply < newTotalSupply) {
        for (let i = 0; i < newTotalSupply - totalSupply; i++) {
            yield token.mint(operator);
        }
        // If Taiyidao's reward tokens were minted totalSupply will be more than expected, so run setTotalSupply again to burn extra tokens
        yield (0, exports.setTotalSupply)(operator, token, newTotalSupply);
    }
    if (totalSupply > newTotalSupply) {
        for (let i = newTotalSupply; i < totalSupply; i++) {
            yield token.burn(operator, i);
        }
    }
});
exports.setTotalSupply = setTotalSupply;
// The following adapted from `https://github.com/compound-finance/compound-protocol/blob/master/tests/Utils/Ethereum.js`
const rpc = ({ method, params, }) => {
    return hardhat_1.network.provider.send(method, params);
};
const encodeParameters = (types, values) => {
    const abi = new hardhat_1.ethers.utils.AbiCoder();
    return abi.encode(types, values);
};
exports.encodeParameters = encodeParameters;
const blockByNumber = (n) => __awaiter(void 0, void 0, void 0, function* () {
    return rpc({ method: 'eth_getBlockByNumber', params: [n, false] });
});
exports.blockByNumber = blockByNumber;
const increaseTime = (seconds) => __awaiter(void 0, void 0, void 0, function* () {
    yield rpc({ method: 'evm_increaseTime', params: [seconds] });
    return rpc({ method: 'evm_mine' });
});
exports.increaseTime = increaseTime;
const freezeTime = (seconds) => __awaiter(void 0, void 0, void 0, function* () {
    yield rpc({ method: 'evm_increaseTime', params: [-1 * seconds] });
    return rpc({ method: 'evm_mine' });
});
exports.freezeTime = freezeTime;
const advanceBlocks = (blocks) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < blocks; i++) {
        yield (0, exports.mineBlock)();
    }
});
exports.advanceBlocks = advanceBlocks;
const blockNumber = (parse = true) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rpc({ method: 'eth_blockNumber' });
    return parse ? parseInt(result.toString()) : result;
});
exports.blockNumber = blockNumber;
const blockTimestamp = (n, parse = true) => __awaiter(void 0, void 0, void 0, function* () {
    const block = yield (0, exports.blockByNumber)(n);
    return parse ? parseInt(block.timestamp.toString()) : block.timestamp;
});
exports.blockTimestamp = blockTimestamp;
const setNextBlockTimestamp = (n, mine = true) => __awaiter(void 0, void 0, void 0, function* () {
    yield rpc({ method: 'evm_setNextBlockTimestamp', params: [n] });
    if (mine)
        yield (0, exports.mineBlock)();
});
exports.setNextBlockTimestamp = setNextBlockTimestamp;
const minerStop = () => __awaiter(void 0, void 0, void 0, function* () {
    yield hardhat_1.network.provider.send('evm_setAutomine', [false]);
    yield hardhat_1.network.provider.send('evm_setIntervalMining', [0]);
});
exports.minerStop = minerStop;
const minerStart = () => __awaiter(void 0, void 0, void 0, function* () {
    yield hardhat_1.network.provider.send('evm_setAutomine', [true]);
});
exports.minerStart = minerStart;
const mineBlock = () => __awaiter(void 0, void 0, void 0, function* () {
    yield hardhat_1.network.provider.send('evm_mine');
});
exports.mineBlock = mineBlock;
const chainId = () => __awaiter(void 0, void 0, void 0, function* () {
    return parseInt(yield hardhat_1.network.provider.send('eth_chainId'), 16);
});
exports.chainId = chainId;
const address = (n) => {
    return `0x${n.toString(16).padStart(40, '0')}`;
};
exports.address = address;
