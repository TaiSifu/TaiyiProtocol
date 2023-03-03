"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor10001__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor10001__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor10001__factory = WorldEventProcessor10001__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516112b93803806112b983398101604081905261002f916100ba565b600080546001600160a01b0319166001600160a01b0383161790558061ea6261005d6100583390565b610068565b600255506100ea9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100cc57600080fd5b81516001600160a01b03811681146100e357600080fd5b9392505050565b6111c0806100f96000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b14610180578063b4ae123514610194578063c0f1619c146101a7578063c7293294146101c8578063ca5bf9a4146101eb578063f2fde38b146101f457600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004610ef6565b610207565b005b6100e16100dc366004610ef6565b610267565b6040516100ee9190611032565b60405180910390f35b6100cc610359565b6100cc61010d366004611006565b6103bf565b6001546040516001600160a01b0390911681526020016100ee565b61017361013b366004610ef6565b5060408051808201909152601e81527fe4bda0e587bae7949fe4ba86efbc8ce698afe4b8aae794b7e5ada9e380820000602082015290565b6040516100ee9190611076565b6100e161018e366004610ef6565b50606090565b6100cc6101a2366004610f31565b610626565b6101ba6101b5366004610f0f565b6107ac565b6040519081526020016100ee565b6101db6101d6366004610f0f565b6107b6565b60405190151581526020016100ee565b6101ba60025481565b6100cc610202366004610e02565b61095f565b6102116001610a2a565b6102625760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60408051600680825260e08201909252606091600091906020820160c0803683370190505090506001816000815181106102a3576102a3611149565b6020026020010181815250506001816001815181106102c4576102c4611149565b6020026020010181815250506001816002815181106102e5576102e5611149565b60200260200101818152505060018160038151811061030657610306611149565b60200260200101818152505060018160048151811061032757610327611149565b60200260200101818152505060018160058151811061034857610348611149565b602090810291909101015292915050565b6001546001600160a01b031633146103b35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610259565b6103bd6000610cc3565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561040257600080fd5b505afa158015610416573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061043a9190610e1f565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161046791815260200190565b60206040518083038186803b15801561047f57600080fd5b505afa158015610493573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104b79190610ed4565b6104f15760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610259565b6104fa81610a2a565b61053e5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610259565b600080546040516340d9124560e11b815260dc60048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561058357600080fd5b505afa158015610597573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105bb9190610e1f565b6040516338b59bb960e11b815260048101879052602481018690529091506001600160a01b0382169063716b377290604401600060405180830381600087803b15801561060757600080fd5b505af115801561061b573d6000803e3d6000fd5b505050505050505050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561066957600080fd5b505afa15801561067d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a19190610e1f565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016106ce91815260200190565b60206040518083038186803b1580156106e657600080fd5b505afa1580156106fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061071e9190610ed4565b6107585760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610259565b61076181610a2a565b6107a55760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610259565b5050505050565b6002545b92915050565b600080546040516340d9124560e11b815260ca600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561080057600080fd5b505afa158015610814573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108389190610e1f565b604051637d1f0aab60e01b8152600481018790529091506000906001600160a01b03831690637d1f0aab9060240160006040518083038186803b15801561087e57600080fd5b505afa158015610892573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108ba9190810190610e3c565b905060005b8151811015610954578181815181106108da576108da611149565b60200260200101516103ec148061090b57508181815181106108fe576108fe611149565b6020026020010151610400145b80610930575081818151811061092357610923611149565b6020026020010151610401145b156109425760009450505050506107b0565b8061094c81611120565b9150506108bf565b509195945050505050565b6001546001600160a01b031633146109b95760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610259565b6001600160a01b038116610a1e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610259565b610a2781610cc3565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610a6f57600080fd5b505afa158015610a83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa79190610e1f565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610aec57600080fd5b505afa158015610b00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b249190610e1f565b6001600160a01b03161480610bb957506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610b7657600080fd5b505afa158015610b8a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bae9190610e1f565b6001600160a01b0316145b80610cbc57506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610c0757600080fd5b505afa158015610c1b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3f9190610e1f565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610c8457600080fd5b505afa158015610c98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cbc9190610ed4565b9392505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f8381840112610d2757600080fd5b82356020610d3c610d37836110fc565b6110cb565b80838252828201915082870188848660051b8a01011115610d5c57600080fd5b60005b85811015610df457813567ffffffffffffffff80821115610d7f57600080fd5b818b0191508b603f830112610d9357600080fd5b86820135604082821115610da957610da961115f565b610dba828c01601f19168a016110cb565b92508183528d81838601011115610dd057600080fd5b818185018a8501375060009082018801528552509284019290840190600101610d5f565b509098975050505050505050565b600060208284031215610e1457600080fd5b8135610cbc81611175565b600060208284031215610e3157600080fd5b8151610cbc81611175565b60006020808385031215610e4f57600080fd5b825167ffffffffffffffff811115610e6657600080fd5b8301601f81018513610e7757600080fd5b8051610e85610d37826110fc565b80828252848201915084840188868560051b8701011115610ea557600080fd5b600094505b83851015610ec8578051835260019490940193918501918501610eaa565b50979650505050505050565b600060208284031215610ee657600080fd5b81518015158114610cbc57600080fd5b600060208284031215610f0857600080fd5b5035919050565b60008060408385031215610f2257600080fd5b50508035926020909101359150565b60008060008060808587031215610f4757600080fd5b843593506020808601359350604086013567ffffffffffffffff80821115610f6e57600080fd5b818801915088601f830112610f8257600080fd5b8135610f90610d37826110fc565b8082825285820191508585018c878560051b8801011115610fb057600080fd5b600095505b83861015610fd3578035835260019590950194918601918601610fb5565b50965050506060880135925080831115610fec57600080fd5b5050610ffa87828801610d15565b91505092959194509250565b60008060006060848603121561101b57600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b8181101561106a5783518352928401929184019160010161104e565b50909695505050505050565b600060208083528351808285015260005b818110156110a357858101830151858201604001528201611087565b818111156110b5576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156110f4576110f461115f565b604052919050565b600067ffffffffffffffff8211156111165761111661115f565b5060051b60200190565b600060001982141561114257634e487b7160e01b600052601160045260246000fd5b5060010190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610a2757600080fdfea2646970667358221220bf0745bd9b7a1fa9166c8af8f263978e4b5ed0adb9af6658ce24bbe794956b0364736f6c63430008060033";
