"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetDaoli__factory = void 0;
const ethers_1 = require("ethers");
class AssetDaoli__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_name, _symbol, _moduleID, _route, overrides) {
        return super.deploy(_name, _symbol, _moduleID, _route, overrides || {});
    }
    getDeployTransaction(_name, _symbol, _moduleID, _route, overrides) {
        return super.getDeployTransaction(_name, _symbol, _moduleID, _route, overrides || {});
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
exports.AssetDaoli__factory = AssetDaoli__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "_name",
                type: "string",
            },
            {
                internalType: "string",
                name: "_symbol",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_moduleID",
                type: "uint256",
            },
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
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "from",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "to",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "FungibleApproval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "from",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "to",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "FungibleTransfer",
        type: "event",
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
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
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
                name: "_owner",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_spender",
                type: "uint256",
            },
        ],
        name: "allowanceActor",
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
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_from",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_spender",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "approveActor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
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
                name: "_owner",
                type: "uint256",
            },
        ],
        name: "balanceOfActor",
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
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "moduleID",
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
        inputs: [],
        name: "name",
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
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "tokenJSON",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
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
        name: "tokenSVG",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "endY",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
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
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_from",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_to",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "transferActor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_executor",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_from",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_to",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "transferFromActor",
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
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b506040516200278438038062002784833981016040819052620000349162000253565b838383838084846200004633620000a6565b81516200005b906004906020850190620000f6565b50805162000071906005906020840190620000f6565b5050600680546001600160a01b0319166001600160a01b0393909316929092179091555050600755506200033b945050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b8280546200010490620002e8565b90600052602060002090601f01602090048101928262000128576000855562000173565b82601f106200014357805160ff191683800117855562000173565b8280016001018555821562000173579182015b828111156200017357825182559160200191906001019062000156565b506200018192915062000185565b5090565b5b8082111562000181576000815560010162000186565b600082601f830112620001ae57600080fd5b81516001600160401b0380821115620001cb57620001cb62000325565b604051601f8301601f19908116603f01168101908282118183101715620001f657620001f662000325565b816040528381526020925086838588010111156200021357600080fd5b600091505b8382101562000237578582018301518183018401529082019062000218565b83821115620002495760008385830101525b9695505050505050565b600080600080608085870312156200026a57600080fd5b84516001600160401b03808211156200028257600080fd5b62000290888389016200019c565b95506020870151915080821115620002a757600080fd5b50620002b6878288016200019c565b60408701516060880151919550935090506001600160a01b0381168114620002dd57600080fd5b939692955090935050565b600181811c90821680620002fd57607f821691505b602082108114156200031f57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b612439806200034b6000396000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c80638da5cb5b116100c3578063a9059cbb1161007c578063a9059cbb14610302578063dd62ed3e14610315578063efa9a9be1461034e578063f1a8eb3814610361578063f27b390e14610374578063f2fde38b1461038757600080fd5b80638da5cb5b1461025a5780638e47eac9146102755780638f7bb179146102a957806395d89b41146102d4578063a41fe49f146102dc578063a457c2d7146102ef57600080fd5b8063662373f711610115578063662373f7146101e557806370a08231146101fa578063715018a6146102235780637a866dfc1461022b5780637a96eb8c1461023e5780637c3da21e1461025157600080fd5b806306fdde031461015d578063095ea7b31461017b57806318160ddd1461019e57806323b872dd146101b0578063313ce567146101c357806339509351146101d2575b600080fd5b61016561039a565b60405161017291906122e2565b60405180910390f35b61018e610189366004612135565b61042c565b6040519015158152602001610172565b6003545b604051908152602001610172565b61018e6101be3660046120f4565b610442565b60405160128152602001610172565b61018e6101e0366004612135565b6104f1565b6101f86101f3366004612237565b61052d565b005b6101a2610208366004612081565b6001600160a01b031660009081526001602052604090205490565b6101f861079a565b6101f8610239366004612237565b610800565b6101a261024c366004612215565b610a6f565b6101a260075481565b6000546040516001600160a01b039091168152602001610172565b61029b610283366004612237565b60408051602081019091526000808252935093915050565b6040516101729291906122f5565b6101656102b73660046121fc565b506040805180820190915260028152617b7d60f01b602082015290565b610165610cb4565b6101f86102ea366004612237565b610cc3565b61018e6102fd366004612135565b6110b1565b61018e610310366004612135565b61114a565b6101a26103233660046120bb565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b6101f861035c366004612237565b611157565b6101f861036f366004612263565b611367565b6101a26103823660046121fc565b6117d1565b6101f8610395366004612081565b6118fe565b6060600480546103a99061237d565b80601f01602080910402602001604051908101604052809291908181526020018280546103d59061237d565b80156104225780601f106103f757610100808354040283529160200191610422565b820191906000526020600020905b81548152906001019060200180831161040557829003601f168201915b5050505050905090565b60006104393384846119c9565b50600192915050565b600061044f848484611ae5565b6001600160a01b0384166000908152600260209081526040808320338452909152902054828110156104d95760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b6104e685338584036119c9565b506001949350505050565b3360008181526002602090815260408083206001600160a01b0387168452909152812054909161043991859061052890869061234e565b6119c9565b8261053781611cb4565b6105535760405162461bcd60e51b81526004016104d090612317565b6006546040805163331fc30960e21b815290516000926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561059857600080fd5b505afa1580156105ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d0919061209e565b6001600160a01b031663b35958a0866040518263ffffffff1660e01b81526004016105fd91815260200190565b60606040518083038186803b15801561061557600080fd5b505afa158015610629573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061064d9190612183565b6020015190506000600660009054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b1580156106a357600080fd5b505afa1580156106b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106db919061209e565b6001600160a01b031663b35958a0866040518263ffffffff1660e01b815260040161070891815260200190565b60606040518083038186803b15801561072057600080fd5b505afa158015610734573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107589190612183565b602001519050610769828286611ae5565b84866000805160206123e48339815191528660405161078a91815260200190565b60405180910390a3505050505050565b6000546001600160a01b031633146107f45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104d0565b6107fe6000611f52565b565b8261080a81611cb4565b6108265760405162461bcd60e51b81526004016104d090612317565b6006546040805163331fc30960e21b815290516000926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561086b57600080fd5b505afa15801561087f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a3919061209e565b6001600160a01b031663b35958a0866040518263ffffffff1660e01b81526004016108d091815260200190565b60606040518083038186803b1580156108e857600080fd5b505afa1580156108fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109209190612183565b6020015190506000600660009054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b15801561097657600080fd5b505afa15801561098a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ae919061209e565b6001600160a01b031663b35958a0866040518263ffffffff1660e01b81526004016109db91815260200190565b60606040518083038186803b1580156109f357600080fd5b505afa158015610a07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2b9190612183565b602001519050610a3c8282866119c9565b84867f827c47d554f6b52daf878153a4951335baf7234bb2533e4ed93bf50df6a0ba4d8660405161078a91815260200190565b6000610cad600660009054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b158015610ac257600080fd5b505afa158015610ad6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610afa919061209e565b6001600160a01b031663b35958a0856040518263ffffffff1660e01b8152600401610b2791815260200190565b60606040518083038186803b158015610b3f57600080fd5b505afa158015610b53573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b779190612183565b60200151600660009054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b158015610bc957600080fd5b505afa158015610bdd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c01919061209e565b6001600160a01b031663b35958a0856040518263ffffffff1660e01b8152600401610c2e91815260200190565b60606040518083038186803b158015610c4657600080fd5b505afa158015610c5a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c7e9190612183565b602001516001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b9392505050565b6060600580546103a99061237d565b6006546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b158015610d0657600080fd5b505afa158015610d1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d3e919061209e565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b8152600401610d6b91815260200190565b60206040518083038186803b158015610d8357600080fd5b505afa158015610d97573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dbb9190612161565b610df55760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b60448201526064016104d0565b610dfe81611cb4565b610e425760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b60448201526064016104d0565b82610e4c81611cb4565b610e685760405162461bcd60e51b81526004016104d090612317565b6006546040805163331fc30960e21b815290516000926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610ead57600080fd5b505afa158015610ec1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ee5919061209e565b6001600160a01b031663b35958a0866040518263ffffffff1660e01b8152600401610f1291815260200190565b60606040518083038186803b158015610f2a57600080fd5b505afa158015610f3e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f629190612183565b6000015190506000600660009054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b158015610fb857600080fd5b505afa158015610fcc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ff0919061209e565b6001600160a01b031663b35958a0876040518263ffffffff1660e01b815260040161101d91815260200190565b60606040518083038186803b15801561103557600080fd5b505afa158015611049573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061106d9190612183565b60200151905061107e818387611ae5565b6000866000805160206123e4833981519152876040516110a091815260200190565b60405180910390a350505050505050565b3360009081526002602090815260408083206001600160a01b0386168452909152812054828110156111335760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016104d0565b61114033858584036119c9565b5060019392505050565b6000610439338484611ae5565b6111616001611cb4565b61119a5760405162461bcd60e51b815260206004820152600a6024820152696f6e6c792050616e477560b01b60448201526064016104d0565b600183146111e35760405162461bcd60e51b81526020600482015260166024820152756f70657261746f72206d7573742062652050616e477560501b60448201526064016104d0565b600081116112335760405162461bcd60e51b815260206004820152601760248201527f616d6f756e74206d757374206e6f74206265207a65726f00000000000000000060448201526064016104d0565b6006546040805163331fc30960e21b81529051611338926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561127957600080fd5b505afa15801561128d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112b1919061209e565b6001600160a01b031663b35958a0846040518263ffffffff1660e01b81526004016112de91815260200190565b60606040518083038186803b1580156112f657600080fd5b505afa15801561130a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061132e9190612183565b6020015182611fa2565b8160006000805160206123e48339815191528360405161135a91815260200190565b60405180910390a3505050565b8361137181611cb4565b61138d5760405162461bcd60e51b81526004016104d090612317565b6006546040805163331fc30960e21b815290516000926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b1580156113d257600080fd5b505afa1580156113e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061140a919061209e565b6001600160a01b031663b35958a0866040518263ffffffff1660e01b815260040161143791815260200190565b60606040518083038186803b15801561144f57600080fd5b505afa158015611463573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114879190612183565b6020015190506000600660009054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b1580156114dd57600080fd5b505afa1580156114f1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611515919061209e565b6001600160a01b031663b35958a0866040518263ffffffff1660e01b815260040161154291815260200190565b60606040518083038186803b15801561155a57600080fd5b505afa15801561156e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115929190612183565b6020015190506000600660009054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b1580156115e857600080fd5b505afa1580156115fc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611620919061209e565b6001600160a01b031663b35958a0896040518263ffffffff1660e01b815260040161164d91815260200190565b60606040518083038186803b15801561166557600080fd5b505afa158015611679573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061169d9190612183565b6020015190506116ae838387611ae5565b85876000805160206123e4833981519152876040516116cf91815260200190565b60405180910390a36001600160a01b03808416600081815260026020908152604080832094861680845294909152902054911480159061171157506000198114155b156117c657858110156117705760405162461bcd60e51b815260206004820152602160248201527f7472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636044820152606560f81b60648201526084016104d0565b600061177c8783612366565b90506117898584836119c9565b89897f827c47d554f6b52daf878153a4951335baf7234bb2533e4ed93bf50df6a0ba4d836040516117bc91815260200190565b60405180910390a3505b505050505050505050565b60006118f8600660009054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b15801561182457600080fd5b505afa158015611838573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061185c919061209e565b6001600160a01b031663b35958a0846040518263ffffffff1660e01b815260040161188991815260200190565b60606040518083038186803b1580156118a157600080fd5b505afa1580156118b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118d99190612183565b602001516001600160a01b031660009081526001602052604090205490565b92915050565b6000546001600160a01b031633146119585760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104d0565b6001600160a01b0381166119bd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104d0565b6119c681611f52565b50565b6001600160a01b038316611a2b5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104d0565b6001600160a01b038216611a8c5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104d0565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910161135a565b6001600160a01b038316611b495760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104d0565b6001600160a01b038216611bab5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104d0565b6001600160a01b03831660009081526001602052604090205481811015611c235760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104d0565b6001600160a01b03808516600090815260016020526040808220858503905591851681529081208054849290611c5a90849061234e565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051611ca691815260200190565b60405180910390a350505050565b600080600660009054906101000a90046001600160a01b03166001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b158015611d0557600080fd5b505afa158015611d19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d3d919061209e565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015611d8257600080fd5b505afa158015611d96573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611dba919061209e565b6001600160a01b03161480611e4f57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015611e0c57600080fd5b505afa158015611e20573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e44919061209e565b6001600160a01b0316145b80610cad57506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015611e9d57600080fd5b505afa158015611eb1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ed5919061209e565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015611f1a57600080fd5b505afa158015611f2e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cad9190612161565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b038216611ff85760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104d0565b806003600082825461200a919061234e565b90915550506001600160a01b0382166000908152600160205260408120805483929061203790849061234e565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b60006020828403121561209357600080fd5b8135610cad816123ce565b6000602082840312156120b057600080fd5b8151610cad816123ce565b600080604083850312156120ce57600080fd5b82356120d9816123ce565b915060208301356120e9816123ce565b809150509250929050565b60008060006060848603121561210957600080fd5b8335612114816123ce565b92506020840135612124816123ce565b929592945050506040919091013590565b6000806040838503121561214857600080fd5b8235612153816123ce565b946020939093013593505050565b60006020828403121561217357600080fd5b81518015158114610cad57600080fd5b60006060828403121561219557600080fd5b6040516060810181811067ffffffffffffffff821117156121c657634e487b7160e01b600052604160045260246000fd5b60405282516121d4816123ce565b815260208301516121e4816123ce565b60208201526040928301519281019290925250919050565b60006020828403121561220e57600080fd5b5035919050565b6000806040838503121561222857600080fd5b50508035926020909101359150565b60008060006060848603121561224c57600080fd5b505081359360208301359350604090920135919050565b6000806000806080858703121561227957600080fd5b5050823594602084013594506040840135936060013592509050565b6000815180845260005b818110156122bb5760208185018101518683018201520161229f565b818111156122cd576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610cad6020830184612295565b6040815260006123086040830185612295565b90508260208301529392505050565b6020808252601e908201527f6e6f7420617070726f766564206f72206f776e6572206f66206163746f720000604082015260600190565b60008219821115612361576123616123b8565b500190565b600082821015612378576123786123b8565b500390565b600181811c9082168061239157607f821691505b602082108114156123b257634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b03811681146119c657600080fdfec8a30a8f328ce7f8da6efb65258baeb0dd51fcac95f72bbb0ffb56e3b7df66d9a2646970667358221220440e577539355ccea95ab44123a2b99e14ce40579f7943a0861ec18f0413d6af64736f6c63430008060033";