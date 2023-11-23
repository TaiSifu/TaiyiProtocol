"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1000002__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1000002__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1000002__factory = WorldEventProcessor1000002__factory;
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
        inputs: [],
        name: "particleNum",
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
        name: "paticleActors",
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516116d03803806116d083398101604081905261002f916100bb565b600080546001600160a01b0319166001600160a01b0383161790558062102ca261005e6100593390565b610069565b600255506100eb9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100cd57600080fd5b81516001600160a01b03811681146100e457600080fd5b9392505050565b6115d6806100fa6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80639d0c025b1161008c578063c0f1619c11610066578063c0f1619c146101fe578063c729329414610214578063ca5bf9a414610237578063f2fde38b1461024057600080fd5b80639d0c025b14610184578063a71d6e3b146101d7578063b4ae1235146101eb57600080fd5b8063715018a6116100c8578063715018a61461013b5780637c99f6a6146101435780637e997b54146101565780638da5cb5b1461016957600080fd5b8063127ce1cc146100ef57806333dd893f146101045780634849f6561461011b575b600080fd5b6101026100fd3660046112d3565b610253565b005b6003545b6040519081526020015b60405180910390f35b61012e6101293660046112d3565b6102b3565b6040516101129190611428565b6101026102c4565b6101026101513660046113fc565b61032a565b6101086101643660046112d3565b6104e1565b6001546040516001600160a01b039091168152602001610112565b6101ca6101923660046112d3565b5060408051808201909152601e81527fe4bda0e587bae78eb0e4ba86efbc8ce698afe4b8aae58589e5ad90e380820000602082015290565b604051610112919061146c565b61012e6101e53660046112d3565b50606090565b6101026101f9366004611327565b610502565b61010861020c366004611305565b505060025490565b610227610222366004611305565b610688565b6040519015158152602001610112565b61010860025481565b61010261024e3660046111df565b6107e8565b61025d60016108b3565b6102ae5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60606102be82610b4c565b92915050565b6001546001600160a01b0316331461031e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102a5565b61032860006110a0565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561036d57600080fd5b505afa158015610381573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a591906111fc565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016103d291815260200190565b60206040518083038186803b1580156103ea57600080fd5b505afa1580156103fe573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061042291906112b1565b61045c5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b60448201526064016102a5565b610465816108b3565b6104a95760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b60448201526064016102a5565b5050600380546001810182556000919091527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b015550565b600381815481106104f157600080fd5b600091825260209091200154905081565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561054557600080fd5b505afa158015610559573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057d91906111fc565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016105aa91815260200190565b60206040518083038186803b1580156105c257600080fd5b505afa1580156105d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105fa91906112b1565b6106345760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b60448201526064016102a5565b61063d816108b3565b6106815760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b60448201526064016102a5565b5050505050565b600080546040516340d9124560e11b81526103ea600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156106d357600080fd5b505afa1580156106e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061070b91906111fc565b604051637d1f0aab60e01b8152600481018790529091506000906001600160a01b03831690637d1f0aab9060240160006040518083038186803b15801561075157600080fd5b505afa158015610765573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261078d9190810190611219565b905060005b81518110156107dd578181815181106107ad576107ad61155f565b602002602001015161271314156107cb5760009450505050506102be565b806107d58161152e565b915050610792565b509195945050505050565b6001546001600160a01b031633146108425760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102a5565b6001600160a01b0381166108a75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016102a5565b6108b0816110a0565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b1580156108f857600080fd5b505afa15801561090c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093091906111fc565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b15801561097557600080fd5b505afa158015610989573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ad91906111fc565b6001600160a01b03161480610a4257506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b1580156109ff57600080fd5b505afa158015610a13573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a3791906111fc565b6001600160a01b0316145b80610b4557506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610a9057600080fd5b505afa158015610aa4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac891906111fc565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610b0d57600080fd5b505afa158015610b21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b4591906112b1565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610bbb57600080fd5b505afa158015610bcf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf391906111fc565b90506101f46001600160a01b038216633f9fdf3c610c138761014b611516565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610c5257600080fd5b505afa158015610c66573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c8a91906112ec565b1015610c97576000610c9a565b60015b60ff1682600081518110610cb057610cb061155f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610cd9876102cf611516565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d1857600080fd5b505afa158015610d2c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d5091906112ec565b1015610d5d576000610d60565b60015b60ff1682600181518110610d7657610d7661155f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610d9f876103f5611516565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610dde57600080fd5b505afa158015610df2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1691906112ec565b1015610e23576000610e26565b60015b60ff1682600281518110610e3c57610e3c61155f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610e65876104d5611516565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610ea457600080fd5b505afa158015610eb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610edc91906112ec565b1015610ee9576000610eec565b60015b60ff1682600381518110610f0257610f0261155f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610f2b87610851611516565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f6a57600080fd5b505afa158015610f7e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fa291906112ec565b1015610faf576000610fb2565b60015b60ff1682600481518110610fc857610fc861155f565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610ff1876135bd611516565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561103057600080fd5b505afa158015611044573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061106891906112ec565b1015611075576000611078565b60015b60ff168260058151811061108e5761108e61155f565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261110457600080fd5b82356020611119611114836114f2565b6114c1565b80838252828201915082870188848660051b8a0101111561113957600080fd5b60005b858110156111d157813567ffffffffffffffff8082111561115c57600080fd5b818b0191508b603f83011261117057600080fd5b8682013560408282111561118657611186611575565b611197828c01601f19168a016114c1565b92508183528d818386010111156111ad57600080fd5b818185018a850137506000908201880152855250928401929084019060010161113c565b509098975050505050505050565b6000602082840312156111f157600080fd5b8135610b458161158b565b60006020828403121561120e57600080fd5b8151610b458161158b565b6000602080838503121561122c57600080fd5b825167ffffffffffffffff81111561124357600080fd5b8301601f8101851361125457600080fd5b8051611262611114826114f2565b80828252848201915084840188868560051b870101111561128257600080fd5b600094505b838510156112a5578051835260019490940193918501918501611287565b50979650505050505050565b6000602082840312156112c357600080fd5b81518015158114610b4557600080fd5b6000602082840312156112e557600080fd5b5035919050565b6000602082840312156112fe57600080fd5b5051919050565b6000806040838503121561131857600080fd5b50508035926020909101359150565b6000806000806080858703121561133d57600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561136457600080fd5b818801915088601f83011261137857600080fd5b8135611386611114826114f2565b8082825285820191508585018c878560051b88010111156113a657600080fd5b600095505b838610156113c95780358352600195909501949186019186016113ab565b509650505060608801359250808311156113e257600080fd5b50506113f0878288016110f2565b91505092959194509250565b60008060006060848603121561141157600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b8181101561146057835183529284019291840191600101611444565b50909695505050505050565b600060208083528351808285015260005b818110156114995785810183015185820160400152820161147d565b818111156114ab576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156114ea576114ea611575565b604052919050565b600067ffffffffffffffff82111561150c5761150c611575565b5060051b60200190565b6000821982111561152957611529611549565b500190565b600060001982141561154257611542611549565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146108b057600080fdfea2646970667358221220605fe6415fc72fb6084457b93ab2e29942c714e168b6cd427111e78fdffc1b9364736f6c63430008060033";
