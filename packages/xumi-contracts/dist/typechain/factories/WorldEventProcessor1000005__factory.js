"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1000005__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1000005__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1000005__factory = WorldEventProcessor1000005__factory;
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
                name: "_actor",
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
const _bytecode = "0x60806040523480156200001157600080fd5b5060405162001d7c38038062001d7c8339810160408190526200003491620000c1565b600080546001600160a01b0319166001600160a01b0383161781558190620000636200005d3390565b6200006f565b60025550620000f39050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600060208284031215620000d457600080fd5b81516001600160a01b0381168114620000ec57600080fd5b9392505050565b611c7980620001036000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610160578063c0f1619c14610173578063c729329414610194578063ca5bf9a4146101b7578063f2fde38b146101c057600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c736600461192e565b6101d3565b005b6100e16100dc36600461192e565b610233565b6040516100ee9190611a83565b60405180910390f35b6100cc610244565b6100cc61010d366004611a57565b6102aa565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b36600461192e565b6106a4565b6040516100ee9190611ac7565b6100e161015b36600461192e565b6106c5565b6100cc61016e366004611982565b61084f565b610186610181366004611960565b6109d5565b6040519081526020016100ee565b6101a76101a2366004611960565b610d08565b60405190151581526020016100ee565b61018660025481565b6100cc6101ce36600461183a565b610e43565b6101dd6001610f0e565b61022e5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061023e826111a7565b92915050565b6001546001600160a01b0316331461029e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610225565b6102a860006116fb565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102ed57600080fd5b505afa158015610301573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103259190611857565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035291815260200190565b60206040518083038186803b15801561036a57600080fd5b505afa15801561037e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a2919061190c565b6103dc5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610225565b6103e581610f0e565b6104295760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610225565b600080546040516340d9124560e11b81526103eb60048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561046f57600080fd5b505afa158015610483573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a79190611857565b60405163793d9c8760e11b815260048101869052909150674563918244f400009081906001600160a01b0384169063f27b390e9060240160206040518083038186803b1580156104f657600080fd5b505afa15801561050a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061052e9190611947565b101561062c57816001600160a01b031663f1a8eb38878789866001600160a01b031663f27b390e8b6040518263ffffffff1660e01b815260040161057491815260200190565b60206040518083038186803b15801561058c57600080fd5b505afa1580156105a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c49190611947565b6040516001600160e01b031960e087901b1681526004810194909452602484019290925260448301526064820152608401600060405180830381600087803b15801561060f57600080fd5b505af1158015610623573d6000803e3d6000fd5b5050505061069c565b604051631e351d6760e31b8152600481018790526024810186905260448101879052606481018290526001600160a01b0383169063f1a8eb3890608401600060405180830381600087803b15801561068357600080fd5b505af1158015610697573d6000803e3d6000fd5b505050505b505050505050565b6060604051806080016040528060488152602001611bfc6048913992915050565b600080546040516340d9124560e11b815260016004820152606092916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561070c57600080fd5b505afa158015610720573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107449190611857565b604051630fe7f7cf60e21b815260048101859052606460248201526001600160a01b039190911690633f9fdf3c9060440160206040518083038186803b15801561078d57600080fd5b505afa1580156107a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107c59190611947565b60408051600280825260608201835292935060009290916020830190803683370190505090506107f86103e86001611b71565b8160008151811061080b5761080b611bba565b602002602001018181525050600f821061082657600061082a565b6000195b8160018151811061083d5761083d611bba565b60209081029190910101529392505050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561089257600080fd5b505afa1580156108a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ca9190611857565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016108f791815260200190565b60206040518083038186803b15801561090f57600080fd5b505afa158015610923573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610947919061190c565b6109815760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610225565b61098a81610f0e565b6109ce5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610225565b5050505050565b600080546040516340d9124560e11b81526103ea600482015282916001600160a01b0316906381b2248a9060240160206040518083038186803b158015610a1b57600080fd5b505afa158015610a2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a539190611857565b604051637d1f0aab60e01b8152600481018690529091506000906001600160a01b03831690637d1f0aab9060240160006040518083038186803b158015610a9957600080fd5b505afa158015610aad573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610ad59190810190611874565b905060005b8151811015610b2657818181518110610af557610af5611bba565b60200260200101516127111415610b1457620f4246935050505061023e565b80610b1e81611b89565b915050610ada565b50600080546040516340d9124560e11b81526103ed60048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610b6d57600080fd5b505afa158015610b81573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba59190611857565b905060006001600160a01b0382166392441c0d610bc56103e86001611b71565b896040518363ffffffff1660e01b8152600401610bec929190918252602082015260400190565b60206040518083038186803b158015610c0457600080fd5b505afa158015610c18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3c9190611947565b905060006001600160a01b0383166392441c0d610c5c6103e86002611b71565b8a6040518363ffffffff1660e01b8152600401610c83929190918252602082015260400190565b60206040518083038186803b158015610c9b57600080fd5b505afa158015610caf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd39190611947565b9050600282108015610ce55750600381105b15610cfa57620f42409550505050505061023e565b506000979650505050505050565b600080546040516340d9124560e11b81526103ed600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610d5357600080fd5b505afa158015610d67573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d8b9190611857565b905060006001600160a01b0382166392441c0d610dab6103e86001611b71565b886040518363ffffffff1660e01b8152600401610dd2929190918252602082015260400190565b60206040518083038186803b158015610dea57600080fd5b505afa158015610dfe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e229190611947565b90506007811115610e39576000935050505061023e565b5090949350505050565b6001546001600160a01b03163314610e9d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610225565b6001600160a01b038116610f025760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610225565b610f0b816116fb565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610f5357600080fd5b505afa158015610f67573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f8b9190611857565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610fd057600080fd5b505afa158015610fe4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110089190611857565b6001600160a01b0316148061109d57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561105a57600080fd5b505afa15801561106e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110929190611857565b6001600160a01b0316145b806111a057506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b1580156110eb57600080fd5b505afa1580156110ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111239190611857565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b15801561116857600080fd5b505afa15801561117c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111a0919061190c565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561121657600080fd5b505afa15801561122a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061124e9190611857565b90506101f46001600160a01b038216633f9fdf3c61126e8761014b611b71565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156112ad57600080fd5b505afa1580156112c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112e59190611947565b10156112f25760006112f5565b60015b60ff168260008151811061130b5761130b611bba565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611334876102cf611b71565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561137357600080fd5b505afa158015611387573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113ab9190611947565b10156113b85760006113bb565b60015b60ff16826001815181106113d1576113d1611bba565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6113fa876103f5611b71565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561143957600080fd5b505afa15801561144d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114719190611947565b101561147e576000611481565b60015b60ff168260028151811061149757611497611bba565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6114c0876104d5611b71565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156114ff57600080fd5b505afa158015611513573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115379190611947565b1015611544576000611547565b60015b60ff168260038151811061155d5761155d611bba565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61158687610851611b71565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156115c557600080fd5b505afa1580156115d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115fd9190611947565b101561160a57600061160d565b60015b60ff168260048151811061162357611623611bba565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61164c876135bd611b71565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561168b57600080fd5b505afa15801561169f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c39190611947565b10156116d05760006116d3565b60015b60ff16826005815181106116e9576116e9611bba565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261175f57600080fd5b8235602061177461176f83611b4d565b611b1c565b80838252828201915082870188848660051b8a0101111561179457600080fd5b60005b8581101561182c57813567ffffffffffffffff808211156117b757600080fd5b818b0191508b603f8301126117cb57600080fd5b868201356040828211156117e1576117e1611bd0565b6117f2828c01601f19168a01611b1c565b92508183528d8183860101111561180857600080fd5b818185018a8501375060009082018801528552509284019290840190600101611797565b509098975050505050505050565b60006020828403121561184c57600080fd5b81356111a081611be6565b60006020828403121561186957600080fd5b81516111a081611be6565b6000602080838503121561188757600080fd5b825167ffffffffffffffff81111561189e57600080fd5b8301601f810185136118af57600080fd5b80516118bd61176f82611b4d565b80828252848201915084840188868560051b87010111156118dd57600080fd5b600094505b838510156119005780518352600194909401939185019185016118e2565b50979650505050505050565b60006020828403121561191e57600080fd5b815180151581146111a057600080fd5b60006020828403121561194057600080fd5b5035919050565b60006020828403121561195957600080fd5b5051919050565b6000806040838503121561197357600080fd5b50508035926020909101359150565b6000806000806080858703121561199857600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156119bf57600080fd5b818801915088601f8301126119d357600080fd5b81356119e161176f82611b4d565b8082825285820191508585018c878560051b8801011115611a0157600080fd5b600095505b83861015611a24578035835260019590950194918601918601611a06565b50965050506060880135925080831115611a3d57600080fd5b5050611a4b8782880161174d565b91505092959194509250565b600080600060608486031215611a6c57600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b81811015611abb57835183529284019291840191600101611a9f565b50909695505050505050565b600060208083528351808285015260005b81811015611af457858101830151858201604001528201611ad8565b81811115611b06576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611b4557611b45611bd0565b604052919050565b600067ffffffffffffffff821115611b6757611b67611bd0565b5060051b60200190565b60008219821115611b8457611b84611ba4565b500190565b6000600019821415611b9d57611b9d611ba4565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610f0b57600080fdfee5889ae5bc80e5a78be586b7e58db4e4b88be69da5efbc8ce4bda0e6848fe5a496e588b0e8bebee5af86e99b86e58cbae8beb9e7bc98efbc8ce8bdbbe5baa6e88097e695a3e38082a2646970667358221220796d022165a0d58fa06371ec5a0219899a2d7488739799c61f61cb472537110364736f6c63430008060033";
