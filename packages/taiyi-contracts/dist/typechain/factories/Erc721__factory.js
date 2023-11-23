"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Erc721__factory = void 0;
const ethers_1 = require("ethers");
class Erc721__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(name_, symbol_, overrides) {
        return super.deploy(name_, symbol_, overrides || {});
    }
    getDeployTransaction(name_, symbol_, overrides) {
        return super.getDeployTransaction(name_, symbol_, overrides || {});
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
exports.Erc721__factory = Erc721__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "name_",
                type: "string",
            },
            {
                internalType: "string",
                name: "symbol_",
                type: "string",
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
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
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
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
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
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
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
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
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
        name: "name",
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
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
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
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
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
        name: "symbol",
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
                name: "tokenId",
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
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
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
];
const _bytecode = "0x60806040523480156200001157600080fd5b506040516200171638038062001716833981016040819052620000349162000220565b6200003f3362000073565b815162000054906001906020850190620000c3565b5080516200006a906002906020840190620000c3565b505050620002dd565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b828054620000d1906200028a565b90600052602060002090601f016020900481019282620000f5576000855562000140565b82601f106200011057805160ff191683800117855562000140565b8280016001018555821562000140579182015b828111156200014057825182559160200191906001019062000123565b506200014e92915062000152565b5090565b5b808211156200014e576000815560010162000153565b600082601f8301126200017b57600080fd5b81516001600160401b0380821115620001985762000198620002c7565b604051601f8301601f19908116603f01168101908282118183101715620001c357620001c3620002c7565b81604052838152602092508683858801011115620001e057600080fd5b600091505b83821015620002045785820183015181830184015290820190620001e5565b83821115620002165760008385830101525b9695505050505050565b600080604083850312156200023457600080fd5b82516001600160401b03808211156200024c57600080fd5b6200025a8683870162000169565b935060208501519150808211156200027157600080fd5b50620002808582860162000169565b9150509250929050565b600181811c908216806200029f57607f821691505b60208210811415620002c157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b61142980620002ed6000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063715018a611610097578063b88d4fde11610066578063b88d4fde14610210578063c87b56dd14610223578063e985e9c514610236578063f2fde38b1461027257600080fd5b8063715018a6146101dc5780638da5cb5b146101e457806395d89b41146101f5578063a22cb465146101fd57600080fd5b806323b872dd116100d357806323b872dd1461018257806342842e0e146101955780636352211e146101a857806370a08231146101bb57600080fd5b806301ffc9a71461010557806306fdde031461012d578063081812fc14610142578063095ea7b31461016d575b600080fd5b61011861011336600461117a565b610285565b60405190151581526020015b60405180910390f35b6101356102d7565b6040516101249190611265565b6101556101503660046111b4565b610369565b6040516001600160a01b039091168152602001610124565b61018061017b366004611150565b610403565b005b610180610190366004610ffc565b610519565b6101806101a3366004610ffc565b61054a565b6101556101b63660046111b4565b610565565b6101ce6101c9366004610fae565b6105dc565b604051908152602001610124565b610180610663565b6000546001600160a01b0316610155565b6101356106c9565b61018061020b366004611114565b6106d8565b61018061021e366004611038565b61079d565b6101356102313660046111b4565b6107d5565b610118610244366004610fc9565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b610180610280366004610fae565b6108bd565b60006001600160e01b031982166380ac58cd60e01b14806102b657506001600160e01b03198216635b5e139f60e01b145b806102d157506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600180546102e690611376565b80601f016020809104026020016040519081016040528092919081815260200182805461031290611376565b801561035f5780601f106103345761010080835404028352916020019161035f565b820191906000526020600020905b81548152906001019060200180831161034257829003601f168201915b5050505050905090565b6000818152600360205260408120546001600160a01b03166103e75760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600560205260409020546001600160a01b031690565b600061040e82610565565b9050806001600160a01b0316836001600160a01b0316141561047c5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103de565b336001600160a01b038216148061049857506104988133610244565b61050a5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103de565b6105148383610988565b505050565b61052333826109f6565b61053f5760405162461bcd60e51b81526004016103de906112ca565b610514838383610aed565b6105148383836040518060200160405280600081525061079d565b6000818152600360205260408120546001600160a01b0316806102d15760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016103de565b60006001600160a01b0382166106475760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016103de565b506001600160a01b031660009081526004602052604090205490565b6000546001600160a01b031633146106bd5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103de565b6106c76000610c8d565b565b6060600280546102e690611376565b6001600160a01b0382163314156107315760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103de565b3360008181526006602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6107a733836109f6565b6107c35760405162461bcd60e51b81526004016103de906112ca565b6107cf84848484610cdd565b50505050565b6000818152600360205260409020546060906001600160a01b03166108545760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016103de565b600061086b60408051602081019091526000815290565b9050600081511161088b57604051806020016040528060008152506108b6565b8061089584610d10565b6040516020016108a69291906111f9565b6040516020818303038152906040525b9392505050565b6000546001600160a01b031633146109175760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103de565b6001600160a01b03811661097c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103de565b61098581610c8d565b50565b600081815260056020526040902080546001600160a01b0319166001600160a01b03841690811790915581906109bd82610565565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600360205260408120546001600160a01b0316610a6f5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103de565b6000610a7a83610565565b9050806001600160a01b0316846001600160a01b03161480610ab55750836001600160a01b0316610aaa84610369565b6001600160a01b0316145b80610ae557506001600160a01b0380821660009081526006602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610b0082610565565b6001600160a01b031614610b685760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016103de565b6001600160a01b038216610bca5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103de565b610bd5600082610988565b6001600160a01b0383166000908152600460205260408120805460019290610bfe908490611333565b90915550506001600160a01b0382166000908152600460205260408120805460019290610c2c90849061131b565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610ce8848484610aed565b610cf484848484610dad565b6107cf5760405162461bcd60e51b81526004016103de90611278565b60606000610d1d83610eba565b600101905060008167ffffffffffffffff811115610d3d57610d3d6113c7565b6040519080825280601f01601f191660200182016040528015610d67576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610da057610da5565b610d71565b509392505050565b60006001600160a01b0384163b15610eaf57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610df1903390899088908890600401611228565b602060405180830381600087803b158015610e0b57600080fd5b505af1925050508015610e3b575060408051601f3d908101601f19168201909252610e3891810190611197565b60015b610e95573d808015610e69576040519150601f19603f3d011682016040523d82523d6000602084013e610e6e565b606091505b508051610e8d5760405162461bcd60e51b81526004016103de90611278565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610ae5565b506001949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610ef95772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610f25576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610f4357662386f26fc10000830492506010015b6305f5e1008310610f5b576305f5e100830492506008015b6127108310610f6f57612710830492506004015b60648310610f81576064830492506002015b600a83106102d15760010192915050565b80356001600160a01b0381168114610fa957600080fd5b919050565b600060208284031215610fc057600080fd5b6108b682610f92565b60008060408385031215610fdc57600080fd5b610fe583610f92565b9150610ff360208401610f92565b90509250929050565b60008060006060848603121561101157600080fd5b61101a84610f92565b925061102860208501610f92565b9150604084013590509250925092565b6000806000806080858703121561104e57600080fd5b61105785610f92565b935061106560208601610f92565b925060408501359150606085013567ffffffffffffffff8082111561108957600080fd5b818701915087601f83011261109d57600080fd5b8135818111156110af576110af6113c7565b604051601f8201601f19908116603f011681019083821181831017156110d7576110d76113c7565b816040528281528a60208487010111156110f057600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561112757600080fd5b61113083610f92565b91506020830135801515811461114557600080fd5b809150509250929050565b6000806040838503121561116357600080fd5b61116c83610f92565b946020939093013593505050565b60006020828403121561118c57600080fd5b81356108b6816113dd565b6000602082840312156111a957600080fd5b81516108b6816113dd565b6000602082840312156111c657600080fd5b5035919050565b600081518084526111e581602086016020860161134a565b601f01601f19169290920160200192915050565b6000835161120b81846020880161134a565b83519083019061121f81836020880161134a565b01949350505050565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061125b908301846111cd565b9695505050505050565b6020815260006108b660208301846111cd565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b6000821982111561132e5761132e6113b1565b500190565b600082821015611345576113456113b1565b500390565b60005b8381101561136557818101518382015260200161134d565b838111156107cf5750506000910152565b600181811c9082168061138a57607f821691505b602082108114156113ab57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b03198116811461098557600080fdfea2646970667358221220ed115e304632262ea166d94c6ab1af7f154ed8d8f3e35da82183658eef56ce0e64736f6c63430008060033";
