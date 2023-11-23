"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor10026__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor10026__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor10026__factory = WorldEventProcessor10026__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516112a03803806112a083398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b6111a9806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610161578063c0f1619c14610174578063c729329414610195578063ca5bf9a4146101b8578063f2fde38b146101c157600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004610ea2565b6101d4565b005b6100e16100dc366004610ea2565b610234565b6040516100ee9190610ff7565b60405180910390f35b6100cc610326565b6100cc61010d366004610fcb565b61038c565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b366004610ea2565b610511565b6040516100ee919061103b565b6100e161015b366004610ea2565b50606090565b6100cc61016f366004610ef6565b610532565b610187610182366004610ed4565b6106b8565b6040519081526020016100ee565b6101a86101a3366004610ed4565b6106c2565b60405190151581526020016100ee565b61018760025481565b6100cc6101cf366004610e46565b6109a3565b6101de6001610a6e565b61022f5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60408051600680825260e08201909252606091600091906020820160c0803683370190505090506001816000815181106102705761027061110b565b6020026020010181815250506001816001815181106102915761029161110b565b6020026020010181815250506000816002815181106102b2576102b261110b565b6020026020010181815250506001816003815181106102d3576102d361110b565b6020026020010181815250506001816004815181106102f4576102f461110b565b6020026020010181815250506001816005815181106103155761031561110b565b602090810291909101015292915050565b6001546001600160a01b031633146103805760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610226565b61038a6000610d07565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156103cf57600080fd5b505afa1580156103e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104079190610e63565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161043491815260200190565b60206040518083038186803b15801561044c57600080fd5b505afa158015610460573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104849190610e80565b6104be5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610226565b6104c781610a6e565b61050b5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610226565b50505050565b606060405180606001604052806027815260200161114d6027913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561057557600080fd5b505afa158015610589573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ad9190610e63565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016105da91815260200190565b60206040518083038186803b1580156105f257600080fd5b505afa158015610606573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062a9190610e80565b6106645760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610226565b61066d81610a6e565b6106b15760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610226565b5050505050565b6002545b92915050565b600080546040516340d9124560e11b815260c9600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561070c57600080fd5b505afa158015610720573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107449190610e63565b60405163b7876f5760e01b81526004810187905261272a60248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561079257600080fd5b505afa1580156107a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ca9190610ebb565b11156107db576000925050506106bc565b60405163b7876f5760e01b81526004810186905261272e60248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561082657600080fd5b505afa15801561083a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085e9190610ebb565b111561086f576000925050506106bc565b600080546040516340d9124560e11b815260cb600482015291935083916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156108b957600080fd5b505afa1580156108cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f19190610e63565b905060466001600160a01b0382166392441c0d610910600a60006110e5565b896040518363ffffffff1660e01b8152600401610937929190918252602082015260400190565b60206040518083038186803b15801561094f57600080fd5b505afa158015610963573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109879190610ebb565b111561099957600193505050506106bc565b5090949350505050565b6001546001600160a01b031633146109fd5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610226565b6001600160a01b038116610a625760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610226565b610a6b81610d07565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610ab357600080fd5b505afa158015610ac7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aeb9190610e63565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610b3057600080fd5b505afa158015610b44573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b689190610e63565b6001600160a01b03161480610bfd57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610bba57600080fd5b505afa158015610bce573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf29190610e63565b6001600160a01b0316145b80610d0057506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610c4b57600080fd5b505afa158015610c5f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c839190610e63565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610cc857600080fd5b505afa158015610cdc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d009190610e80565b9392505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f8381840112610d6b57600080fd5b82356020610d80610d7b836110c1565b611090565b80838252828201915082870188848660051b8a01011115610da057600080fd5b60005b85811015610e3857813567ffffffffffffffff80821115610dc357600080fd5b818b0191508b603f830112610dd757600080fd5b86820135604082821115610ded57610ded611121565b610dfe828c01601f19168a01611090565b92508183528d81838601011115610e1457600080fd5b818185018a8501375060009082018801528552509284019290840190600101610da3565b509098975050505050505050565b600060208284031215610e5857600080fd5b8135610d0081611137565b600060208284031215610e7557600080fd5b8151610d0081611137565b600060208284031215610e9257600080fd5b81518015158114610d0057600080fd5b600060208284031215610eb457600080fd5b5035919050565b600060208284031215610ecd57600080fd5b5051919050565b60008060408385031215610ee757600080fd5b50508035926020909101359150565b60008060008060808587031215610f0c57600080fd5b843593506020808601359350604086013567ffffffffffffffff80821115610f3357600080fd5b818801915088601f830112610f4757600080fd5b8135610f55610d7b826110c1565b8082825285820191508585018c878560051b8801011115610f7557600080fd5b600095505b83861015610f98578035835260019590950194918601918601610f7a565b50965050506060880135925080831115610fb157600080fd5b5050610fbf87828801610d59565b91505092959194509250565b600080600060608486031215610fe057600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b8181101561102f57835183529284019291840191600101611013565b50909695505050505050565b600060208083528351808285015260005b818110156110685785810183015185820160400152820161104c565b8181111561107a576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156110b9576110b9611121565b604052919050565b600067ffffffffffffffff8211156110db576110db611121565b5060051b60200190565b6000821982111561110657634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610a6b57600080fdfee4bda0e6af94e585b6e4bb96e5b08fe69c8be58f8be995bfe5be97e69bb4e58fafe788b1e38082a2646970667358221220c17bde38d1b11f46d990c8857bbb9342c568185629df8f8644b0d98f2bab4a6164736f6c63430008060033";