"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1000022__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1000022__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1000022__factory = WorldEventProcessor1000022__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161184b38038061184b83398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b611754806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610160578063c0f1619c14610173578063c729329414610194578063ca5bf9a4146101b7578063f2fde38b146101c057600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004611426565b6101d3565b005b6100e16100dc366004611426565b610233565b6040516100ee919061157b565b60405180910390f35b6100cc610244565b6100cc61010d36600461154f565b6102aa565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b366004611426565b61042f565b6040516100ee91906115bf565b6100e161015b366004611426565b610450565b6100cc61016e36600461147a565b6104bd565b610186610181366004611458565b610643565b6040519081526020016100ee565b6101a76101a2366004611458565b610783565b60405190151581526020016100ee565b61018660025481565b6100cc6101ce3660046113ca565b6109d3565b6101dd6001610a9e565b61022e5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061023e82610d37565b92915050565b6001546001600160a01b0316331461029e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610225565b6102a8600061128b565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102ed57600080fd5b505afa158015610301573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032591906113e7565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035291815260200190565b60206040518083038186803b15801561036a57600080fd5b505afa15801561037e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a29190611404565b6103dc5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610225565b6103e581610a9e565b6104295760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610225565b50505050565b60606040518060800160405280604e81526020016116d1604e913992915050565b604080516002808252606080830184529260009291906020830190803683370190505090506103e88160008151811061048b5761048b61168f565b6020026020010181815250506001816001815181106104ac576104ac61168f565b602090810291909101015292915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561050057600080fd5b505afa158015610514573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053891906113e7565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161056591815260200190565b60206040518083038186803b15801561057d57600080fd5b505afa158015610591573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b59190611404565b6105ef5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610225565b6105f881610a9e565b61063c5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610225565b5050505050565b600080546040516340d9124560e11b81526103e9600482015282916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561068957600080fd5b505afa15801561069d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106c191906113e7565b60405163b7876f5760e01b815260048101869052620f425260248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561071057600080fd5b505afa158015610724573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610748919061143f565b9050806003141561076057620f90719250505061023e565b806002141561077657620f90709250505061023e565b50620f906f949350505050565b600080546040516340d9124560e11b81526103e9600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156107ce57600080fd5b505afa1580156107e2573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080691906113e7565b60405163b7876f5760e01b815260048101879052620f425060248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561085557600080fd5b505afa158015610869573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061088d919061143f565b111561089e5760009250505061023e565b60405163b7876f5760e01b815260048101869052620f425660248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b1580156108ea57600080fd5b505afa1580156108fe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610922919061143f565b11156109335760009250505061023e565b60405163b7876f5760e01b815260048101869052620f425260248201526000925082906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561098257600080fd5b505afa158015610996573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ba919061143f565b11156109cb5760019250505061023e565b509392505050565b6001546001600160a01b03163314610a2d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610225565b6001600160a01b038116610a925760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610225565b610a9b8161128b565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610ae357600080fd5b505afa158015610af7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1b91906113e7565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610b6057600080fd5b505afa158015610b74573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9891906113e7565b6001600160a01b03161480610c2d57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610bea57600080fd5b505afa158015610bfe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c2291906113e7565b6001600160a01b0316145b80610d3057506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610c7b57600080fd5b505afa158015610c8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb391906113e7565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610cf857600080fd5b505afa158015610d0c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d309190611404565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610da657600080fd5b505afa158015610dba573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dde91906113e7565b90506101f46001600160a01b038216633f9fdf3c610dfe8761014b611669565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e3d57600080fd5b505afa158015610e51573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e75919061143f565b1015610e82576000610e85565b60015b60ff1682600081518110610e9b57610e9b61168f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610ec4876102cf611669565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f0357600080fd5b505afa158015610f17573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f3b919061143f565b1015610f48576000610f4b565b60015b60ff1682600181518110610f6157610f6161168f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610f8a876103f5611669565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610fc957600080fd5b505afa158015610fdd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611001919061143f565b101561100e576000611011565b60015b60ff16826002815181106110275761102761168f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611050876104d5611669565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561108f57600080fd5b505afa1580156110a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110c7919061143f565b10156110d45760006110d7565b60015b60ff16826003815181106110ed576110ed61168f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61111687610851611669565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561115557600080fd5b505afa158015611169573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061118d919061143f565b101561119a57600061119d565b60015b60ff16826004815181106111b3576111b361168f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6111dc876135bd611669565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561121b57600080fd5b505afa15801561122f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611253919061143f565b1015611260576000611263565b60015b60ff16826005815181106112795761127961168f565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f83818401126112ef57600080fd5b823560206113046112ff83611645565b611614565b80838252828201915082870188848660051b8a0101111561132457600080fd5b60005b858110156113bc57813567ffffffffffffffff8082111561134757600080fd5b818b0191508b603f83011261135b57600080fd5b86820135604082821115611371576113716116a5565b611382828c01601f19168a01611614565b92508183528d8183860101111561139857600080fd5b818185018a8501375060009082018801528552509284019290840190600101611327565b509098975050505050505050565b6000602082840312156113dc57600080fd5b8135610d30816116bb565b6000602082840312156113f957600080fd5b8151610d30816116bb565b60006020828403121561141657600080fd5b81518015158114610d3057600080fd5b60006020828403121561143857600080fd5b5035919050565b60006020828403121561145157600080fd5b5051919050565b6000806040838503121561146b57600080fd5b50508035926020909101359150565b6000806000806080858703121561149057600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156114b757600080fd5b818801915088601f8301126114cb57600080fd5b81356114d96112ff82611645565b8082825285820191508585018c878560051b88010111156114f957600080fd5b600095505b8386101561151c5780358352600195909501949186019186016114fe565b5096505050606088013592508083111561153557600080fd5b5050611543878288016112dd565b91505092959194509250565b60008060006060848603121561156457600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156115b357835183529284019291840191600101611597565b50909695505050505050565b600060208083528351808285015260005b818110156115ec578581018301518582016040015282016115d0565b818111156115fe576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff8111828210171561163d5761163d6116a5565b604052919050565b600067ffffffffffffffff82111561165f5761165f6116a5565b5060051b60200190565b6000821982111561168a57634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610a9b57600080fdfee591a8e59bb4e6b8a9e5baa6e7bba7e7bbade9998de4bd8eefbc8ce4bda0e5928ce8b4a8e5ad90e79a84e8bf99e7a78de585b3e7b3bbe7ab9fe784b6e7a8b3e5ae9ae4ba86e4b88be69da5e38082a2646970667358221220fef2f235150ecead4faeb7e2be22b6a6ddfce0665ad9cfb54fbe4c0dc71e1cb164736f6c63430008060033";