"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorPrelifes__factory = void 0;
const ethers_1 = require("ethers");
class ActorPrelifes__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_route, overrides) {
        return super.deploy(_route, overrides || {});
    }
    getDeployTransaction(_route, overrides) {
        return super.getDeployTransaction(_route, overrides || {});
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
exports.ActorPrelifes__factory = ActorPrelifes__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "contract WorldContractRoute",
                name: "_route",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "actor",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "postLife",
                type: "uint256",
            },
        ],
        name: "Reincarnation",
        type: "event",
    },
    {
        inputs: [],
        name: "moduleID",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "postLifes",
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
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "preLifes",
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
        inputs: [
            {
                internalType: "uint256",
                name: "_operator",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_actor",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_prelife",
                type: "uint256",
            },
        ],
        name: "setPrelife",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_actor",
                type: "uint256",
            },
        ],
        name: "tokenJSON",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_actor",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_startY",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_lineHeight",
                type: "uint256",
            },
        ],
        name: "tokenSVG",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_endY",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50604051610f6a380380610f6a83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610ed7806100936000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80634becea6014610067578063595a22e51461009a5780637c3da21e146100ba5780638e47eac9146100c15780638f7bb179146100e2578063bad6a0c614610102575b600080fd5b610087610075366004610c48565b60026020526000908152604090205481565b6040519081526020015b60405180910390f35b6100876100a8366004610c48565b60016020526000908152604090205481565b6008610087565b6100d46100cf366004610c9e565b610117565b604051610091929190610dfb565b6100f56100f0366004610c48565b610132565b6040516100919190610de8565b610115610110366004610c9e565b610143565b005b606060006101268585856106ce565b91509150935093915050565b606061013d8261076a565b92915050565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561018657600080fd5b505afa15801561019a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101be9190610c09565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016101eb91815260200190565b60206040518083038186803b15801561020357600080fd5b505afa158015610217573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061023b9190610c26565b61027a5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b60448201526064015b60405180910390fd5b610283816107d4565b6102c75760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610271565b60008060009054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b15801561031657600080fd5b505afa15801561032a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061034e9190610c09565b9050600080826001600160a01b0316630847db59876040518263ffffffff1660e01b815260040161038191815260200190565b604080518083038186803b15801561039857600080fd5b505afa1580156103ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103d09190610c7a565b9092509050806104145760405162461bcd60e51b815260206004820152600f60248201526e3737b71032bc34b9ba1030b1ba37b960891b6044820152606401610271565b604051630847db5960e01b8152600481018690526001600160a01b03841690630847db5990602401604080518083038186803b15801561045357600080fd5b505afa158015610467573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048b9190610c7a565b9092509050806104d15760405162461bcd60e51b81526020600482015260116024820152706e6f6e206578697374207072656c69666560781b6044820152606401610271565b6000858152600260205260409020541561052d5760405162461bcd60e51b815260206004820152601960248201527f7072656c696665206973207265696e6361726e6174696f6e2e000000000000006044820152606401610271565b600080546040516340d9124560e11b8152600d60048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561057257600080fd5b505afa158015610586573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105aa9190610c09565b6040516392441c0d60e01b815260016004820152602481018890529091506001600160a01b038216906392441c0d9060440160206040518083038186803b1580156105f457600080fd5b505afa158015610608573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062c9190610c61565b156106795760405162461bcd60e51b815260206004820152601760248201527f7072656c696665206163746f7220697320616c6976652e0000000000000000006044820152606401610271565b6000878152600160209081526040808320899055888352600290915280822089905551889188917f2550dea950598666fca969139f52c53a561c836296f6b8abbb8969cec9c8e4869190a35050505050505050565b6060826106d9610be2565b6000868152600160205260409020541561073e576106f682610a6d565b60008781526001602052604090205461070e90610a6d565b60405160200161071f929190610d12565b60408051808303601f19018152919052815261073b8483610e1d565b91505b80516040516107509190602001610cf6565b604051602081830303815290604052925050935093915050565b6060610774610be2565b60008381526001602052604090205461078c90610a6d565b60405160200161079c9190610d9f565b60408051808303601f19018152918152818352516107bd9190602001610cf6565b604051602081830303815290604052915050919050565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561081957600080fd5b505afa15801561082d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108519190610c09565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b15801561089657600080fd5b505afa1580156108aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ce9190610c09565b6001600160a01b0316148061096357506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561092057600080fd5b505afa158015610934573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109589190610c09565b6001600160a01b0316145b80610a6657506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b1580156109b157600080fd5b505afa1580156109c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e99190610c09565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610a2e57600080fd5b505afa158015610a42573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a669190610c26565b9392505050565b60606000610a7a83610b0a565b600101905060008167ffffffffffffffff811115610a9a57610a9a610e73565b6040519080825280601f01601f191660200182016040528015610ac4576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610afd57610b02565b610ace565b509392505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610b495772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610b75576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610b9357662386f26fc10000830492506010015b6305f5e1008310610bab576305f5e100830492506008015b6127108310610bbf57612710830492506004015b60648310610bd1576064830492506002015b600a831061013d5760010192915050565b6040518060e001604052806007905b6060815260200190600190039081610bf15790505090565b600060208284031215610c1b57600080fd5b8151610a6681610e89565b600060208284031215610c3857600080fd5b81518015158114610a6657600080fd5b600060208284031215610c5a57600080fd5b5035919050565b600060208284031215610c7357600080fd5b5051919050565b60008060408385031215610c8d57600080fd5b505080516020909101519092909150565b600080600060608486031215610cb357600080fd5b505081359360208301359350604090920135919050565b60008151808452610ce2816020860160208601610e43565b601f01601f19169290920160200192915050565b60008251610d08818460208701610e43565b9190910192915050565b6f1e3a32bc3a103c1e91189811103c9e9160811b81528251600090610d3e816010850160208801610e43565b6e111031b630b9b99e913130b9b2911f60891b6010918401918201526872c4c6f25c4b77de4d60b91b601f8201528351610d7f816028840160208801610e43565b661e17ba32bc3a1f60c91b60289290910191820152602f01949350505050565b607b60f81b81526a011383932b634b332911d160ad1b60018201528151600090610dd081600c850160208701610e43565b607d60f81b600c939091019283015250600d01919050565b602081526000610a666020830184610cca565b604081526000610e0e6040830185610cca565b90508260208301529392505050565b60008219821115610e3e57634e487b7160e01b600052601160045260246000fd5b500190565b60005b83811015610e5e578181015183820152602001610e46565b83811115610e6d576000848401525b50505050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610e9e57600080fd5b5056fea2646970667358221220f9bff8bfd244a35021fbf830a6db56a662bd5629825a4868b9e145031c091b6164736f6c63430008060033";