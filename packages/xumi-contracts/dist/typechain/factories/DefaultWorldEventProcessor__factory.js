"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultWorldEventProcessor__factory = void 0;
const ethers_1 = require("ethers");
class DefaultWorldEventProcessor__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_route, _defaultBranchEvent, overrides) {
        return super.deploy(_route, _defaultBranchEvent, overrides || {});
    }
    getDeployTransaction(_route, _defaultBranchEvent, overrides) {
        return super.getDeployTransaction(_route, _defaultBranchEvent, overrides || {});
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
exports.DefaultWorldEventProcessor__factory = DefaultWorldEventProcessor__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "contract WorldContractRoute",
                name: "_route",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_defaultBranchEvent",
                type: "uint256",
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516113fa3803806113fa83398101604081905261002f916100b4565b600080546001600160a01b0319166001600160a01b0384161790556100596100543390565b610062565b600255506100ee565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600080604083850312156100c757600080fd5b82516001600160a01b03811681146100de57600080fd5b6020939093015192949293505050565b6112fd806100fd6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461015b578063b4ae12351461016f578063c0f1619c14610182578063c7293294146101a6578063ca5bf9a4146101cc578063f2fde38b146101d557600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c736600461101d565b6101e8565b005b6100e16100dc36600461101d565b610248565b6040516100ee9190611172565b60405180910390f35b6100cc610259565b6100cc61010d366004611146565b6102bf565b6001546040516001600160a01b0390911681526020016100ee565b61014e61013b36600461101d565b5060408051602081019091526000815290565b6040516100ee91906111b6565b6100e161016936600461101d565b50606090565b6100cc61017d366004611071565b610444565b61019861019036600461104f565b505060025490565b6040519081526020016100ee565b6101bc6101b436600461104f565b600192915050565b60405190151581526020016100ee565b61019860025481565b6100cc6101e3366004610fc1565b6105ca565b6101f26001610695565b6102435760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60606102538261092e565b92915050565b6001546001600160a01b031633146102b35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161023a565b6102bd6000610e82565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561030257600080fd5b505afa158015610316573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061033a9190610fde565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161036791815260200190565b60206040518083038186803b15801561037f57600080fd5b505afa158015610393573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b79190610ffb565b6103f15760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161023a565b6103fa81610695565b61043e5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161023a565b50505050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561048757600080fd5b505afa15801561049b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104bf9190610fde565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016104ec91815260200190565b60206040518083038186803b15801561050457600080fd5b505afa158015610518573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053c9190610ffb565b6105765760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161023a565b61057f81610695565b6105c35760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161023a565b5050505050565b6001546001600160a01b031633146106245760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161023a565b6001600160a01b0381166106895760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161023a565b61069281610e82565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b1580156106da57600080fd5b505afa1580156106ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107129190610fde565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b15801561075757600080fd5b505afa15801561076b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061078f9190610fde565b6001600160a01b0316148061082457506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b1580156107e157600080fd5b505afa1580156107f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108199190610fde565b6001600160a01b0316145b8061092757506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b15801561087257600080fd5b505afa158015610886573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108aa9190610fde565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b1580156108ef57600080fd5b505afa158015610903573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109279190610ffb565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561099d57600080fd5b505afa1580156109b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d59190610fde565b90506101f46001600160a01b038216633f9fdf3c6109f58761014b611260565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610a3457600080fd5b505afa158015610a48573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a6c9190611036565b1015610a79576000610a7c565b60015b60ff1682600081518110610a9257610a92611286565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610abb876102cf611260565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610afa57600080fd5b505afa158015610b0e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b329190611036565b1015610b3f576000610b42565b60015b60ff1682600181518110610b5857610b58611286565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610b81876103f5611260565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610bc057600080fd5b505afa158015610bd4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf89190611036565b1015610c05576000610c08565b60015b60ff1682600281518110610c1e57610c1e611286565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610c47876104d5611260565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610c8657600080fd5b505afa158015610c9a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cbe9190611036565b1015610ccb576000610cce565b60015b60ff1682600381518110610ce457610ce4611286565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610d0d87610851611260565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d4c57600080fd5b505afa158015610d60573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d849190611036565b1015610d91576000610d94565b60015b60ff1682600481518110610daa57610daa611286565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610dd3876135bd611260565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e1257600080fd5b505afa158015610e26573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e4a9190611036565b1015610e57576000610e5a565b60015b60ff1682600581518110610e7057610e70611286565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f8381840112610ee657600080fd5b82356020610efb610ef68361123c565b61120b565b80838252828201915082870188848660051b8a01011115610f1b57600080fd5b60005b85811015610fb357813567ffffffffffffffff80821115610f3e57600080fd5b818b0191508b603f830112610f5257600080fd5b86820135604082821115610f6857610f6861129c565b610f79828c01601f19168a0161120b565b92508183528d81838601011115610f8f57600080fd5b818185018a8501375060009082018801528552509284019290840190600101610f1e565b509098975050505050505050565b600060208284031215610fd357600080fd5b8135610927816112b2565b600060208284031215610ff057600080fd5b8151610927816112b2565b60006020828403121561100d57600080fd5b8151801515811461092757600080fd5b60006020828403121561102f57600080fd5b5035919050565b60006020828403121561104857600080fd5b5051919050565b6000806040838503121561106257600080fd5b50508035926020909101359150565b6000806000806080858703121561108757600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156110ae57600080fd5b818801915088601f8301126110c257600080fd5b81356110d0610ef68261123c565b8082825285820191508585018c878560051b88010111156110f057600080fd5b600095505b838610156111135780358352600195909501949186019186016110f5565b5096505050606088013592508083111561112c57600080fd5b505061113a87828801610ed4565b91505092959194509250565b60008060006060848603121561115b57600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156111aa5783518352928401929184019160010161118e565b50909695505050505050565b600060208083528351808285015260005b818110156111e3578581018301518582016040015282016111c7565b818111156111f5576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156112345761123461129c565b604052919050565b600067ffffffffffffffff8211156112565761125661129c565b5060051b60200190565b6000821982111561128157634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461069257600080fdfea2646970667358221220f71e7e02e51720ee3a1d6e6c12648beb5907c941cbf028c697e83391b21f952664736f6c63430008060033";
