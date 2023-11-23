"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Erc721Holder__factory = void 0;
const ethers_1 = require("ethers");
class Erc721Holder__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.Erc721Holder__factory = Erc721Holder__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC721Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506101af806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063150b7a0214610030575b600080fd5b61004e61003e366004610087565b630a85bd0160e11b949350505050565b6040516001600160e01b0319909116815260200160405180910390f35b80356001600160a01b038116811461008257600080fd5b919050565b6000806000806080858703121561009d57600080fd5b6100a68561006b565b93506100b46020860161006b565b925060408501359150606085013567ffffffffffffffff808211156100d857600080fd5b818701915087601f8301126100ec57600080fd5b8135818111156100fe576100fe610163565b604051601f8201601f19908116603f0116810190838211818310171561012657610126610163565b816040528281528a602084870101111561013f57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b634e487b7160e01b600052604160045260246000fdfea264697066735822122036c6461e5ef0e09888451e83bf5783023b105215394efd3d65881675048cdebb64736f6c63430008060033";
