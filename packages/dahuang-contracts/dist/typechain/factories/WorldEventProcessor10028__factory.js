"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor10028__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor10028__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor10028__factory = WorldEventProcessor10028__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161170338038061170383398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b61160c806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80639d0c025b1161008c578063c0f1619c11610066578063c0f1619c146101c1578063c7293294146101e2578063ca5bf9a414610205578063f2fde38b1461020e57600080fd5b80639d0c025b1461017b578063a71d6e3b1461019b578063b4ae1235146101ae57600080fd5b8063127ce1cc146100d4578063150b7a02146100e95780634849f65614610125578063715018a6146101455780637c99f6a61461014d5780638da5cb5b14610160575b600080fd5b6100e76100e236600461130e565b610221565b005b6101076100f736600461126c565b630a85bd0160e11b949350505050565b6040516001600160e01b031990911681526020015b60405180910390f35b61013861013336600461130e565b610281565b60405161011c9190611457565b6100e7610373565b6100e761015b36600461142b565b6103d9565b6001546040516001600160a01b03909116815260200161011c565b61018e61018936600461130e565b61055e565b60405161011c919061149b565b6101386101a936600461130e565b61057f565b6100e76101bc366004611362565b610631565b6101d46101cf366004611340565b6107b7565b60405190815260200161011c565b6101f56101f0366004611340565b610a0e565b604051901515815260200161011c565b6101d460025481565b6100e761021c366004611232565b610d7a565b61022b6001610e45565b61027c5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60408051600680825260e08201909252606091600091906020820160c0803683370190505090506000816000815181106102bd576102bd61156b565b6020026020010181815250506001816001815181106102de576102de61156b565b6020026020010181815250506000816002815181106102ff576102ff61156b565b6020026020010181815250506001816003815181106103205761032061156b565b6020026020010181815250506001816004815181106103415761034161156b565b6020026020010181815250506001816005815181106103625761036261156b565b602090810291909101015292915050565b6001546001600160a01b031633146103cd5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610273565b6103d760006110de565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561041c57600080fd5b505afa158015610430573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610454919061124f565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161048191815260200190565b60206040518083038186803b15801561049957600080fd5b505afa1580156104ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d191906112ec565b61050b5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610273565b61051481610e45565b6105585760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610273565b50505050565b60606040518060600160405280602a81526020016115ad602a913992915050565b60408051600480825260a0820190925260609160009190602082016080803683370190505090506105b2601e6000611545565b816000815181106105c5576105c561156b565b602002602001018181525050600a816001815181106105e6576105e661156b565b60209081029190910101526105fd60146000611545565b816002815181106106105761061061156b565b6020026020010181815250506005816003815181106103625761036261156b565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561067457600080fd5b505afa158015610688573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ac919061124f565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016106d991815260200190565b60206040518083038186803b1580156106f157600080fd5b505afa158015610705573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072991906112ec565b6107635760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610273565b61076c81610e45565b6107b05760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610273565b5050505050565b600080546040516340d9124560e11b815260cb600482015282916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156107fc57600080fd5b505afa158015610810573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610834919061124f565b905060466001600160a01b0382166392441c0d610853600a6000611545565b876040518363ffffffff1660e01b815260040161087a929190918252602082015260400190565b60206040518083038186803b15801561089257600080fd5b505afa1580156108a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ca9190611327565b11156108db57614e3d915050610a08565b600080546040516340d9124560e11b815260cd60048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561092057600080fd5b505afa158015610934573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610958919061124f565b905060326001600160a01b0382166392441c0d610977601e6000611545565b886040518363ffffffff1660e01b815260040161099e929190918252602082015260400190565b60206040518083038186803b1580156109b657600080fd5b505afa1580156109ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ee9190611327565b1015610a0057614e3c92505050610a08565b600254925050505b92915050565b600080546040516340d9124560e11b815260c9600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610a5857600080fd5b505afa158015610a6c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a90919061124f565b60405163b7876f5760e01b81526004810187905261272c60248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610ade57600080fd5b505afa158015610af2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b169190611327565b1115610b2757600092505050610a08565b60405163b7876f5760e01b81526004810186905261274460248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b158015610b7257600080fd5b505afa158015610b86573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610baa9190611327565b1115610bbb57600092505050610a08565b600080546040516340d9124560e11b815260cd600482015291935083916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610c0557600080fd5b505afa158015610c19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3d919061124f565b9050601e6001600160a01b0382166392441c0d610c5b836000611545565b896040518363ffffffff1660e01b8152600401610c82929190918252602082015260400190565b60206040518083038186803b158015610c9a57600080fd5b505afa158015610cae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd29190611327565b118015610d5f575060405163b7876f5760e01b81526004810187905261271960248201526000906001600160a01b0384169063b7876f579060440160206040518083038186803b158015610d2557600080fd5b505afa158015610d39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d5d9190611327565b115b15610d705760019350505050610a08565b5090949350505050565b6001546001600160a01b03163314610dd45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610273565b6001600160a01b038116610e395760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610273565b610e42816110de565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610e8a57600080fd5b505afa158015610e9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ec2919061124f565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610f0757600080fd5b505afa158015610f1b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f3f919061124f565b6001600160a01b03161480610fd457506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610f9157600080fd5b505afa158015610fa5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc9919061124f565b6001600160a01b0316145b806110d757506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b15801561102257600080fd5b505afa158015611036573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061105a919061124f565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b15801561109f57600080fd5b505afa1580156110b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110d791906112ec565b9392505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600067ffffffffffffffff83111561114a5761114a611581565b61115d601f8401601f19166020016114f0565b905082815283838301111561117157600080fd5b828260208301376000602084830101529392505050565b600082601f83011261119957600080fd5b813560206111ae6111a983611521565b6114f0565b80838252828201915082860187848660051b89010111156111ce57600080fd5b60005b8581101561122557813567ffffffffffffffff8111156111f057600080fd5b8801603f81018a1361120157600080fd5b6112128a8783013560408401611130565b85525092840192908401906001016111d1565b5090979650505050505050565b60006020828403121561124457600080fd5b81356110d781611597565b60006020828403121561126157600080fd5b81516110d781611597565b6000806000806080858703121561128257600080fd5b843561128d81611597565b9350602085013561129d81611597565b925060408501359150606085013567ffffffffffffffff8111156112c057600080fd5b8501601f810187136112d157600080fd5b6112e087823560208401611130565b91505092959194509250565b6000602082840312156112fe57600080fd5b815180151581146110d757600080fd5b60006020828403121561132057600080fd5b5035919050565b60006020828403121561133957600080fd5b5051919050565b6000806040838503121561135357600080fd5b50508035926020909101359150565b6000806000806080858703121561137857600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561139f57600080fd5b818801915088601f8301126113b357600080fd5b81356113c16111a982611521565b8082825285820191508585018c878560051b88010111156113e157600080fd5b600095505b838610156114045780358352600195909501949186019186016113e6565b5096505050606088013592508083111561141d57600080fd5b50506112e087828801611188565b60008060006060848603121561144057600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b8181101561148f57835183529284019291840191600101611473565b50909695505050505050565b600060208083528351808285015260005b818110156114c8578581018301518582016040015282016114ac565b818111156114da576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff8111828210171561151957611519611581565b604052919050565b600067ffffffffffffffff82111561153b5761153b611581565b5060051b60200190565b6000821982111561156657634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610e4257600080fdfee4bda0e5be88e8b083e79aaeefbc8ce5969ce6aca2e59ca8e5aeb6e588b0e5a484e4b9b1e8b791e38082a2646970667358221220fb17772772e10422ca5066b30834a7f645b627ce85f049795acdd07debb3ca4864736f6c63430008060033";
