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
exports.initRelations = exports.addRelations = void 0;
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const relationData = __importStar(require("../files/relationships.json"));
function addRelations(relationship, _relations) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < _relations.length; i++) {
            process.stdout.write(`\u001B[1000DRelations ${Math.round(i * 100.0 / _relations.length)}%`);
            let tx = yield relationship.setRelation(_relations[i].id, _relations[i].name);
            yield tx.wait();
        }
        process.stdout.write(`\u001B[1000DRelations 100%`);
    });
}
exports.addRelations = addRelations;
function initRelations(relationshipAddress, operator) {
    return __awaiter(this, void 0, void 0, function* () {
        let relationship = typechain_1.ActorRelationship__factory.connect(relationshipAddress, operator);
        let _relationData = relationData;
        let ids = Object.keys(_relationData);
        let _relations = [];
        for (var g = 0; g < ids.length; g += 1) {
            let r = _relationData[ids[g]];
            if (r.name == undefined)
                continue;
            _relations.push({
                id: ids[g],
                name: r.name
            });
        }
        yield addRelations(relationship, _relations);
        process.stdout.write(`\u001B[1000D                                                   `);
        process.stdout.write(`\u001B[1000D`);
    });
}
exports.initRelations = initRelations;
