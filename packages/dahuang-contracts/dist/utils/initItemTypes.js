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
exports.initItemTypes = exports.addItemTypes = void 0;
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const item_types_1 = require("../files/item_types");
function addItemTypes(items, _types) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < _types.length; i++) {
            process.stdout.write(`\u001B[1000DitemTypes ${Math.round(i * 100.0 / _types.length)}%`);
            let tx = yield items.setTypeName(_types[i].id, _types[i].name);
            yield tx.wait();
        }
        process.stdout.write(`\u001B[1000DitemTypes 100%`);
    });
}
exports.addItemTypes = addItemTypes;
function initItemTypes(itemsAddress, operator) {
    return __awaiter(this, void 0, void 0, function* () {
        let items = typechain_1.WorldItems__factory.connect(itemsAddress, operator);
        let types = (0, item_types_1.generateItemTypes)();
        let ids = Object.keys(types);
        let _types = [];
        for (var g = 0; g < ids.length; g += 1) {
            let r = types[ids[g]];
            if (r.name == undefined)
                continue;
            _types.push({
                id: ids[g],
                name: r.name
            });
        }
        yield addItemTypes(items, _types);
        process.stdout.write(`\u001B[1000D                                                   `);
        process.stdout.write(`\u001B[1000D`);
    });
}
exports.initItemTypes = initItemTypes;
