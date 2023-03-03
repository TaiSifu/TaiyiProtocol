"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor10110__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor10110__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor10110__factory = WorldEventProcessor10110__factory;
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
                name: "",
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516112d43803806112d483398101604081905261002f916100ba565b600080546001600160a01b0319166001600160a01b0383161790558061ea6261005d6100583390565b610068565b600255506100ea9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100cc57600080fd5b81516001600160a01b03811681146100e357600080fd5b9392505050565b6111db806100f96000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610161578063c0f1619c14610174578063c729329414610195578063ca5bf9a4146101b8578063f2fde38b146101c157600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004610ee4565b6101d4565b005b6100e16100dc366004610ee4565b610234565b6040516100ee9190611020565b60405180910390f35b6100cc610326565b6100cc61010d366004610ff4565b61038c565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b366004610ee4565b6105f3565b6040516100ee9190611064565b6100e161015b366004610ee4565b50606090565b6100cc61016f366004610f1f565b610614565b610187610182366004610efd565b61079a565b6040519081526020016100ee565b6101a86101a3366004610efd565b6107a4565b60405190151581526020016100ee565b61018760025481565b6100cc6101cf366004610df0565b61094d565b6101de6001610a18565b61022f5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60408051600680825260e08201909252606091600091906020820160c08036833701905050905060018160008151811061027057610270611137565b60200260200101818152505060008160018151811061029157610291611137565b6020026020010181815250506001816002815181106102b2576102b2611137565b6020026020010181815250506000816003815181106102d3576102d3611137565b6020026020010181815250506001816004815181106102f4576102f4611137565b60200260200101818152505060018160058151811061031557610315611137565b602090810291909101015292915050565b6001546001600160a01b031633146103805760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610226565b61038a6000610cb1565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156103cf57600080fd5b505afa1580156103e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104079190610e0d565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161043491815260200190565b60206040518083038186803b15801561044c57600080fd5b505afa158015610460573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104849190610ec2565b6104be5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610226565b6104c781610a18565b61050b5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610226565b600080546040516340d9124560e11b815260dc60048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561055057600080fd5b505afa158015610564573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105889190610e0d565b60405163eaf7dbc760e01b815260048101879052602481018690529091506001600160a01b0382169063eaf7dbc790604401600060405180830381600087803b1580156105d457600080fd5b505af11580156105e8573d6000803e3d6000fd5b505050505050505050565b60606040518060600160405280602d8152602001611179602d913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561065757600080fd5b505afa15801561066b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068f9190610e0d565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016106bc91815260200190565b60206040518083038186803b1580156106d457600080fd5b505afa1580156106e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061070c9190610ec2565b6107465760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610226565b61074f81610a18565b6107935760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610226565b5050505050565b6002545b92915050565b600080546040516340d9124560e11b815260ca600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156107ee57600080fd5b505afa158015610802573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108269190610e0d565b604051637d1f0aab60e01b8152600481018790529091506000906001600160a01b03831690637d1f0aab9060240160006040518083038186803b15801561086c57600080fd5b505afa158015610880573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108a89190810190610e2a565b905060005b8151811015610942578181815181106108c8576108c8611137565b60200260200101516103eb14806108f957508181815181106108ec576108ec611137565b60200260200101516103ec145b8061091e575081818151811061091157610911611137565b6020026020010151610400145b1561093057600094505050505061079e565b8061093a8161110e565b9150506108ad565b509195945050505050565b6001546001600160a01b031633146109a75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610226565b6001600160a01b038116610a0c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610226565b610a1581610cb1565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610a5d57600080fd5b505afa158015610a71573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a959190610e0d565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610ada57600080fd5b505afa158015610aee573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b129190610e0d565b6001600160a01b03161480610ba757506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610b6457600080fd5b505afa158015610b78573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9c9190610e0d565b6001600160a01b0316145b80610caa57506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610bf557600080fd5b505afa158015610c09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c2d9190610e0d565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610c7257600080fd5b505afa158015610c86573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610caa9190610ec2565b9392505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f8381840112610d1557600080fd5b82356020610d2a610d25836110ea565b6110b9565b80838252828201915082870188848660051b8a01011115610d4a57600080fd5b60005b85811015610de257813567ffffffffffffffff80821115610d6d57600080fd5b818b0191508b603f830112610d8157600080fd5b86820135604082821115610d9757610d9761114d565b610da8828c01601f19168a016110b9565b92508183528d81838601011115610dbe57600080fd5b818185018a8501375060009082018801528552509284019290840190600101610d4d565b509098975050505050505050565b600060208284031215610e0257600080fd5b8135610caa81611163565b600060208284031215610e1f57600080fd5b8151610caa81611163565b60006020808385031215610e3d57600080fd5b825167ffffffffffffffff811115610e5457600080fd5b8301601f81018513610e6557600080fd5b8051610e73610d25826110ea565b80828252848201915084840188868560051b8701011115610e9357600080fd5b600094505b83851015610eb6578051835260019490940193918501918501610e98565b50979650505050505050565b600060208284031215610ed457600080fd5b81518015158114610caa57600080fd5b600060208284031215610ef657600080fd5b5035919050565b60008060408385031215610f1057600080fd5b50508035926020909101359150565b60008060008060808587031215610f3557600080fd5b843593506020808601359350604086013567ffffffffffffffff80821115610f5c57600080fd5b818801915088601f830112610f7057600080fd5b8135610f7e610d25826110ea565b8082825285820191508585018c878560051b8801011115610f9e57600080fd5b600095505b83861015610fc1578035835260019590950194918601918601610fa3565b50965050506060880135925080831115610fda57600080fd5b5050610fe887828801610d03565b91505092959194509250565b60008060006060848603121561100957600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156110585783518352928401929184019160010161103c565b50909695505050505050565b600060208083528351808285015260005b8181101561109157858101830151858201604001528201611075565b818111156110a3576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156110e2576110e261114d565b604052919050565b600067ffffffffffffffff8211156111045761110461114d565b5060051b60200190565b600060001982141561113057634e487b7160e01b600052601160045260246000fd5b5060010190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610a1557600080fdfee4bda0e587bae7949fe4ba86efbc8ce698afe69e81e4b8bae7bd95e8a781e79a84e697a0e680a7e4babae38082a2646970667358221220a4627c811d615a4409c556a07e6760a0971cff7264f5327454c743ba151980b064736f6c63430008060033";
