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
const fs_1 = __importDefault(require("fs"));
const config_1 = require("hardhat/config");
(0, config_1.task)('deploy-ci', '快速部署太乙合约 (automated by CI)')
    .setAction(({ taisifu }, { ethers, run }) => __awaiter(void 0, void 0, void 0, function* () {
    const [deployer] = yield ethers.getSigners();
    const contracts = yield run('deploy', {});
    if (!fs_1.default.existsSync('logs')) {
        fs_1.default.mkdirSync('logs');
    }
    fs_1.default.writeFileSync('logs/deploy.json', JSON.stringify({
        contractAddresses: {
            SifusDescriptor: contracts.SifusDescriptor.address,
            SifusSeeder: contracts.SifusSeeder.address,
            SifusToken: contracts.SifusToken.address,
        },
        gitHub: {
            // Get the commit sha when running in CI
            sha: process.env.GITHUB_SHA,
        },
    }), { flag: 'w' });
}));
