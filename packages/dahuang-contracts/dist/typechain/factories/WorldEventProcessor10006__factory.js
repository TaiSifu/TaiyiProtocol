"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor10006__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor10006__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor10006__factory = WorldEventProcessor10006__factory;
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
                name: "",
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
                name: "",
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
                name: "",
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
const _bytecode = "0x608060405234801561001057600080fd5b50604051610f85380380610f8583398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b610e8e806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610161578063c0f1619c14610174578063c729329414610198578063ca5bf9a4146101be578063f2fde38b146101c757600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004610bbd565b6101da565b005b6100e16100dc366004610bbd565b61023a565b6040516100ee9190610cf9565b60405180910390f35b6100cc61032c565b6100cc61010d366004610ccd565b610392565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b366004610bbd565b610517565b6040516100ee9190610d3d565b6100e161015b366004610bbd565b50606090565b6100cc61016f366004610bf8565b610538565b61018a610182366004610bd6565b505060025490565b6040519081526020016100ee565b6101ae6101a6366004610bd6565b600192915050565b60405190151581526020016100ee565b61018a60025481565b6100cc6101d5366004610b61565b6106be565b6101e46001610789565b6102355760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60408051600680825260e08201909252606091600091906020820160c08036833701905050905060008160008151811061027657610276610de7565b60200260200101818152505060008160018151811061029757610297610de7565b6020026020010181815250506001816002815181106102b8576102b8610de7565b6020026020010181815250506000816003815181106102d9576102d9610de7565b6020026020010181815250506000816004815181106102fa576102fa610de7565b60200260200101818152505060018160058151811061031b5761031b610de7565b602090810291909101015292915050565b6001546001600160a01b031633146103865760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022c565b6103906000610a22565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156103d557600080fd5b505afa1580156103e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040d9190610b7e565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161043a91815260200190565b60206040518083038186803b15801561045257600080fd5b505afa158015610466573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048a9190610b9b565b6104c45760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161022c565b6104cd81610789565b6105115760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161022c565b50505050565b6060604051806060016040528060308152602001610e296030913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561057b57600080fd5b505afa15801561058f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b39190610b7e565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016105e091815260200190565b60206040518083038186803b1580156105f857600080fd5b505afa15801561060c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106309190610b9b565b61066a5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161022c565b61067381610789565b6106b75760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161022c565b5050505050565b6001546001600160a01b031633146107185760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022c565b6001600160a01b03811661077d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161022c565b61078681610a22565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b1580156107ce57600080fd5b505afa1580156107e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108069190610b7e565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b15801561084b57600080fd5b505afa15801561085f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108839190610b7e565b6001600160a01b0316148061091857506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b1580156108d557600080fd5b505afa1580156108e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090d9190610b7e565b6001600160a01b0316145b80610a1b57506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b15801561096657600080fd5b505afa15801561097a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099e9190610b7e565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b1580156109e357600080fd5b505afa1580156109f7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a1b9190610b9b565b9392505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f8381840112610a8657600080fd5b82356020610a9b610a9683610dc3565b610d92565b80838252828201915082870188848660051b8a01011115610abb57600080fd5b60005b85811015610b5357813567ffffffffffffffff80821115610ade57600080fd5b818b0191508b603f830112610af257600080fd5b86820135604082821115610b0857610b08610dfd565b610b19828c01601f19168a01610d92565b92508183528d81838601011115610b2f57600080fd5b818185018a8501375060009082018801528552509284019290840190600101610abe565b509098975050505050505050565b600060208284031215610b7357600080fd5b8135610a1b81610e13565b600060208284031215610b9057600080fd5b8151610a1b81610e13565b600060208284031215610bad57600080fd5b81518015158114610a1b57600080fd5b600060208284031215610bcf57600080fd5b5035919050565b60008060408385031215610be957600080fd5b50508035926020909101359150565b60008060008060808587031215610c0e57600080fd5b843593506020808601359350604086013567ffffffffffffffff80821115610c3557600080fd5b818801915088601f830112610c4957600080fd5b8135610c57610a9682610dc3565b8082825285820191508585018c878560051b8801011115610c7757600080fd5b600095505b83861015610c9a578035835260019590950194918601918601610c7c565b50965050506060880135925080831115610cb357600080fd5b5050610cc187828801610a74565b91505092959194509250565b600080600060608486031215610ce257600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b81811015610d3157835183529284019291840191600101610d15565b50909695505050505050565b600060208083528351808285015260005b81811015610d6a57858101830151858201604001528201610d4e565b81811115610d7c576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715610dbb57610dbb610dfd565b604052919050565b600067ffffffffffffffff821115610ddd57610ddd610dfd565b5060051b60200190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461078657600080fdfee7baa2e8829ae5859ce68c82e59ca8e4ba86e6a18ce8a792e4b88aefbc8ce4bda0e6b2a1e69c89e58f97e4bca4e38082a2646970667358221220c339e0c09b804ba0f031b4f9f81027c56f3862a19936072cabc5c44fbae803ac64736f6c63430008060033";
