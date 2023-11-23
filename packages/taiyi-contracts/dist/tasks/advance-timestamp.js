"use strict";
//yarn task:advance-timestamp --network hard
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const config_1 = require("hardhat/config");
(0, config_1.task)('advance-timestamp', '加速时间')
    .addOptionalParam('time', 'seconds', 86400, config_1.types.int)
    .setAction((args, { ethers, run }) => __awaiter(void 0, void 0, void 0, function* () {
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
    let timestamp = yield blockTimestamp(ethers_1.BigNumber.from(yield blockNumber()).toHexString().replace("0x0", "0x"));
    console.log(`${timestamp}...`);
    yield ethers.provider.send('evm_increaseTime', [args.time]);
    yield ethers.provider.send('evm_mine', []);
    timestamp = yield blockTimestamp(ethers_1.BigNumber.from(yield blockNumber()).toHexString().replace("0x0", "0x"));
    console.log(`...${timestamp}`);
}));
