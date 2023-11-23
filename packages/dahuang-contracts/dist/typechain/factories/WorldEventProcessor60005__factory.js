"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor60005__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor60005__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor60005__factory = WorldEventProcessor60005__factory;
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
                name: "_actor",
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
        name: "genesis_left",
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
        name: "genesis_numbers",
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
const _bytecode = "0x606460039081556101e08181526274cddb60e91b6102005260809081526102208281526201c97160ef1b6102405260a05261026082815262392ea360ea1b6102805260c0526102a082815262e4b88960e81b6102c05260e0526102e082815262e59b9b60e81b610300526101005261032082815262392ea560ea1b610340526101205261036082815262e585ad60e81b61038052610140526103a082815262e4b88360e81b6103c052610160526103e082815262e585ab60e81b610400526101805261042082815262e4b99d60e81b610440526101a0526104a060405261046091825262e58d8160e81b610480526101c0919091526200010490600590600b620001c2565b503480156200011257600080fd5b50604051620023d4380380620023d483398101604081905262000135916200032b565b600080546001600160a01b0319166001600160a01b0383161781558190620001646200015e3390565b62000170565b600255506200039a9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b82805482825590600052602060002090810192821562000214579160200282015b828111156200021457825180516200020391849160209091019062000226565b5091602001919060010190620001e3565b5062000222929150620002b1565b5090565b82805462000234906200035d565b90600052602060002090601f016020900481019282620002585760008555620002a3565b82601f106200027357805160ff1916838001178555620002a3565b82800160010185558215620002a3579182015b82811115620002a357825182559160200191906001019062000286565b5062000222929150620002d2565b8082111562000222576000620002c88282620002e9565b50600101620002b1565b5b80821115620002225760008155600101620002d3565b508054620002f7906200035d565b6000825580601f1062000308575050565b601f016020900490600052602060002090810190620003289190620002d2565b50565b6000602082840312156200033e57600080fd5b81516001600160a01b03811681146200035657600080fd5b9392505050565b600181811c908216806200037257607f821691505b602082108114156200039457634e487b7160e01b600052602260045260246000fd5b50919050565b61202a80620003aa6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063a71d6e3b1161008c578063c0f1619c11610066578063c0f1619c146101dd578063c7293294146101f3578063ca5bf9a414610219578063f2fde38b1461022257600080fd5b8063a71d6e3b14610196578063b4ae1235146101aa578063bd902e5d146101bd57600080fd5b8063715018a6116100c8578063715018a6146101405780637c99f6a6146101485780638da5cb5b1461015b5780639d0c025b1461017657600080fd5b8063099b6d88146100ef578063127ce1cc1461010b5780634849f65614610120575b600080fd5b6100f860035481565b6040519081526020015b60405180910390f35b61011e610119366004611af3565b610235565b005b61013361012e366004611af3565b610295565b6040516101029190611dac565b61011e6102a6565b61011e610156366004611c1c565b61030c565b6001546040516001600160a01b039091168152602001610102565b610189610184366004611af3565b610bf6565b6040516101029190611df0565b6101336101a4366004611af3565b50606090565b61011e6101b8366004611b47565b610c6d565b6100f86101cb366004611af3565b60046020526000908152604090205481565b6100f86101eb366004611b25565b505060025490565b610209610201366004611b25565b600192915050565b6040519015158152602001610102565b6100f860025481565b61011e6102303660046119ff565b610df3565b61023f6001610ebe565b6102905760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b60606102a082611157565b92915050565b6001546001600160a01b031633146103005760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610287565b61030a60006116ab565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561034f57600080fd5b505afa158015610363573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103879190611a1c565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016103b491815260200190565b60206040518083038186803b1580156103cc57600080fd5b505afa1580156103e0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104049190611ad1565b61043e5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610287565b61044781610ebe565b61048b5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610287565b600080546040516340d9124560e11b8152600160048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156104d057600080fd5b505afa1580156104e4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105089190611a1c565b600080546040516340d9124560e11b81526006600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561055257600080fd5b505afa158015610566573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058a9190611a1c565b600080546040516340d9124560e11b815260ca600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156105d457600080fd5b505afa1580156105e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060c9190611a1c565b604051637d1f0aab60e01b8152600481018890529091506000906001600160a01b03831690637d1f0aab9060240160006040518083038186803b15801561065257600080fd5b505afa158015610666573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261068e9190810190611a39565b90506000805b82518110156106db578281815181106106af576106af611f92565b60200260200101516103e814156106c957600191506106db565b806106d381611f37565b915050610694565b50801580156106ec57506000600354115b15610aa557604080516101608101825260058152600660208201526007818301526008606082015260096080820152600a60a0820152600b60c08201819052600c60e0830152600d610100830152600e610120830152600f6101408301529151630fe7f7cf60e21b8152600481018b90526024810192909252906001600160a01b038087169163efa9a9be918d9185918b1690633f9fdf3c9060440160206040518083038186803b1580156107a057600080fd5b505afa1580156107b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d89190611b0c565b600b81106107e8576107e8611f92565b60200201516040516001600160e01b031960e085901b16815260048101929092526024820152604481018c9052606401602060405180830381600087803b15801561083257600080fd5b505af1158015610846573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061086a9190611b0c565b506040516338dc8e1d60e21b8152600481018a9052603160248201526001600160a01b0386169063e37238749060440160206040518083038186803b1580156108b257600080fd5b505afa1580156108c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ea9190611ad1565b6109ae57600380549060006108fe83611eeb565b9091555050600354610911906064611ea4565b60008a81526004602081905260409182902092909255516377d4d4df60e11b81529081018b905260316024820152604481018a90526001600160a01b0386169063efa9a9be90606401602060405180830381600087803b15801561097457600080fd5b505af1158015610988573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ac9190611b0c565b505b600080546040516340d9124560e11b815260d460048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156109f357600080fd5b505afa158015610a07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2b9190611a1c565b6040516377d4d4df60e11b8152600481018d9052602481018c9052683635c9adc5dea0000060448201529091506001600160a01b0382169063efa9a9be90606401600060405180830381600087803b158015610a8657600080fd5b505af1158015610a9a573d6000803e3d6000fd5b505050505050610beb565b6040805160808101825260018152600260208201526003818301526004606082018190529151630fe7f7cf60e21b81528083018b90526024810192909252906001600160a01b038087169163efa9a9be918d9185918b1690633f9fdf3c9060440160206040518083038186803b158015610b1e57600080fd5b505afa158015610b32573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b569190611b0c565b60048110610b6657610b66611f92565b60200201516040516001600160e01b031960e085901b16815260048101929092526024820152604481018c9052606401602060405180830381600087803b158015610bb057600080fd5b505af1158015610bc4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be89190611b0c565b50505b505050505050505050565b60008181526004602052604090205460609080610c2d57604051806060016040528060218152602001611fd4602191399392505050565b610c40610c3b600183611ea4565b6116fd565b604051602001610c509190611d20565b604051602081830303815290604052915050919050565b50919050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b158015610cb057600080fd5b505afa158015610cc4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce89190611a1c565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b8152600401610d1591815260200190565b60206040518083038186803b158015610d2d57600080fd5b505afa158015610d41573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d659190611ad1565b610d9f5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610287565b610da881610ebe565b610dec5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610287565b5050505050565b6001546001600160a01b03163314610e4d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610287565b6001600160a01b038116610eb25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610287565b610ebb816116ab565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610f0357600080fd5b505afa158015610f17573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f3b9190611a1c565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610f8057600080fd5b505afa158015610f94573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb89190611a1c565b6001600160a01b0316148061104d57506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b15801561100a57600080fd5b505afa15801561101e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110429190611a1c565b6001600160a01b0316145b8061115057506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b15801561109b57600080fd5b505afa1580156110af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110d39190611a1c565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b15801561111857600080fd5b505afa15801561112c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111509190611ad1565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156111c657600080fd5b505afa1580156111da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111fe9190611a1c565b90506101f46001600160a01b038216633f9fdf3c61121e8761014b611e78565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561125d57600080fd5b505afa158015611271573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112959190611b0c565b10156112a25760006112a5565b60015b60ff16826000815181106112bb576112bb611f92565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6112e4876102cf611e78565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561132357600080fd5b505afa158015611337573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061135b9190611b0c565b101561136857600061136b565b60015b60ff168260018151811061138157611381611f92565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6113aa876103f5611e78565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156113e957600080fd5b505afa1580156113fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114219190611b0c565b101561142e576000611431565b60015b60ff168260028151811061144757611447611f92565b60209081029190910101526101f46001600160a01b038216633f9fdf3c611470876104d5611e78565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b1580156114af57600080fd5b505afa1580156114c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114e79190611b0c565b10156114f45760006114f7565b60015b60ff168260038151811061150d5761150d611f92565b60209081029190910101526101f46001600160a01b038216633f9fdf3c61153687610851611e78565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561157557600080fd5b505afa158015611589573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ad9190611b0c565b10156115ba5760006115bd565b60015b60ff16826004815181106115d3576115d3611f92565b60209081029190910101526101f46001600160a01b038216633f9fdf3c6115fc876135bd611e78565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561163b57600080fd5b505afa15801561164f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116739190611b0c565b1015611680576000611683565b60015b60ff168260058151811061169957611699611f92565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6060600a82116117b4576005828154811061171a5761171a611f92565b90600052602060002001805461172f90611f02565b80601f016020809104026020016040519081016040528092919081815260200182805461175b90611f02565b80156117a85780601f1061177d576101008083540402835291602001916117a8565b820191906000526020600020905b81548152906001019060200180831161178b57829003601f168201915b50505050509050919050565b601482101561182b576005600a815481106117d1576117d1611f92565b906000526020600020016005600a846117ea9190611ea4565b815481106117fa576117fa611f92565b90600052602060002001604051602001611815929190611ce2565b6040516020818303038152906040529050919050565b611836600a83611f52565b611875576005611847600a84611e90565b8154811061185757611857611f92565b906000526020600020016005600a815481106117fa576117fa611f92565b60648210156118fe57600561188b600a84611e90565b8154811061189b5761189b611f92565b906000526020600020016005600a815481106118b9576118b9611f92565b906000526020600020016005600a856118d29190611f52565b815481106118e2576118e2611f92565b9060005260206000200160405160200161181593929190611cff565b505060408051602081019091526000815290565b6000601f838184011261192457600080fd5b8235602061193961193483611e54565b611e23565b80838252828201915082870188848660051b8a0101111561195957600080fd5b60005b858110156119f157813567ffffffffffffffff8082111561197c57600080fd5b818b0191508b603f83011261199057600080fd5b868201356040828211156119a6576119a6611fa8565b6119b7828c01601f19168a01611e23565b92508183528d818386010111156119cd57600080fd5b818185018a850137506000908201880152855250928401929084019060010161195c565b509098975050505050505050565b600060208284031215611a1157600080fd5b813561115081611fbe565b600060208284031215611a2e57600080fd5b815161115081611fbe565b60006020808385031215611a4c57600080fd5b825167ffffffffffffffff811115611a6357600080fd5b8301601f81018513611a7457600080fd5b8051611a8261193482611e54565b80828252848201915084840188868560051b8701011115611aa257600080fd5b600094505b83851015611ac5578051835260019490940193918501918501611aa7565b50979650505050505050565b600060208284031215611ae357600080fd5b8151801515811461115057600080fd5b600060208284031215611b0557600080fd5b5035919050565b600060208284031215611b1e57600080fd5b5051919050565b60008060408385031215611b3857600080fd5b50508035926020909101359150565b60008060008060808587031215611b5d57600080fd5b843593506020808601359350604086013567ffffffffffffffff80821115611b8457600080fd5b818801915088601f830112611b9857600080fd5b8135611ba661193482611e54565b8082825285820191508585018c878560051b8801011115611bc657600080fd5b600095505b83861015611be9578035835260019590950194918601918601611bcb565b50965050506060880135925080831115611c0257600080fd5b5050611c1087828801611912565b91505092959194509250565b600080600060608486031215611c3157600080fd5b505081359360208301359350604090920135919050565b8054600090600181811c9080831680611c6257607f831692505b6020808410821415611c8457634e487b7160e01b600052602260045260246000fd5b818015611c985760018114611ca957611cd6565b60ff19861689528489019650611cd6565b60008881526020902060005b86811015611cce5781548b820152908501908301611cb5565b505084890196505b50505050505092915050565b6000611cf7611cf18386611c48565b84611c48565b949350505050565b6000611d17611cf1611d118488611c48565b86611c48565b95945050505050565b7fe5a4aae4b999e58583e5889defbc8ce69c89e799bee4bd8de58588e7a596e5bc81527f82e4babae887aae4b896e5a496e8808ce887b3efbc8ce4bda0e4bebfe698afe860208201526abf99e585b6e4b8ade4b98b60a81b604082015260008251611d9281604b850160208701611ebb565b6271c04160e91b604b939091019283015250604e01919050565b6020808252825182820181905260009190848201906040850190845b81811015611de457835183529284019291840191600101611dc8565b50909695505050505050565b6020815260008251806020840152611e0f816040850160208701611ebb565b601f01601f19169190910160400192915050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611e4c57611e4c611fa8565b604052919050565b600067ffffffffffffffff821115611e6e57611e6e611fa8565b5060051b60200190565b60008219821115611e8b57611e8b611f66565b500190565b600082611e9f57611e9f611f7c565b500490565b600082821015611eb657611eb6611f66565b500390565b60005b83811015611ed6578181015183820152602001611ebe565b83811115611ee5576000848401525b50505050565b600081611efa57611efa611f66565b506000190190565b600181811c90821680611f1657607f821691505b60208210811415610c6757634e487b7160e01b600052602260045260246000fd5b6000600019821415611f4b57611f4b611f66565b5060010190565b600082611f6157611f61611f7c565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610ebb57600080fdfee4bda0e5b7b2e5bc80e5a78be4b880e4b8aae696b0e79a84e8baabe4bbbde38082a2646970667358221220b67e671c9e605c69b417deca4ed1b2bde15d05eaec393845fab7fc4703d0d26264736f6c63430008060033";