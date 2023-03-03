"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vrgda__factory = void 0;
const ethers_1 = require("ethers");
class Vrgda__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.Vrgda__factory = Vrgda__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "int256",
                name: "sold",
                type: "int256",
            },
        ],
        name: "getTargetSaleTime",
        outputs: [
            {
                internalType: "int256",
                name: "",
                type: "int256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "int256",
                name: "timeSinceStart",
                type: "int256",
            },
            {
                internalType: "uint256",
                name: "sold",
                type: "uint256",
            },
        ],
        name: "getVRGDAPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "targetPrice",
        outputs: [
            {
                internalType: "int256",
                name: "",
                type: "int256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
