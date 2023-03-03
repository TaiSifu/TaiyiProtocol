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
const fs_extra_1 = __importDefault(require("fs-extra"));
const ethers_1 = require("ethers");
const config_1 = require("hardhat/config");
const addressConfig_1 = require("../utils/addressConfig");
function getAddressBook(net) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const sharedAddressPath = (0, addressConfig_1.getAddressBookShareFilePath)(net);
        return JSON.parse(fs_extra_1.default.readFileSync(sharedAddressPath, { encoding: "ascii" }));
    });
}
(0, config_1.task)('create-proposal', 'Create a governance proposal')
    .addOptionalParam('net', 'The network name', "hard", config_1.types.string)
    .addOptionalParam('taiyiDAOProxy', 'The `taiyiDAOProxy` contract address', '', config_1.types.string)
    .setAction(({ net, taiyiDAOProxy }, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (taiyiDAOProxy == '')
        taiyiDAOProxy = (yield getAddressBook(net)).TaiyiDAOLogicV1;
    const TaiyiDAOFactory = yield ethers.getContractFactory('TaiyiDAOLogicV1');
    const TaiyiDAO = TaiyiDAOFactory.attach(taiyiDAOProxy);
    const [deployer] = yield ethers.getSigners();
    const oneETH = ethers_1.utils.parseEther('1');
    const receipt = yield (yield TaiyiDAO.propose([deployer.address], [oneETH], [''], ['0x'], '# Test Proposal\n## This is a **test**.')).wait();
    if (!((_a = receipt.events) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new Error('Failed to create proposal');
    }
    console.log('Proposal created');
}));
