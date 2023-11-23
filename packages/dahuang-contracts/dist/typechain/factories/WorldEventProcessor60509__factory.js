"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor60509__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor60509__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(baseTravelTime, _route, overrides) {
        return super.deploy(baseTravelTime, _route, overrides || {});
    }
    getDeployTransaction(baseTravelTime, _route, overrides) {
        return super.getDeployTransaction(baseTravelTime, _route, overrides || {});
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
exports.WorldEventProcessor60509__factory = WorldEventProcessor60509__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "baseTravelTime",
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
        inputs: [],
        name: "BASE_TRAVEL_TIME",
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
const _bytecode = "0x60a06040523480156200001157600080fd5b5060405162001c5f38038062001c5f8339810160408190526200003491620000c3565b600080546001600160a01b0319166001600160a01b0383161781558190620000636200005d3390565b62000071565b600255505060805262000102565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60008060408385031215620000d757600080fd5b825160208401519092506001600160a01b0381168114620000f757600080fd5b809150509250929050565b608051611b3b620001246000396000818160ee01526109540152611b3b6000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80639d0c025b1161008c578063c0f1619c11610066578063c0f1619c146101f2578063c729329414610208578063ca5bf9a41461022b578063f2fde38b1461023457600080fd5b80639d0c025b14610179578063a71d6e3b146101cc578063b4ae1235146101df57600080fd5b8063127ce1cc146100d457806336ac9cdc146100e95780634849f65614610123578063715018a6146101435780637c99f6a61461014b5780638da5cb5b1461015e575b600080fd5b6100e76100e2366004611837565b610247565b005b6101107f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020015b60405180910390f35b610136610131366004611837565b6102a7565b60405161011a91906119b0565b6100e76102b8565b6100e7610159366004611984565b61031e565b6001546040516001600160a01b03909116815260200161011a565b6101bf610187366004611837565b5060408051808201909152601e81527fe4bda0e6ada5e8a18ce5898de5be80e58fa6e5a496e59cb0e58cbae380820000602082015290565b60405161011a91906119f4565b6101366101da366004611837565b6104a3565b6100e76101ed3660046118af565b61051a565b610110610200366004611869565b505060025490565b61021b610216366004611869565b6109e7565b604051901515815260200161011a565b61011060025481565b6100e7610242366004611743565b610d4c565b6102516001610e17565b6102a25760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60606102b2826110b0565b92915050565b6001546001600160a01b031633146103125760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610299565b61031c6000611604565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561036157600080fd5b505afa158015610375573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103999190611760565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016103c691815260200190565b60206040518083038186803b1580156103de57600080fd5b505afa1580156103f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104169190611815565b6104505760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610299565b61045981610e17565b61049d5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610299565b50505050565b604080516002808252606080830184529260009291906020830190803683370190505090506104d460286000611a9e565b816000815181106104e7576104e7611ac4565b602002602001018181525050600e198160018151811061050957610509611ac4565b602090810291909101015292915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561055d57600080fd5b505afa158015610571573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105959190611760565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016105c291815260200190565b60206040518083038186803b1580156105da57600080fd5b505afa1580156105ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106129190611815565b61064c5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610299565b61065581610e17565b6106995760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610299565b82516002146106de5760405162461bcd60e51b81526020600482015260116024820152701c185c985b5cc81a5cc81a5b9d985b1a59607a1b6044820152606401610299565b600080546040516340d9124560e11b8152600960048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561072357600080fd5b505afa158015610737573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075b9190611760565b604051632b53f9bd60e21b8152600481018790529091506000906001600160a01b0383169063ad4fe6f49060240160006040518083038186803b1580156107a157600080fd5b505afa1580156107b5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526107dd919081019061177d565b90506000856000815181106107f4576107f4611ac4565b6020026020010151905060008660018151811061081357610813611ac4565b60200260200101519050808214156108635760405162461bcd60e51b81526020600482015260136024820152723d37b73290209034b99039b0b6b29030b9902160691b6044820152606401610299565b8251600214801561088d5750818360018151811061088357610883611ac4565b6020026020010151145b6108d25760405162461bcd60e51b81526020600482015260166024820152756163746f72206973206e6f74206174207a6f6e65204160501b6044820152606401610299565b604051632b893a4360e21b8152600481018a90526024810189905260448101839052606481018290526001600160a01b0385169063ae24e90c90608401600060405180830381600087803b15801561092957600080fd5b505af115801561093d573d6000803e3d6000fd5b50505050836001600160a01b0316637eae9eb28a8a7f00000000000000000000000000000000000000000000000000000000000000004261097e9190611a9e565b6040516001600160e01b031960e086901b168152600481019390935260248301919091526044820152606401600060405180830381600087803b1580156109c457600080fd5b505af11580156109d8573d6000803e3d6000fd5b50505050505050505050505050565b600080546040805163331fc30960e21b8152905160019284926001600160a01b039091169163cc7f0c2491600480820192602092909190829003018186803b158015610a3257600080fd5b505afa158015610a46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a6a9190611760565b9050600080826001600160a01b0316630847db59886040518263ffffffff1660e01b8152600401610a9d91815260200190565b604080518083038186803b158015610ab457600080fd5b505afa158015610ac8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aec919061188b565b909250905060028114610b065760009450505050506102b2565b600080546040516340d9124560e11b8152600960048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610b4b57600080fd5b505afa158015610b5f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b839190611760565b604051639436383d60e01b8152600481018a90529091506001600160a01b03821690639436383d9060240160206040518083038186803b158015610bc657600080fd5b505afa158015610bda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bfe9190611815565b15610c11576000955050505050506102b2565b600080546040516340d9124560e11b815260ce60048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610c5657600080fd5b505afa158015610c6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c8e9190611760565b905060006001600160a01b0382166392441c0d610cac602884611a9e565b8c6040518363ffffffff1660e01b8152600401610cd3929190918252602082015260400190565b60206040518083038186803b158015610ceb57600080fd5b505afa158015610cff573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d239190611850565b9050600f811015610d3e5760009750505050505050506102b2565b509498975050505050505050565b6001546001600160a01b03163314610da65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610299565b6001600160a01b038116610e0b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610299565b610e1481611604565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610e5c57600080fd5b505afa158015610e70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e949190611760565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610ed957600080fd5b505afa158015610eed573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f119190611760565b6001600160a01b03161480610fa657506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610f6357600080fd5b505afa158015610f77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f9b9190611760565b6001600160a01b0316145b806110a957506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610ff457600080fd5b505afa158015611008573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061102c9190611760565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b15801561107157600080fd5b505afa158015611085573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110a99190611815565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561111f57600080fd5b505afa158015611133573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111579190611760565b90506101f46001600160a01b038216633f9fdf3c6111778761014b611a9e565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156111b657600080fd5b505afa1580156111ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111ee9190611850565b10156111fb5760006111fe565b60015b60ff168260008151811061121457611214611ac4565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61123d876102cf611a9e565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561127c57600080fd5b505afa158015611290573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112b49190611850565b10156112c15760006112c4565b60015b60ff16826001815181106112da576112da611ac4565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611303876103f5611a9e565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561134257600080fd5b505afa158015611356573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061137a9190611850565b101561138757600061138a565b60015b60ff16826002815181106113a0576113a0611ac4565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6113c9876104d5611a9e565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561140857600080fd5b505afa15801561141c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114409190611850565b101561144d576000611450565b60015b60ff168260038151811061146657611466611ac4565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61148f87610851611a9e565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156114ce57600080fd5b505afa1580156114e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115069190611850565b1015611513576000611516565b60015b60ff168260048151811061152c5761152c611ac4565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611555876135bd611a9e565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561159457600080fd5b505afa1580156115a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115cc9190611850565b10156115d95760006115dc565b60015b60ff16826005815181106115f2576115f2611ac4565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261166857600080fd5b8235602061167d61167883611a7a565b611a49565b80838252828201915082870188848660051b8a0101111561169d57600080fd5b60005b8581101561173557813567ffffffffffffffff808211156116c057600080fd5b818b0191508b603f8301126116d457600080fd5b868201356040828211156116ea576116ea611ada565b6116fb828c01601f19168a01611a49565b92508183528d8183860101111561171157600080fd5b818185018a85013750600090820188015285525092840192908401906001016116a0565b509098975050505050505050565b60006020828403121561175557600080fd5b81356110a981611af0565b60006020828403121561177257600080fd5b81516110a981611af0565b6000602080838503121561179057600080fd5b825167ffffffffffffffff8111156117a757600080fd5b8301601f810185136117b857600080fd5b80516117c661167882611a7a565b80828252848201915084840188868560051b87010111156117e657600080fd5b600094505b838510156118095780518352600194909401939185019185016117eb565b50979650505050505050565b60006020828403121561182757600080fd5b815180151581146110a957600080fd5b60006020828403121561184957600080fd5b5035919050565b60006020828403121561186257600080fd5b5051919050565b6000806040838503121561187c57600080fd5b50508035926020909101359150565b6000806040838503121561189e57600080fd5b505080516020909101519092909150565b600080600080608085870312156118c557600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156118ec57600080fd5b818801915088601f83011261190057600080fd5b813561190e61167882611a7a565b8082825285820191508585018c878560051b880101111561192e57600080fd5b600095505b83861015611951578035835260019590950194918601918601611933565b5096505050606088013592508083111561196a57600080fd5b505061197887828801611656565b91505092959194509250565b60008060006060848603121561199957600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156119e8578351835292840192918401916001016119cc565b50909695505050505050565b600060208083528351808285015260005b81811015611a2157858101830151858201604001528201611a05565b81811115611a33576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611a7257611a72611ada565b604052919050565b600067ffffffffffffffff821115611a9457611a94611ada565b5060051b60200190565b60008219821115611abf57634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610e1457600080fdfea2646970667358221220110240995d6fa539327493b51e9463e594b790fea6d0f0839b649ffd859abcfb64736f6c63430008060033";
