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
const ethereum_waffle_1 = require("ethereum-waffle");
const image_data_json_1 = __importDefault(require("../files/image-data.json"));
const utils_1 = require("./utils");
const hardhat_1 = require("hardhat");
const fs_1 = require("fs");
chai_1.default.use(ethereum_waffle_1.solidity);
const { expect } = chai_1.default;
describe('师傅令牌图形描述器', () => {
    let sifusDescriptor;
    let snapshotId;
    const part = {
        length: 0,
        index: 0,
    };
    const longest = {
        bodies: part,
        accessories: part,
        heads: part,
        glasses: part,
    };
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        sifusDescriptor = yield (0, utils_1.deploySifusDescriptor)();
        for (const [l, layer] of Object.entries(image_data_json_1.default.images)) {
            for (const [i, item] of layer.entries()) {
                if (item.data.length > longest[l].length) {
                    longest[l] = {
                        length: item.data.length,
                        index: i,
                    };
                }
            }
        }
        yield (0, utils_1.populateDescriptor)(sifusDescriptor);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        snapshotId = yield hardhat_1.ethers.provider.send('evm_snapshot', []);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield hardhat_1.ethers.provider.send('evm_revert', [snapshotId]);
    }));
    it('生成SVG', () => __awaiter(void 0, void 0, void 0, function* () {
        const svg = yield sifusDescriptor.generateSVGImage({
            background: 0,
            part1: longest.bodies.index,
            part2: longest.accessories.index,
            part3: longest.heads.index,
            part4: longest.glasses.index,
        });
        //console.log(svg);
        expect(svg).to.not.be.undefined;
    }));
    // Unskip this test to validate the encoding of all parts. It ensures that no parts revert when building the token URI.
    // This test also outputs a parts.html file, which can be visually inspected.
    // Note that this test takes a long time to run. You must increase the mocha timeout to a large number.
    it.skip('生成所有可能的部件组合SVG', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Running... this may take a little while...');
        const { bgcolors, images } = image_data_json_1.default;
        const { bodies, accessories, heads, glasses } = images;
        const max = Math.max(bodies.length, accessories.length, heads.length, glasses.length);
        for (let i = 0; i < max; i++) {
            const svg = yield sifusDescriptor.tokenURI(i, {
                background: Math.min(i, bgcolors.length - 1),
                part1: Math.min(i, bodies.length - 1),
                part2: Math.min(i, accessories.length - 1),
                part3: Math.min(i, heads.length - 1),
                part4: Math.min(i, glasses.length - 1),
            });
            expect(svg).to.not.be.undefined;
            (0, fs_1.appendFileSync)('parts.html', svg);
            if (i && i % Math.round(max / 10) === 0) {
                console.log(`${Math.round((i / max) * 100)}% complete`);
            }
        }
    }));
});
