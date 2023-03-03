"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor10031__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor10031__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor10031__factory = WorldEventProcessor10031__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516115d73803806115d783398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b6114e0806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610161578063c0f1619c14610174578063c729329414610195578063ca5bf9a4146101b8578063f2fde38b146101c157600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c736600461116d565b6101d4565b005b6100e16100dc36600461116d565b610234565b6040516100ee91906112c2565b60405180910390f35b6100cc610326565b6100cc61010d366004611296565b61038c565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b36600461116d565b610994565b6040516100ee9190611306565b6100e161015b36600461116d565b50606090565b6100cc61016f3660046111c1565b6109b5565b61018761018236600461119f565b610b3b565b6040519081526020016100ee565b6101a86101a336600461119f565b610b45565b60405190151581526020016100ee565b61018760025481565b6100cc6101cf366004611111565b610c6e565b6101de6001610d39565b61022f5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60408051600680825260e08201909252606091600091906020820160c080368337019050509050600181600081518110610270576102706113d6565b602002602001018181525050600181600181518110610291576102916113d6565b6020026020010181815250506000816002815181106102b2576102b26113d6565b6020026020010181815250506001816003815181106102d3576102d36113d6565b6020026020010181815250506001816004815181106102f4576102f46113d6565b602002602001018181525050600181600581518110610315576103156113d6565b602090810291909101015292915050565b6001546001600160a01b031633146103805760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610226565b61038a6000610fd2565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156103cf57600080fd5b505afa1580156103e3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610407919061112e565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161043491815260200190565b60206040518083038186803b15801561044c57600080fd5b505afa158015610460573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610484919061114b565b6104be5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610226565b6104c781610d39565b61050b5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610226565b600080546040516340d9124560e11b815260d460048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561055057600080fd5b505afa158015610564573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610588919061112e565b60405163793d9c8760e11b81526004810186905290915068056bc75e2d63100000906001600160a01b0383169063f27b390e9060240160206040518083038186803b1580156105d657600080fd5b505afa1580156105ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060e9190611186565b10156106555760405162461bcd60e51b81526020600482015260166024820152750e0e4cae6e8d2ceca40d2e640dcdee840cadcdeeaced60531b6044820152606401610226565b600080546040516340d9124560e11b8152600160048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561069a57600080fd5b505afa1580156106ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d2919061112e565b604051630fe7f7cf60e21b815260048101879052600660248201529091506000906001600160a01b03831690633f9fdf3c9060440160206040518083038186803b15801561071f57600080fd5b505afa158015610733573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107579190611186565b6107629060146113b0565b905060006001600160a01b038316633f9fdf3c6107808960016113b0565b6040516001600160e01b031960e084901b16815260048101919091526009602482015260440160206040518083038186803b1580156107be57600080fd5b505afa1580156107d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f69190611186565b600080546040516340d9124560e11b81526007600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561084057600080fd5b505afa158015610854573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610878919061112e565b6040516315c7bf4560e31b8152600481018b9052602481018590526064604482018190528101849052608481018a90529091506001600160a01b0382169063ae3dfa289060a401602060405180830381600087803b1580156108d957600080fd5b505af11580156108ed573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109119190611186565b50604051631e351d6760e31b8152600481018a905260248101899052604481018a905268056bc75e2d6310000060648201526001600160a01b0386169063f1a8eb3890608401600060405180830381600087803b15801561097157600080fd5b505af1158015610985573d6000803e3d6000fd5b50505050505050505050505050565b60606040518060c00160405280609381526020016114186093913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156109f857600080fd5b505afa158015610a0c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a30919061112e565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b8152600401610a5d91815260200190565b60206040518083038186803b158015610a7557600080fd5b505afa158015610a89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aad919061114b565b610ae75760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610226565b610af081610d39565b610b345760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610226565b5050505050565b6002545b92915050565b600080546040516340d9124560e11b815260d4600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610b8f57600080fd5b505afa158015610ba3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc7919061112e565b60405163793d9c8760e11b8152600481018790529091506000906001600160a01b0383169063f27b390e9060240160206040518083038186803b158015610c0d57600080fd5b505afa158015610c21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c459190611186565b905068056bc75e2d63100000811015610c645760009350505050610b3f565b5090949350505050565b6001546001600160a01b03163314610cc85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610226565b6001600160a01b038116610d2d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610226565b610d3681610fd2565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610d7e57600080fd5b505afa158015610d92573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db6919061112e565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610dfb57600080fd5b505afa158015610e0f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e33919061112e565b6001600160a01b03161480610ec857506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610e8557600080fd5b505afa158015610e99573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ebd919061112e565b6001600160a01b0316145b80610fcb57506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610f1657600080fd5b505afa158015610f2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f4e919061112e565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610f9357600080fd5b505afa158015610fa7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fcb919061114b565b9392505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261103657600080fd5b8235602061104b6110468361138c565b61135b565b80838252828201915082870188848660051b8a0101111561106b57600080fd5b60005b8581101561110357813567ffffffffffffffff8082111561108e57600080fd5b818b0191508b603f8301126110a257600080fd5b868201356040828211156110b8576110b86113ec565b6110c9828c01601f19168a0161135b565b92508183528d818386010111156110df57600080fd5b818185018a850137506000908201880152855250928401929084019060010161106e565b509098975050505050505050565b60006020828403121561112357600080fd5b8135610fcb81611402565b60006020828403121561114057600080fd5b8151610fcb81611402565b60006020828403121561115d57600080fd5b81518015158114610fcb57600080fd5b60006020828403121561117f57600080fd5b5035919050565b60006020828403121561119857600080fd5b5051919050565b600080604083850312156111b257600080fd5b50508035926020909101359150565b600080600080608085870312156111d757600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156111fe57600080fd5b818801915088601f83011261121257600080fd5b81356112206110468261138c565b8082825285820191508585018c878560051b880101111561124057600080fd5b600095505b83861015611263578035835260019590950194918601918601611245565b5096505050606088013592508083111561127c57600080fd5b505061128a87828801611024565b91505092959194509250565b6000806000606084860312156112ab57600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156112fa578351835292840192918401916001016112de565b50909695505050505050565b600060208083528351808285015260005b8181101561133357858101830151858201604001528201611317565b81811115611345576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611384576113846113ec565b604052919050565b600067ffffffffffffffff8211156113a6576113a66113ec565b5060051b60200190565b600082198211156113d157634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610d3657600080fdfee69c89e4b880e59bbee7bab8e59ca8e4bda0e6898be4b8ade98090e6b890e698bee78eb0e38082e6ada4e59bbee79c8be4bcbce5b9b3e5b9b3e697a0e5a587efbc8ce4bd86e4bda0e88ba5e5b086e4b98be4bca0e4b88ee4b896e4babae5b9b6e5a5bde7949fe588a9e794a8efbc8ce4bebfe4bc9ae59ca8e4b896e997b4e68890e5b0b1e697a0e7a9b7e980a0e58c96e38082a26469706673582212209c47d4b6d7738de531aaaaa76820c3aacb4ebb01634ad39387c7bbd4c411232164736f6c63430008060033";
