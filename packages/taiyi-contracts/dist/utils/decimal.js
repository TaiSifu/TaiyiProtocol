"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class Decimal {
    static new(value) {
        const decimalPlaces = countDecimals(value);
        const difference = 18 - decimalPlaces;
        const zeros = ethers_1.BigNumber.from(10).pow(difference);
        const abs = ethers_1.BigNumber.from(`${value.toString().replace('.', '')}`);
        return { value: abs.mul(zeros) };
    }
    static raw(value) {
        return { value: ethers_1.BigNumber.from(value) };
    }
}
exports.default = Decimal;
function countDecimals(value) {
    if (Math.floor(value) !== value)
        return value.toString().split('.')[1].length || 0;
    return 0;
}
