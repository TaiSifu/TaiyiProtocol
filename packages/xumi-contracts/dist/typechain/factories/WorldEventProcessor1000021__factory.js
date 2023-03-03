"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1000021__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1000021__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1000021__factory = WorldEventProcessor1000021__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516114b93803806114b983398101604081905261002f916100bb565b600080546001600160a01b0319166001600160a01b03831617905580620f425061005e6100593390565b610069565b600255506100eb9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100cd57600080fd5b81516001600160a01b03811681146100e457600080fd5b9392505050565b6113bf806100fa6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610160578063c0f1619c14610173578063c729329414610197578063ca5bf9a4146101bd578063f2fde38b146101c657600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c73660046110a6565b6101d9565b005b6100e16100dc3660046110a6565b610239565b6040516100ee91906111fb565b60405180910390f35b6100cc61024a565b6100cc61010d3660046111cf565b6102b0565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b3660046110a6565b610435565b6040516100ee919061123f565b6100e161015b3660046110a6565b610456565b6100cc61016e3660046110fa565b6104cd565b6101896101813660046110d8565b505060025490565b6040519081526020016100ee565b6101ad6101a53660046110d8565b600192915050565b60405190151581526020016100ee565b61018960025481565b6100cc6101d436600461104a565b610653565b6101e3600161071e565b6102345760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b6060610244826109b7565b92915050565b6001546001600160a01b031633146102a45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022b565b6102ae6000610f0b565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102f357600080fd5b505afa158015610307573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032b9190611067565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035891815260200190565b60206040518083038186803b15801561037057600080fd5b505afa158015610384573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a89190611084565b6103e25760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161022b565b6103eb8161071e565b61042f5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161022b565b50505050565b60606040518060600160405280603981526020016113516039913992915050565b604080516002808252606080830184529260009291906020830190803683370190505090506104886103e860016112e9565b8160008151811061049b5761049b61130f565b6020026020010181815250506001816001815181106104bc576104bc61130f565b602090810291909101015292915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561051057600080fd5b505afa158015610524573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105489190611067565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161057591815260200190565b60206040518083038186803b15801561058d57600080fd5b505afa1580156105a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c59190611084565b6105ff5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161022b565b6106088161071e565b61064c5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161022b565b5050505050565b6001546001600160a01b031633146106ad5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022b565b6001600160a01b0381166107125760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161022b565b61071b81610f0b565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561076357600080fd5b505afa158015610777573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061079b9190611067565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b1580156107e057600080fd5b505afa1580156107f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108189190611067565b6001600160a01b031614806108ad57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561086a57600080fd5b505afa15801561087e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a29190611067565b6001600160a01b0316145b806109b057506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b1580156108fb57600080fd5b505afa15801561090f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109339190611067565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b15801561097857600080fd5b505afa15801561098c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109b09190611084565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610a2657600080fd5b505afa158015610a3a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5e9190611067565b90506101f46001600160a01b038216633f9fdf3c610a7e8761014b6112e9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610abd57600080fd5b505afa158015610ad1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af591906110bf565b1015610b02576000610b05565b60015b60ff1682600081518110610b1b57610b1b61130f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610b44876102cf6112e9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610b8357600080fd5b505afa158015610b97573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bbb91906110bf565b1015610bc8576000610bcb565b60015b60ff1682600181518110610be157610be161130f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610c0a876103f56112e9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610c4957600080fd5b505afa158015610c5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c8191906110bf565b1015610c8e576000610c91565b60015b60ff1682600281518110610ca757610ca761130f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610cd0876104d56112e9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d0f57600080fd5b505afa158015610d23573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4791906110bf565b1015610d54576000610d57565b60015b60ff1682600381518110610d6d57610d6d61130f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610d96876108516112e9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610dd557600080fd5b505afa158015610de9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0d91906110bf565b1015610e1a576000610e1d565b60015b60ff1682600481518110610e3357610e3361130f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610e5c876135bd6112e9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e9b57600080fd5b505afa158015610eaf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed391906110bf565b1015610ee0576000610ee3565b60015b60ff1682600581518110610ef957610ef961130f565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f8381840112610f6f57600080fd5b82356020610f84610f7f836112c5565b611294565b80838252828201915082870188848660051b8a01011115610fa457600080fd5b60005b8581101561103c57813567ffffffffffffffff80821115610fc757600080fd5b818b0191508b603f830112610fdb57600080fd5b86820135604082821115610ff157610ff1611325565b611002828c01601f19168a01611294565b92508183528d8183860101111561101857600080fd5b818185018a8501375060009082018801528552509284019290840190600101610fa7565b509098975050505050505050565b60006020828403121561105c57600080fd5b81356109b08161133b565b60006020828403121561107957600080fd5b81516109b08161133b565b60006020828403121561109657600080fd5b815180151581146109b057600080fd5b6000602082840312156110b857600080fd5b5035919050565b6000602082840312156110d157600080fd5b5051919050565b600080604083850312156110eb57600080fd5b50508035926020909101359150565b6000806000806080858703121561111057600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561113757600080fd5b818801915088601f83011261114b57600080fd5b8135611159610f7f826112c5565b8082825285820191508585018c878560051b880101111561117957600080fd5b600095505b8386101561119c57803583526001959095019491860191860161117e565b509650505060608801359250808311156111b557600080fd5b50506111c387828801610f5d565b91505092959194509250565b6000806000606084860312156111e457600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b8181101561123357835183529284019291840191600101611217565b50909695505050505050565b600060208083528351808285015260005b8181101561126c57858101830151858201604001528201611250565b8181111561127e576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156112bd576112bd611325565b604052919050565b600067ffffffffffffffff8211156112df576112df611325565b5060051b60200190565b6000821982111561130a57634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461071b57600080fdfee59ca8e5b7a8e5a4a7e79a84e58e8be58a9be5928ce6b8a9e5baa6e4b88befbc8ce4bda0e5928ce794b5e5ad90e7bb93e59088e4ba86efbc81a2646970667358221220d47ced4944a119e0a092065d7167706b220eb55371f69f03fb22189c2a43c37864736f6c63430008060033";
