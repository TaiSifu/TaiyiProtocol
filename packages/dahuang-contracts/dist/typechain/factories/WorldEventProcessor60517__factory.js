"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor60517__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor60517__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor60517__factory = WorldEventProcessor60517__factory;
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
                name: "_actor",
                type: "uint256",
            },
            {
                internalType: "uint256[]",
                name: "_uintParams",
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
        name: "eventOperator",
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
                name: "_eventOperator",
                type: "uint256",
            },
        ],
        name: "initOperator",
        outputs: [],
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
const _bytecode = "0x60806040523480156200001157600080fd5b5060405162001ca038038062001ca08339810160408190526200003491620000c1565b600080546001600160a01b0319166001600160a01b0383161781558190620000636200005d3390565b6200006f565b60025550620000f39050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600060208284031215620000d457600080fd5b81516001600160a01b0381168114620000ec57600080fd5b9392505050565b611b9d80620001036000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80639d0c025b1161008c578063c0f1619c11610066578063c0f1619c14610203578063c729329414610219578063ca5bf9a41461023c578063f2fde38b1461024557600080fd5b80639d0c025b14610189578063a71d6e3b146101dc578063b4ae1235146101f057600080fd5b80635ecd329c116100c85780635ecd329c14610140578063715018a6146101535780637c99f6a61461015b5780638da5cb5b1461016e57600080fd5b8063127ce1cc146100ef57806340b8c011146101045780634849f65614610120575b600080fd5b6101026100fd366004611888565b610258565b005b61010d60035481565b6040519081526020015b60405180910390f35b61013361012e366004611888565b6102b8565b60405161011791906119dd565b61010261014e366004611888565b6102c9565b610102610634565b6101026101693660046119b1565b61066a565b6001546040516001600160a01b039091168152602001610117565b6101cf610197366004611888565b5060408051808201909152601b81527fe4bda0e68f90e58f96e4ba86e4b880e4ba9be98193e79086e380820000000000602082015290565b6040516101179190611a21565b6101336101ea366004611888565b50606090565b6101026101fe3660046118dc565b6107ef565b61010d6102113660046118ba565b505060025490565b61022c6102273660046118ba565b610ddc565b6040519015158152602001610117565b61010d60025481565b6101026102533660046117c1565b610dfa565b6102626001610e95565b6102b35760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60606102c38261112e565b92915050565b6001546001600160a01b031633146102f35760405162461bcd60e51b81526004016102aa90611a76565b6003541561034e5760405162461bcd60e51b815260206004820152602260248201527f6576656e74206f70657261746f7220616c726561647920696e697469616c697a604482015261195960f21b60648201526084016102aa565b60008054906101000a90046001600160a01b03166001600160a01b0316631e8cee666040518163ffffffff1660e01b815260040160206040518083038186803b15801561039a57600080fd5b505afa1580156103ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103d291906117de565b6001600160a01b03166323b872dd336040516001600160e01b031960e084901b1681526001600160a01b03909116600482015230602482015260448101849052606401600060405180830381600087803b15801561042f57600080fd5b505af1158015610443573d6000803e3d6000fd5b505050600382905550600080546040516340d9124560e11b815260c860048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561049157600080fd5b505afa1580156104a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c991906117de565b6001600160a01b031663570ca7356040518163ffffffff1660e01b815260040160206040518083038186803b15801561050157600080fd5b505afa158015610515573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053991906118a1565b6000546040516340d9124560e11b8152600360048201529192506001600160a01b0316906381b2248a9060240160206040518083038186803b15801561057e57600080fd5b505afa158015610592573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b691906117de565b600354604051631ea19b7f60e21b81526004810191909152602481018390526c01431e0fae6d7217caa000000060448201526001600160a01b039190911690637a866dfc90606401600060405180830381600087803b15801561061857600080fd5b505af115801561062c573d6000803e3d6000fd5b505050505050565b6001546001600160a01b0316331461065e5760405162461bcd60e51b81526004016102aa90611a76565b6106686000611682565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156106ad57600080fd5b505afa1580156106c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e591906117de565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161071291815260200190565b60206040518083038186803b15801561072a57600080fd5b505afa15801561073e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076291906117fb565b61079c5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b60448201526064016102aa565b6107a581610e95565b6107e95760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b60448201526064016102aa565b50505050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561083257600080fd5b505afa158015610846573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061086a91906117de565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161089791815260200190565b60206040518083038186803b1580156108af57600080fd5b505afa1580156108c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e791906117fb565b6109215760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b60448201526064016102aa565b61092a81610e95565b61096e5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b60448201526064016102aa565b6000600354116109c05760405162461bcd60e51b815260206004820152601e60248201527f6576656e74206f70657261746f72206e6f7420696e697469616c697a6564000060448201526064016102aa565b8251600114610a055760405162461bcd60e51b81526020600482015260116024820152701c185c985b5cc81a5cc81a5b9d985b1a59607a1b60448201526064016102aa565b600083600081518110610a1a57610a1a611b26565b6020908102919091010151600080546040516340d9124560e11b81526003600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610a6f57600080fd5b505afa158015610a83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa791906117de565b60405163793d9c8760e11b81526004810188905290915082906001600160a01b0383169063f27b390e9060240160206040518083038186803b158015610aec57600080fd5b505afa158015610b00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2491906118a1565b1015610b655760405162461bcd60e51b815260206004820152601060248201526f6e6f7420656e6f7567682064616f6c6960801b60448201526064016102aa565b600354604051631e351d6760e31b815260048101899052602481018890526044810191909152606481018390526001600160a01b0382169063f1a8eb3890608401600060405180830381600087803b158015610bc057600080fd5b505af1158015610bd4573d6000803e3d6000fd5b505060035460405163a41fe49f60e01b8152600481018b90526024810191909152604481018590526001600160a01b038416925063a41fe49f9150606401600060405180830381600087803b158015610c2c57600080fd5b505af1158015610c40573d6000803e3d6000fd5b5050600080546040516340d9124560e11b8152600481018390529193506001600160a01b031691506381b2248a9060240160206040518083038186803b158015610c8957600080fd5b505afa158015610c9d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc191906117de565b9050816001600160a01b031663a9059cbb826001600160a01b031663b35958a08a6040518263ffffffff1660e01b8152600401610d0091815260200190565b60606040518083038186803b158015610d1857600080fd5b505afa158015610d2c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d50919061181d565b5160405160e083901b6001600160e01b03191681526001600160a01b03909116600482015260248101869052604401602060405180830381600087803b158015610d9957600080fd5b505af1158015610dad573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dd191906117fb565b505050505050505050565b600060035460001415610df1575060006102c3565b50600192915050565b6001546001600160a01b03163314610e245760405162461bcd60e51b81526004016102aa90611a76565b6001600160a01b038116610e895760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016102aa565b610e9281611682565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610eda57600080fd5b505afa158015610eee573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f1291906117de565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610f5757600080fd5b505afa158015610f6b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f8f91906117de565b6001600160a01b0316148061102457506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610fe157600080fd5b505afa158015610ff5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061101991906117de565b6001600160a01b0316145b8061112757506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b15801561107257600080fd5b505afa158015611086573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110aa91906117de565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b1580156110ef57600080fd5b505afa158015611103573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061112791906117fb565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561119d57600080fd5b505afa1580156111b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111d591906117de565b90506101f46001600160a01b038216633f9fdf3c6111f58761014b611b00565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561123457600080fd5b505afa158015611248573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061126c91906118a1565b101561127957600061127c565b60015b60ff168260008151811061129257611292611b26565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6112bb876102cf611b00565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156112fa57600080fd5b505afa15801561130e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061133291906118a1565b101561133f576000611342565b60015b60ff168260018151811061135857611358611b26565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611381876103f5611b00565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156113c057600080fd5b505afa1580156113d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113f891906118a1565b1015611405576000611408565b60015b60ff168260028151811061141e5761141e611b26565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611447876104d5611b00565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561148657600080fd5b505afa15801561149a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114be91906118a1565b10156114cb5760006114ce565b60015b60ff16826003815181106114e4576114e4611b26565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61150d87610851611b00565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561154c57600080fd5b505afa158015611560573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061158491906118a1565b1015611591576000611594565b60015b60ff16826004815181106115aa576115aa611b26565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6115d3876135bd611b00565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561161257600080fd5b505afa158015611626573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061164a91906118a1565b101561165757600061165a565b60015b60ff168260058151811061167057611670611b26565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f83818401126116e657600080fd5b823560206116fb6116f683611adc565b611aab565b80838252828201915082870188848660051b8a0101111561171b57600080fd5b60005b858110156117b357813567ffffffffffffffff8082111561173e57600080fd5b818b0191508b603f83011261175257600080fd5b8682013560408282111561176857611768611b3c565b611779828c01601f19168a01611aab565b92508183528d8183860101111561178f57600080fd5b818185018a850137506000908201880152855250928401929084019060010161171e565b509098975050505050505050565b6000602082840312156117d357600080fd5b813561112781611b52565b6000602082840312156117f057600080fd5b815161112781611b52565b60006020828403121561180d57600080fd5b8151801515811461112757600080fd5b60006060828403121561182f57600080fd5b6040516060810181811067ffffffffffffffff8211171561185257611852611b3c565b604052825161186081611b52565b8152602083015161187081611b52565b60208201526040928301519281019290925250919050565b60006020828403121561189a57600080fd5b5035919050565b6000602082840312156118b357600080fd5b5051919050565b600080604083850312156118cd57600080fd5b50508035926020909101359150565b600080600080608085870312156118f257600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561191957600080fd5b818801915088601f83011261192d57600080fd5b813561193b6116f682611adc565b8082825285820191508585018c878560051b880101111561195b57600080fd5b600095505b8386101561197e578035835260019590950194918601918601611960565b5096505050606088013592508083111561199757600080fd5b50506119a5878288016116d4565b91505092959194509250565b6000806000606084860312156119c657600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b81811015611a15578351835292840192918401916001016119f9565b50909695505050505050565b600060208083528351808285015260005b81811015611a4e57858101830151858201604001528201611a32565b81811115611a60576000604083870101525b50601f01601f1916929092016040019392505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b604051601f8201601f1916810167ffffffffffffffff81118282101715611ad457611ad4611b3c565b604052919050565b600067ffffffffffffffff821115611af657611af6611b3c565b5060051b60200190565b60008219821115611b2157634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610e9257600080fdfea2646970667358221220c81c495fbd23e29be03c08cb6d7f5a8ae909511821ccac5c950f49c8f1fca61864736f6c63430008060033";
