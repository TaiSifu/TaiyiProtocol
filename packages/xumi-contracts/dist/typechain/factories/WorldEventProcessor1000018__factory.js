"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1000018__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1000018__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1000018__factory = WorldEventProcessor1000018__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405162001a5338038062001a53833981016040819052610031916100ba565b600080546001600160a01b0319166001600160a01b038316178155819061005d6100583390565b610068565b600255506100ea9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100cc57600080fd5b81516001600160a01b03811681146100e357600080fd5b9392505050565b61195980620000fa6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610160578063c0f1619c14610173578063c729329414610194578063ca5bf9a4146101b7578063f2fde38b146101c057600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004611634565b6101d3565b005b6100e16100dc366004611634565b610233565b6040516100ee9190611789565b60405180910390f35b6100cc610244565b6100cc61010d36600461175d565b6102aa565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b366004611634565b61042f565b6040516100ee91906117cd565b6100e161015b366004611634565b610450565b6100cc61016e366004611688565b6104bd565b610186610181366004611666565b610643565b6040519081526020016100ee565b6101a76101a2366004611666565b6108fc565b60405190151581526020016100ee565b61018660025481565b6100cc6101ce3660046115d8565b610be1565b6101dd6001610cac565b61022e5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061023e82610f45565b92915050565b6001546001600160a01b0316331461029e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610225565b6102a86000611499565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102ed57600080fd5b505afa158015610301573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032591906115f5565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035291815260200190565b60206040518083038186803b15801561036a57600080fd5b505afa15801561037e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a29190611612565b6103dc5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610225565b6103e581610cac565b6104295760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610225565b50505050565b60606040518060800160405280604581526020016118df6045913992915050565b604080516002808252606080830184529260009291906020830190803683370190505090506103e88160008151811061048b5761048b61189d565b6020026020010181815250506001816001815181106104ac576104ac61189d565b602090810291909101015292915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561050057600080fd5b505afa158015610514573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053891906115f5565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161056591815260200190565b60206040518083038186803b15801561057d57600080fd5b505afa158015610591573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b59190611612565b6105ef5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610225565b6105f881610cac565b61063c5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610225565b5050505050565b600080546040516340d9124560e11b81526103e9600482015282916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561068957600080fd5b505afa15801561069d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106c191906115f5565b60405163b7876f5760e01b815260048101869052620f424660248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561071057600080fd5b505afa158015610724573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610748919061164d565b11806107d5575060405163b7876f5760e01b815260048101859052620f424960248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561079b57600080fd5b505afa1580156107af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d3919061164d565b115b156108f257600080546040516340d9124560e11b8152600160048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561081f57600080fd5b505afa158015610833573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085791906115f5565b604051630fe7f7cf60e21b815260048101879052606460248201526001600160a01b039190911690633f9fdf3c9060440160206040518083038186803b1580156108a057600080fd5b505afa1580156108b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d8919061164d565b905060328110156108f057620f42539250505061023e565b505b5060009392505050565b600080546040516340d9124560e11b81526103e9600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561094757600080fd5b505afa15801561095b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061097f91906115f5565b60405163b7876f5760e01b815260048101879052620f425060248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b1580156109ce57600080fd5b505afa1580156109e2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a06919061164d565b1115610a175760009250505061023e565b60405163b7876f5760e01b815260048101869052620f424160248201526000925082906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610a6657600080fd5b505afa158015610a7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a9e919061164d565b1115610aaf5760019250505061023e565b60405163b7876f5760e01b815260048101869052620f906160248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610afb57600080fd5b505afa158015610b0f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b33919061164d565b1115610b445760019250505061023e565b60405163b7876f5760e01b815260048101869052620f906260248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610b9057600080fd5b505afa158015610ba4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc8919061164d565b1115610bd95760019250505061023e565b509392505050565b6001546001600160a01b03163314610c3b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610225565b6001600160a01b038116610ca05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610225565b610ca981611499565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610cf157600080fd5b505afa158015610d05573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d2991906115f5565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610d6e57600080fd5b505afa158015610d82573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da691906115f5565b6001600160a01b03161480610e3b57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610df857600080fd5b505afa158015610e0c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3091906115f5565b6001600160a01b0316145b80610f3e57506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610e8957600080fd5b505afa158015610e9d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ec191906115f5565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610f0657600080fd5b505afa158015610f1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f3e9190611612565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610fb457600080fd5b505afa158015610fc8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fec91906115f5565b90506101f46001600160a01b038216633f9fdf3c61100c8761014b611877565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561104b57600080fd5b505afa15801561105f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611083919061164d565b1015611090576000611093565b60015b60ff16826000815181106110a9576110a961189d565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6110d2876102cf611877565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561111157600080fd5b505afa158015611125573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611149919061164d565b1015611156576000611159565b60015b60ff168260018151811061116f5761116f61189d565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611198876103f5611877565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156111d757600080fd5b505afa1580156111eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061120f919061164d565b101561121c57600061121f565b60015b60ff16826002815181106112355761123561189d565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61125e876104d5611877565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561129d57600080fd5b505afa1580156112b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112d5919061164d565b10156112e25760006112e5565b60015b60ff16826003815181106112fb576112fb61189d565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61132487610851611877565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561136357600080fd5b505afa158015611377573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061139b919061164d565b10156113a85760006113ab565b60015b60ff16826004815181106113c1576113c161189d565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6113ea876135bd611877565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561142957600080fd5b505afa15801561143d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611461919061164d565b101561146e576000611471565b60015b60ff16826005815181106114875761148761189d565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f83818401126114fd57600080fd5b8235602061151261150d83611853565b611822565b80838252828201915082870188848660051b8a0101111561153257600080fd5b60005b858110156115ca57813567ffffffffffffffff8082111561155557600080fd5b818b0191508b603f83011261156957600080fd5b8682013560408282111561157f5761157f6118b3565b611590828c01601f19168a01611822565b92508183528d818386010111156115a657600080fd5b818185018a8501375060009082018801528552509284019290840190600101611535565b509098975050505050505050565b6000602082840312156115ea57600080fd5b8135610f3e816118c9565b60006020828403121561160757600080fd5b8151610f3e816118c9565b60006020828403121561162457600080fd5b81518015158114610f3e57600080fd5b60006020828403121561164657600080fd5b5035919050565b60006020828403121561165f57600080fd5b5051919050565b6000806040838503121561167957600080fd5b50508035926020909101359150565b6000806000806080858703121561169e57600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156116c557600080fd5b818801915088601f8301126116d957600080fd5b81356116e761150d82611853565b8082825285820191508585018c878560051b880101111561170757600080fd5b600095505b8386101561172a57803583526001959095019491860191860161170c565b5096505050606088013592508083111561174357600080fd5b5050611751878288016114eb565b91505092959194509250565b60008060006060848603121561177257600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156117c1578351835292840192918401916001016117a5565b50909695505050505050565b600060208083528351808285015260005b818110156117fa578581018301518582016040015282016117de565b8181111561180c576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff8111828210171561184b5761184b6118b3565b604052919050565b600067ffffffffffffffff82111561186d5761186d6118b3565b5060051b60200190565b6000821982111561189857634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610ca957600080fdfee4bda0e98187e588b0e4b880e4b8aae8b4a8e5ad90efbc8ce79bb8e4ba92e590b8e5bc95efbc8ce4bcbce4b98ee58f88e4b88de4bc9ae8b5b0e5be97e5a4aae8bf91e38082a26469706673582212205678fdbb394cfa5d14a60ebb55ed2775cc5fa9e44639470c20acc4bab9d4d71564736f6c63430008060033";
