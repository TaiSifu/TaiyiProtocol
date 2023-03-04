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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161170838038061170883398101604081905261002f916100b8565b600080546001600160a01b0319166001600160a01b038316178155819061005b6100563390565b610066565b600255506100e89050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100ca57600080fd5b81516001600160a01b03811681146100e157600080fd5b9392505050565b611611806100f76000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610161578063c0f1619c14610174578063c729329414610198578063ca5bf9a4146101be578063f2fde38b146101c757600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004611331565b6101da565b005b6100e16100dc366004611331565b61023a565b6040516100ee9190611486565b60405180910390f35b6100cc61024b565b6100cc61010d36600461145a565b6102b1565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b366004611331565b6106f7565b6040516100ee91906114ca565b6100e161015b366004611331565b50606090565b6100cc61016f366004611385565b610758565b61018a610182366004611363565b505060025490565b6040519081526020016100ee565b6101ae6101a6366004611363565b600192915050565b60405190151581526020016100ee565b61018a60025481565b6100cc6101d53660046112d5565b6108de565b6101e460016109a9565b6102355760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061024582610c42565b92915050565b6001546001600160a01b031633146102a55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022c565b6102af6000611196565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102f457600080fd5b505afa158015610308573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032c91906112f2565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035991815260200190565b60206040518083038186803b15801561037157600080fd5b505afa158015610385573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a9919061130f565b6103e35760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161022c565b6103ec816109a9565b6104305760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161022c565b600080546040516340d9124560e11b8152600160048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561047557600080fd5b505afa158015610489573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ad91906112f2565b604051630fe7f7cf60e21b815260048101869052600660248201529091506000906001600160a01b03831690633f9fdf3c9060440160206040518083038186803b1580156104fa57600080fd5b505afa15801561050e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610532919061134a565b61053d906014611574565b905060006001600160a01b038316633f9fdf3c61055b886001611574565b6040516001600160e01b031960e084901b16815260048101919091526009602482015260440160206040518083038186803b15801561059957600080fd5b505afa1580156105ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d1919061134a565b600080546040516340d9124560e11b81526007600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561061b57600080fd5b505afa15801561062f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065391906112f2565b6040516315c7bf4560e31b8152600481018a9052602481018590526064604482018190528101849052608481018990529091506001600160a01b0382169063ae3dfa289060a401602060405180830381600087803b1580156106b457600080fd5b505af11580156106c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ec919061134a565b505050505050505050565b6060604051602001610742907fe4bd9ce4b8bae8b594e581bfefbc8ce5b08fe5ada9e98081e4ba86e4bda0e4b881526c4073505bf3d25e73c4d4f1c04160991b6020820152602d0190565b6040516020818303038152906040529050919050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561079b57600080fd5b505afa1580156107af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d391906112f2565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161080091815260200190565b60206040518083038186803b15801561081857600080fd5b505afa15801561082c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610850919061130f565b61088a5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b604482015260640161022c565b610893816109a9565b6108d75760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604482015260640161022c565b5050505050565b6001546001600160a01b031633146109385760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022c565b6001600160a01b03811661099d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161022c565b6109a681611196565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b1580156109ee57600080fd5b505afa158015610a02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2691906112f2565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610a6b57600080fd5b505afa158015610a7f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa391906112f2565b6001600160a01b03161480610b3857506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610af557600080fd5b505afa158015610b09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2d91906112f2565b6001600160a01b0316145b80610c3b57506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610b8657600080fd5b505afa158015610b9a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bbe91906112f2565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610c0357600080fd5b505afa158015610c17573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3b919061130f565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610cb157600080fd5b505afa158015610cc5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce991906112f2565b90506101f46001600160a01b038216633f9fdf3c610d098761014b611574565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d4857600080fd5b505afa158015610d5c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d80919061134a565b1015610d8d576000610d90565b60015b60ff1682600081518110610da657610da661159a565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610dcf876102cf611574565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e0e57600080fd5b505afa158015610e22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e46919061134a565b1015610e53576000610e56565b60015b60ff1682600181518110610e6c57610e6c61159a565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610e95876103f5611574565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610ed457600080fd5b505afa158015610ee8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0c919061134a565b1015610f19576000610f1c565b60015b60ff1682600281518110610f3257610f3261159a565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610f5b876104d5611574565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f9a57600080fd5b505afa158015610fae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fd2919061134a565b1015610fdf576000610fe2565b60015b60ff1682600381518110610ff857610ff861159a565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61102187610851611574565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561106057600080fd5b505afa158015611074573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611098919061134a565b10156110a55760006110a8565b60015b60ff16826004815181106110be576110be61159a565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6110e7876135bd611574565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561112657600080fd5b505afa15801561113a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061115e919061134a565b101561116b57600061116e565b60015b60ff16826005815181106111845761118461159a565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f83818401126111fa57600080fd5b8235602061120f61120a83611550565b61151f565b80838252828201915082870188848660051b8a0101111561122f57600080fd5b60005b858110156112c757813567ffffffffffffffff8082111561125257600080fd5b818b0191508b603f83011261126657600080fd5b8682013560408282111561127c5761127c6115b0565b61128d828c01601f19168a0161151f565b92508183528d818386010111156112a357600080fd5b818185018a8501375060009082018801528552509284019290840190600101611232565b509098975050505050505050565b6000602082840312156112e757600080fd5b8135610c3b816115c6565b60006020828403121561130457600080fd5b8151610c3b816115c6565b60006020828403121561132157600080fd5b81518015158114610c3b57600080fd5b60006020828403121561134357600080fd5b5035919050565b60006020828403121561135c57600080fd5b5051919050565b6000806040838503121561137657600080fd5b50508035926020909101359150565b6000806000806080858703121561139b57600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156113c257600080fd5b818801915088601f8301126113d657600080fd5b81356113e461120a82611550565b8082825285820191508585018c878560051b880101111561140457600080fd5b600095505b83861015611427578035835260019590950194918601918601611409565b5096505050606088013592508083111561144057600080fd5b505061144e878288016111e8565b91505092959194509250565b60008060006060848603121561146f57600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156114be578351835292840192918401916001016114a2565b50909695505050505050565b600060208083528351808285015260005b818110156114f7578581018301518582016040015282016114db565b81811115611509576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611548576115486115b0565b604052919050565b600067ffffffffffffffff82111561156a5761156a6115b0565b5060051b60200190565b6000821982111561159557634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146109a657600080fdfea26469706673582212208b228d2c276227cf798a6fae9ea09e4b0971a8fc44fa84244fa0d2ef26ddac8d64736f6c63430008060033";
