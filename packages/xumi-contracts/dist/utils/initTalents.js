"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deployTalentProcessors = exports.initTalents = void 0;
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const talentsJSON = __importStar(require("../files/talents.json"));
const ethers_1 = require("ethers");
const initTalents = (talentsAddress, operator, xumiConstants, worldConstants) => __awaiter(void 0, void 0, void 0, function* () {
    let talents = typechain_1.ActorTalents__factory.connect(talentsAddress, operator);
    let W_MODULE_XUMI_ATTRIBUTES = yield xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES();
    let INF = yield xumiConstants.ATTR_INF();
    let MAS = yield xumiConstants.ATTR_MAS();
    let ENG = yield xumiConstants.ATTR_ENG();
    let STB = yield xumiConstants.ATTR_STB();
    let HLH = yield worldConstants.ATTR_HLH();
    let AGE = yield worldConstants.ATTR_AGE();
    //read talent list to init talent automatically, most for development and debug
    let talentsData = talentsJSON;
    let keys = Object.keys(talentsData);
    for (var i = 0; i < keys.length; i++) {
        process.stdout.write(`\u001B[1000D${Math.round(i * 100.0 / keys.length)}%`);
        let tlt = talentsData[keys[i]];
        let name = tlt.name;
        let description = tlt.description;
        let attr_modifyer = ethers_1.BigNumber.from(tlt.status ? tlt.status : 0);
        let exclusive = tlt.exclusive ? tlt.exclusive : [];
        let exclusivity = [];
        for (var e = 0; e < exclusive.length; e++) {
            exclusivity.push(ethers_1.BigNumber.from(exclusive[e]));
        }
        let effect = tlt.effect ? tlt.effect : {};
        let modifiers = [];
        if (effect.HLH)
            modifiers.push(HLH, ethers_1.BigNumber.from(effect.HLH));
        if (effect.AGE)
            modifiers.push(AGE, ethers_1.BigNumber.from(effect.AGE));
        if (effect.INF)
            modifiers.push(INF, ethers_1.BigNumber.from(effect.INF));
        if (effect.MAS)
            modifiers.push(MAS, ethers_1.BigNumber.from(effect.MAS));
        if (effect.ENG)
            modifiers.push(ENG, ethers_1.BigNumber.from(effect.ENG));
        if (effect.STB)
            modifiers.push(STB, ethers_1.BigNumber.from(effect.STB));
        let attr_point_modifiers = [W_MODULE_XUMI_ATTRIBUTES, attr_modifyer];
        if (tlt.id != undefined) {
            let tx = yield talents.setTalent(tlt.id, name, description, modifiers, attr_point_modifiers);
            //await tx.wait();
            tx = yield talents.setTalentExclusive(tlt.id, exclusive);
            //await tx.wait();
        }
    }
    process.stdout.write(`\u001B[1000D`);
});
exports.initTalents = initTalents;
const deployTalentProcessors = (talentsAddress, operator, route, deployer) => __awaiter(void 0, void 0, void 0, function* () {
    let talents = typechain_1.ActorTalents__factory.connect(talentsAddress, operator);
    let processor;
    // processor = await (await (new ActorTalentProcessor1010__factory(deployer)).deploy(route.address)).deployed();
    // await talents.setTalentProcessor(1010, processor.address);
    // processor = await (await (new ActorTalentProcessor1049__factory(deployer)).deploy(route.address)).deployed();
    // await talents.setTalentProcessor(1049, processor.address);
    // processor = await (await (new ActorTalentProcessor1050__factory(deployer)).deploy(route.address)).deployed();
    // await talents.setTalentProcessor(1050, processor.address);
});
exports.deployTalentProcessors = deployTalentProcessors;
