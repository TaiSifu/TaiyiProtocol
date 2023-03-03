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
exports.initTimeline = exports.addTimeline = void 0;
const typechain_1 = require("@taiyi/contracts/dist/typechain");
const eventsData = __importStar(require("../files/ages.json"));
function addTimeline(timeline, age, ageEvts) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < ageEvts.length; i++) {
            process.stdout.write(`\u001B[1000Dage ${age} ${Math.round(i * 100.0 / ageEvts.length)}%`);
            let tx = yield timeline.addAgeEvent(age, ageEvts[i][0], `${ageEvts[i][1]}`);
            yield tx.wait();
        }
        process.stdout.write(`\u001B[1000Dage ${age} 100%`);
    });
}
exports.addTimeline = addTimeline;
function initTimeline(timelineAddress, operator) {
    return __awaiter(this, void 0, void 0, function* () {
        let timeline = typechain_1.ShejiTu__factory.connect(timelineAddress, operator);
        let events = eventsData;
        //read age list to init events in certain age automatically, most for development and debug
        let ages = Object.keys(events);
        for (var ageId = 0; ageId < ages.length; ageId++) {
            let age = ages[ageId];
            if (age == "999999999") //no need to add this age's events which are just for event deployment
                continue;
            let ageEvts = events[age].event;
            if (ageEvts != undefined) {
                let ageEvtsKeys = Object.keys(ageEvts);
                let evtIds = ageEvtsKeys.map(v => {
                    const value = `${v}`.split('*').map(n => Number(n));
                    if (value.length == 1)
                        value.push(1);
                    value[1] = Math.round(value[1] * 100); //avoid fractional part, make to 3 precision int
                    return value;
                });
                for (var i = 0; i < evtIds.length; i++) {
                    let tx = yield timeline.addAgeEvent(age, evtIds[i][0], `${evtIds[i][1]}`);
                    yield tx.wait();
                    process.stdout.write(`\u001B[1000Dage ${age} ${Math.round(i * 100.0 / evtIds.length)}%`);
                }
            }
        }
        process.stdout.write(`\u001B[1000D                                                   `);
        process.stdout.write(`\u001B[1000D`);
    });
}
exports.initTimeline = initTimeline;
