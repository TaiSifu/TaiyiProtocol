"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor70002__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor70002__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor70002__factory = WorldEventProcessor70002__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161179d38038061179d83398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b6116a6806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063a71d6e3b1161008c578063c0f1619c11610066578063c0f1619c146101ce578063c7293294146101e4578063ca5bf9a41461020a578063f2fde38b1461021357600080fd5b8063a71d6e3b14610104578063b4ae123514610197578063b56e49f0146101aa57600080fd5b8063715018a6116100c8578063715018a6146101415780637c99f6a6146101495780638da5cb5b1461015c5780639d0c025b1461017757600080fd5b8063127ce1cc146100ef5780632fa838d8146101045780634849f6561461012e575b600080fd5b6101026100fd366004611244565b610226565b005b610118610112366004611244565b50606090565b60405161012591906114e9565b60405180910390f35b61011861013c366004611244565b610286565b610102610297565b61010261015736600461136d565b6102fd565b6001546040516001600160a01b039091168152602001610125565b61018a610185366004611244565b610482565b604051610125919061152d565b6101026101a5366004611298565b6105b0565b6101c06101b8366004611244565b506201117390565b604051908152602001610125565b6101c06101dc366004611276565b505060025490565b6101fa6101f2366004611276565b600192915050565b6040519015158152602001610125565b6101c060025481565b610102610221366004611160565b610736565b6102306001610801565b6102815760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061029182610a9a565b92915050565b6001546001600160a01b031633146102f15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610278565b6102fb6000610fee565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561034057600080fd5b505afa158015610354573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610378919061117d565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016103a591815260200190565b60206040518083038186803b1580156103bd57600080fd5b505afa1580156103d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f5919061119a565b61042f5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610278565b61043881610801565b61047c5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610278565b50505050565b600080546040516340d9124560e11b815260026004820152606092916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156104c957600080fd5b505afa1580156104dd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610501919061117d565b6040516361a49e4360e01b8152600481018590529091506000906001600160a01b038316906361a49e439060240160006040518083038186803b15801561054757600080fd5b505afa15801561055b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261058391908101906111bc565b50509050806040516020016105989190611399565b60405160208183030381529060405292505050919050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156105f357600080fd5b505afa158015610607573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062b919061117d565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161065891815260200190565b60206040518083038186803b15801561067057600080fd5b505afa158015610684573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a8919061119a565b6106e25760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610278565b6106eb81610801565b61072f5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610278565b5050505050565b6001546001600160a01b031633146107905760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610278565b6001600160a01b0381166107f55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610278565b6107fe81610fee565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561084657600080fd5b505afa15801561085a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087e919061117d565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b1580156108c357600080fd5b505afa1580156108d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108fb919061117d565b6001600160a01b0316148061099057506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561094d57600080fd5b505afa158015610961573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610985919061117d565b6001600160a01b0316145b80610a9357506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b1580156109de57600080fd5b505afa1580156109f2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a16919061117d565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610a5b57600080fd5b505afa158015610a6f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a93919061119a565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610b0957600080fd5b505afa158015610b1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b41919061117d565b90506101f46001600160a01b038216633f9fdf3c610b618761014b6115dd565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610ba057600080fd5b505afa158015610bb4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd8919061125d565b1015610be5576000610be8565b60015b60ff1682600081518110610bfe57610bfe61162f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610c27876102cf6115dd565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610c6657600080fd5b505afa158015610c7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9e919061125d565b1015610cab576000610cae565b60015b60ff1682600181518110610cc457610cc461162f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610ced876103f56115dd565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d2c57600080fd5b505afa158015610d40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d64919061125d565b1015610d71576000610d74565b60015b60ff1682600281518110610d8a57610d8a61162f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610db3876104d56115dd565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610df257600080fd5b505afa158015610e06573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e2a919061125d565b1015610e37576000610e3a565b60015b60ff1682600381518110610e5057610e5061162f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610e79876108516115dd565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610eb857600080fd5b505afa158015610ecc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ef0919061125d565b1015610efd576000610f00565b60015b60ff1682600481518110610f1657610f1661162f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610f3f876135bd6115dd565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f7e57600080fd5b505afa158015610f92573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb6919061125d565b1015610fc3576000610fc6565b60015b60ff1682600581518110610fdc57610fdc61162f565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600082601f83011261105157600080fd5b8135602061106661106183611591565b611560565b80838252828201915082860187848660051b890101111561108657600080fd5b60005b8581101561110657813567ffffffffffffffff8111156110a857600080fd5b8801603f81018a136110b957600080fd5b8581013560406110cb611061836115b5565b8281528c828486010111156110df57600080fd5b828285018a8301376000928101890192909252508552509284019290840190600101611089565b5090979650505050505050565b600082601f83011261112457600080fd5b8151611132611061826115b5565b81815284602083860101111561114757600080fd5b611158826020830160208701611603565b949350505050565b60006020828403121561117257600080fd5b8135610a938161165b565b60006020828403121561118f57600080fd5b8151610a938161165b565b6000602082840312156111ac57600080fd5b81518015158114610a9357600080fd5b6000806000606084860312156111d157600080fd5b835167ffffffffffffffff808211156111e957600080fd5b6111f587838801611113565b9450602086015191508082111561120b57600080fd5b61121787838801611113565b9350604086015191508082111561122d57600080fd5b5061123a86828701611113565b9150509250925092565b60006020828403121561125657600080fd5b5035919050565b60006020828403121561126f57600080fd5b5051919050565b6000806040838503121561128957600080fd5b50508035926020909101359150565b600080600080608085870312156112ae57600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156112d557600080fd5b818801915088601f8301126112e957600080fd5b81356112f761106182611591565b8082825285820191508585018c878560051b880101111561131757600080fd5b600095505b8386101561133a57803583526001959095019491860191860161131c565b5096505050606088013592508083111561135357600080fd5b505061136187828801611040565b91505092959194509250565b60008060006060848603121561138257600080fd5b505081359360208301359350604090920135919050565b7fe5928ce99381e58ca0e59586e9878fe4bbb7e992b1e697b6efbc8c00000000008152600082516113d181601b850160208701611603565b7fe590ace588b0e9878ce5b18be69c89e4babae8afb4e8af9de38082e585b6e4b8601b9390910192830152507fade4b880e4babae591bbe5909fe5968ae796bcefbc8ce8afb4efbc9ae2809ce5603b8201527f8584e995bfe4bd95e5bf85e4b88be6898be8bf99e4b988e9878de591a2efbc9f605b8201527fe2809de58fa6e4b880e4babae8afb4efbc9ae2809ce8b4a4e5bc9fe4bba5e4b8607b8201527fbae68891e4b88de7979be59097efbc9fe58fafe5ae9de58991e9948be4bb8ee7609b8201527fa3a8e7a0bae587baefbc8ce4b88de4b88be9878de6898be6808ee4b988e883bd60bb8201527fe68993e587bae5a5bde585b5e599a8e591a2efbc9fe2809d000000000000000060db82015260f301919050565b6020808252825182820181905260009190848201906040850190845b8181101561152157835183529284019291840191600101611505565b50909695505050505050565b602081526000825180602084015261154c816040850160208701611603565b601f01601f19169190910160400192915050565b604051601f8201601f1916810167ffffffffffffffff8111828210171561158957611589611645565b604052919050565b600067ffffffffffffffff8211156115ab576115ab611645565b5060051b60200190565b600067ffffffffffffffff8211156115cf576115cf611645565b50601f01601f191660200190565b600082198211156115fe57634e487b7160e01b600052601160045260246000fd5b500190565b60005b8381101561161e578181015183820152602001611606565b8381111561047c5750506000910152565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146107fe57600080fdfea264697066735822122049bc4d9510a0832a3cef756d7d666ce99866b5b872025f46b41eb56aa86853b364736f6c63430008060033";
