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
exports.initZones = exports.addZones = void 0;
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const zonesData = __importStar(require("../files/zones.json"));
function addZones(timeline, _zones) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < _zones.length; i++) {
            process.stdout.write(`\u001B[1000Dzone ${Math.round(i * 100.0 / _zones.length)}%`);
            let tx = yield timeline.activeTrigger(70000, 0, [_zones[i].parentZone], [_zones[i].name]);
            yield tx.wait();
        }
        process.stdout.write(`\u001B[1000Dzone 100%`);
    });
}
exports.addZones = addZones;
function initZones(worldConst, timelineAddress, operator) {
    return __awaiter(this, void 0, void 0, function* () {
        let timeline = typechain_1.ShejiTu__factory.connect(timelineAddress, operator);
        let ACTOR_PANGU = yield worldConst.ACTOR_PANGU();
        let zones = zonesData;
        let ids = Object.keys(zones);
        for (var g = 0; g < ids.length; g += 15) {
            let names = [];
            for (var i = g; i < (g + 15); i++) {
                if (i >= ids.length)
                    break;
                process.stdout.write(`\u001B[1000Dzone ${Math.round(i * 100.0 / ids.length)}%`);
                let z = zones[ids[i]];
                if (z.name == undefined)
                    break;
                names.push(z.name);
            }
            if (names.length > 0) {
                let tx = yield timeline.activeTrigger(70000, ACTOR_PANGU, [0], names);
                yield tx.wait();
            }
        }
        process.stdout.write(`\u001B[1000D                                                   `);
        process.stdout.write(`\u001B[1000D`);
    });
}
exports.initZones = initZones;
