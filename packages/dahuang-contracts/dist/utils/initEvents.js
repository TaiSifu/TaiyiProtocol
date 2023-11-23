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
exports.initEvents = exports.deployEvents = void 0;
const factory = __importStar(require("../typechain"));
const ageEventsData = __importStar(require("../files/ages.json"));
const typechain_1 = require("@taiyi/contracts/dist/typechain");
function deployEvents(evtMaps, route, eventsAddress, operator, deployer) {
    return __awaiter(this, void 0, void 0, function* () {
        let addressBook = {};
        let events = typechain_1.WorldEvents__factory.connect(eventsAddress, operator);
        //set event processor
        let keys = Object.keys(evtMaps);
        for (var i = 0; i < keys.length; i++) {
            process.stdout.write(`\u001B[1000D${Math.round(i * 100.0 / keys.length)}%`);
            let eventId = keys[i];
            let deployParams = evtMaps[eventId] || [];
            if (eventId != undefined) {
                let processorAddress = yield events.eventProcessors(eventId);
                if (processorAddress == "0x0000000000000000000000000000000000000000") {
                    let factoryFuncStrs = [
                        `function gen_factory(deployer, factory, params, rlAddress) { return new factory.WorldEventProcessor${eventId}__factory(deployer).deploy(rlAddress); }`,
                        `function gen_factory(deployer, factory, params, rlAddress) { return new factory.WorldEventProcessor${eventId}__factory(deployer).deploy(params[0], rlAddress); }`,
                        `function gen_factory(deployer, factory, params, rlAddress) { return new factory.WorldEventProcessor${eventId}__factory(deployer).deploy(params[0], params[1], rlAddress); }`,
                        `function gen_factory(deployer, factory, params, rlAddress) { return new factory.WorldEventProcessor${eventId}__factory(deployer).deploy(params[0], params[1], params[2], rlAddress); }`
                    ];
                    let factoryFun = new Function('return ' + factoryFuncStrs[deployParams.length]);
                    const deployTx = yield (yield factoryFun()(deployer, factory, deployParams, route.address)).deployed();
                    addressBook[`WorldEventProcessor${eventId}`] = deployTx.address;
                    let tx = yield events.setEventProcessor(eventId, deployTx.address);
                    yield tx.wait();
                }
                else {
                    addressBook[`WorldEventProcessor${eventId}`] = processorAddress;
                }
            }
        }
        process.stdout.write(`\u001B[1000D`);
        return addressBook;
    });
}
exports.deployEvents = deployEvents;
function initEvents(route, eventsAddress, operator, deployer) {
    return __awaiter(this, void 0, void 0, function* () {
        let ageEvents = ageEventsData;
        //events must be included
        let keymaps = {};
        //read ages to init events automatically, most for development and debug
        let ages = Object.keys(ageEvents);
        for (var ageId = 0; ageId < ages.length; ageId++) {
            let age = ages[ageId];
            let ageEvts = ageEvents[age].event;
            if (ageEvts != undefined) {
                let ageEvtsKeys = Object.keys(ageEvts);
                let evtIds = ageEvtsKeys.map(v => {
                    const value = `${v}`.split('*').map(n => Number(n));
                    return value;
                });
                for (var i = 0; i < evtIds.length; i++) {
                    keymaps[evtIds[i][0]] = ageEvts[ageEvtsKeys[i]];
                }
            }
        }
        return deployEvents(keymaps, route, eventsAddress, operator, deployer);
    });
}
exports.initEvents = initEvents;
