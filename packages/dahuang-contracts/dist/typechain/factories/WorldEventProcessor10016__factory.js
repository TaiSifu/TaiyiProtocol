"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor10016__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor10016__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor10016__factory = WorldEventProcessor10016__factory;
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
const _bytecode = "0x60806040523480156200001157600080fd5b5060405162001c0b38038062001c0b8339810160408190526200003491620000c1565b600080546001600160a01b0319166001600160a01b0383161781558190620000636200005d3390565b6200006f565b60025550620000f39050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600060208284031215620000d457600080fd5b81516001600160a01b0381168114620000ec57600080fd5b9392505050565b611b0880620001036000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610160578063c0f1619c14610173578063c729329414610194578063ca5bf9a4146101b7578063f2fde38b146101c057600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c73660046117d2565b6101d3565b005b6100e16100dc3660046117d2565b610233565b6040516100ee9190611927565b60405180910390f35b6100cc610325565b6100cc61010d3660046118fb565b61038b565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b3660046117d2565b610788565b6040516100ee919061196b565b6100e161015b3660046117d2565b6107a9565b6100cc61016e366004611826565b610811565b610186610181366004611804565b610990565b6040519081526020016100ee565b6101a76101a2366004611804565b610ab0565b60405190151581526020016100ee565b61018660025481565b6100cc6101ce3660046116de565b61123b565b6101dd6001611306565b61022e5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60408051600680825260e08201909252606091600091906020820160c08036833701905050905060008160008151811061026f5761026f611a5e565b60200260200101818152505060018160018151811061029057610290611a5e565b6020026020010181815250506000816002815181106102b1576102b1611a5e565b6020026020010181815250506000816003815181106102d2576102d2611a5e565b6020026020010181815250506000816004815181106102f3576102f3611a5e565b60200260200101818152505060018160058151811061031457610314611a5e565b602090810291909101015292915050565b6001546001600160a01b0316331461037f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610225565b610389600061159f565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156103ce57600080fd5b505afa1580156103e2573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040691906116fb565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161043391815260200190565b60206040518083038186803b15801561044b57600080fd5b505afa15801561045f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048391906117b0565b6104bd5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610225565b6104c681611306565b61050a5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610225565b600080546040516340d9124560e11b8152600360048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561054f57600080fd5b505afa158015610563573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058791906116fb565b60405163793d9c8760e11b81526004810186905290915067016345785d8a0000906001600160a01b0383169063f27b390e9060240160206040518083038186803b1580156105d457600080fd5b505afa1580156105e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060c91906117eb565b101561070a57806001600160a01b031663f1a8eb38868688856001600160a01b031663f27b390e8a6040518263ffffffff1660e01b815260040161065291815260200190565b60206040518083038186803b15801561066a57600080fd5b505afa15801561067e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a291906117eb565b6040516001600160e01b031960e087901b1681526004810194909452602484019290925260448301526064820152608401600060405180830381600087803b1580156106ed57600080fd5b505af1158015610701573d6000803e3d6000fd5b50505050610781565b604051631e351d6760e31b815260048101869052602481018590526044810186905267016345785d8a000060648201526001600160a01b0382169063f1a8eb3890608401600060405180830381600087803b15801561076857600080fd5b505af115801561077c573d6000803e3d6000fd5b505050505b5050505050565b6060604051806060016040528060338152602001611aa06033913992915050565b60408051600480825260a0820190925260609160009190602082016080803683370190505090506107dc60146000611a15565b816000815181106107ef576107ef611a5e565b6020026020010181815250506009198160018151811061031457610314611a5e565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561085457600080fd5b505afa158015610868573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061088c91906116fb565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016108b991815260200190565b60206040518083038186803b1580156108d157600080fd5b505afa1580156108e5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090991906117b0565b6109435760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610225565b61094c81611306565b6107815760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610225565b600080546040516340d9124560e11b815260c9600482015282916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156109d557600080fd5b505afa1580156109e9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a0d91906116fb565b60405163b7876f5760e01b81526004810186905261272160248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610a5b57600080fd5b505afa158015610a6f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a9391906117eb565b1115610aa457612710915050610aaa565b50506002545b92915050565b600080546040516340d9124560e11b815260ca600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610afa57600080fd5b505afa158015610b0e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b3291906116fb565b600080546040516340d9124560e11b815260c9600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610b7c57600080fd5b505afa158015610b90573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb491906116fb565b60405163b7876f5760e01b81526004810188905261272060248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610c0257600080fd5b505afa158015610c16573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3a91906117eb565b1115610c4c5760009350505050610aaa565b60405163b7876f5760e01b81526004810187905261278d60248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610c9757600080fd5b505afa158015610cab573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ccf91906117eb565b1115610ce15760009350505050610aaa565b60405163b7876f5760e01b81526004810187905261278e60248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610d2c57600080fd5b505afa158015610d40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d6491906117eb565b1115610d765760009350505050610aaa565b604051637d1f0aab60e01b8152600481018790526000906001600160a01b03841690637d1f0aab9060240160006040518083038186803b158015610db957600080fd5b505afa158015610dcd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610df59190810190611718565b905060005b8151811015610e4657818181518110610e1557610e15611a5e565b60200260200101516104051415610e3457600095505050505050610aaa565b80610e3e81611a2d565b915050610dfa565b50600080546040516340d9124560e11b815260cd600482015291955085916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610e9157600080fd5b505afa158015610ea5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ec991906116fb565b600080546040516340d9124560e11b815260cc600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610f1357600080fd5b505afa158015610f27573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f4b91906116fb565b600080546040516340d9124560e11b81526003600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610f9557600080fd5b505afa158015610fa9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fcd91906116fb565b60405163b7876f5760e01b8152600481018c905261271960248201529091506000906001600160a01b0387169063b7876f579060440160206040518083038186803b15801561101b57600080fd5b505afa15801561102f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061105391906117eb565b1180156110f05750601e6001600160a01b0384166392441c0d611077836000611a15565b8d6040518363ffffffff1660e01b815260040161109e929190918252602082015260400190565b60206040518083038186803b1580156110b657600080fd5b505afa1580156110ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110ee91906117eb565b105b801561118d5750601e6001600160a01b0383166392441c0d61111460146000611a15565b8d6040518363ffffffff1660e01b815260040161113b929190918252602082015260400190565b60206040518083038186803b15801561115357600080fd5b505afa158015611167573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061118b91906117eb565b105b8015611218575060405163793d9c8760e11b8152600481018b9052670429d069189e0000906001600160a01b0383169063f27b390e9060240160206040518083038186803b1580156111de57600080fd5b505afa1580156111f2573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061121691906117eb565b105b1561122d576001975050505050505050610aaa565b509498975050505050505050565b6001546001600160a01b031633146112955760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610225565b6001600160a01b0381166112fa5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610225565b6113038161159f565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561134b57600080fd5b505afa15801561135f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061138391906116fb565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b1580156113c857600080fd5b505afa1580156113dc573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061140091906116fb565b6001600160a01b0316148061149557506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561145257600080fd5b505afa158015611466573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061148a91906116fb565b6001600160a01b0316145b8061159857506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b1580156114e357600080fd5b505afa1580156114f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061151b91906116fb565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b15801561156057600080fd5b505afa158015611574573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061159891906117b0565b9392505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261160357600080fd5b82356020611618611613836119f1565b6119c0565b80838252828201915082870188848660051b8a0101111561163857600080fd5b60005b858110156116d057813567ffffffffffffffff8082111561165b57600080fd5b818b0191508b603f83011261166f57600080fd5b8682013560408282111561168557611685611a74565b611696828c01601f19168a016119c0565b92508183528d818386010111156116ac57600080fd5b818185018a850137506000908201880152855250928401929084019060010161163b565b509098975050505050505050565b6000602082840312156116f057600080fd5b813561159881611a8a565b60006020828403121561170d57600080fd5b815161159881611a8a565b6000602080838503121561172b57600080fd5b825167ffffffffffffffff81111561174257600080fd5b8301601f8101851361175357600080fd5b8051611761611613826119f1565b80828252848201915084840188868560051b870101111561178157600080fd5b600094505b838510156117a4578051835260019490940193918501918501611786565b50979650505050505050565b6000602082840312156117c257600080fd5b8151801515811461159857600080fd5b6000602082840312156117e457600080fd5b5035919050565b6000602082840312156117fd57600080fd5b5051919050565b6000806040838503121561181757600080fd5b50508035926020909101359150565b6000806000806080858703121561183c57600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561186357600080fd5b818801915088601f83011261187757600080fd5b8135611885611613826119f1565b8082825285820191508585018c878560051b88010111156118a557600080fd5b600095505b838610156118c85780358352600195909501949186019186016118aa565b509650505060608801359250808311156118e157600080fd5b50506118ef878288016115f1565b91505092959194509250565b60008060006060848603121561191057600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b8181101561195f57835183529284019291840191600101611943565b50909695505050505050565b600060208083528351808285015260005b818110156119985785810183015185820160400152820161197c565b818111156119aa576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156119e9576119e9611a74565b604052919050565b600067ffffffffffffffff821115611a0b57611a0b611a74565b5060051b60200190565b60008219821115611a2857611a28611a48565b500190565b6000600019821415611a4157611a41611a48565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461130357600080fdfee4bda0e79a84e6af8de4bab2e59ba0e79785e58ebbe4b896efbc8ce5aeb6e5baade69bb4e58aa0e59bb0e99abee4ba86e38082a2646970667358221220a9f1f5340c87cffd9686db0fd1e11f58418432d8acbb9e01c442e4063c87188564736f6c63430008060033";
