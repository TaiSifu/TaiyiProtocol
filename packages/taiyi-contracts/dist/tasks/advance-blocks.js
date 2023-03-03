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
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
(0, config_1.task)('advance-blocks', 'advance blocks for debug')
    .addOptionalParam('blocks', 'the blocks to be advanced', 28800, config_1.types.int)
    .setAction((args, { ethers, run }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${yield ethers.provider.getBlockNumber()}...`);
    for (let i = 0; i < args.blocks; i++) {
        yield ethers.provider.send('evm_mine', []);
    }
    console.log(`...${yield ethers.provider.getBlockNumber()}`);
}));
