"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1000013__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1000013__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1000013__factory = WorldEventProcessor1000013__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161186438038061186483398101604081905261002f916100bb565b600080546001600160a01b0319166001600160a01b03831617905580620f424061005e6100593390565b610069565b600255506100eb9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100cd57600080fd5b81516001600160a01b03811681146100e457600080fd5b9392505050565b61176a806100fa6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a71d6e3b11610071578063a71d6e3b1461014d578063b4ae123514610161578063c0f1619c14610174578063c729329414610198578063ca5bf9a4146101bb578063f2fde38b146101c457600080fd5b8063127ce1cc146100b95780634849f656146100ce578063715018a6146100f75780637c99f6a6146100ff5780638da5cb5b146101125780639d0c025b1461012d575b600080fd5b6100cc6100c7366004611439565b6101d7565b005b6100e16100dc366004611439565b610237565b6040516100ee919061158e565b60405180910390f35b6100cc610248565b6100cc61010d366004611562565b6102ae565b6001546040516001600160a01b0390911681526020016100ee565b61014061013b366004611439565b610433565b6040516100ee91906115d2565b6100e161015b366004611439565b50606090565b6100cc61016f36600461148d565b610454565b61018a61018236600461146b565b505060025490565b6040519081526020016100ee565b6101ab6101a636600461146b565b6105da565b60405190151581526020016100ee565b61018a60025481565b6100cc6101d23660046113dd565b6109e6565b6101e16001610ab1565b6102325760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061024282610d4a565b92915050565b6001546001600160a01b031633146102a25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610229565b6102ac600061129e565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156102f157600080fd5b505afa158015610305573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032991906113fa565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161035691815260200190565b60206040518083038186803b15801561036e57600080fd5b505afa158015610382573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a69190611417565b6103e05760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610229565b6103e981610ab1565b61042d5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610229565b50505050565b60606040518060800160405280605181526020016116e46051913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561049757600080fd5b505afa1580156104ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104cf91906113fa565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016104fc91815260200190565b60206040518083038186803b15801561051457600080fd5b505afa158015610528573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054c9190611417565b6105865760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610229565b61058f81610ab1565b6105d35760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610229565b5050505050565b600080546040516340d9124560e11b81526103e9600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561062557600080fd5b505afa158015610639573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065d91906113fa565b60405163b7876f5760e01b815260048101879052620f424d60248201529091506000906001600160a01b0383169063b7876f579060440160206040518083038186803b1580156106ac57600080fd5b505afa1580156106c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e49190611452565b11156106f557600092505050610242565b60405163b7876f5760e01b815260048101869052620f424260248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561074157600080fd5b505afa158015610755573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107799190611452565b111561078a57600092505050610242565b60405163b7876f5760e01b815260048101869052620f424a60248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b1580156107d657600080fd5b505afa1580156107ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080e9190611452565b111561081f57600092505050610242565b60405163b7876f5760e01b815260048101869052620f906c60248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561086b57600080fd5b505afa15801561087f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a39190611452565b11156108b457600092505050610242565b60405163b7876f5760e01b815260048101869052620f906d60248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561090057600080fd5b505afa158015610914573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109389190611452565b111561094957600092505050610242565b60405163b7876f5760e01b815260048101869052620f906e60248201526000906001600160a01b0383169063b7876f579060440160206040518083038186803b15801561099557600080fd5b505afa1580156109a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109cd9190611452565b11156109de57600092505050610242565b509392505050565b6001546001600160a01b03163314610a405760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610229565b6001600160a01b038116610aa55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610229565b610aae8161129e565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610af657600080fd5b505afa158015610b0a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2e91906113fa565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610b7357600080fd5b505afa158015610b87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bab91906113fa565b6001600160a01b03161480610c4057506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610bfd57600080fd5b505afa158015610c11573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3591906113fa565b6001600160a01b0316145b80610d4357506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610c8e57600080fd5b505afa158015610ca2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc691906113fa565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610d0b57600080fd5b505afa158015610d1f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d439190611417565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610db957600080fd5b505afa158015610dcd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610df191906113fa565b90506101f46001600160a01b038216633f9fdf3c610e118761014b61167c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e5057600080fd5b505afa158015610e64573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e889190611452565b1015610e95576000610e98565b60015b60ff1682600081518110610eae57610eae6116a2565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610ed7876102cf61167c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f1657600080fd5b505afa158015610f2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f4e9190611452565b1015610f5b576000610f5e565b60015b60ff1682600181518110610f7457610f746116a2565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610f9d876103f561167c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610fdc57600080fd5b505afa158015610ff0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110149190611452565b1015611021576000611024565b60015b60ff168260028151811061103a5761103a6116a2565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611063876104d561167c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156110a257600080fd5b505afa1580156110b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110da9190611452565b10156110e75760006110ea565b60015b60ff1682600381518110611100576111006116a2565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6111298761085161167c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561116857600080fd5b505afa15801561117c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111a09190611452565b10156111ad5760006111b0565b60015b60ff16826004815181106111c6576111c66116a2565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6111ef876135bd61167c565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561122e57600080fd5b505afa158015611242573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112669190611452565b1015611273576000611276565b60015b60ff168260058151811061128c5761128c6116a2565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f838184011261130257600080fd5b8235602061131761131283611658565b611627565b80838252828201915082870188848660051b8a0101111561133757600080fd5b60005b858110156113cf57813567ffffffffffffffff8082111561135a57600080fd5b818b0191508b603f83011261136e57600080fd5b86820135604082821115611384576113846116b8565b611395828c01601f19168a01611627565b92508183528d818386010111156113ab57600080fd5b818185018a850137506000908201880152855250928401929084019060010161133a565b509098975050505050505050565b6000602082840312156113ef57600080fd5b8135610d43816116ce565b60006020828403121561140c57600080fd5b8151610d43816116ce565b60006020828403121561142957600080fd5b81518015158114610d4357600080fd5b60006020828403121561144b57600080fd5b5035919050565b60006020828403121561146457600080fd5b5051919050565b6000806040838503121561147e57600080fd5b50508035926020909101359150565b600080600080608085870312156114a357600080fd5b843593506020808601359350604086013567ffffffffffffffff808211156114ca57600080fd5b818801915088601f8301126114de57600080fd5b81356114ec61131282611658565b8082825285820191508585018c878560051b880101111561150c57600080fd5b600095505b8386101561152f578035835260019590950194918601918601611511565b5096505050606088013592508083111561154857600080fd5b5050611556878288016112f0565b91505092959194509250565b60008060006060848603121561157757600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b818110156115c6578351835292840192918401916001016115aa565b50909695505050505050565b600060208083528351808285015260005b818110156115ff578581018301518582016040015282016115e3565b81811115611611576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611650576116506116b8565b604052919050565b600067ffffffffffffffff821115611672576116726116b8565b5060051b60200190565b6000821982111561169d57634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610aae57600080fdfee4bda0e981ade98187e4b880e4b8aae58f8de7b292e5ad90efbc8ce58f91e7949fe4ba86e6bf80e78388e79a84e6b9aee781adefbc8ce5bdbce6ada4e58c96e4b8bae4b880e68ab9e883bde9878fe38082a26469706673582212203f0059f287a7ce94b752400ac9bdd7028543d14564cf6e847d8df7be8438f7dc64736f6c63430008060033";
