"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1000014__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1000014__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1000014__factory = WorldEventProcessor1000014__factory;
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
const _bytecode = "0x60806040523480156200001157600080fd5b5060405162001ce338038062001ce38339810160408190526200003491620000c1565b600080546001600160a01b0319166001600160a01b0383161781558190620000636200005d3390565b6200006f565b60025550620000f39050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600060208284031215620000d457600080fd5b81516001600160a01b0381168114620000ec57600080fd5b9392505050565b611be080620001036000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610160578063c0f1619c14610173578063c729329414610194578063ca5bf9a4146101b7578063f2fde38b146101c057600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c73660046118d6565b6101d3565b005b6100e16100dc3660046118d6565b610233565b6040516100ee9190611a2b565b60405180910390f35b6100cc610244565b6100cc61010d3660046119ff565b6102aa565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b3660046118d6565b61042f565b6040516100ee9190611a6f565b6100e161015b3660046118d6565b610450565b6100cc61016e36600461192a565b6104c7565b610186610181366004611908565b61064d565b6040519081526020016100ee565b6101a76101a2366004611908565b610796565b60405190151581526020016100ee565b61018660025481565b6100cc6101ce36600461187a565b610e83565b6101dd6001610f4e565b61022e5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061023e826111e7565b92915050565b6001546001600160a01b0316331461029e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610225565b6102a8600061173b565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102ed57600080fd5b505afa158015610301573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103259190611897565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035291815260200190565b60206040518083038186803b15801561036a57600080fd5b505afa15801561037e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a291906118b4565b6103dc5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610225565b6103e581610f4e565b6104295760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610225565b50505050565b60606040518060600160405280602a8152602001611b81602a913992915050565b604080516002808252606080830184529260009291906020830190803683370190505090506104826103e86001611b19565b8160008151811061049557610495611b3f565b6020026020010181815250506001816001815181106104b6576104b6611b3f565b602090810291909101015292915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561050a57600080fd5b505afa15801561051e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105429190611897565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161056f91815260200190565b60206040518083038186803b15801561058757600080fd5b505afa15801561059b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105bf91906118b4565b6105f95760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610225565b61060281610f4e565b6106465760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610225565b5050505050565b600080546040516340d9124560e11b81526001600482015282916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561069257600080fd5b505afa1580156106a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ca9190611897565b604051630fe7f7cf60e21b815260048101869052606460248201526001600160a01b039190911690633f9fdf3c9060440160206040518083038186803b15801561071357600080fd5b505afa158015610727573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074b91906118ef565b9050600f81101561076257620f424f91505061023e565b601e81101561077757620f425091505061023e565b602d81101561078c57620f425191505061023e565b5060009392505050565b600080546040516340d9124560e11b81526103e9600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156107e157600080fd5b505afa1580156107f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108199190611897565b60405163b7876f5760e01b815260048101879052620f424e60248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561086857600080fd5b505afa15801561087c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a091906118ef565b11156108b15760009250505061023e565b60405163b7876f5760e01b815260048101869052620f424f60248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b1580156108fd57600080fd5b505afa158015610911573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093591906118ef565b11156109465760009250505061023e565b60405163b7876f5760e01b815260048101869052620f425060248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561099257600080fd5b505afa1580156109a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ca91906118ef565b11156109db5760009250505061023e565b60405163b7876f5760e01b815260048101869052620f425160248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610a2757600080fd5b505afa158015610a3b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5f91906118ef565b1115610a705760009250505061023e565b60405163b7876f5760e01b815260048101869052620f424760248201526000925082906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610abf57600080fd5b505afa158015610ad3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af791906118ef565b1115610e7b5760405163b7876f5760e01b815260048101869052620f906660248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610b4957600080fd5b505afa158015610b5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b8191906118ef565b1115610b925760019250505061023e565b60405163b7876f5760e01b815260048101869052620f906760248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610bde57600080fd5b505afa158015610bf2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c1691906118ef565b1115610c275760019250505061023e565b60405163b7876f5760e01b815260048101869052620f906860248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610c7357600080fd5b505afa158015610c87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cab91906118ef565b1115610cbc5760019250505061023e565b60405163b7876f5760e01b815260048101869052620f906960248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610d0857600080fd5b505afa158015610d1c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4091906118ef565b1115610d515760019250505061023e565b60405163b7876f5760e01b815260048101869052620f906a60248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610d9d57600080fd5b505afa158015610db1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dd591906118ef565b1115610de65760019250505061023e565b60405163b7876f5760e01b815260048101869052620f906b60248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610e3257600080fd5b505afa158015610e46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e6a91906118ef565b1115610e7b5760019250505061023e565b509392505050565b6001546001600160a01b03163314610edd5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610225565b6001600160a01b038116610f425760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610225565b610f4b8161173b565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610f9357600080fd5b505afa158015610fa7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fcb9190611897565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b15801561101057600080fd5b505afa158015611024573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110489190611897565b6001600160a01b031614806110dd57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561109a57600080fd5b505afa1580156110ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110d29190611897565b6001600160a01b0316145b806111e057506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b15801561112b57600080fd5b505afa15801561113f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111639190611897565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b1580156111a857600080fd5b505afa1580156111bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111e091906118b4565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561125657600080fd5b505afa15801561126a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061128e9190611897565b90506101f46001600160a01b038216633f9fdf3c6112ae8761014b611b19565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156112ed57600080fd5b505afa158015611301573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061132591906118ef565b1015611332576000611335565b60015b60ff168260008151811061134b5761134b611b3f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611374876102cf611b19565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156113b357600080fd5b505afa1580156113c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113eb91906118ef565b10156113f85760006113fb565b60015b60ff168260018151811061141157611411611b3f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61143a876103f5611b19565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561147957600080fd5b505afa15801561148d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114b191906118ef565b10156114be5760006114c1565b60015b60ff16826002815181106114d7576114d7611b3f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611500876104d5611b19565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561153f57600080fd5b505afa158015611553573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061157791906118ef565b1015611584576000611587565b60015b60ff168260038151811061159d5761159d611b3f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6115c687610851611b19565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561160557600080fd5b505afa158015611619573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061163d91906118ef565b101561164a57600061164d565b60015b60ff168260048151811061166357611663611b3f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61168c876135bd611b19565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156116cb57600080fd5b505afa1580156116df573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061170391906118ef565b1015611710576000611713565b60015b60ff168260058151811061172957611729611b3f565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261179f57600080fd5b823560206117b46117af83611af5565b611ac4565b80838252828201915082870188848660051b8a010111156117d457600080fd5b60005b8581101561186c57813567ffffffffffffffff808211156117f757600080fd5b818b0191508b603f83011261180b57600080fd5b8682013560408282111561182157611821611b55565b611832828c01601f19168a01611ac4565b92508183528d8183860101111561184857600080fd5b818185018a85013750600090820188015285525092840192908401906001016117d7565b509098975050505050505050565b60006020828403121561188c57600080fd5b81356111e081611b6b565b6000602082840312156118a957600080fd5b81516111e081611b6b565b6000602082840312156118c657600080fd5b815180151581146111e057600080fd5b6000602082840312156118e857600080fd5b5035919050565b60006020828403121561190157600080fd5b5051919050565b6000806040838503121561191b57600080fd5b50508035926020909101359150565b6000806000806080858703121561194057600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561196757600080fd5b818801915088601f83011261197b57600080fd5b81356119896117af82611af5565b8082825285820191508585018c878560051b88010111156119a957600080fd5b600095505b838610156119cc5780358352600195909501949186019186016119ae565b509650505060608801359250808311156119e557600080fd5b50506119f38782880161178d565b91505092959194509250565b600080600060608486031215611a1457600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b81811015611a6357835183529284019291840191600101611a47565b50909695505050505050565b600060208083528351808285015260005b81811015611a9c57858101830151858201604001528201611a80565b81811115611aae576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611aed57611aed611b55565b604052919050565b600067ffffffffffffffff821115611b0f57611b0f611b55565b5060051b60200190565b60008219821115611b3a57634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610f4b57600080fdfee4bda0e98187e588b0e4ba86e585b6e4bb96e5a4b8e5858befbc8ce5bdbce6ada4e7bb93e59088e38082a26469706673582212203ced85534605c1205d6e1fe65f52ef3dc70aa56551884e51b3d6043f860d637f64736f6c63430008060033";