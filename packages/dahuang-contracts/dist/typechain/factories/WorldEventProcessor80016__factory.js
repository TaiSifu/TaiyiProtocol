"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor80016__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor80016__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor80016__factory = WorldEventProcessor80016__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516116ec3803806116ec83398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b6115f5806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063a71d6e3b11610097578063c729329411610066578063c7293294146101ef578063ca5bf9a414610215578063e51e69c11461021e578063f2fde38b1461022557600080fd5b8063a71d6e3b1461010f578063b4ae1235146101a2578063b56e49f0146101b5578063c0f1619c146101d957600080fd5b8063715018a6116100d3578063715018a61461014c5780637c99f6a6146101545780638da5cb5b146101675780639d0c025b1461018257600080fd5b8063127ce1cc146100fa5780632fa838d81461010f5780634849f65614610139575b600080fd5b61010d610108366004611256565b610238565b005b61012361011d366004611256565b50606090565b6040516101309190611438565b60405180910390f35b610123610147366004611256565b610298565b61010d6102a9565b61010d61016236600461137f565b61030f565b6001546040516001600160a01b039091168152602001610130565b610195610190366004611256565b610494565b604051610130919061147c565b61010d6101b03660046112aa565b6105c2565b6101cb6101c3366004611256565b506201389190565b604051908152602001610130565b6101cb6101e7366004611288565b505060025490565b6102056101fd366004611288565b600192915050565b6040519015158152602001610130565b6101cb60025481565b60006101cb565b61010d610233366004611172565b610748565b6102426001610813565b6102935760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60606102a382610aac565b92915050565b6001546001600160a01b031633146103035760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161028a565b61030d6000611000565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561035257600080fd5b505afa158015610366573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061038a919061118f565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016103b791815260200190565b60206040518083038186803b1580156103cf57600080fd5b505afa1580156103e3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040791906111ac565b6104415760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161028a565b61044a81610813565b61048e5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161028a565b50505050565b600080546040516340d9124560e11b815260026004820152606092916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156104db57600080fd5b505afa1580156104ef573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610513919061118f565b6040516361a49e4360e01b8152600481018590529091506000906001600160a01b038316906361a49e439060240160006040518083038186803b15801561055957600080fd5b505afa15801561056d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261059591908101906111ce565b50509050806040516020016105aa91906113ab565b60405160208183030381529060405292505050919050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561060557600080fd5b505afa158015610619573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063d919061118f565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161066a91815260200190565b60206040518083038186803b15801561068257600080fd5b505afa158015610696573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ba91906111ac565b6106f45760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161028a565b6106fd81610813565b6107415760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161028a565b5050505050565b6001546001600160a01b031633146107a25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161028a565b6001600160a01b0381166108075760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161028a565b61081081611000565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561085857600080fd5b505afa15801561086c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610890919061118f565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b1580156108d557600080fd5b505afa1580156108e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090d919061118f565b6001600160a01b031614806109a257506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561095f57600080fd5b505afa158015610973573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610997919061118f565b6001600160a01b0316145b80610aa557506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b1580156109f057600080fd5b505afa158015610a04573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a28919061118f565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610a6d57600080fd5b505afa158015610a81573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa591906111ac565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610b1b57600080fd5b505afa158015610b2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b53919061118f565b90506101f46001600160a01b038216633f9fdf3c610b738761014b61152c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610bb257600080fd5b505afa158015610bc6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bea919061126f565b1015610bf7576000610bfa565b60015b60ff1682600081518110610c1057610c1061157e565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610c39876102cf61152c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610c7857600080fd5b505afa158015610c8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb0919061126f565b1015610cbd576000610cc0565b60015b60ff1682600181518110610cd657610cd661157e565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610cff876103f561152c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d3e57600080fd5b505afa158015610d52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d76919061126f565b1015610d83576000610d86565b60015b60ff1682600281518110610d9c57610d9c61157e565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610dc5876104d561152c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e0457600080fd5b505afa158015610e18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3c919061126f565b1015610e49576000610e4c565b60015b60ff1682600381518110610e6257610e6261157e565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610e8b8761085161152c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610eca57600080fd5b505afa158015610ede573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f02919061126f565b1015610f0f576000610f12565b60015b60ff1682600481518110610f2857610f2861157e565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610f51876135bd61152c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f9057600080fd5b505afa158015610fa4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc8919061126f565b1015610fd5576000610fd8565b60015b60ff1682600581518110610fee57610fee61157e565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600082601f83011261106357600080fd5b81356020611078611073836114e0565b6114af565b80838252828201915082860187848660051b890101111561109857600080fd5b60005b8581101561111857813567ffffffffffffffff8111156110ba57600080fd5b8801603f81018a136110cb57600080fd5b8581013560406110dd61107383611504565b8281528c828486010111156110f157600080fd5b828285018a830137600092810189019290925250855250928401929084019060010161109b565b5090979650505050505050565b600082601f83011261113657600080fd5b815161114461107382611504565b81815284602083860101111561115957600080fd5b61116a826020830160208701611552565b949350505050565b60006020828403121561118457600080fd5b8135610aa5816115aa565b6000602082840312156111a157600080fd5b8151610aa5816115aa565b6000602082840312156111be57600080fd5b81518015158114610aa557600080fd5b6000806000606084860312156111e357600080fd5b835167ffffffffffffffff808211156111fb57600080fd5b61120787838801611125565b9450602086015191508082111561121d57600080fd5b61122987838801611125565b9350604086015191508082111561123f57600080fd5b5061124c86828701611125565b9150509250925092565b60006020828403121561126857600080fd5b5035919050565b60006020828403121561128157600080fd5b5051919050565b6000806040838503121561129b57600080fd5b50508035926020909101359150565b600080600080608085870312156112c057600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156112e757600080fd5b818801915088601f8301126112fb57600080fd5b8135611309611073826114e0565b8082825285820191508585018c878560051b880101111561132957600080fd5b600095505b8386101561134c57803583526001959095019491860191860161132e565b5096505050606088013592508083111561136557600080fd5b505061137387828801611052565b91505092959194509250565b60008060006060848603121561139457600080fd5b505081359360208301359350604090920135919050565b600082516113bd818460208701611552565b7fe8bf98e698afe59b9ee7ad94efbc9ae2809ce68891e4b88de58e9fe8b085e4bd9201918252507fa0e38082e2809de5a5b3e9acbce58fb9e681afe4b880e5a3b0efbc8ce58c96e660208201527f8890e4b880e7bc95e7839fe9a39ee8b5b0e4ba86e380820000000000000000006040820152605701919050565b6020808252825182820181905260009190848201906040850190845b8181101561147057835183529284019291840191600101611454565b50909695505050505050565b602081526000825180602084015261149b816040850160208701611552565b601f01601f19169190910160400192915050565b604051601f8201601f1916810167ffffffffffffffff811182821017156114d8576114d8611594565b604052919050565b600067ffffffffffffffff8211156114fa576114fa611594565b5060051b60200190565b600067ffffffffffffffff82111561151e5761151e611594565b50601f01601f191660200190565b6000821982111561154d57634e487b7160e01b600052601160045260246000fd5b500190565b60005b8381101561156d578181015183820152602001611555565b8381111561048e5750506000910152565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461081057600080fdfea2646970667358221220a3f96f97419ad39bbaf83831cc4f3e62418b57d04f3795c6028aaaa458fd3c4c64736f6c63430008060033";
