"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SifusSeeder__factory = void 0;
const ethers_1 = require("ethers");
class SifusSeeder__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
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
exports.SifusSeeder__factory = SifusSeeder__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "sifuId",
                type: "uint256",
            },
            {
                internalType: "contract ISifusDescriptor",
                name: "descriptor",
                type: "address",
            },
        ],
        name: "generateSeed",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint48",
                        name: "background",
                        type: "uint48",
                    },
                    {
                        internalType: "uint48",
                        name: "part1",
                        type: "uint48",
                    },
                    {
                        internalType: "uint48",
                        name: "part2",
                        type: "uint48",
                    },
                    {
                        internalType: "uint48",
                        name: "part3",
                        type: "uint48",
                    },
                    {
                        internalType: "uint48",
                        name: "part4",
                        type: "uint48",
                    },
                ],
                internalType: "struct ISifusSeeder.Seed",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506104e3806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063422e2e9914610030575b600080fd5b61004361003e36600461042a565b61009a565b6040516100919190815165ffffffffffff9081168252602080840151821690830152604080840151821690830152606080840151821690830152608092830151169181019190915260a00190565b60405180910390f35b6040805160a0810182526000808252602082018190529181018290526060810182905260808101829052906100d0600143610466565b604080519140602083015281018590526060016040516020818303038152906040528051906020012060001c90506000836001600160a01b0316634531c0a86040518163ffffffff1660e01b815260040160206040518083038186803b15801561013957600080fd5b505afa15801561014d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101719190610411565b90506000846001600160a01b03166313af6d326040518163ffffffff1660e01b815260040160206040518083038186803b1580156101ae57600080fd5b505afa1580156101c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e69190610411565b90506000856001600160a01b0316633aa824796040518163ffffffff1660e01b815260040160206040518083038186803b15801561022357600080fd5b505afa158015610237573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061025b9190610411565b90506000866001600160a01b031663aadc6db46040518163ffffffff1660e01b815260040160206040518083038186803b15801561029857600080fd5b505afa1580156102ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d09190610411565b90506000876001600160a01b0316639dd6db036040518163ffffffff1660e01b815260040160206040518083038186803b15801561030d57600080fd5b505afa158015610321573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103459190610411565b90506040518060a00160405280868865ffffffffffff16610366919061048b565b65ffffffffffff16815260200185603089901c65ffffffffffff1661038b919061048b565b65ffffffffffff16815260200184606089901c65ffffffffffff166103b0919061048b565b65ffffffffffff16815260200183609089901c65ffffffffffff166103d5919061048b565b65ffffffffffff1681526020018260c089901c65ffffffffffff166103fa919061048b565b65ffffffffffff1690529998505050505050505050565b60006020828403121561042357600080fd5b5051919050565b6000806040838503121561043d57600080fd5b8235915060208301356001600160a01b038116811461045b57600080fd5b809150509250929050565b60008282101561048657634e487b7160e01b600052601160045260246000fd5b500390565b6000826104a857634e487b7160e01b600052601260045260246000fd5b50069056fea2646970667358221220c08cf4050c69d18fd1940d429efab4fb0fea15e661eefe0775632b1e01a6779c64736f6c63430008060033";