"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldContractRoute__factory = void 0;
const ethers_1 = require("ethers");
class WorldContractRoute__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
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
exports.WorldContractRoute__factory = WorldContractRoute__factory;
const _abi = [
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
        name: "ACTOR_PANGU",
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
        name: "actors",
        outputs: [
            {
                internalType: "contract IActors",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "actorsAddress",
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
                name: "",
                type: "uint256",
            },
        ],
        name: "modules",
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
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "registerActors",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "registerModule",
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
];
const _bytecode = "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6108be8061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806381b2248a1161006657806381b2248a146100fb5780638da5cb5b14610124578063cc7f0c2414610135578063dcac11c214610148578063f2fde38b1461015b57600080fd5b80631e8cee66146100985780632e727881146100c8578063353d7737146100dd578063715018a6146100f3575b600080fd5b6002546100ab906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100db6100d636600461080e565b61016e565b005b6100e5600181565b6040519081526020016100bf565b6100db6102f5565b6100ab6101093660046107dc565b6001602052600090815260409020546001600160a01b031681565b6000546001600160a01b03166100ab565b6003546100ab906001600160a01b031681565b6100db610156366004610779565b61032b565b6100db610169366004610779565b610469565b6101786001610504565b6101b65760405162461bcd60e51b815260206004820152600a6024820152696f6e6c792050616e477560b01b60448201526064015b60405180910390fd5b806001600160a01b0381166102075760405162461bcd60e51b815260206004820152601760248201527663616e6e6f7420736574207a65726f206164647265737360481b60448201526064016101ad565b82826001600160a01b0316637c3da21e6040518163ffffffff1660e01b815260040160206040518083038186803b15801561024157600080fd5b505afa158015610255573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061027991906107f5565b146102c65760405162461bcd60e51b815260206004820152601760248201527f6d6f64756c65206964206973206e6f74206d617463682e00000000000000000060448201526064016101ad565b5060009182526001602052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b6000546001600160a01b0316331461031f5760405162461bcd60e51b81526004016101ad9061083e565b6103296000610729565b565b6000546001600160a01b031633146103555760405162461bcd60e51b81526004016101ad9061083e565b806001600160a01b0381166103a65760405162461bcd60e51b815260206004820152601760248201527663616e6e6f7420736574207a65726f206164647265737360481b60448201526064016101ad565b6002546001600160a01b03161561040a5760405162461bcd60e51b815260206004820152602260248201527f4163746f7273206164647265737320616c726561647920726567697374657265604482015261321760f11b60648201526084016101ad565b50600280546001600160a01b039092166001600160a01b03199283168117909155600380548316821790556000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb498054909216179055565b6000546001600160a01b031633146104935760405162461bcd60e51b81526004016101ad9061083e565b6001600160a01b0381166104f85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101ad565b61050181610729565b50565b60035460405163020604bf60e21b81526004810183905260009133916001600160a01b039091169063081812fc9060240160206040518083038186803b15801561054d57600080fd5b505afa158015610561573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610585919061079d565b6001600160a01b0316148061061c57506003546040516331a9108f60e11b81526004810184905233916001600160a01b031690636352211e9060240160206040518083038186803b1580156105d957600080fd5b505afa1580156105ed573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610611919061079d565b6001600160a01b0316145b8061072357506003546040516331a9108f60e11b8152600481018490526001600160a01b039091169063e985e9c5908290636352211e9060240160206040518083038186803b15801561066e57600080fd5b505afa158015610682573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a6919061079d565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b1580156106eb57600080fd5b505afa1580156106ff573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072391906107ba565b92915050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561078b57600080fd5b813561079681610873565b9392505050565b6000602082840312156107af57600080fd5b815161079681610873565b6000602082840312156107cc57600080fd5b8151801515811461079657600080fd5b6000602082840312156107ee57600080fd5b5035919050565b60006020828403121561080757600080fd5b5051919050565b6000806040838503121561082157600080fd5b82359150602083013561083381610873565b809150509250929050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6001600160a01b038116811461050157600080fdfea264697066735822122035f6683a83d89717934d8251d52a6ef557d13749e66b6da542ec32607b07477e64736f6c63430008060033";
