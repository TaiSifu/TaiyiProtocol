"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor60515__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor60515__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_taiyiZone, _evt60514Address, _route, overrides) {
        return super.deploy(_taiyiZone, _evt60514Address, _route, overrides || {});
    }
    getDeployTransaction(_taiyiZone, _evt60514Address, _route, overrides) {
        return super.getDeployTransaction(_taiyiZone, _evt60514Address, _route, overrides || {});
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
exports.WorldEventProcessor60515__factory = WorldEventProcessor60515__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_taiyiZone",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_evt60514Address",
                type: "address",
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
                name: "_assetModuleId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_assetAmount",
                type: "uint256",
            },
        ],
        name: "calcDaoliByAssets",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
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
        inputs: [],
        name: "evt60514Address",
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
                name: "_assetModuleId",
                type: "uint256",
            },
        ],
        name: "getPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
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
        name: "isFundInPosition",
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
        inputs: [],
        name: "taiyiZone",
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
const _bytecode = "0x60c060405260006003553480156200001657600080fd5b50604051620027e4380380620027e48339810160408190526200003991620000db565b600080546001600160a01b0319166001600160a01b038316178155819062000068620000623390565b62000089565b600255505060a09190915260601b6001600160601b0319166080526200013c565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600080600060608486031215620000f157600080fd5b835192506020840151620001058162000123565b6040850151909250620001188162000123565b809150509250925092565b6001600160a01b03811681146200013957600080fd5b50565b60805160601c60a051612671620001736000396000818161021601526117180152600081816101510152610fe301526126716000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80638da5cb5b116100ad578063c0f1619c11610071578063c0f1619c1461027f578063c729329414610295578063ca5bf9a4146102b8578063e7572230146102c1578063f2fde38b146102d457600080fd5b80638da5cb5b1461020057806390b3ab0d146102115780639d0c025b14610238578063a71d6e3b14610258578063b4ae12351461026c57600080fd5b80634849f656116100f45780634849f656146101a95780635ecd329c146101c9578063715018a6146101dc578063720b1bbc146101e45780637c99f6a6146101ed57600080fd5b80630a4c9256146101265780630a5d12fa1461014c578063127ce1cc1461018b57806340b8c011146101a0575b600080fd5b610139610134366004612302565b6102e7565b6040519081526020015b60405180910390f35b6101737f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610143565b61019e6101993660046122d0565b610318565b005b61013960045481565b6101bc6101b73660046122d0565b610378565b6040516101439190612425565b61019e6101d73660046122d0565b610383565b61019e610bb1565b61013960035481565b61019e6101fb3660046123f9565b610be7565b6001546001600160a01b0316610173565b6101397f000000000000000000000000000000000000000000000000000000000000000081565b61024b6102463660046122d0565b610d6c565b6040516101439190612469565b6101bc6102663660046122d0565b50606090565b61019e61027a366004612324565b610d8d565b61013961028d366004612302565b505060025490565b6102a86102a3366004612302565b611579565b6040519015158152602001610143565b61013960025481565b6101396102cf3660046122d0565b61175d565b61019e6102e23660046121dc565b611815565b6000670de0b6b3a76400006102fb8461175d565b6103059084612574565b61030f9190612560565b90505b92915050565b61032260016118b0565b6103735760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061031282611b49565b6001546001600160a01b031633146103ad5760405162461bcd60e51b815260040161036a906124be565b600454156104085760405162461bcd60e51b815260206004820152602260248201527f6576656e74206f70657261746f7220616c726561647920696e697469616c697a604482015261195960f21b606482015260840161036a565b60008054906101000a90046001600160a01b03166001600160a01b0316631e8cee666040518163ffffffff1660e01b815260040160206040518083038186803b15801561045457600080fd5b505afa158015610468573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048c91906121f9565b6001600160a01b03166323b872dd336040516001600160e01b031960e084901b1681526001600160a01b03909116600482015230602482015260448101849052606401600060405180830381600087803b1580156104e957600080fd5b505af11580156104fd573d6000803e3d6000fd5b5050506004828155600080546040516340d9124560e11b81529193506001600160a01b0316916381b2248a9161053a9160c8910190815260200190565b60206040518083038186803b15801561055257600080fd5b505afa158015610566573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058a91906121f9565b6001600160a01b031663570ca7356040518163ffffffff1660e01b815260040160206040518083038186803b1580156105c257600080fd5b505afa1580156105d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105fa91906122e9565b6000546040516340d9124560e11b815260d160048201529192506001600160a01b0316906381b2248a9060240160206040518083038186803b15801561063f57600080fd5b505afa158015610653573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067791906121f9565b60048054604051631ea19b7f60e21b815291820152602481018390526c01431e0fae6d7217caa000000060448201526001600160a01b039190911690637a866dfc90606401600060405180830381600087803b1580156106d657600080fd5b505af11580156106ea573d6000803e3d6000fd5b50506000546040516340d9124560e11b815260cf60048201526001600160a01b0390911692506381b2248a915060240160206040518083038186803b15801561073257600080fd5b505afa158015610746573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076a91906121f9565b60048054604051631ea19b7f60e21b815291820152602481018390526c01431e0fae6d7217caa000000060448201526001600160a01b039190911690637a866dfc90606401600060405180830381600087803b1580156107c957600080fd5b505af11580156107dd573d6000803e3d6000fd5b50506000546040516340d9124560e11b815260d060048201526001600160a01b0390911692506381b2248a915060240160206040518083038186803b15801561082557600080fd5b505afa158015610839573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085d91906121f9565b60048054604051631ea19b7f60e21b815291820152602481018390526c01431e0fae6d7217caa000000060448201526001600160a01b039190911690637a866dfc90606401600060405180830381600087803b1580156108bc57600080fd5b505af11580156108d0573d6000803e3d6000fd5b50506000546040516340d9124560e11b815260d260048201526001600160a01b0390911692506381b2248a915060240160206040518083038186803b15801561091857600080fd5b505afa15801561092c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061095091906121f9565b60048054604051631ea19b7f60e21b815291820152602481018390526c01431e0fae6d7217caa000000060448201526001600160a01b039190911690637a866dfc90606401600060405180830381600087803b1580156109af57600080fd5b505af11580156109c3573d6000803e3d6000fd5b50506000546040516340d9124560e11b815260d360048201526001600160a01b0390911692506381b2248a915060240160206040518083038186803b158015610a0b57600080fd5b505afa158015610a1f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a4391906121f9565b60048054604051631ea19b7f60e21b815291820152602481018390526c01431e0fae6d7217caa000000060448201526001600160a01b039190911690637a866dfc90606401600060405180830381600087803b158015610aa257600080fd5b505af1158015610ab6573d6000803e3d6000fd5b50506000546040516340d9124560e11b8152600360048201526001600160a01b0390911692506381b2248a915060240160206040518083038186803b158015610afe57600080fd5b505afa158015610b12573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b3691906121f9565b60048054604051631ea19b7f60e21b815291820152602481018390526c01431e0fae6d7217caa000000060448201526001600160a01b039190911690637a866dfc90606401600060405180830381600087803b158015610b9557600080fd5b505af1158015610ba9573d6000803e3d6000fd5b505050505050565b6001546001600160a01b03163314610bdb5760405162461bcd60e51b815260040161036a906124be565b610be5600061209d565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b158015610c2a57600080fd5b505afa158015610c3e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c6291906121f9565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b8152600401610c8f91815260200190565b60206040518083038186803b158015610ca757600080fd5b505afa158015610cbb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cdf91906122ae565b610d195760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161036a565b610d22816118b0565b610d665760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161036a565b50505050565b60606040518060600160405280602781526020016126156027913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b158015610dd057600080fd5b505afa158015610de4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0891906121f9565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b8152600401610e3591815260200190565b60206040518083038186803b158015610e4d57600080fd5b505afa158015610e61573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e8591906122ae565b610ebf5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161036a565b610ec8816118b0565b610f0c5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161036a565b600060045411610f5e5760405162461bcd60e51b815260206004820152601e60248201527f6576656e74206f70657261746f72206e6f7420696e697469616c697a65640000604482015260640161036a565b60018351118015610f7a575060028351610f789190612593565b155b610fba5760405162461bcd60e51b81526020600482015260116024820152701c185c985b5cc81a5cc81a5b9d985b1a59607a1b604482015260640161036a565b60035461124c5760016003908155600080546040516340d9124560e11b815260048101939093527f0000000000000000000000000000000000000000000000000000000000000000926001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561103057600080fd5b505afa158015611044573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061106891906121f9565b90506000816001600160a01b031663f27b390e846001600160a01b03166340b8c0116040518163ffffffff1660e01b815260040160206040518083038186803b1580156110b457600080fd5b505afa1580156110c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110ec91906122e9565b6040518263ffffffff1660e01b815260040161110a91815260200190565b60206040518083038186803b15801561112257600080fd5b505afa158015611136573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061115a91906122e9565b9050816001600160a01b031663f1a8eb3889856001600160a01b03166340b8c0116040518163ffffffff1660e01b815260040160206040518083038186803b1580156111a557600080fd5b505afa1580156111b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111dd91906122e9565b600454856040518563ffffffff1660e01b8152600401611216949392919093845260208401929092526040830152606082015260800190565b600060405180830381600087803b15801561123057600080fd5b505af1158015611244573d6000803e3d6000fd5b505050505050505b6000806000805b86518110156114795786818151811061126e5761126e6125d3565b6020908102919091010151600080546040516340d9124560e11b81526004810184905292955090916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156112c357600080fd5b505afa1580156112d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112fb91906121f9565b905087611309836001612548565b81518110611319576113196125d3565b6020026020010151925082816001600160a01b031663f27b390e8b6040518263ffffffff1660e01b815260040161135291815260200190565b60206040518083038186803b15801561136a57600080fd5b505afa15801561137e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113a291906122e9565b10156113df5760405162461bcd60e51b815260206004820152600c60248201526b6173736574206973206c6f7760a01b604482015260640161036a565b60048054604051631e351d6760e31b81529182018c9052602482018b90526044820152606481018490526001600160a01b0382169063f1a8eb3890608401600060405180830381600087803b15801561143757600080fd5b505af115801561144b573d6000803e3d6000fd5b5050505061145984846102e7565b6114639086612548565b94506114729050600282612548565b9050611253565b50821561156f576000546040516340d9124560e11b8152600360048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156114c457600080fd5b505afa1580156114d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114fc91906121f9565b60048054604051631e351d6760e31b81529182018b9052602482015260448101899052606481018590526001600160a01b03919091169063f1a8eb3890608401600060405180830381600087803b15801561155657600080fd5b505af115801561156a573d6000803e3d6000fd5b505050505b5050505050505050565b60006004546000141561158e57506000610312565b600080546040516340d9124560e11b8152600960048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156115d357600080fd5b505afa1580156115e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061160b91906121f9565b604051639436383d60e01b8152600481018690529091506001600160a01b03821690639436383d9060240160206040518083038186803b15801561164e57600080fd5b505afa158015611662573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061168691906122ae565b15611695576000915050610312565b604051632b53f9bd60e21b8152600481018590526000906001600160a01b0383169063ad4fe6f49060240160006040518083038186803b1580156116d857600080fd5b505afa1580156116ec573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526117149190810190612216565b90507f00000000000000000000000000000000000000000000000000000000000000008160018151811061174a5761174a6125d3565b6020026020010151149250505092915050565b600060d1821415611777575067016345785d8a0000919050565b60cf82141561178e5750662386f26fc10000919050565b60d08214156117a55750662386f26fc10000919050565b60d28214156117bc575066b1a2bc2ec50000919050565b60d38214156117d4575067011c37937e080000919050565b60405162461bcd60e51b81526020600482015260166024820152751b9bdd081cdd5c1c1bdc9d195908185cdcd95d081a5960521b604482015260640161036a565b6001546001600160a01b0316331461183f5760405162461bcd60e51b815260040161036a906124be565b6001600160a01b0381166118a45760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161036a565b6118ad8161209d565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b1580156118f557600080fd5b505afa158015611909573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061192d91906121f9565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b15801561197257600080fd5b505afa158015611986573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119aa91906121f9565b6001600160a01b03161480611a3f57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b1580156119fc57600080fd5b505afa158015611a10573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a3491906121f9565b6001600160a01b0316145b80611b4257506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015611a8d57600080fd5b505afa158015611aa1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ac591906121f9565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015611b0a57600080fd5b505afa158015611b1e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b4291906122ae565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015611bb857600080fd5b505afa158015611bcc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bf091906121f9565b90506101f46001600160a01b038216633f9fdf3c611c108761014b612548565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015611c4f57600080fd5b505afa158015611c63573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c8791906122e9565b1015611c94576000611c97565b60015b60ff1682600081518110611cad57611cad6125d3565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611cd6876102cf612548565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015611d1557600080fd5b505afa158015611d29573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d4d91906122e9565b1015611d5a576000611d5d565b60015b60ff1682600181518110611d7357611d736125d3565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611d9c876103f5612548565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015611ddb57600080fd5b505afa158015611def573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e1391906122e9565b1015611e20576000611e23565b60015b60ff1682600281518110611e3957611e396125d3565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611e62876104d5612548565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015611ea157600080fd5b505afa158015611eb5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ed991906122e9565b1015611ee6576000611ee9565b60015b60ff1682600381518110611eff57611eff6125d3565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611f2887610851612548565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015611f6757600080fd5b505afa158015611f7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f9f91906122e9565b1015611fac576000611faf565b60015b60ff1682600481518110611fc557611fc56125d3565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611fee876135bd612548565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561202d57600080fd5b505afa158015612041573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061206591906122e9565b1015612072576000612075565b60015b60ff168260058151811061208b5761208b6125d3565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261210157600080fd5b8235602061211661211183612524565b6124f3565b80838252828201915082870188848660051b8a0101111561213657600080fd5b60005b858110156121ce57813567ffffffffffffffff8082111561215957600080fd5b818b0191508b603f83011261216d57600080fd5b86820135604082821115612183576121836125e9565b612194828c01601f19168a016124f3565b92508183528d818386010111156121aa57600080fd5b818185018a8501375060009082018801528552509284019290840190600101612139565b509098975050505050505050565b6000602082840312156121ee57600080fd5b8135611b42816125ff565b60006020828403121561220b57600080fd5b8151611b42816125ff565b6000602080838503121561222957600080fd5b825167ffffffffffffffff81111561224057600080fd5b8301601f8101851361225157600080fd5b805161225f61211182612524565b80828252848201915084840188868560051b870101111561227f57600080fd5b600094505b838510156122a2578051835260019490940193918501918501612284565b50979650505050505050565b6000602082840312156122c057600080fd5b81518015158114611b4257600080fd5b6000602082840312156122e257600080fd5b5035919050565b6000602082840312156122fb57600080fd5b5051919050565b6000806040838503121561231557600080fd5b50508035926020909101359150565b6000806000806080858703121561233a57600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561236157600080fd5b818801915088601f83011261237557600080fd5b813561238361211182612524565b8082825285820191508585018c878560051b88010111156123a357600080fd5b600095505b838610156123c65780358352600195909501949186019186016123a8565b509650505060608801359250808311156123df57600080fd5b50506123ed878288016120ef565b91505092959194509250565b60008060006060848603121561240e57600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b8181101561245d57835183529284019291840191600101612441565b50909695505050505050565b600060208083528351808285015260005b818110156124965785810183015185820160400152820161247a565b818111156124a8576000604083870101525b50601f01601f1916929092016040019392505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b604051601f8201601f1916810167ffffffffffffffff8111828210171561251c5761251c6125e9565b604052919050565b600067ffffffffffffffff82111561253e5761253e6125e9565b5060051b60200190565b6000821982111561255b5761255b6125a7565b500190565b60008261256f5761256f6125bd565b500490565b600081600019048311821515161561258e5761258e6125a7565b500290565b6000826125a2576125a26125bd565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146118ad57600080fdfee4bda0e59ca8e5a4aae4b999e69d91e58591e68da2e4ba86e4b880e4ba9be8b584e6ba90e38082a2646970667358221220859625d47bc6c92374eda0628422b235c29ec892d7f1d70913c6719a30608c3364736f6c63430008060033";