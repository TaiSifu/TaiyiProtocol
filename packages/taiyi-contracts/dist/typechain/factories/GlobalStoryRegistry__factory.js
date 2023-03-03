"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStoryRegistry__factory = void 0;
const ethers_1 = require("ethers");
class GlobalStoryRegistry__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_route, _moduleID, overrides) {
        return super.deploy(_route, _moduleID, overrides || {});
    }
    getDeployTransaction(_route, _moduleID, overrides) {
        return super.getDeployTransaction(_route, _moduleID, overrides || {});
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
exports.GlobalStoryRegistry__factory = GlobalStoryRegistry__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "contract WorldContractRoute",
                name: "_route",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_moduleID",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_storyEvtId",
                type: "uint256",
            },
        ],
        name: "canStoryRepeat",
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
        inputs: [
            {
                internalType: "uint256",
                name: "_storyEvtId",
                type: "uint256",
            },
        ],
        name: "hasStory",
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
        name: "moduleID",
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
                name: "_storyEvtId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_canRepeat",
                type: "uint256",
            },
        ],
        name: "registerStory",
        outputs: [],
        stateMutability: "nonpayable",
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
                name: "_storyEvtId",
                type: "uint256",
            },
        ],
        name: "removeStory",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_index",
                type: "uint256",
            },
        ],
        name: "storyByIndex",
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
        name: "storyNum",
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
        name: "tokenJSON",
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
            {
                internalType: "uint256",
                name: "_startY",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "tokenSVG",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_endY",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50604051610bb0380380610bb083398101604081905261002f91610058565b600080546001600160a01b0319166001600160a01b039390931692909217909155600155610092565b6000806040838503121561006b57600080fd5b82516001600160a01b038116811461008257600080fd5b6020939093015192949293505050565b610b0f806100a16000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063864f858911610066578063864f85891461010e5780638a94f621146101305780638e47eac9146101385780638f7bb1791461016a578063ba6d69e7146101a257600080fd5b806327c3ab561461009857806333a9c8fa146100cf578063388aa545146100e45780637c3da21e14610105575b600080fd5b6100ba6100a6366004610967565b600090815260036020526040902054151590565b60405190151581526020015b60405180910390f35b6100e26100dd366004610980565b6101b5565b005b6100f76100f2366004610967565b610434565b6040519081526020016100c6565b6100f760015481565b6100ba61011c366004610967565b600090815260046020526040902054151590565b6002546100f7565b61015c6101463660046109a2565b5060408051602081019091526000815292909150565b6040516100c6929190610a2e565b610195610178366004610967565b506040805180820190915260028152617b7d60f01b602082015290565b6040516100c69190610a1b565b6100e26101b03660046109a2565b61045b565b6000546040516340d9124560e11b815260048082015283916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156101f857600080fd5b505afa15801561020c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102309190610928565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161025d91815260200190565b60206040518083038186803b15801561027557600080fd5b505afa158015610289573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102ad9190610945565b6102ec5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b60448201526064015b60405180910390fd5b6102f58161068f565b6103395760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b60448201526064016102e3565b600082116103795760405162461bcd60e51b815260206004820152600d60248201526c696e76616c69642073746f727960981b60448201526064016102e3565b6000828152600360205260409020541561042f576002805461039d90600190610a68565b815481106103ad576103ad610aab565b90600052602060002001546002600160036000868152602001908152602001600020546103da9190610a68565b815481106103ea576103ea610aab565b600091825260209091200155600280548061040757610407610a95565b6000828152602080822083016000199081018390559092019092558382526003905260408120555b505050565b60006002828154811061044957610449610aab565b90600052602060002001549050919050565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561049e57600080fd5b505afa1580156104b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d69190610928565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161050391815260200190565b60206040518083038186803b15801561051b57600080fd5b505afa15801561052f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105539190610945565b61058d5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b60448201526064016102e3565b6105968161068f565b6105da5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b60448201526064016102e3565b6000831161061a5760405162461bcd60e51b815260206004820152600d60248201526c696e76616c69642073746f727960981b60448201526064016102e3565b6000838152600360205260409020546106895760025461063b906001610a50565b60008481526003602090815260408083209390935560028054600181019091557f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0186905560049052208290555b50505050565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b1580156106d457600080fd5b505afa1580156106e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061070c9190610928565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b15801561075157600080fd5b505afa158015610765573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107899190610928565b6001600160a01b0316148061081e57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b1580156107db57600080fd5b505afa1580156107ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108139190610928565b6001600160a01b0316145b8061092157506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b15801561086c57600080fd5b505afa158015610880573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a49190610928565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b1580156108e957600080fd5b505afa1580156108fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109219190610945565b9392505050565b60006020828403121561093a57600080fd5b815161092181610ac1565b60006020828403121561095757600080fd5b8151801515811461092157600080fd5b60006020828403121561097957600080fd5b5035919050565b6000806040838503121561099357600080fd5b50508035926020909101359150565b6000806000606084860312156109b757600080fd5b505081359360208301359350604090920135919050565b6000815180845260005b818110156109f4576020818501810151868301820152016109d8565b81811115610a06576000602083870101525b50601f01601f19169290920160200192915050565b60208152600061092160208301846109ce565b604081526000610a4160408301856109ce565b90508260208301529392505050565b60008219821115610a6357610a63610a7f565b500190565b600082821015610a7a57610a7a610a7f565b500390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6001600160a01b0381168114610ad657600080fd5b5056fea2646970667358221220a07f2cd5cb8b20939c4f10345ef515154d76b37b522269dfde3dbec139677e8b64736f6c63430008060033";
