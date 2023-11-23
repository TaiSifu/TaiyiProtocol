"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorLocations__factory = void 0;
const ethers_1 = require("ethers");
class ActorLocations__factory extends ethers_1.ContractFactory {
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
exports.ActorLocations__factory = ActorLocations__factory;
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
                internalType: "uint256",
                name: "actor",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "oldA",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "oldB",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newA",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newB",
                type: "uint256",
            },
        ],
        name: "ActorLocationChanged",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "actorFreeTimes",
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
        ],
        name: "actorLocations",
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
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_actor",
                type: "uint256",
            },
        ],
        name: "finishActorTravel",
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
        name: "isActorLocked",
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
                name: "_actor",
                type: "uint256",
            },
        ],
        name: "isActorUnlocked",
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
                name: "_A",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_B",
                type: "uint256",
            },
        ],
        name: "locationActors",
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
                name: "_freeTime",
                type: "uint256",
            },
        ],
        name: "lockActor",
        outputs: [],
        stateMutability: "nonpayable",
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
            {
                internalType: "uint256",
                name: "_A",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_B",
                type: "uint256",
            },
        ],
        name: "setActorLocation",
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
        name: "unlockActor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50604051620023cf380380620023cf83398101604081905261003191610056565b600080546001600160a01b0319166001600160a01b0392909216919091179055610086565b60006020828403121561006857600080fd5b81516001600160a01b038116811461007f57600080fd5b9392505050565b61233980620000966000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806392fab22b1161008c578063ae24e90c11610066578063ae24e90c146101cc578063b8fae407146101df578063c87b56dd146101f2578063da5df3111461020557600080fd5b806392fab22b146101765780639436383d14610196578063ad4fe6f4146101b957600080fd5b8063384afd36146100d45780637c3da21e146100fc5780637eae9eb21461010d5780637f9f9320146101225780638e47eac9146101355780638f7bb17914610156575b600080fd5b6100e76100e2366004611a61565b610225565b60405190151581526020015b60405180910390f35b60095b6040519081526020016100f3565b61012061011b366004611a9c565b610253565b005b610120610130366004611a61565b6103a9565b610148610143366004611a9c565b610504565b6040516100f3929190612027565b610169610164366004611a61565b61051f565b6040516100f39190612014565b610189610184366004611a7a565b61052a565b6040516100f39190611fd0565b6100e76101a4366004611a61565b60009081526003602052604090205442111590565b6101896101c7366004611a61565b610595565b6101206101da366004611ac8565b6105f7565b6101206101ed366004611a7a565b61078f565b610169610200366004611a61565b6108db565b6100ff610213366004611a61565b60036020526000908152604090205481565b600081815260036020526040812054158061024d575060008281526003602052604090205442115b92915050565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561029657600080fd5b505afa1580156102aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102ce9190611975565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b81526004016102fb91815260200190565b60206040518083038186803b15801561031357600080fd5b505afa158015610327573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061034b9190611992565b6103705760405162461bcd60e51b815260040161036790612078565b60405180910390fd5b61037981610a71565b6103955760405162461bcd60e51b815260040161036790612049565b506000918252600360205260409091205550565b600081116103e95760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b21030b1ba37b960991b6044820152606401610367565b6000818152600360205260409020546103ff5750565b6000818152600360205260409020544210610501576000818152600360209081526040808320839055600282528083208054825181850281018501909352808352919290919083018282801561047457602002820191906000526020600020905b815481526020019060010190808311610460575b505050505090508051600214156104ff578060018151811061049857610498612180565b6020026020010151816000815181106104b3576104b3612180565b6020026020010151146104ff576104ff82826001815181106104d7576104d7612180565b6020026020010151836001815181106104f2576104f2612180565b6020026020010151610d0a565b505b50565b60606000610513858585611167565b91509150935093915050565b606061024d8261155a565b600082815260016020908152604080832084845282529182902080548351818402810184019094528084526060939283018282801561058857602002820191906000526020600020905b815481526020019060010190808311610574575b5050505050905092915050565b6000818152600260209081526040918290208054835181840281018401909452808452606093928301828280156105eb57602002820191906000526020600020905b8154815260200190600101908083116105d7575b50505050509050919050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561063a57600080fd5b505afa15801561064e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106729190611975565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161069f91815260200190565b60206040518083038186803b1580156106b757600080fd5b505afa1580156106cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ef9190611992565b61070b5760405162461bcd60e51b815260040161036790612078565b61071481610a71565b6107305760405162461bcd60e51b815260040161036790612049565b6000831180156107405750600082115b61077d5760405162461bcd60e51b815260206004820152600e60248201526d34b73b30b634b210209037b9102160911b6044820152606401610367565b610788848484610d0a565b5050505050565b6000546040516340d9124560e11b815260048082015283916001600160a01b0316906381b2248a9060240160206040518083038186803b1580156107d257600080fd5b505afa1580156107e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080a9190611975565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161083791815260200190565b60206040518083038186803b15801561084f57600080fd5b505afa158015610863573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108879190611992565b6108a35760405162461bcd60e51b815260040161036790612078565b6108ac81610a71565b6108c85760405162461bcd60e51b815260040161036790612049565b5060009081526003602052604081205550565b60606108e561191c565b60405180610100016040528060dc815260200161222860dc9139815260006109198461091283601461209d565b6014611167565b602084810192835260408051808201825260068152651e17b9bb339f60d11b8184015281870181905286519451915193955060009461095a94909301611b5d565b604051602081830303815290604052905061097485611641565b6040516020016109849190611dcd565b60408051808303601f1901815291815290845280516060810190915260268082526121c2602083013960208401526109bb8561155a565b6040516020016109cb9190611f3d565b60408051808303601f190181529181528401526109e7816116de565b6040516020016109f79190611f70565b60408051808303601f19018152918152606085018290528451602080870151878401519351600095610a4495610a309594909201611ba0565b6040516020818303038152906040526116de565b905080604051602001610a579190611ef8565b604051602081830303815290604052945050505050919050565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b158015610ab657600080fd5b505afa158015610aca573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aee9190611975565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b158015610b3357600080fd5b505afa158015610b47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b6b9190611975565b6001600160a01b03161480610c0057506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b158015610bbd57600080fd5b505afa158015610bd1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf59190611975565b6001600160a01b0316145b80610d0357506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610c4e57600080fd5b505afa158015610c62573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c869190611975565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610ccb57600080fd5b505afa158015610cdf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d039190611992565b9392505050565b600083815260026020908152604080832080548251818502810185019093528083529192909190830182828015610d6057602002820191906000526020600020905b815481526020019060010190808311610d4c575b50505050509050805160021415611025578281600081518110610d8557610d85612180565b6020026020010151148015610db357508181600181518110610da957610da9612180565b6020026020010151145b15610dbe5750505050565b60006001600083600081518110610dd757610dd7612180565b60200260200101518152602001908152602001600020600083600181518110610e0257610e02612180565b60200260200101518152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610e6257602002820191906000526020600020905b815481526020019060010190808311610e4e575b5050505050905060005b81518110156110225785828281518110610e8857610e88612180565b60200260200101511415611010576001600084600081518110610ead57610ead612180565b60200260200101518152602001908152602001600020600084600181518110610ed857610ed8612180565b6020026020010151815260200190815260200160002060018351610efc91906120f6565b81548110610f0c57610f0c612180565b90600052602060002001546001600085600081518110610f2e57610f2e612180565b60200260200101518152602001908152602001600020600085600181518110610f5957610f59612180565b602002602001015181526020019081526020016000208281548110610f8057610f80612180565b90600052602060002001819055506001600084600081518110610fa557610fa5612180565b60200260200101518152602001908152602001600020600084600181518110610fd057610fd0612180565b60200260200101518152602001908152602001600020805480610ff557610ff561216a565b60019003818190600052602060002001600090559055611022565b8061101a81612139565b915050610e6c565b50505b6000838152600160208181526040808420868552825280842080549384018155845281842090920187905586835260029052812061106291611943565b6000848152600260208181526040832080546001808201835582865292909420938401879055805491820190559091018390558151141561111b57806001815181106110b0576110b0612180565b6020026020010151816000815181106110cb576110cb612180565b6020026020010151857f76745351b7fb77d5d826ddb2eca0d4a33dccaa69c80819835a3aea2556a6e381868660405161110e929190918252602082015260400190565b60405180910390a4611161565b8183857f76745351b7fb77d5d826ddb2eca0d4a33dccaa69c80819835a3aea2556a6e3818686604051611158929190918252602082015260400190565b60405180910390a45b50505050565b6060828161117482611641565b6040516020016111849190611e1c565b60408051601f1981840301815291905290506111a0848361209d565b6000878152600260209081526040808320805482518185028101850190935280835294965092939092918301828280156111f957602002820191906000526020600020905b8154815260200190600101908083116111e5575b5050505050905080516000141561123b578161121484611641565b604051602001611225929190611cf1565b604051602081830303815290604052915061154f565b600080546040516340d9124560e11b8152600560048201526001600160a01b03909116906381b2248a9060240160206040518083038186803b15801561128057600080fd5b505afa158015611294573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112b89190611975565b9050816001815181106112cd576112cd612180565b6020026020010151826000815181106112e8576112e8612180565b602002602001015114156113c4578261130085611641565b826001600160a01b0316634622ab038560008151811061132257611322612180565b60200260200101516040518263ffffffff1660e01b815260040161134891815260200190565b60006040518083038186803b15801561136057600080fd5b505afa158015611374573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261139c91908101906119b4565b6040516020016113ae93929190611c75565b604051602081830303815290604052925061154d565b826113ce85611641565b6040516020016113df929190611d6a565b604051602081830303815290604052925082816001600160a01b0316634622ab038460008151811061141357611413612180565b60200260200101516040518263ffffffff1660e01b815260040161143991815260200190565b60006040518083038186803b15801561145157600080fd5b505afa158015611465573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261148d91908101906119b4565b826001600160a01b0316634622ab03856001815181106114af576114af612180565b60200260200101516040518263ffffffff1660e01b81526004016114d591815260200190565b60006040518083038186803b1580156114ed57600080fd5b505afa158015611501573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261152991908101906119b4565b60405160200161153b93929190611bf7565b60405160208183030381529060405292505b505b509150935093915050565b60008181526002602090815260408083208054825181850281018501909352808352606094938301828280156115af57602002820191906000526020600020905b81548152602001906001019080831161159b575b505050505090508051600014156115e05750506040805180820190915260028152617b7d60f01b6020820152919050565b611603816000815181106115f6576115f6612180565b6020026020010151611641565b611619826001815181106115f6576115f6612180565b60405160200161162a929190611e96565b604051602081830303815290604052915050919050565b6060600061164e83611844565b600101905060008167ffffffffffffffff81111561166e5761166e612196565b6040519080825280601f01601f191660200182016040528015611698576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846116d1576116d6565b6116a2565b509392505050565b8051606090806116fe575050604080516020810190915260008152919050565b6000600361170d83600261209d565b61171791906120b5565b6117229060046120d7565b9050600061173182602061209d565b67ffffffffffffffff81111561174957611749612196565b6040519080825280601f01601f191660200182016040528015611773576020820181803683370190505b50905060006040518060600160405280604081526020016121e8604091399050600181016020830160005b868110156117ff576003818a01810151603f601282901c8116860151600c83901c8216870151600684901c831688015192909316870151600891821b60ff94851601821b92841692909201901b91160160e01b83526004909201910161179e565b506003860660018114611819576002811461182a57611836565b613d3d60f01b600119830152611836565b603d60f81b6000198301525b505050918152949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106118835772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef810000000083106118af576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc1000083106118cd57662386f26fc10000830492506010015b6305f5e10083106118e5576305f5e100830492506008015b61271083106118f957612710830492506004015b6064831061190b576064830492506002015b600a831061024d5760010192915050565b6040518060e001604052806007905b606081526020019060019003908161192b5790505090565b508054600082559060005260206000209081019061050191905b80821115611971576000815560010161195d565b5090565b60006020828403121561198757600080fd5b8151610d03816121ac565b6000602082840312156119a457600080fd5b81518015158114610d0357600080fd5b6000602082840312156119c657600080fd5b815167ffffffffffffffff808211156119de57600080fd5b818401915084601f8301126119f257600080fd5b815181811115611a0457611a04612196565b604051601f8201601f19908116603f01168101908382118183101715611a2c57611a2c612196565b81604052828152876020848701011115611a4557600080fd5b611a5683602083016020880161210d565b979650505050505050565b600060208284031215611a7357600080fd5b5035919050565b60008060408385031215611a8d57600080fd5b50508035926020909101359150565b600080600060608486031215611ab157600080fd5b505081359360208301359350604090920135919050565b60008060008060808587031215611ade57600080fd5b5050823594602084013594506040840135936060013592509050565b60008151808452611b1281602086016020860161210d565b601f01601f19169290920160200192915050565b7f2220636c6173733d22626173655f6e6f636f6c6f72222066696c6c3d2279656c8152643637bb911f60d91b602082015260250190565b60008451611b6f81846020890161210d565b845190830190611b8381836020890161210d565b8451910190611b9681836020880161210d565b0195945050505050565b60008551611bb2818460208a0161210d565b855190830190611bc6818360208a0161210d565b8551910190611bd981836020890161210d565b8451910190611bec81836020880161210d565b019695505050505050565b60008451611c0981846020890161210d565b845190830190611c1d81836020890161210d565b623964a360ea1b91019081528351611c3c81600384016020880161210d565b6ee4b98be997b4e79a84e58cbae59f9f60881b60039290910191820152661e17ba32bc3a1f60c91b601282015260190195945050505050565b60008451611c8781846020890161210d565b6f1e3a32bc3a103c1e91191811103c9e9160811b9083019081528451611cb481601084016020890161210d565b611cc2601082840101611b26565b9150508351611cd581836020880161210d565b661e17ba32bc3a1f60c91b910190815260070195945050505050565b60008351611d0381846020880161210d565b6f1e3a32bc3a103c1e91191811103c9e9160811b9083019081528351611d3081601084016020880161210d565b611d3e601082840101611b26565b68e697a0e4bfa1e681af60b81b8152661e17ba32bc3a1f60c91b60098201526010019695505050505050565b60008351611d7c81846020880161210d565b6f1e3a32bc3a103c1e91191811103c9e9160811b9083019081528351611da981601084016020880161210d565b611db7601082840101611b26565b621cb39560eb1b81526003019695505050505050565b707b226e616d65223a20224163746f72202360781b81528151600090611dfa81601185016020870161210d565b6a103637b1b0ba34b7b7399160a91b6011939091019283015250601c01919050565b6f1e3a32bc3a103c1e91189811103c9e9160811b81528151600090611e4881601085016020870161210d565b6e111031b630b9b99e913130b9b2911f60891b60109390910192830152506e7344c072ce5472ce5872c65d77de4d60891b601f820152661e17ba32bc3a1f60c91b602e820152603501919050565b653d901120911d60d11b81528251600090611eb881600685016020880161210d565b6516101121111d60d11b6006918401918201528351611ede81600c84016020880161210d565b607d60f81b600c9290910191820152600d01949350505050565b7f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c000000815260008251611f3081601d85016020870161210d565b91909101601d0192915050565b6901610113230ba30911d160b51b81528151600090611f6381600a85016020870161210d565b91909101600a0192915050565b7f2c2022696d616765223a2022646174613a696d6167652f7376672b786d6c3b62815265185cd94d8d0b60d21b602082015260008251611fb781602685016020870161210d565b61227d60f01b6026939091019283015250602801919050565b6020808252825182820181905260009190848201906040850190845b8181101561200857835183529284019291840191600101611fec565b50909695505050505050565b602081526000610d036020830184611afa565b60408152600061203a6040830185611afa565b90508260208301529392505050565b6020808252601590820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b604082015260600190565b6020808252600b908201526a6f6e6c792059654d696e6760a81b604082015260600190565b600082198211156120b0576120b0612154565b500190565b6000826120d257634e487b7160e01b600052601260045260246000fd5b500490565b60008160001904831182151516156120f1576120f1612154565b500290565b60008282101561210857612108612154565b500390565b60005b83811015612128578181015183820152602001612110565b838111156111615750506000910152565b600060001982141561214d5761214d612154565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461050157600080fdfe2c20226465736372697074696f6e223a202254686973206973206e6f7420612067616d652e224142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2f3c73766720786d6c6e733d22687474703a2f2f7777772e77332e6f72672f323030302f73766722207072657365727665417370656374526174696f3d22784d696e594d696e206d656574222076696577426f783d223020302033353020333530223e3c7374796c653e2e62617365207b2066696c6c3a2077686974653b20666f6e742d66616d696c793a2073657269663b20666f6e742d73697a653a20313470783b207d3c2f7374796c653e3c726563742077696474683d223130302522206865696768743d2231303025222066696c6c3d22626c61636b22202f3ea2646970667358221220f5e98944b1e32af38bd5a825ce26d06657ad43773565247c2089a46081f45b6164736f6c63430008060033";