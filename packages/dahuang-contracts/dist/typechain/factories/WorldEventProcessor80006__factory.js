"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor80006__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor80006__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor80006__factory = WorldEventProcessor80006__factory;
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
        name: "eventAttributeModifiersToTrigger",
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
                name: "_actor",
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
        name: "needActor",
        outputs: [
            {
                internalType: "int256",
                name: "",
                type: "int256",
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
        name: "nextStoryEventId",
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161173638038061173683398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b61163f806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063a71d6e3b11610097578063c729329411610066578063c7293294146101ef578063ca5bf9a414610215578063e51e69c11461021e578063f2fde38b1461022557600080fd5b8063a71d6e3b1461010f578063b4ae1235146101a2578063b56e49f0146101b5578063c0f1619c146101d957600080fd5b8063715018a6116100d3578063715018a61461014c5780637c99f6a6146101545780638da5cb5b146101675780639d0c025b1461018257600080fd5b8063127ce1cc146100fa5780632fa838d81461010f5780634849f65614610139575b600080fd5b61010d610108366004611256565b610238565b005b61012361011d366004611256565b50606090565b6040516101309190611482565b60405180910390f35b610123610147366004611256565b610298565b61010d6102a9565b61010d61016236600461137f565b61030f565b6001546040516001600160a01b039091168152602001610130565b610195610190366004611256565b610494565b60405161013091906114c6565b61010d6101b03660046112aa565b6105c2565b6101cb6101c3366004611256565b506201388790565b604051908152602001610130565b6101cb6101e7366004611288565b505060025490565b6102056101fd366004611288565b600192915050565b6040519015158152602001610130565b6101cb60025481565b60006101cb565b61010d610233366004611172565b610748565b6102426001610813565b6102935760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60606102a382610aac565b92915050565b6001546001600160a01b031633146103035760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161028a565b61030d6000611000565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561035257600080fd5b505afa158015610366573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061038a919061118f565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016103b791815260200190565b60206040518083038186803b1580156103cf57600080fd5b505afa1580156103e3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040791906111ac565b6104415760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161028a565b61044a81610813565b61048e5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161028a565b50505050565b600080546040516340d9124560e11b815260026004820152606092916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156104db57600080fd5b505afa1580156104ef573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610513919061118f565b6040516361a49e4360e01b8152600481018590529091506000906001600160a01b038316906361a49e439060240160006040518083038186803b15801561055957600080fd5b505afa15801561056d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261059591908101906111ce565b50509050806040516020016105aa91906113ab565b60405160208183030381529060405292505050919050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561060557600080fd5b505afa158015610619573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063d919061118f565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161066a91815260200190565b60206040518083038186803b15801561068257600080fd5b505afa158015610696573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ba91906111ac565b6106f45760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161028a565b6106fd81610813565b6107415760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161028a565b5050505050565b6001546001600160a01b031633146107a25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161028a565b6001600160a01b0381166108075760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161028a565b61081081611000565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561085857600080fd5b505afa15801561086c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610890919061118f565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b1580156108d557600080fd5b505afa1580156108e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090d919061118f565b6001600160a01b031614806109a257506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561095f57600080fd5b505afa158015610973573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610997919061118f565b6001600160a01b0316145b80610aa557506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b1580156109f057600080fd5b505afa158015610a04573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a28919061118f565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610a6d57600080fd5b505afa158015610a81573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa591906111ac565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610b1b57600080fd5b505afa158015610b2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b53919061118f565b90506101f46001600160a01b038216633f9fdf3c610b738761014b611576565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610bb257600080fd5b505afa158015610bc6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bea919061126f565b1015610bf7576000610bfa565b60015b60ff1682600081518110610c1057610c106115c8565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610c39876102cf611576565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610c7857600080fd5b505afa158015610c8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb0919061126f565b1015610cbd576000610cc0565b60015b60ff1682600181518110610cd657610cd66115c8565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610cff876103f5611576565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d3e57600080fd5b505afa158015610d52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d76919061126f565b1015610d83576000610d86565b60015b60ff1682600281518110610d9c57610d9c6115c8565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610dc5876104d5611576565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e0457600080fd5b505afa158015610e18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3c919061126f565b1015610e49576000610e4c565b60015b60ff1682600381518110610e6257610e626115c8565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610e8b87610851611576565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610eca57600080fd5b505afa158015610ede573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f02919061126f565b1015610f0f576000610f12565b60015b60ff1682600481518110610f2857610f286115c8565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610f51876135bd611576565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f9057600080fd5b505afa158015610fa4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc8919061126f565b1015610fd5576000610fd8565b60015b60ff1682600581518110610fee57610fee6115c8565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600082601f83011261106357600080fd5b813560206110786110738361152a565b6114f9565b80838252828201915082860187848660051b890101111561109857600080fd5b60005b8581101561111857813567ffffffffffffffff8111156110ba57600080fd5b8801603f81018a136110cb57600080fd5b8581013560406110dd6110738361154e565b8281528c828486010111156110f157600080fd5b828285018a830137600092810189019290925250855250928401929084019060010161109b565b5090979650505050505050565b600082601f83011261113657600080fd5b81516111446110738261154e565b81815284602083860101111561115957600080fd5b61116a82602083016020870161159c565b949350505050565b60006020828403121561118457600080fd5b8135610aa5816115f4565b6000602082840312156111a157600080fd5b8151610aa5816115f4565b6000602082840312156111be57600080fd5b81518015158114610aa557600080fd5b6000806000606084860312156111e357600080fd5b835167ffffffffffffffff808211156111fb57600080fd5b61120787838801611125565b9450602086015191508082111561121d57600080fd5b61122987838801611125565b9350604086015191508082111561123f57600080fd5b5061124c86828701611125565b9150509250925092565b60006020828403121561126857600080fd5b5035919050565b60006020828403121561128157600080fd5b5051919050565b6000806040838503121561129b57600080fd5b50508035926020909101359150565b600080600080608085870312156112c057600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156112e757600080fd5b818801915088601f8301126112fb57600080fd5b81356113096110738261152a565b8082825285820191508585018c878560051b880101111561132957600080fd5b600095505b8386101561134c57803583526001959095019491860191860161132e565b5096505050606088013592508083111561136557600080fd5b505061137387828801611052565b91505092959194509250565b60008060006060848603121561139457600080fd5b505081359360208301359350604090920135919050565b7fe5a5b3e5ad90e8afb4efbc9ae2809ce4bda0e5b086e7be8ee98592e98081e68881527f91efbc8ce68891e8afa5e7bb99e4bda0e4bb80e4b988e4bd9ce4b8bae7ad94e860208201526ab0a2e591a2efbc9fe2809d60a81b60408201526000825161141d81604b85016020870161159c565b7fe59b9ee7ad94efbc9ae2809ce4b880e59d9be98592e4b88de8bf87e58d81e4ba604b9390910192830152507f94e585ade992b1efbc8ce7ad94e8b0a2e5b0b1e4b88de5bf85e4ba86e38082e2606b82015261809d60f01b608b820152608d01919050565b6020808252825182820181905260009190848201906040850190845b818110156114ba5783518352928401929184019160010161149e565b50909695505050505050565b60208152600082518060208401526114e581604085016020870161159c565b601f01601f19169190910160400192915050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611522576115226115de565b604052919050565b600067ffffffffffffffff821115611544576115446115de565b5060051b60200190565b600067ffffffffffffffff821115611568576115686115de565b50601f01601f191660200190565b6000821982111561159757634e487b7160e01b600052601160045260246000fd5b500190565b60005b838110156115b757818101518382015260200161159f565b8381111561048e5750506000910152565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461081057600080fdfea2646970667358221220c5406fa5a424b0db4ae38b30cb7fba24e8f921c802b666bc9578e148074164a064736f6c63430008060033";
