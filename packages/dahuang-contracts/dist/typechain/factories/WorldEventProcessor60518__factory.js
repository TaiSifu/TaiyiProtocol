"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor60518__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor60518__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor60518__factory = WorldEventProcessor60518__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516116b73803806116b783398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b6115c0806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610161578063c0f1619c14610174578063c729329414610198578063ca5bf9a4146101bb578063f2fde38b146101c457600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c736600461129b565b6101d7565b005b6100e16100dc36600461129b565b610237565b6040516100ee91906113f0565b60405180910390f35b6100cc610248565b6100cc61010d3660046113c4565b6102ae565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b36600461129b565b610433565b6040516100ee9190611434565b6100e161015b36600461129b565b50606090565b6100cc61016f3660046112ef565b610454565b61018a6101823660046112cd565b505060025490565b6040519081526020016100ee565b6101ab6101a63660046112cd565b610833565b60405190151581526020016100ee565b61018a60025481565b6100cc6101d236600461123f565b61084f565b6101e1600161091a565b6102325760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061024282610bac565b92915050565b6001546001600160a01b031633146102a25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610229565b6102ac6000611100565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102f157600080fd5b505afa158015610305573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610329919061125c565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035691815260200190565b60206040518083038186803b15801561036e57600080fd5b505afa158015610382573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a69190611279565b6103e05760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610229565b6103e98161091a565b61042d5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610229565b50505050565b60606040518060800160405280604581526020016115466045913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561049757600080fd5b505afa1580156104ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104cf919061125c565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016104fc91815260200190565b60206040518083038186803b15801561051457600080fd5b505afa158015610528573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054c9190611279565b6105865760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610229565b61058f8161091a565b6105d35760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610229565b82516003146106185760405162461bcd60e51b81526020600482015260116024820152701c185c985b5cc81a5cc81a5b9d985b1a59607a1b6044820152606401610229565b60008360008151811061062d5761062d611504565b6020026020010151905060008460018151811061064c5761064c611504565b6020026020010151905060008560028151811061066b5761066b611504565b6020908102919091010151600080546040516340d9124560e11b81526004810186905292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156106c057600080fd5b505afa1580156106d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106f8919061125c565b60405163793d9c8760e11b81526004810186905290915082906001600160a01b0383169063f27b390e9060240160206040518083038186803b15801561073d57600080fd5b505afa158015610751573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061077591906112b4565b10156107b95760405162461bcd60e51b81526020600482015260136024820152720c2e6e6cae840d2e640dcdee840cadcdeeaced606b1b6044820152606401610229565b604051631e351d6760e31b8152600481018a905260248101859052604481018a9052606481018390526001600160a01b0382169063f1a8eb3890608401600060405180830381600087803b15801561081057600080fd5b505af1158015610824573d6000803e3d6000fd5b50505050505050505050505050565b60006001838114610848576000915050610242565b9392505050565b6001546001600160a01b031633146108a95760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610229565b6001600160a01b03811661090e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610229565b61091781611100565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561095f57600080fd5b505afa158015610973573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610997919061125c565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b1580156109dc57600080fd5b505afa1580156109f0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a14919061125c565b6001600160a01b03161480610aa957506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610a6657600080fd5b505afa158015610a7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a9e919061125c565b6001600160a01b0316145b8061084857506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610af757600080fd5b505afa158015610b0b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2f919061125c565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610b7457600080fd5b505afa158015610b88573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108489190611279565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610c1b57600080fd5b505afa158015610c2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c53919061125c565b90506101f46001600160a01b038216633f9fdf3c610c738761014b6114de565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610cb257600080fd5b505afa158015610cc6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cea91906112b4565b1015610cf7576000610cfa565b60015b60ff1682600081518110610d1057610d10611504565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610d39876102cf6114de565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d7857600080fd5b505afa158015610d8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db091906112b4565b1015610dbd576000610dc0565b60015b60ff1682600181518110610dd657610dd6611504565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610dff876103f56114de565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e3e57600080fd5b505afa158015610e52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e7691906112b4565b1015610e83576000610e86565b60015b60ff1682600281518110610e9c57610e9c611504565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610ec5876104d56114de565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f0457600080fd5b505afa158015610f18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f3c91906112b4565b1015610f49576000610f4c565b60015b60ff1682600381518110610f6257610f62611504565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610f8b876108516114de565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610fca57600080fd5b505afa158015610fde573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061100291906112b4565b101561100f576000611012565b60015b60ff168260048151811061102857611028611504565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611051876135bd6114de565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561109057600080fd5b505afa1580156110a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110c891906112b4565b10156110d55760006110d8565b60015b60ff16826005815181106110ee576110ee611504565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261116457600080fd5b82356020611179611174836114ba565b611489565b80838252828201915082870188848660051b8a0101111561119957600080fd5b60005b8581101561123157813567ffffffffffffffff808211156111bc57600080fd5b818b0191508b603f8301126111d057600080fd5b868201356040828211156111e6576111e661151a565b6111f7828c01601f19168a01611489565b92508183528d8183860101111561120d57600080fd5b818185018a850137506000908201880152855250928401929084019060010161119c565b509098975050505050505050565b60006020828403121561125157600080fd5b813561084881611530565b60006020828403121561126e57600080fd5b815161084881611530565b60006020828403121561128b57600080fd5b8151801515811461084857600080fd5b6000602082840312156112ad57600080fd5b5035919050565b6000602082840312156112c657600080fd5b5051919050565b600080604083850312156112e057600080fd5b50508035926020909101359150565b6000806000806080858703121561130557600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561132c57600080fd5b818801915088601f83011261134057600080fd5b813561134e611174826114ba565b8082825285820191508585018c878560051b880101111561136e57600080fd5b600095505b83861015611391578035835260019590950194918601918601611373565b509650505060608801359250808311156113aa57600080fd5b50506113b887828801611152565b91505092959194509250565b6000806000606084860312156113d957600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156114285783518352928401929184019160010161140c565b50909695505050505050565b600060208083528351808285015260005b8181101561146157858101830151858201604001528201611445565b81811115611473576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156114b2576114b261151a565b604052919050565b600067ffffffffffffffff8211156114d4576114d461151a565b5060051b60200190565b600082198211156114ff57634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461091757600080fdfee8a681e6b182e5a4aae4b999e69d91e69d91e995bfe68d90e587bae4b880e5ae9ae79a84e8b584e6ba90e4bd9ce4b8bae7a4bee4bc9ae5bbbae8aebee59fbae98791e38082a26469706673582212201bc96c32c37f7a48ffcd604b5cab58f4ccae2d62c52fa058a423f2d5ed99e79964736f6c63430008060033";
