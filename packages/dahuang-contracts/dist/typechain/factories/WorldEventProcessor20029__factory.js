"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor20029__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor20029__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor20029__factory = WorldEventProcessor20029__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161106238038061106283398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b610f6b806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80639d0c025b1161008c578063c0f1619c11610066578063c0f1619c146101c2578063c7293294146101e6578063ca5bf9a41461020c578063f2fde38b1461021557600080fd5b80639d0c025b1461017b578063a71d6e3b1461019b578063b4ae1235146101af57600080fd5b8063127ce1cc146100d4578063150b7a02146100e95780634849f65614610125578063715018a6146101455780637c99f6a61461014d5780638da5cb5b14610160575b600080fd5b6100e76100e2366004610ca0565b610228565b005b6101076100f7366004610bfe565b630a85bd0160e11b949350505050565b6040516001600160e01b031990911681526020015b60405180910390f35b610138610133366004610ca0565b610288565b60405161011c9190610dd0565b6100e761037a565b6100e761015b366004610da4565b6103e0565b6001546040516001600160a01b03909116815260200161011c565b61018e610189366004610ca0565b610565565b60405161011c9190610e14565b6101386101a9366004610ca0565b50606090565b6100e76101bd366004610cdb565b610586565b6101d86101d0366004610cb9565b505060025490565b60405190815260200161011c565b6101fc6101f4366004610cb9565b600192915050565b604051901515815260200161011c565b6101d860025481565b6100e7610223366004610bc4565b61070c565b61023260016107d7565b6102835760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60408051600680825260e08201909252606091600091906020820160c0803683370190505090506000816000815181106102c4576102c4610ebe565b6020026020010181815250506001816001815181106102e5576102e5610ebe565b60200260200101818152505060008160028151811061030657610306610ebe565b60200260200101818152505060018160038151811061032757610327610ebe565b60200260200101818152505060018160048151811061034857610348610ebe565b60200260200101818152505060018160058151811061036957610369610ebe565b602090810291909101015292915050565b6001546001600160a01b031633146103d45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161027a565b6103de6000610a70565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561042357600080fd5b505afa158015610437573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061045b9190610be1565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161048891815260200190565b60206040518083038186803b1580156104a057600080fd5b505afa1580156104b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d89190610c7e565b6105125760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161027a565b61051b816107d7565b61055f5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161027a565b50505050565b6060604051806060016040528060368152602001610f006036913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156105c957600080fd5b505afa1580156105dd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106019190610be1565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161062e91815260200190565b60206040518083038186803b15801561064657600080fd5b505afa15801561065a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067e9190610c7e565b6106b85760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161027a565b6106c1816107d7565b6107055760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161027a565b5050505050565b6001546001600160a01b031633146107665760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161027a565b6001600160a01b0381166107cb5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161027a565b6107d481610a70565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561081c57600080fd5b505afa158015610830573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108549190610be1565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b15801561089957600080fd5b505afa1580156108ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d19190610be1565b6001600160a01b0316148061096657506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561092357600080fd5b505afa158015610937573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061095b9190610be1565b6001600160a01b0316145b80610a6957506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b1580156109b457600080fd5b505afa1580156109c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ec9190610be1565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610a3157600080fd5b505afa158015610a45573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a699190610c7e565b9392505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600067ffffffffffffffff831115610adc57610adc610ed4565b610aef601f8401601f1916602001610e69565b9050828152838383011115610b0357600080fd5b828260208301376000602084830101529392505050565b600082601f830112610b2b57600080fd5b81356020610b40610b3b83610e9a565b610e69565b80838252828201915082860187848660051b8901011115610b6057600080fd5b60005b85811015610bb757813567ffffffffffffffff811115610b8257600080fd5b8801603f81018a13610b9357600080fd5b610ba48a8783013560408401610ac2565b8552509284019290840190600101610b63565b5090979650505050505050565b600060208284031215610bd657600080fd5b8135610a6981610eea565b600060208284031215610bf357600080fd5b8151610a6981610eea565b60008060008060808587031215610c1457600080fd5b8435610c1f81610eea565b93506020850135610c2f81610eea565b925060408501359150606085013567ffffffffffffffff811115610c5257600080fd5b8501601f81018713610c6357600080fd5b610c7287823560208401610ac2565b91505092959194509250565b600060208284031215610c9057600080fd5b81518015158114610a6957600080fd5b600060208284031215610cb257600080fd5b5035919050565b60008060408385031215610ccc57600080fd5b50508035926020909101359150565b60008060008060808587031215610cf157600080fd5b843593506020808601359350604086013567ffffffffffffffff80821115610d1857600080fd5b818801915088601f830112610d2c57600080fd5b8135610d3a610b3b82610e9a565b8082825285820191508585018c878560051b8801011115610d5a57600080fd5b600095505b83861015610d7d578035835260019590950194918601918601610d5f565b50965050506060880135925080831115610d9657600080fd5b5050610c7287828801610b1a565b600080600060608486031215610db957600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b81811015610e0857835183529284019291840191600101610dec565b50909695505050505050565b600060208083528351808285015260005b81811015610e4157858101830151858201604001528201610e25565b81811115610e53576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715610e9257610e92610ed4565b604052919050565b600067ffffffffffffffff821115610eb457610eb4610ed4565b5060051b60200190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146107d457600080fdfee79c8be59ca8e4bda0e995bfe5be97e58fafe788b1e79a84e4bbbde4b88ae5aeb6e4babae4b88de5928ce4bda0e8aea1e8be83e38082a264697066735822122081cc3298113df3f2511c11493e08fd5e5a97785a750216637dd8515302e421b064736f6c63430008060033";
