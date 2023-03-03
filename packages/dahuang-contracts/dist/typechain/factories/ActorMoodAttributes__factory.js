"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorMoodAttributes__factory = void 0;
const ethers_1 = require("ethers");
class ActorMoodAttributes__factory extends ethers_1.ContractFactory {
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
exports.ActorMoodAttributes__factory = ActorMoodAttributes__factory;
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
                name: "creator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "actor",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "attributes",
                type: "uint256[]",
            },
        ],
        name: "Created",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "executor",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "actor",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "attributes",
                type: "uint256[]",
            },
        ],
        name: "Updated",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_actor",
                type: "uint256",
            },
            {
                internalType: "int256[]",
                name: "_modifiers",
                type: "int256[]",
            },
        ],
        name: "applyModified",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
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
                name: "",
                type: "uint256",
            },
        ],
        name: "attributeLabels",
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
                name: "",
                type: "uint256",
            },
        ],
        name: "attributesScores",
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
        name: "characterPointsInitiated",
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
        stateMutability: "pure",
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
        ],
        name: "pointActor",
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
                name: "_actor",
                type: "uint256",
            },
            {
                internalType: "uint256[]",
                name: "_attributes",
                type: "uint256[]",
            },
        ],
        name: "setAttributes",
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
                name: "_actor",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_startY",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_lineHeight",
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
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_actor",
                type: "uint256",
            },
        ],
        name: "tokenURI",
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
];
const _bytecode = "0x60e0604052600660a090815265e5bf83e6838560d01b60c05260809081526200002c906001908162000083565b503480156200003a57600080fd5b506040516200233c3803806200233c8339810160408190526200005d91620001ec565b600080546001600160a01b0319166001600160a01b03929092169190911790556200025b565b828054828255906000526020600020908101928215620000d5579160200282015b82811115620000d55782518051620000c4918491602090910190620000e7565b5091602001919060010190620000a4565b50620000e392915062000172565b5090565b828054620000f5906200021e565b90600052602060002090601f01602090048101928262000119576000855562000164565b82601f106200013457805160ff191683800117855562000164565b8280016001018555821562000164579182015b828111156200016457825182559160200191906001019062000147565b50620000e392915062000193565b80821115620000e3576000620001898282620001aa565b5060010162000172565b5b80821115620000e3576000815560010162000194565b508054620001b8906200021e565b6000825580601f10620001c9575050565b601f016020900490600052602060002090810190620001e9919062000193565b50565b600060208284031215620001ff57600080fd5b81516001600160a01b03811681146200021757600080fd5b9392505050565b600181811c908216806200023357607f821691505b602082108114156200025557634e487b7160e01b600052602260045260246000fd5b50919050565b6120d1806200026b6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80638f7bb179116100665780638f7bb1791461012657806392441c0d146101395780639263c9d314610164578063c23a479914610197578063c87b56dd146101b857600080fd5b80630ae22a6e146100a357806327388469146100b85780635a175761146100e15780637c3da21e146100f45780638e47eac914610105575b600080fd5b6100b66100b1366004611765565b6101cb565b005b6100cb6100c636600461168a565b6106cf565b6040516100d89190611d61565b60405180910390f35b6100b66100ef366004611787565b61077b565b60cc5b6040519081526020016100d8565b610118610113366004611834565b610b60565b6040516100d8929190611d74565b6100cb61013436600461168a565b610b7c565b6100f7610147366004611765565b600260209081526000928352604080842090915290825290205481565b61018761017236600461168a565b60036020526000908152604090205460ff1681565b60405190151581526020016100d8565b6101aa6101a53660046116bc565b610b8d565b6040516100d8929190611d3d565b6100cb6101c636600461168a565b610d0d565b6000546040516340d9124560e11b815260048082015283916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561020e57600080fd5b505afa158015610222573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610246919061164b565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161027391815260200190565b60206040518083038186803b15801561028b57600080fd5b505afa15801561029f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102c39190611668565b6103025760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b60448201526064015b60405180910390fd5b61030b81610ea3565b61034f5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b60448201526064016102f9565b600080546040516340d9124560e11b815260ca60048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561039457600080fd5b505afa1580156103a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103cc919061164b565b60405163f11ed2ad60e01b8152600481018590529091506001600160a01b0382169063f11ed2ad9060240160206040518083038186803b15801561040f57600080fd5b505afa158015610423573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104479190611668565b6104935760405162461bcd60e51b815260206004820152601a60248201527f74616c656e74732068617665206e6f7420696e6974696174656400000000000060448201526064016102f9565b60008381526003602052604090205460ff16156104e85760405162461bcd60e51b8152602060048201526013602482015272616c726561647920696e697420706f696e747360681b60448201526064016102f9565b60405163213aa2f760e01b81526004810184905260cc60248201526000906001600160a01b0383169063213aa2f79060440160206040518083038186803b15801561053257600080fd5b505afa158015610546573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056a91906116a3565b905060646002600061057d601482611deb565b81526020808201929092526040908101600090812088825290925290205580156105d05780600260006105b1601482611deb565b8152602080820192909252604090810160009081208882529092529020555b6000848152600360205260408082208054600160ff1990911617905580516002808252606082019092529081602001602082028036833701905050905061061960146000611deb565b8160008151811061062c5761062c611f15565b602090810291909101015260026000610646601482611deb565b81526020019081526020016000206000868152602001908152602001600020548160018151811061067957610679611f15565b60200260200101818152505084336001600160a01b03167f4c99c7c93017d8e585b646fb29ce18977137530fefb8c4283f3061a0f9ce6482836040516106bf9190611d2a565b60405180910390a3505050505050565b600181815481106106df57600080fd5b9060005260206000200160009150905080546106fa90611e7d565b80601f016020809104026020016040519081016040528092919081815260200182805461072690611e7d565b80156107735780601f1061074857610100808354040283529160200191610773565b820191906000526020600020905b81548152906001019060200180831161075657829003601f168201915b505050505081565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156107be57600080fd5b505afa1580156107d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f6919061164b565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161082391815260200190565b60206040518083038186803b15801561083b57600080fd5b505afa15801561084f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108739190611668565b6108ad5760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b60448201526064016102f9565b6108b681610ea3565b6108fa5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b60448201526064016102f9565b600083815260036020526040902054839060ff166109655760405162461bcd60e51b815260206004820152602260248201527f706f696e74732068617665206e6f74206265656e20696e697469617465642079604482015261195d60f21b60648201526084016102f9565b600283516109739190611eb8565b156109cc5760405162461bcd60e51b815260206004820152602360248201527f6d61785f706f696e745f6275796174747269627574657320697320696e76616c60448201526234b21760e91b60648201526084016102f9565b6000805b8451811015610a74576109e560146000611deb565b8582815181106109f7576109f7611f15565b60200260200101511415610a625784610a11826001611deb565b81518110610a2157610a21611f15565b60200260200101516002600060146000610a3b9190611deb565b8152602080820192909252604090810160009081208a825290925290205560019150610a74565b610a6d600282611deb565b90506109d0565b508015610b5857604080516002808252606082018352600092602083019080368337019050509050610aa860146000611deb565b81600081518110610abb57610abb611f15565b602090810291909101015260026000610ad5601482611deb565b815260200190815260200160002060008781526020019081526020016000205481600181518110610b0857610b08611f15565b60200260200101818152505085336001600160a01b03167ff71fd07cb13c5806f72ffc5cff5f155c445fb1894f99943c82b4ee3761eddb8283604051610b4e9190611d2a565b60405180910390a3505b505050505050565b60606000610b6f85858561113c565b915091505b935093915050565b6060610b8782611286565b92915050565b6060600060028351610b9f9190611eb8565b15610be45760405162461bcd60e51b815260206004820152601560248201527436b7b234b334b2b9399034b99034b73b30b634b21760591b60448201526064016102f9565b600080600281610bf5601482611deb565b8152602001908152602001600020600087815260200190815260200160002054905060005b8551811015610c9557610c2f60146000611deb565b868281518110610c4157610c41611f15565b60200260200101511415610c8357610c7c8287610c5f846001611deb565b81518110610c6f57610c6f611f15565b60200260200101516112f8565b9150600192505b610c8e600282611deb565b9050610c1a565b50604080516002808252606082018352600092602083019080368337019050509050610cc360146000611deb565b81600081518110610cd657610cd6611f15565b6020026020010181815250508181600181518110610cf657610cf6611f15565b602090810291909101015296919550909350505050565b6060610d17611624565b60405180610100016040528060dc8152602001611fc060dc913981526000610d4b84610d44836014611deb565b601461113c565b602084810192835260408051808201825260068152651e17b9bb339f60d11b81840152818701819052865194519151939550600094610d8c94909301611912565b6040516020818303038152906040529050610da685611349565b604051602001610db691906119ac565b60408051808303601f190181529181529084528051606081019091526026808252611f5a60208301396020840152610ded85611286565b604051602001610dfd9190611c97565b60408051808303601f19018152918152840152610e19816113e6565b604051602001610e299190611cca565b60408051808303601f19018152918152606085018290528451602080870151878401519351600095610e7695610e629594909201611955565b6040516020818303038152906040526113e6565b905080604051602001610e899190611c52565b604051602081830303815290604052945050505050919050565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610ee857600080fd5b505afa158015610efc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f20919061164b565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610f6557600080fd5b505afa158015610f79573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f9d919061164b565b6001600160a01b0316148061103257506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610fef57600080fd5b505afa158015611003573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611027919061164b565b6001600160a01b0316145b8061113557506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b15801561108057600080fd5b505afa158015611094573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110b8919061164b565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b1580156110fd57600080fd5b505afa158015611111573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111359190611668565b9392505050565b600083815260036020526040902054606090839060ff161561125757600061116382611349565b60405160200161117391906119fc565b60408051601f19818403018152919052905061118f8483611deb565b9150600061119c83611349565b600160146111ab816000611deb565b6111b59190611e36565b815481106111c5576111c5611f15565b9060005260206000200161120960026000601460006111e49190611deb565b815260200190815260200160002060008b815260200190815260200160002054611349565b60405160200161121b93929190611b32565b6040516020818303038152906040529050818160405160200161123f9291906118e3565b60405160208183030381529060405293505050610b74565b61126081611349565b6040516020016112709190611a76565b6040516020818303038152906040529150610b74565b60408051602081019091526000808252606091906112d1906002906112ac601482611deb565b8152602001908152602001600020600085815260200190815260200160002054611349565b6040516020016112e19190611af6565b60408051601f198184030181529190529392505050565b6000808213156113135761130c8284611deb565b9250611342565b61131c82611ecc565b83101561132c5760009250611342565b61133582611ecc565b61133f9084611e36565b92505b5090919050565b606060006113568361154c565b600101905060008167ffffffffffffffff81111561137657611376611f2b565b6040519080825280601f01601f1916602001820160405280156113a0576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846113d9576113de565b6113aa565b509392505050565b805160609080611406575050604080516020810190915260008152919050565b60006003611415836002611deb565b61141f9190611e03565b61142a906004611e17565b90506000611439826020611deb565b67ffffffffffffffff81111561145157611451611f2b565b6040519080825280601f01601f19166020018201604052801561147b576020820181803683370190505b5090506000604051806060016040528060408152602001611f80604091399050600181016020830160005b86811015611507576003818a01810151603f601282901c8116860151600c83901c8216870151600684901c831688015192909316870151600891821b60ff94851601821b92841692909201901b91160160e01b8352600490920191016114a6565b50600386066001811461152157600281146115325761153e565b613d3d60f01b60011983015261153e565b603d60f81b6000198301525b505050918152949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b831061158b5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef810000000083106115b7576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc1000083106115d557662386f26fc10000830492506010015b6305f5e10083106115ed576305f5e100830492506008015b612710831061160157612710830492506004015b60648310611613576064830492506002015b600a8310610b875760010192915050565b6040518060e001604052806007905b60608152602001906001900390816116335790505090565b60006020828403121561165d57600080fd5b815161113581611f41565b60006020828403121561167a57600080fd5b8151801515811461113557600080fd5b60006020828403121561169c57600080fd5b5035919050565b6000602082840312156116b557600080fd5b5051919050565b600080604083850312156116cf57600080fd5b8235915060208084013567ffffffffffffffff8111156116ee57600080fd5b8401601f810186136116ff57600080fd5b803561171261170d82611dc7565b611d96565b80828252848201915084840189868560051b870101111561173257600080fd5b600094505b83851015611755578035835260019490940193918501918501611737565b5080955050505050509250929050565b6000806040838503121561177857600080fd5b50508035926020909101359150565b60008060006060848603121561179c57600080fd5b833592506020808501359250604085013567ffffffffffffffff8111156117c257600080fd5b8501601f810187136117d357600080fd5b80356117e161170d82611dc7565b8082825284820191508484018a868560051b870101111561180157600080fd5b600094505b83851015611824578035835260019490940193918501918501611806565b5080955050505050509250925092565b60008060006060848603121561184957600080fd5b505081359360208301359350604090920135919050565b600081518084526020808501945080840160005b8381101561189057815187529582019590820190600101611874565b509495945050505050565b600081518084526118b3816020860160208601611e4d565b601f01601f19169290920160200192915050565b600081516118d9818560208601611e4d565b9290920192915050565b600083516118f5818460208801611e4d565b835190830190611909818360208801611e4d565b01949350505050565b60008451611924818460208901611e4d565b845190830190611938818360208901611e4d565b845191019061194b818360208801611e4d565b0195945050505050565b60008551611967818460208a01611e4d565b85519083019061197b818360208a01611e4d565b855191019061198e818360208901611e4d565b84519101906119a1818360208801611e4d565b019695505050505050565b707b226e616d65223a20224163746f72202360781b815281516000906119d9816011850160208701611e4d565b6b1030ba3a3934b13aba32b99160a11b6011939091019283015250601d01919050565b6f1e3a32bc3a103c1e91189811103c9e9160811b81528151600090611a28816010850160208701611e4d565b6e111031b630b9b99e913130b9b2911f60891b60109390910192830152506e7341c2f3ddd572d8cf734053f7de4d60891b601f820152661e17ba32bc3a1f60c91b602e820152603501919050565b6f1e3a32bc3a103c1e91189811103c9e9160811b81528151600090611aa2816010850160208701611e4d565b6e111031b630b9b99e913130b9b2911f60891b60109390910192830152507472dfc1f341c2f34e5572c44ef2d3c5f2c64b71c04160591b601f820152661e17ba32bc3a1f60c91b6034820152603b01919050565b6703d912c24a8911d160c51b81528151600090611b1a816008850160208701611e4d565b607d60f81b6008939091019283015250600901919050565b6f1e3a32bc3a103c1e91191811103c9e9160811b815283516000906020611b5f8260108601838a01611e4d565b6e111031b630b9b99e913130b9b2911f60891b6010928501928301528554601f90600090600181811c9080831680611b9857607f831692505b868310811415611bb657634e487b7160e01b85526022600452602485fd5b808015611bca5760018114611bdf57611c10565b60ff1985168988015283890187019550611c10565b60008d81526020902060005b85811015611c065781548b82018a0152908401908901611beb565b505086848a010195505b5050505050611c45611c32611c2c83603d60f81b815260010190565b896118c7565b661e17ba32bc3a1f60c91b815260070190565b9998505050505050505050565b7f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c000000815260008251611c8a81601d850160208701611e4d565b91909101601d0192915050565b6901610113230ba30911d160b51b81528151600090611cbd81600a850160208701611e4d565b91909101600a0192915050565b7f2c2022696d616765223a2022646174613a696d6167652f7376672b786d6c3b62815265185cd94d8d0b60d21b602082015260008251611d11816026850160208701611e4d565b61227d60f01b6026939091019283015250602801919050565b6020815260006111356020830184611860565b604081526000611d506040830185611860565b905082151560208301529392505050565b602081526000611135602083018461189b565b604081526000611d87604083018561189b565b90508260208301529392505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611dbf57611dbf611f2b565b604052919050565b600067ffffffffffffffff821115611de157611de1611f2b565b5060051b60200190565b60008219821115611dfe57611dfe611ee9565b500190565b600082611e1257611e12611eff565b500490565b6000816000190483118215151615611e3157611e31611ee9565b500290565b600082821015611e4857611e48611ee9565b500390565b60005b83811015611e68578181015183820152602001611e50565b83811115611e77576000848401525b50505050565b600181811c90821680611e9157607f821691505b60208210811415611eb257634e487b7160e01b600052602260045260246000fd5b50919050565b600082611ec757611ec7611eff565b500690565b6000600160ff1b821415611ee257611ee2611ee9565b5060000390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114611f5657600080fd5b5056fe2c20226465736372697074696f6e223a202254686973206973206e6f7420612067616d652e224142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2f3c73766720786d6c6e733d22687474703a2f2f7777772e77332e6f72672f323030302f73766722207072657365727665417370656374526174696f3d22784d696e594d696e206d656574222076696577426f783d223020302033353020333530223e3c7374796c653e2e62617365207b2066696c6c3a2077686974653b20666f6e742d66616d696c793a2073657269663b20666f6e742d73697a653a20313470783b207d3c2f7374796c653e3c726563742077696474683d223130302522206865696768743d2231303025222066696c6c3d22626c61636b22202f3ea26469706673582212207b1a8f900d3a259fe3c6bc097640e8d45f1d043b7551242f818654afbeaf7ab164736f6c63430008060033";
