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
exports.initSIDNames = exports.setSIDNames = void 0;
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const sidNames = __importStar(require("../files/sids.json"));
function setSIDNames(sids, names) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < names.length; i++) {
            process.stdout.write(`\u001B[1000DSIDName ${Math.round(i * 100.0 / names.length)}%`);
            if ((yield sids.names(names[i].id)) == "") {
                let tx = yield sids.setSIDName(names[i].id, names[i].name);
                //await tx.wait();
            }
        }
        process.stdout.write(`\u001B[1000DSIDName 100%`);
    });
}
exports.setSIDNames = setSIDNames;
function initSIDNames(sidsAddress, operator) {
    return __awaiter(this, void 0, void 0, function* () {
        let sids = typechain_1.ActorSocialIdentity__factory.connect(sidsAddress, operator);
        let _sidNames = sidNames;
        let ids = Object.keys(sidNames);
        let _names = [];
        for (var g = 0; g < ids.length; g += 1) {
            let r = _sidNames[ids[g]];
            if (r.name == undefined)
                continue;
            _names.push({
                id: ids[g],
                name: r.name
            });
        }
        yield setSIDNames(sids, _names);
        process.stdout.write(`\u001B[1000D                                                   `);
        process.stdout.write(`\u001B[1000D`);
    });
}
exports.initSIDNames = initSIDNames;
