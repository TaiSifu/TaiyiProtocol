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
const chai_1 = __importDefault(require("chai"));
const hardhat_1 = require("hardhat");
const ethereum_waffle_1 = require("ethereum-waffle");
const utils_1 = require("../../utils");
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
describe('随机数系统测试', () => {
    let deployer;
    let snapshotId;
    let worldRandom;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        [deployer] = yield hardhat_1.ethers.getSigners();
        //Deploy WorldRandom
        worldRandom = yield (0, utils_1.deployWorldRandom)(deployer);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
    }));
    it("dn", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`dn = ${(yield worldRandom.dn(1, 100)).toNumber()}`);
    }));
});
