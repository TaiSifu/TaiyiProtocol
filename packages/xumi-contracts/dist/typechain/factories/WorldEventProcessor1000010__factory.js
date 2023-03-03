"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1000010__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1000010__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1000010__factory = WorldEventProcessor1000010__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161167a38038061167a83398101604081905261002f916100bb565b600080546001600160a01b0319166001600160a01b0383161790558062102ca261005e6100593390565b610069565b600255506100eb9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100cd57600080fd5b81516001600160a01b03811681146100e457600080fd5b9392505050565b611580806100fa6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610161578063c0f1619c14610174578063c729329414610198578063ca5bf9a4146101bb578063f2fde38b146101c457600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c736600461124a565b6101d7565b005b6100e16100dc36600461124a565b610237565b6040516100ee919061139f565b60405180910390f35b6100cc610248565b6100cc61010d366004611373565b6102ae565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b36600461124a565b610433565b6040516100ee91906113e3565b6100e161015b36600461124a565b50606090565b6100cc61016f36600461129e565b610454565b61018a61018236600461127c565b505060025490565b6040519081526020016100ee565b6101ab6101a636600461127c565b6105da565b60405190151581526020016100ee565b61018a60025481565b6100cc6101d2366004611156565b61075f565b6101e1600161082a565b6102325760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061024282610ac3565b92915050565b6001546001600160a01b031633146102a25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610229565b6102ac6000611017565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102f157600080fd5b505afa158015610305573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103299190611173565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035691815260200190565b60206040518083038186803b15801561036e57600080fd5b505afa158015610382573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a69190611228565b6103e05760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610229565b6103e98161082a565b61042d5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610229565b50505050565b60606040518060600160405280603381526020016115186033913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561049757600080fd5b505afa1580156104ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104cf9190611173565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016104fc91815260200190565b60206040518083038186803b15801561051457600080fd5b505afa158015610528573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054c9190611228565b6105865760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610229565b61058f8161082a565b6105d35760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610229565b5050505050565b600080546040516340d9124560e11b81526103ea600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561062557600080fd5b505afa158015610639573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065d9190611173565b604051637d1f0aab60e01b8152600481018790529091506000906001600160a01b03831690637d1f0aab9060240160006040518083038186803b1580156106a357600080fd5b505afa1580156106b7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526106df9190810190611190565b905060005b8151811015610754578181815181106106ff576106ff6114d6565b602002602001015161271214806107305750818181518110610723576107236114d6565b6020026020010151612713145b15610742576000945050505050610242565b8061074c816114a5565b9150506106e4565b509195945050505050565b6001546001600160a01b031633146107b95760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610229565b6001600160a01b03811661081e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610229565b61082781611017565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b15801561086f57600080fd5b505afa158015610883573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a79190611173565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b1580156108ec57600080fd5b505afa158015610900573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109249190611173565b6001600160a01b031614806109b957506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561097657600080fd5b505afa15801561098a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ae9190611173565b6001600160a01b0316145b80610abc57506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610a0757600080fd5b505afa158015610a1b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a3f9190611173565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610a8457600080fd5b505afa158015610a98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610abc9190611228565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610b3257600080fd5b505afa158015610b46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b6a9190611173565b90506101f46001600160a01b038216633f9fdf3c610b8a8761014b61148d565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610bc957600080fd5b505afa158015610bdd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c019190611263565b1015610c0e576000610c11565b60015b60ff1682600081518110610c2757610c276114d6565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610c50876102cf61148d565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610c8f57600080fd5b505afa158015610ca3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc79190611263565b1015610cd4576000610cd7565b60015b60ff1682600181518110610ced57610ced6114d6565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610d16876103f561148d565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d5557600080fd5b505afa158015610d69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d8d9190611263565b1015610d9a576000610d9d565b60015b60ff1682600281518110610db357610db36114d6565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610ddc876104d561148d565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e1b57600080fd5b505afa158015610e2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e539190611263565b1015610e60576000610e63565b60015b60ff1682600381518110610e7957610e796114d6565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610ea28761085161148d565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610ee157600080fd5b505afa158015610ef5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f199190611263565b1015610f26576000610f29565b60015b60ff1682600481518110610f3f57610f3f6114d6565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610f68876135bd61148d565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610fa757600080fd5b505afa158015610fbb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fdf9190611263565b1015610fec576000610fef565b60015b60ff1682600581518110611005576110056114d6565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261107b57600080fd5b8235602061109061108b83611469565b611438565b80838252828201915082870188848660051b8a010111156110b057600080fd5b60005b8581101561114857813567ffffffffffffffff808211156110d357600080fd5b818b0191508b603f8301126110e757600080fd5b868201356040828211156110fd576110fd6114ec565b61110e828c01601f19168a01611438565b92508183528d8183860101111561112457600080fd5b818185018a85013750600090820188015285525092840192908401906001016110b3565b509098975050505050505050565b60006020828403121561116857600080fd5b8135610abc81611502565b60006020828403121561118557600080fd5b8151610abc81611502565b600060208083850312156111a357600080fd5b825167ffffffffffffffff8111156111ba57600080fd5b8301601f810185136111cb57600080fd5b80516111d961108b82611469565b80828252848201915084840188868560051b87010111156111f957600080fd5b600094505b8385101561121c5780518352600194909401939185019185016111fe565b50979650505050505050565b60006020828403121561123a57600080fd5b81518015158114610abc57600080fd5b60006020828403121561125c57600080fd5b5035919050565b60006020828403121561127557600080fd5b5051919050565b6000806040838503121561128f57600080fd5b50508035926020909101359150565b600080600080608085870312156112b457600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156112db57600080fd5b818801915088601f8301126112ef57600080fd5b81356112fd61108b82611469565b8082825285820191508585018c878560051b880101111561131d57600080fd5b600095505b83861015611340578035835260019590950194918601918601611322565b5096505050606088013592508083111561135957600080fd5b505061136787828801611069565b91505092959194509250565b60008060006060848603121561138857600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156113d7578351835292840192918401916001016113bb565b50909695505050505050565b600060208083528351808285015260005b81811015611410578581018301518582016040015282016113f4565b81811115611422576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611461576114616114ec565b604052919050565b600067ffffffffffffffff821115611483576114836114ec565b5060051b60200190565b600082198211156114a0576114a06114c0565b500190565b60006000198214156114b9576114b96114c0565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461082757600080fdfee4bda0e587bae78eb0e4ba86efbc8ce698afe69e81e4b8bae7bd95e8a781e79a84e5b88ce6a0bce696afe7b292e5ad90e38082a264697066735822122025c2d939fc488106fd5e00e50c560f2ba33303de5f82e3c4185c85132ca7f0fb64736f6c63430008060033";
