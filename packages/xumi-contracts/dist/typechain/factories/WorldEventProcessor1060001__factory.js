"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1060001__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1060001__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1060001__factory = WorldEventProcessor1060001__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161140e38038061140e83398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b611317806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b14610175578063b4ae123514610189578063c0f1619c1461019c578063c7293294146101c0578063ca5bf9a4146101e6578063f2fde38b146101ef57600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004611037565b610202565b005b6100e16100dc366004611037565b610262565b6040516100ee919061118c565b60405180910390f35b6100cc610273565b6100cc61010d366004611160565b6102d9565b6001546040516001600160a01b0390911681526020016100ee565b61016861013b366004611037565b50604080518082019091526012815271725ed072cdcdf2d24274d1cc7446d0f1c04160711b602082015290565b6040516100ee91906111d0565b6100e1610183366004611037565b50606090565b6100cc61019736600461108b565b61045e565b6101b26101aa366004611069565b505060025490565b6040519081526020016100ee565b6101d66101ce366004611069565b600192915050565b60405190151581526020016100ee565b6101b260025481565b6100cc6101fd366004610fdb565b6105e4565b61020c60016106af565b61025d5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061026d82610948565b92915050565b6001546001600160a01b031633146102cd5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610254565b6102d76000610e9c565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561031c57600080fd5b505afa158015610330573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103549190610ff8565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161038191815260200190565b60206040518083038186803b15801561039957600080fd5b505afa1580156103ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103d19190611015565b61040b5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610254565b610414816106af565b6104585760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610254565b50505050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156104a157600080fd5b505afa1580156104b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d99190610ff8565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161050691815260200190565b60206040518083038186803b15801561051e57600080fd5b505afa158015610532573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105569190611015565b6105905760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610254565b610599816106af565b6105dd5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610254565b5050505050565b6001546001600160a01b0316331461063e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610254565b6001600160a01b0381166106a35760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610254565b6106ac81610e9c565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b1580156106f457600080fd5b505afa158015610708573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072c9190610ff8565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b15801561077157600080fd5b505afa158015610785573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a99190610ff8565b6001600160a01b0316148061083e57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b1580156107fb57600080fd5b505afa15801561080f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108339190610ff8565b6001600160a01b0316145b8061094157506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b15801561088c57600080fd5b505afa1580156108a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108c49190610ff8565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b15801561090957600080fd5b505afa15801561091d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109419190611015565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156109b757600080fd5b505afa1580156109cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ef9190610ff8565b90506101f46001600160a01b038216633f9fdf3c610a0f8761014b61127a565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610a4e57600080fd5b505afa158015610a62573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a869190611050565b1015610a93576000610a96565b60015b60ff1682600081518110610aac57610aac6112a0565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610ad5876102cf61127a565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610b1457600080fd5b505afa158015610b28573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b4c9190611050565b1015610b59576000610b5c565b60015b60ff1682600181518110610b7257610b726112a0565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610b9b876103f561127a565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610bda57600080fd5b505afa158015610bee573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c129190611050565b1015610c1f576000610c22565b60015b60ff1682600281518110610c3857610c386112a0565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610c61876104d561127a565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610ca057600080fd5b505afa158015610cb4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd89190611050565b1015610ce5576000610ce8565b60015b60ff1682600381518110610cfe57610cfe6112a0565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610d278761085161127a565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d6657600080fd5b505afa158015610d7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d9e9190611050565b1015610dab576000610dae565b60015b60ff1682600481518110610dc457610dc46112a0565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610ded876135bd61127a565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e2c57600080fd5b505afa158015610e40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e649190611050565b1015610e71576000610e74565b60015b60ff1682600581518110610e8a57610e8a6112a0565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f8381840112610f0057600080fd5b82356020610f15610f1083611256565b611225565b80838252828201915082870188848660051b8a01011115610f3557600080fd5b60005b85811015610fcd57813567ffffffffffffffff80821115610f5857600080fd5b818b0191508b603f830112610f6c57600080fd5b86820135604082821115610f8257610f826112b6565b610f93828c01601f19168a01611225565b92508183528d81838601011115610fa957600080fd5b818185018a8501375060009082018801528552509284019290840190600101610f38565b509098975050505050505050565b600060208284031215610fed57600080fd5b8135610941816112cc565b60006020828403121561100a57600080fd5b8151610941816112cc565b60006020828403121561102757600080fd5b8151801515811461094157600080fd5b60006020828403121561104957600080fd5b5035919050565b60006020828403121561106257600080fd5b5051919050565b6000806040838503121561107c57600080fd5b50508035926020909101359150565b600080600080608085870312156110a157600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156110c857600080fd5b818801915088601f8301126110dc57600080fd5b81356110ea610f1082611256565b8082825285820191508585018c878560051b880101111561110a57600080fd5b600095505b8386101561112d57803583526001959095019491860191860161110f565b5096505050606088013592508083111561114657600080fd5b505061115487828801610eee565b91505092959194509250565b60008060006060848603121561117557600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156111c4578351835292840192918401916001016111a8565b50909695505050505050565b600060208083528351808285015260005b818110156111fd578581018301518582016040015282016111e1565b8181111561120f576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff8111828210171561124e5761124e6112b6565b604052919050565b600067ffffffffffffffff821115611270576112706112b6565b5060051b60200190565b6000821982111561129b57634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146106ac57600080fdfea26469706673582212200ed197dbcdf338996f22c5829a03edf835ef2608db541078c541743d0e5c5a6564736f6c63430008060033";