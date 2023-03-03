"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1000008__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1000008__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1000008__factory = WorldEventProcessor1000008__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161177438038061177483398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b61167d806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610161578063c0f1619c14610174578063c729329414610198578063ca5bf9a4146101bb578063f2fde38b146101c457600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004611376565b6101d7565b005b6100e16100dc366004611376565b610237565b6040516100ee91906114cb565b60405180910390f35b6100cc610248565b6100cc61010d36600461149f565b6102ae565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b366004611376565b610524565b6040516100ee919061150f565b6100e161015b366004611376565b50606090565b6100cc61016f3660046113ca565b610545565b61018a6101823660046113a8565b505060025490565b6040519081526020016100ee565b6101ab6101a63660046113a8565b6106cb565b60405190151581526020016100ee565b61018a60025481565b6100cc6101d236600461131a565b610923565b6101e160016109ee565b6102325760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061024282610c87565b92915050565b6001546001600160a01b031633146102a25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610229565b6102ac60006111db565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102f157600080fd5b505afa158015610305573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103299190611337565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035691815260200190565b60206040518083038186803b15801561036e57600080fd5b505afa158015610382573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a69190611354565b6103e05760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610229565b6103e9816109ee565b61042d5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610229565b600080546040516340d9124560e11b81526103eb60048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561047357600080fd5b505afa158015610487573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ab9190611337565b6040516377d4d4df60e11b81526004810187905260248101869052678ac7230489e8000060448201529091506001600160a01b0382169063efa9a9be90606401600060405180830381600087803b15801561050557600080fd5b505af1158015610519573d6000803e3d6000fd5b505050505050505050565b60606040518060600160405280602781526020016116216027913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561058857600080fd5b505afa15801561059c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c09190611337565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016105ed91815260200190565b60206040518083038186803b15801561060557600080fd5b505afa158015610619573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063d9190611354565b6106775760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610229565b610680816109ee565b6106c45760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610229565b5050505050565b600080546040516340d9124560e11b81526103e9600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561071657600080fd5b505afa15801561072a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074e9190611337565b60405163b7876f5760e01b815260048101879052620f424960248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561079d57600080fd5b505afa1580156107b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d5919061138f565b11156107e657600092505050610242565b600080546040516340d9124560e11b81526103ed600482015291935083916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561083157600080fd5b505afa158015610845573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108699190611337565b905060006001600160a01b0382166392441c0d6108896103e860026115b9565b896040518363ffffffff1660e01b81526004016108b0929190918252602082015260400190565b60206040518083038186803b1580156108c857600080fd5b505afa1580156108dc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610900919061138f565b90506008811015610918576001945050505050610242565b509195945050505050565b6001546001600160a01b0316331461097d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610229565b6001600160a01b0381166109e25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610229565b6109eb816111db565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610a3357600080fd5b505afa158015610a47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a6b9190611337565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610ab057600080fd5b505afa158015610ac4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ae89190611337565b6001600160a01b03161480610b7d57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610b3a57600080fd5b505afa158015610b4e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b729190611337565b6001600160a01b0316145b80610c8057506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610bcb57600080fd5b505afa158015610bdf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c039190611337565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610c4857600080fd5b505afa158015610c5c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c809190611354565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610cf657600080fd5b505afa158015610d0a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d2e9190611337565b90506101f46001600160a01b038216633f9fdf3c610d4e8761014b6115b9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d8d57600080fd5b505afa158015610da1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc5919061138f565b1015610dd2576000610dd5565b60015b60ff1682600081518110610deb57610deb6115df565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610e14876102cf6115b9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e5357600080fd5b505afa158015610e67573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e8b919061138f565b1015610e98576000610e9b565b60015b60ff1682600181518110610eb157610eb16115df565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610eda876103f56115b9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f1957600080fd5b505afa158015610f2d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f51919061138f565b1015610f5e576000610f61565b60015b60ff1682600281518110610f7757610f776115df565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610fa0876104d56115b9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610fdf57600080fd5b505afa158015610ff3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611017919061138f565b1015611024576000611027565b60015b60ff168260038151811061103d5761103d6115df565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611066876108516115b9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156110a557600080fd5b505afa1580156110b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110dd919061138f565b10156110ea5760006110ed565b60015b60ff1682600481518110611103576111036115df565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61112c876135bd6115b9565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561116b57600080fd5b505afa15801561117f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111a3919061138f565b10156111b05760006111b3565b60015b60ff16826005815181106111c9576111c96115df565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261123f57600080fd5b8235602061125461124f83611595565b611564565b80838252828201915082870188848660051b8a0101111561127457600080fd5b60005b8581101561130c57813567ffffffffffffffff8082111561129757600080fd5b818b0191508b603f8301126112ab57600080fd5b868201356040828211156112c1576112c16115f5565b6112d2828c01601f19168a01611564565b92508183528d818386010111156112e857600080fd5b818185018a8501375060009082018801528552509284019290840190600101611277565b509098975050505050505050565b60006020828403121561132c57600080fd5b8135610c808161160b565b60006020828403121561134957600080fd5b8151610c808161160b565b60006020828403121561136657600080fd5b81518015158114610c8057600080fd5b60006020828403121561138857600080fd5b5035919050565b6000602082840312156113a157600080fd5b5051919050565b600080604083850312156113bb57600080fd5b50508035926020909101359150565b600080600080608085870312156113e057600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561140757600080fd5b818801915088601f83011261141b57600080fd5b813561142961124f82611595565b8082825285820191508585018c878560051b880101111561144957600080fd5b600095505b8386101561146c57803583526001959095019491860191860161144e565b5096505050606088013592508083111561148557600080fd5b50506114938782880161122d565b91505092959194509250565b6000806000606084860312156114b457600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b81811015611503578351835292840192918401916001016114e7565b50909695505050505050565b600060208083528351808285015260005b8181101561153c57858101830151858201604001528201611520565b8181111561154e576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff8111828210171561158d5761158d6115f5565b604052919050565b600067ffffffffffffffff8211156115af576115af6115f5565b5060051b60200190565b600082198211156115da57634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146109eb57600080fdfee4bda0e4b880e5bc80e5a78be5b0b1e587bae78eb0e59ca8e4bd8ee5af86e5baa6e58cbae38082a2646970667358221220c8e9db3eb32a7314d56769988409fb86c7322748c7ffe2b03b52894b1907ffb864736f6c63430008060033";
