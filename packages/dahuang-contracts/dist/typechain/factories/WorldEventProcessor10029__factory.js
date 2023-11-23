"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor10029__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor10029__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor10029__factory = WorldEventProcessor10029__factory;
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
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC721Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
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
                name: "",
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516114c03803806114c083398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b6113c9806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80639d0c025b1161008c578063c0f1619c11610066578063c0f1619c146101c1578063c7293294146101e2578063ca5bf9a414610205578063f2fde38b1461020e57600080fd5b80639d0c025b1461017b578063a71d6e3b1461019b578063b4ae1235146101ae57600080fd5b8063127ce1cc146100d4578063150b7a02146100e95780634849f65614610125578063715018a6146101455780637c99f6a61461014d5780638da5cb5b14610160575b600080fd5b6100e76100e23660046110ae565b610221565b005b6101076100f7366004610f74565b630a85bd0160e11b949350505050565b6040516001600160e01b031990911681526020015b60405180910390f35b6101386101333660046110ae565b610281565b60405161011c91906111f7565b6100e7610373565b6100e761015b3660046111cb565b6103d9565b6001546040516001600160a01b03909116815260200161011c565b61018e6101893660046110ae565b61055e565b60405161011c919061123b565b6101386101a93660046110ae565b61057f565b6100e76101bc366004611102565b6105e4565b6101d46101cf3660046110e0565b61076a565b60405190815260200161011c565b6101f56101f03660046110e0565b610774565b604051901515815260200161011c565b6101d460025481565b6100e761021c366004610f3a565b610a82565b61022b6001610b4d565b61027c5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60408051600680825260e08201909252606091600091906020820160c0803683370190505090506000816000815181106102bd576102bd61132e565b6020026020010181815250506001816001815181106102de576102de61132e565b6020026020010181815250506000816002815181106102ff576102ff61132e565b6020026020010181815250506001816003815181106103205761032061132e565b6020026020010181815250506001816004815181106103415761034161132e565b6020026020010181815250506001816005815181106103625761036261132e565b602090810291909101015292915050565b6001546001600160a01b031633146103cd5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610273565b6103d76000610de6565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561041c57600080fd5b505afa158015610430573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104549190610f57565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161048191815260200190565b60206040518083038186803b15801561049957600080fd5b505afa1580156104ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d1919061108c565b61050b5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610273565b61051481610b4d565b6105585760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610273565b50505050565b60606040518060600160405280602481526020016113706024913992915050565b604080516002808252606080830184529260009291906020830190803683370190505090506105b0601e60006112e5565b816000815181106105c3576105c361132e565b602002602001018181525050600a816001815181106103625761036261132e565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561062757600080fd5b505afa15801561063b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065f9190610f57565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161068c91815260200190565b60206040518083038186803b1580156106a457600080fd5b505afa1580156106b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106dc919061108c565b6107165760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610273565b61071f81610b4d565b6107635760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610273565b5050505050565b6002545b92915050565b600080546040516340d9124560e11b815260c9600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156107be57600080fd5b505afa1580156107d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f69190610f57565b60405163b7876f5760e01b81526004810187905261272d60248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561084457600080fd5b505afa158015610858573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087c91906110c7565b111561088d5760009250505061076e565b600080546040516340d9124560e11b815260ca60048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156108d257600080fd5b505afa1580156108e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090a9190610f57565b604051637d1f0aab60e01b8152600481018890529091506000906001600160a01b03831690637d1f0aab9060240160006040518083038186803b15801561095057600080fd5b505afa158015610964573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261098c9190810190610ff4565b905060005b81518110156109dd578181815181106109ac576109ac61132e565b60200260200101516103f714156109cb5760009550505050505061076e565b806109d5816112fd565b915050610991565b5060405163b7876f5760e01b81526004810188905261271960248201526000945084906001600160a01b0385169063b7876f579060440160206040518083038186803b158015610a2c57600080fd5b505afa158015610a40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a6491906110c7565b1115610a7757600194505050505061076e565b509195945050505050565b6001546001600160a01b03163314610adc5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610273565b6001600160a01b038116610b415760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610273565b610b4a81610de6565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610b9257600080fd5b505afa158015610ba6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bca9190610f57565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610c0f57600080fd5b505afa158015610c23573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c479190610f57565b6001600160a01b03161480610cdc57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610c9957600080fd5b505afa158015610cad573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd19190610f57565b6001600160a01b0316145b80610ddf57506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610d2a57600080fd5b505afa158015610d3e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d629190610f57565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610da757600080fd5b505afa158015610dbb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ddf919061108c565b9392505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600067ffffffffffffffff831115610e5257610e52611344565b610e65601f8401601f1916602001611290565b9050828152838383011115610e7957600080fd5b828260208301376000602084830101529392505050565b600082601f830112610ea157600080fd5b81356020610eb6610eb1836112c1565b611290565b80838252828201915082860187848660051b8901011115610ed657600080fd5b60005b85811015610f2d57813567ffffffffffffffff811115610ef857600080fd5b8801603f81018a13610f0957600080fd5b610f1a8a8783013560408401610e38565b8552509284019290840190600101610ed9565b5090979650505050505050565b600060208284031215610f4c57600080fd5b8135610ddf8161135a565b600060208284031215610f6957600080fd5b8151610ddf8161135a565b60008060008060808587031215610f8a57600080fd5b8435610f958161135a565b93506020850135610fa58161135a565b925060408501359150606085013567ffffffffffffffff811115610fc857600080fd5b8501601f81018713610fd957600080fd5b610fe887823560208401610e38565b91505092959194509250565b6000602080838503121561100757600080fd5b825167ffffffffffffffff81111561101e57600080fd5b8301601f8101851361102f57600080fd5b805161103d610eb1826112c1565b80828252848201915084840188868560051b870101111561105d57600080fd5b600094505b83851015611080578051835260019490940193918501918501611062565b50979650505050505050565b60006020828403121561109e57600080fd5b81518015158114610ddf57600080fd5b6000602082840312156110c057600080fd5b5035919050565b6000602082840312156110d957600080fd5b5051919050565b600080604083850312156110f357600080fd5b50508035926020909101359150565b6000806000806080858703121561111857600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561113f57600080fd5b818801915088601f83011261115357600080fd5b8135611161610eb1826112c1565b8082825285820191508585018c878560051b880101111561118157600080fd5b600095505b838610156111a4578035835260019590950194918601918601611186565b509650505060608801359250808311156111bd57600080fd5b5050610fe887828801610e90565b6000806000606084860312156111e057600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b8181101561122f57835183529284019291840191600101611213565b50909695505050505050565b600060208083528351808285015260005b818110156112685785810183015185820160400152820161124c565b8181111561127a576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156112b9576112b9611344565b604052919050565b600067ffffffffffffffff8211156112db576112db611344565b5060051b60200190565b600082198211156112f8576112f8611318565b500190565b600060001982141561131157611311611318565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610b4a57600080fdfee5aeb6e4babae4bb8ee5b08fe5b0b1e59fb9e585bbe4bda0e5819ae5aeb6e58aa1e38082a2646970667358221220b5926f67d33b910100b5aef256b91f5530a4143d15a58235f0115b409a0f092b64736f6c63430008060033";
