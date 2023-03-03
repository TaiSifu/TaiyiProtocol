"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor60523__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor60523__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor60523__factory = WorldEventProcessor60523__factory;
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
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
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
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "string[]",
                name: "",
                type: "string[]",
            },
        ],
        name: "activeTrigger",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "checkBranch",
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
                name: "_actor",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "checkOccurrence",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "defaultBranchEvent",
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
        name: "eventAttributeModifiers",
        outputs: [
            {
                internalType: "int256[]",
                name: "",
                type: "int256[]",
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
        name: "eventInfo",
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
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
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
                name: "_age",
                type: "uint256",
            },
        ],
        name: "process",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_enentId",
                type: "uint256",
            },
        ],
        name: "setDefaultBranch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
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
        name: "trigrams",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b5060405162002389380380620023898339810160408190526200003491620000c1565b600080546001600160a01b0319166001600160a01b0383161781558190620000636200005d3390565b6200006f565b60025550620000f39050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600060208284031215620000d457600080fd5b81516001600160a01b0381168114620000ec57600080fd5b9392505050565b61228680620001036000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610160578063c0f1619c14610173578063c729329414610197578063ca5bf9a4146101ba578063f2fde38b146101c357600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004611f55565b6101d6565b005b6100e16100dc366004611f55565b610236565b6040516100ee91906120ce565b60405180910390f35b6100cc610247565b6100cc61010d3660046120a2565b6102ad565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b366004611f55565b610432565b6040516100ee9190612112565b6100e161015b366004611f55565b610453565b6100cc61016e366004611fcd565b6104ca565b610189610181366004611f87565b505060025490565b6040519081526020016100ee565b6101aa6101a5366004611f87565b610b48565b60405190151581526020016100ee565b61018960025481565b6100cc6101d1366004611e61565b61146a565b6101e06001611535565b6102315760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b6060610241826117ce565b92915050565b6001546001600160a01b031633146102a15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610228565b6102ab6000611d22565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102f057600080fd5b505afa158015610304573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103289190611e7e565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035591815260200190565b60206040518083038186803b15801561036d57600080fd5b505afa158015610381573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a59190611f33565b6103df5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610228565b6103e881611535565b61042c5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610228565b50505050565b60606040518060600160405280602d8152602001612224602d913992915050565b60408051600280825260608083018452926000929190602083019080368337019050509050610484602860006121bc565b81600081518110610497576104976121e2565b602002602001018181525050600419816001815181106104b9576104b96121e2565b602090810291909101015292915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561050d57600080fd5b505afa158015610521573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105459190611e7e565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161057291815260200190565b60206040518083038186803b15801561058a57600080fd5b505afa15801561059e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c29190611f33565b6105fc5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610228565b61060581611535565b6106495760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610228565b600080546040516340d9124560e11b815260076004820152600d92916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561069057600080fd5b505afa1580156106a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106c89190611e7e565b6040516315c7bf4560e31b81526004810189905260248101849052606460448201819052600090820152608481018890529091506001600160a01b0382169063ae3dfa289060a401602060405180830381600087803b15801561072a57600080fd5b505af115801561073e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107629190611f6e565b50600080546040516340d9124560e11b815260d160048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156107a857600080fd5b505afa1580156107bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e09190611e7e565b604051631e351d6760e31b8152600481018a905260248101899052604481018a9052670de0b6b3a764000060648201529091506001600160a01b0382169063f1a8eb3890608401600060405180830381600087803b15801561084157600080fd5b505af1158015610855573d6000803e3d6000fd5b5050600080546040516340d9124560e11b815260d060048201529193506001600160a01b031691506381b2248a9060240160206040518083038186803b15801561089e57600080fd5b505afa1580156108b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d69190611e7e565b604051631e351d6760e31b8152600481018b9052602481018a9052604481018b9052671bc16d674ec8000060648201529091506001600160a01b0382169063f1a8eb3890608401600060405180830381600087803b15801561093757600080fd5b505af115801561094b573d6000803e3d6000fd5b5050600080546040516340d9124560e11b815260d260048201529193506001600160a01b031691506381b2248a9060240160206040518083038186803b15801561099457600080fd5b505afa1580156109a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109cc9190611e7e565b604051631e351d6760e31b8152600481018c9052602481018b9052604481018c9052670de0b6b3a764000060648201529091506001600160a01b0382169063f1a8eb3890608401600060405180830381600087803b158015610a2d57600080fd5b505af1158015610a41573d6000803e3d6000fd5b5050600080546040516340d9124560e11b815260d360048201529193506001600160a01b031691506381b2248a9060240160206040518083038186803b158015610a8a57600080fd5b505afa158015610a9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac29190611e7e565b604051631e351d6760e31b8152600481018d9052602481018c9052604481018d9052678ac7230489e8000060648201529091506001600160a01b0382169063f1a8eb3890608401600060405180830381600087803b158015610b2357600080fd5b505af1158015610b37573d6000803e3d6000fd5b505050505050505050505050505050565b6000806001905060008060008054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b158015610b9e57600080fd5b505afa158015610bb2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd69190611e7e565b6001600160a01b0316630847db59876040518263ffffffff1660e01b8152600401610c0391815260200190565b604080518083038186803b158015610c1a57600080fd5b505afa158015610c2e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c529190611fa9565b909250905060028114610c6b5760009350505050610241565b600080546040516340d9124560e11b8152600960048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610cb057600080fd5b505afa158015610cc4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce89190611e7e565b604051632b53f9bd60e21b8152600481018990529091506000906001600160a01b0383169063ad4fe6f49060240160006040518083038186803b158015610d2e57600080fd5b505afa158015610d42573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d6a9190810190611e9b565b9050805160001480610db0575080600181518110610d8a57610d8a6121e2565b602002602001015181600081518110610da557610da56121e2565b602002602001015114155b15610dc357600095505050505050610241565b6000546040516340d9124560e11b815260d960048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610e0757600080fd5b505afa158015610e1b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3f9190611e7e565b6001600160a01b031663b6a8480982600081518110610e6057610e606121e2565b60200260200101516040518263ffffffff1660e01b8152600401610e8691815260200190565b60206040518083038186803b158015610e9e57600080fd5b505afa158015610eb2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed69190611f33565b610ee857600095505050505050610241565b6000546040516340d9124560e11b815260ce60048201526005916001600160a01b0316906381b2248a9060240160206040518083038186803b158015610f2d57600080fd5b505afa158015610f41573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f659190611e7e565b6001600160a01b03166392441c0d610f7f602860006121bc565b8b6040518363ffffffff1660e01b8152600401610fa6929190918252602082015260400190565b60206040518083038186803b158015610fbe57600080fd5b505afa158015610fd2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ff69190611f6e565b101561100a57600095505050505050610241565b6000546040516340d9124560e11b815260d16004820152670de0b6b3a7640000916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561105657600080fd5b505afa15801561106a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061108e9190611e7e565b6001600160a01b031663f27b390e8a6040518263ffffffff1660e01b81526004016110bb91815260200190565b60206040518083038186803b1580156110d357600080fd5b505afa1580156110e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061110b9190611f6e565b101561111f57600095505050505050610241565b6000546040516340d9124560e11b815260d06004820152671bc16d674ec80000916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561116b57600080fd5b505afa15801561117f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111a39190611e7e565b6001600160a01b031663f27b390e8a6040518263ffffffff1660e01b81526004016111d091815260200190565b60206040518083038186803b1580156111e857600080fd5b505afa1580156111fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112209190611f6e565b101561123457600095505050505050610241565b6000546040516340d9124560e11b815260d26004820152670de0b6b3a7640000916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561128057600080fd5b505afa158015611294573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112b89190611e7e565b6001600160a01b031663f27b390e8a6040518263ffffffff1660e01b81526004016112e591815260200190565b60206040518083038186803b1580156112fd57600080fd5b505afa158015611311573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113359190611f6e565b101561134957600095505050505050610241565b6000546040516340d9124560e11b815260d36004820152678ac7230489e80000916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561139557600080fd5b505afa1580156113a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113cd9190611e7e565b6001600160a01b031663f27b390e8a6040518263ffffffff1660e01b81526004016113fa91815260200190565b60206040518083038186803b15801561141257600080fd5b505afa158015611426573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061144a9190611f6e565b101561145e57600095505050505050610241565b50929695505050505050565b6001546001600160a01b031633146114c45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610228565b6001600160a01b0381166115295760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610228565b61153281611d22565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561157a57600080fd5b505afa15801561158e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115b29190611e7e565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b1580156115f757600080fd5b505afa15801561160b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061162f9190611e7e565b6001600160a01b031614806116c457506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561168157600080fd5b505afa158015611695573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b99190611e7e565b6001600160a01b0316145b806117c757506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b15801561171257600080fd5b505afa158015611726573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061174a9190611e7e565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b15801561178f57600080fd5b505afa1580156117a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117c79190611f33565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561183d57600080fd5b505afa158015611851573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118759190611e7e565b90506101f46001600160a01b038216633f9fdf3c6118958761014b6121bc565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156118d457600080fd5b505afa1580156118e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061190c9190611f6e565b101561191957600061191c565b60015b60ff1682600081518110611932576119326121e2565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61195b876102cf6121bc565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561199a57600080fd5b505afa1580156119ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119d29190611f6e565b10156119df5760006119e2565b60015b60ff16826001815181106119f8576119f86121e2565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611a21876103f56121bc565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015611a6057600080fd5b505afa158015611a74573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a989190611f6e565b1015611aa5576000611aa8565b60015b60ff1682600281518110611abe57611abe6121e2565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611ae7876104d56121bc565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015611b2657600080fd5b505afa158015611b3a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b5e9190611f6e565b1015611b6b576000611b6e565b60015b60ff1682600381518110611b8457611b846121e2565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611bad876108516121bc565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015611bec57600080fd5b505afa158015611c00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c249190611f6e565b1015611c31576000611c34565b60015b60ff1682600481518110611c4a57611c4a6121e2565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611c73876135bd6121bc565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015611cb257600080fd5b505afa158015611cc6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cea9190611f6e565b1015611cf7576000611cfa565b60015b60ff1682600581518110611d1057611d106121e2565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f8381840112611d8657600080fd5b82356020611d9b611d9683612198565b612167565b80838252828201915082870188848660051b8a01011115611dbb57600080fd5b60005b85811015611e5357813567ffffffffffffffff80821115611dde57600080fd5b818b0191508b603f830112611df257600080fd5b86820135604082821115611e0857611e086121f8565b611e19828c01601f19168a01612167565b92508183528d81838601011115611e2f57600080fd5b818185018a8501375060009082018801528552509284019290840190600101611dbe565b509098975050505050505050565b600060208284031215611e7357600080fd5b81356117c78161220e565b600060208284031215611e9057600080fd5b81516117c78161220e565b60006020808385031215611eae57600080fd5b825167ffffffffffffffff811115611ec557600080fd5b8301601f81018513611ed657600080fd5b8051611ee4611d9682612198565b80828252848201915084840188868560051b8701011115611f0457600080fd5b600094505b83851015611f27578051835260019490940193918501918501611f09565b50979650505050505050565b600060208284031215611f4557600080fd5b815180151581146117c757600080fd5b600060208284031215611f6757600080fd5b5035919050565b600060208284031215611f8057600080fd5b5051919050565b60008060408385031215611f9a57600080fd5b50508035926020909101359150565b60008060408385031215611fbc57600080fd5b505080516020909101519092909150565b60008060008060808587031215611fe357600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561200a57600080fd5b818801915088601f83011261201e57600080fd5b813561202c611d9682612198565b8082825285820191508585018c878560051b880101111561204c57600080fd5b600095505b8386101561206f578035835260019590950194918601918601612051565b5096505050606088013592508083111561208857600080fd5b505061209687828801611d74565b91505092959194509250565b6000806000606084860312156120b757600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b81811015612106578351835292840192918401916001016120ea565b50909695505050505050565b600060208083528351808285015260005b8181101561213f57858101830151858201604001528201612123565b81811115612151576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715612190576121906121f8565b604052919050565b600067ffffffffffffffff8211156121b2576121b26121f8565b5060051b60200190565b600082198211156121dd57634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461153257600080fdfee69d91e6b091e4b8bae4bda0e588b6e4bd9ce4ba86e7ae80e9998be79a84e999b6e59c9fe88dafe992b5e38082a2646970667358221220f9dede2cf088952e4652a4159694b32bc9719fc74801f007c7044dfd21eef62a64736f6c63430008060033";
