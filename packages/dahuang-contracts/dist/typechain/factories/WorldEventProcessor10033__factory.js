"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor10033__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor10033__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor10033__factory = WorldEventProcessor10033__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405162001a4638038062001a46833981016040819052610031916100ba565b600080546001600160a01b0319166001600160a01b038316178155819061005d6100583390565b610068565b600255506100ea9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100cc57600080fd5b81516001600160a01b03811681146100e357600080fd5b9392505050565b61194c80620000fa6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610161578063c0f1619c14610174578063c729329414610198578063ca5bf9a4146101be578063f2fde38b146101c757600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c73660046115d7565b6101da565b005b6100e16100dc3660046115d7565b61023a565b6040516100ee919061178b565b60405180910390f35b6100cc61024b565b6100cc61010d366004611700565b6102b1565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b3660046115d7565b6106f7565b6040516100ee91906117cf565b6100e161015b3660046115d7565b50606090565b6100cc61016f36600461162b565b610943565b61018a610182366004611609565b505060025490565b6040519081526020016100ee565b6101ae6101a6366004611609565b600192915050565b60405190151581526020016100ee565b61018a60025481565b6100cc6101d53660046114f3565b610ac9565b6101e46001610b94565b6102355760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061024582610e2d565b92915050565b6001546001600160a01b031633146102a55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022c565b6102af6000611381565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102f457600080fd5b505afa158015610308573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032c9190611510565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035991815260200190565b60206040518083038186803b15801561037157600080fd5b505afa158015610385573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a9919061152d565b6103e35760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161022c565b6103ec81610b94565b6104305760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161022c565b600080546040516340d9124560e11b8152600160048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561047557600080fd5b505afa158015610489573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ad9190611510565b604051630fe7f7cf60e21b815260048101869052600660248201529091506000906001600160a01b03831690633f9fdf3c9060440160206040518083038186803b1580156104fa57600080fd5b505afa15801561050e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053291906115f0565b61053d90601461187f565b905060006001600160a01b038316633f9fdf3c61055b88600161187f565b6040516001600160e01b031960e084901b16815260048101919091526009602482015260440160206040518083038186803b15801561059957600080fd5b505afa1580156105ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d191906115f0565b600080546040516340d9124560e11b81526007600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561061b57600080fd5b505afa15801561062f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106539190611510565b6040516315c7bf4560e31b8152600481018a9052602481018590526064604482018190528101849052608481018990529091506001600160a01b0382169063ae3dfa289060a401602060405180830381600087803b1580156106b457600080fd5b505af11580156106c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ec91906115f0565b505050505050505050565b600080546040516340d9124560e11b815260df6004820152606092916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561073e57600080fd5b505afa158015610752573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107769190611510565b60405163b04b5a7b60e01b8152620138816004820152600060248201526001600160a01b03919091169063b04b5a7b9060440160206040518083038186803b1580156107c157600080fd5b505afa1580156107d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f991906115f0565b905080610816575050604080516020810190915260008152919050565b600080546040516340d9124560e11b8152600260048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561085b57600080fd5b505afa15801561086f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108939190611510565b6040516361a49e4360e01b8152600481018490529091506000906001600160a01b038316906361a49e439060240160006040518083038186803b1580156108d957600080fd5b505afa1580156108ed573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610915919081019061154f565b505090508060405160200161092a919061172c565b6040516020818303038152906040529350505050919050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561098657600080fd5b505afa15801561099a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109be9190611510565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016109eb91815260200190565b60206040518083038186803b158015610a0357600080fd5b505afa158015610a17573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a3b919061152d565b610a755760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161022c565b610a7e81610b94565b610ac25760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161022c565b5050505050565b6001546001600160a01b03163314610b235760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022c565b6001600160a01b038116610b885760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161022c565b610b9181611381565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610bd957600080fd5b505afa158015610bed573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c119190611510565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610c5657600080fd5b505afa158015610c6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c8e9190611510565b6001600160a01b03161480610d2357506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610ce057600080fd5b505afa158015610cf4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d189190611510565b6001600160a01b0316145b80610e2657506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610d7157600080fd5b505afa158015610d85573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da99190611510565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610dee57600080fd5b505afa158015610e02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e26919061152d565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610e9c57600080fd5b505afa158015610eb0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed49190611510565b90506101f46001600160a01b038216633f9fdf3c610ef48761014b61187f565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f3357600080fd5b505afa158015610f47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f6b91906115f0565b1015610f78576000610f7b565b60015b60ff1682600081518110610f9157610f916118d5565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610fba876102cf61187f565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610ff957600080fd5b505afa15801561100d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061103191906115f0565b101561103e576000611041565b60015b60ff1682600181518110611057576110576118d5565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611080876103f561187f565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156110bf57600080fd5b505afa1580156110d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110f791906115f0565b1015611104576000611107565b60015b60ff168260028151811061111d5761111d6118d5565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611146876104d561187f565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561118557600080fd5b505afa158015611199573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111bd91906115f0565b10156111ca5760006111cd565b60015b60ff16826003815181106111e3576111e36118d5565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61120c8761085161187f565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561124b57600080fd5b505afa15801561125f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061128391906115f0565b1015611290576000611293565b60015b60ff16826004815181106112a9576112a96118d5565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6112d2876135bd61187f565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561131157600080fd5b505afa158015611325573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061134991906115f0565b1015611356576000611359565b60015b60ff168260058151811061136f5761136f6118d5565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600082601f8301126113e457600080fd5b813560206113f96113f483611833565b611802565b80838252828201915082860187848660051b890101111561141957600080fd5b60005b8581101561149957813567ffffffffffffffff81111561143b57600080fd5b8801603f81018a1361144c57600080fd5b85810135604061145e6113f483611857565b8281528c8284860101111561147257600080fd5b828285018a830137600092810189019290925250855250928401929084019060010161141c565b5090979650505050505050565b600082601f8301126114b757600080fd5b81516114c56113f482611857565b8181528460208386010111156114da57600080fd5b6114eb8260208301602087016118a5565b949350505050565b60006020828403121561150557600080fd5b8135610e2681611901565b60006020828403121561152257600080fd5b8151610e2681611901565b60006020828403121561153f57600080fd5b81518015158114610e2657600080fd5b60008060006060848603121561156457600080fd5b835167ffffffffffffffff8082111561157c57600080fd5b611588878388016114a6565b9450602086015191508082111561159e57600080fd5b6115aa878388016114a6565b935060408601519150808211156115c057600080fd5b506115cd868287016114a6565b9150509250925092565b6000602082840312156115e957600080fd5b5035919050565b60006020828403121561160257600080fd5b5051919050565b6000806040838503121561161c57600080fd5b50508035926020909101359150565b6000806000806080858703121561164157600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561166857600080fd5b818801915088601f83011261167c57600080fd5b813561168a6113f482611833565b8082825285820191508585018c878560051b88010111156116aa57600080fd5b600095505b838610156116cd5780358352600195909501949186019186016116af565b509650505060608801359250808311156116e657600080fd5b50506116f4878288016113d3565b91505092959194509250565b60008060006060848603121561171557600080fd5b505081359360208301359350604090920135919050565b6e392f67392e2eba2d6539606ffbef23608a1b8152815160009061175781600f8501602087016118a5565b7fe98081e4ba86e4bda0e4b880e6a0b7e7a4bce789a9e380820000000000000000600f939091019283015250602701919050565b6020808252825182820181905260009190848201906040850190845b818110156117c3578351835292840192918401916001016117a7565b50909695505050505050565b60208152600082518060208401526117ee8160408501602087016118a5565b601f01601f19169190910160400192915050565b604051601f8201601f1916810167ffffffffffffffff8111828210171561182b5761182b6118eb565b604052919050565b600067ffffffffffffffff82111561184d5761184d6118eb565b5060051b60200190565b600067ffffffffffffffff821115611871576118716118eb565b50601f01601f191660200190565b600082198211156118a057634e487b7160e01b600052601160045260246000fd5b500190565b60005b838110156118c05781810151838201526020016118a8565b838111156118cf576000848401525b50505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610b9157600080fdfea2646970667358221220bf0f7f86ad53b152acad16ccd1e37e2b824f44b6389ce555b1f648a412f1d4ee64736f6c63430008060033";
