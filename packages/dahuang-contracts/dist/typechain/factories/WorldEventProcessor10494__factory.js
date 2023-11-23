"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor10494__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor10494__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor10494__factory = WorldEventProcessor10494__factory;
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
                name: "_actor",
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161153038038061153083398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b611439806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b14610180578063b4ae123514610194578063c0f1619c146101a7578063c7293294146101c8578063ca5bf9a4146101eb578063f2fde38b146101f457600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004611136565b610207565b005b6100e16100dc366004611136565b610267565b6040516100ee919061128b565b60405180910390f35b6100cc610359565b6100cc61010d36600461125f565b6103bf565b6001546040516001600160a01b0390911681526020016100ee565b61017361013b366004611136565b5060408051808201909152601e81527fe4bd93e8b4a8e8bf87e4bd8eefbc8ce8838ee6adbbe885b9e4b8ade380820000602082015290565b6040516100ee91906112cf565b6100e161018e366004611136565b50606090565b6100cc6101a236600461118a565b610544565b6101ba6101b5366004611168565b6106ca565b6040519081526020016100ee565b6101db6101d6366004611168565b610802565b60405190151581526020016100ee565b6101ba60025481565b6100cc610202366004611042565b610b9f565b6102116001610c6a565b6102625760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60408051600680825260e08201909252606091600091906020820160c0803683370190505090506001816000815181106102a3576102a36113c2565b6020026020010181815250506000816001815181106102c4576102c46113c2565b6020026020010181815250506000816002815181106102e5576102e56113c2565b602002602001018181525050600081600381518110610306576103066113c2565b602002602001018181525050600081600481518110610327576103276113c2565b602002602001018181525050600081600581518110610348576103486113c2565b602090810291909101015292915050565b6001546001600160a01b031633146103b35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610259565b6103bd6000610f03565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561040257600080fd5b505afa158015610416573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061043a919061105f565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161046791815260200190565b60206040518083038186803b15801561047f57600080fd5b505afa158015610493573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104b79190611114565b6104f15760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610259565b6104fa81610c6a565b61053e5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610259565b50505050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561058757600080fd5b505afa15801561059b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105bf919061105f565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016105ec91815260200190565b60206040518083038186803b15801561060457600080fd5b505afa158015610618573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063c9190611114565b6106765760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610259565b61067f81610c6a565b6106c35760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610259565b5050505050565b600080546040516340d9124560e11b815260cd600482015282916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561070f57600080fd5b505afa158015610723573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610747919061105f565b905060006001600160a01b0382166392441c0d610766601e6001611379565b876040518363ffffffff1660e01b815260040161078d929190918252602082015260400190565b60206040518083038186803b1580156107a557600080fd5b505afa1580156107b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107dd919061114f565b905060058110156107f457612710925050506107fc565b600254925050505b92915050565b600080546040516340d9124560e11b815260ca600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561084c57600080fd5b505afa158015610860573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610884919061105f565b600080546040516340d9124560e11b815260cd600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156108ce57600080fd5b505afa1580156108e2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610906919061105f565b604051637d1f0aab60e01b8152600481018890529091506000906001600160a01b03841690637d1f0aab9060240160006040518083038186803b15801561094c57600080fd5b505afa158015610960573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610988919081019061107c565b905060005b81518110156109d9578181815181106109a8576109a86113c2565b602002602001015161042f14156109c7576000955050505050506107fc565b806109d181611391565b91505061098d565b50600080546040516340d9124560e11b81526006600482015291955085916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610a2457600080fd5b505afa158015610a38573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5c919061105f565b905060006001600160a01b0384166392441c0d610a7b601e6001611379565b8b6040518363ffffffff1660e01b8152600401610aa2929190918252602082015260400190565b60206040518083038186803b158015610aba57600080fd5b505afa158015610ace573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af2919061114f565b9050600581108015610b7e57506040516338dc8e1d60e21b8152600481018a9052603160248201526001600160a01b0383169063e37238749060440160206040518083038186803b158015610b4657600080fd5b505afa158015610b5a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b7e9190611114565b15610b9257600196505050505050506107fc565b5093979650505050505050565b6001546001600160a01b03163314610bf95760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610259565b6001600160a01b038116610c5e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610259565b610c6781610f03565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610caf57600080fd5b505afa158015610cc3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce7919061105f565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610d2c57600080fd5b505afa158015610d40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d64919061105f565b6001600160a01b03161480610df957506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610db657600080fd5b505afa158015610dca573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dee919061105f565b6001600160a01b0316145b80610efc57506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610e4757600080fd5b505afa158015610e5b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e7f919061105f565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610ec457600080fd5b505afa158015610ed8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610efc9190611114565b9392505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f8381840112610f6757600080fd5b82356020610f7c610f7783611355565b611324565b80838252828201915082870188848660051b8a01011115610f9c57600080fd5b60005b8581101561103457813567ffffffffffffffff80821115610fbf57600080fd5b818b0191508b603f830112610fd357600080fd5b86820135604082821115610fe957610fe96113d8565b610ffa828c01601f19168a01611324565b92508183528d8183860101111561101057600080fd5b818185018a8501375060009082018801528552509284019290840190600101610f9f565b509098975050505050505050565b60006020828403121561105457600080fd5b8135610efc816113ee565b60006020828403121561107157600080fd5b8151610efc816113ee565b6000602080838503121561108f57600080fd5b825167ffffffffffffffff8111156110a657600080fd5b8301601f810185136110b757600080fd5b80516110c5610f7782611355565b80828252848201915084840188868560051b87010111156110e557600080fd5b600094505b838510156111085780518352600194909401939185019185016110ea565b50979650505050505050565b60006020828403121561112657600080fd5b81518015158114610efc57600080fd5b60006020828403121561114857600080fd5b5035919050565b60006020828403121561116157600080fd5b5051919050565b6000806040838503121561117b57600080fd5b50508035926020909101359150565b600080600080608085870312156111a057600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156111c757600080fd5b818801915088601f8301126111db57600080fd5b81356111e9610f7782611355565b8082825285820191508585018c878560051b880101111561120957600080fd5b600095505b8386101561122c57803583526001959095019491860191860161120e565b5096505050606088013592508083111561124557600080fd5b505061125387828801610f55565b91505092959194509250565b60008060006060848603121561127457600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156112c3578351835292840192918401916001016112a7565b50909695505050505050565b600060208083528351808285015260005b818110156112fc578581018301518582016040015282016112e0565b8181111561130e576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff8111828210171561134d5761134d6113d8565b604052919050565b600067ffffffffffffffff82111561136f5761136f6113d8565b5060051b60200190565b6000821982111561138c5761138c6113ac565b500190565b60006000198214156113a5576113a56113ac565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610c6757600080fdfea264697066735822122063a8a511bee98b7f847621a2a98298bb63cc3866e8dfb872d626baec2120b89064736f6c63430008060033";