"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldEventProcessor1020013__factory = void 0;
const ethers_1 = require("ethers");
class WorldEventProcessor1020013__factory extends ethers_1.ContractFactory {
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
exports.WorldEventProcessor1020013__factory = WorldEventProcessor1020013__factory;
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
const _bytecode = "0x608060405234801561001057600080fd5b506040516116df3803806116df83398101604081905261002f916100bb565b600080546001600160a01b0319166001600160a01b0383161790558062102ca261005e6100593390565b610069565b600255506100eb9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100cd57600080fd5b81516001600160a01b03811681146100e457600080fd5b9392505050565b6115e5806100fa6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80639d0c025b1161008c578063c0f1619c11610066578063c0f1619c146101cb578063c7293294146101e1578063ca5bf9a414610204578063f2fde38b1461020d57600080fd5b80639d0c025b14610184578063a71d6e3b146101a4578063b4ae1235146101b857600080fd5b8063715018a6116100c8578063715018a61461013b5780637c99f6a6146101435780637e997b54146101565780638da5cb5b1461016957600080fd5b8063127ce1cc146100ef57806333dd893f146101045780634849f6561461011b575b600080fd5b6101026100fd3660046112c1565b610220565b005b6003545b6040519081526020015b60405180910390f35b61012e6101293660046112c1565b610280565b6040516101129190611416565b610102610291565b6101026101513660046113ea565b6102f7565b6101086101643660046112c1565b6104ae565b6001546040516001600160a01b039091168152602001610112565b6101976101923660046112c1565b6104cf565b604051610112919061145a565b61012e6101b23660046112c1565b50606090565b6101026101c6366004611315565b6104f0565b6101086101d93660046112f3565b505060025490565b6101f46101ef3660046112f3565b610676565b6040519015158152602001610112565b61010860025481565b61010261021b3660046111cd565b6107d6565b61022a60016108a1565b61027b5760405162461bcd60e51b815260206004820152601f60248201527f6e6f742061726368697465637420617070726f766564206f72206f776e65720060448201526064015b60405180910390fd5b600255565b606061028b82610b3a565b92915050565b6001546001600160a01b031633146102eb5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610272565b6102f5600061108e565b565b6000546040516340d9124560e11b815260048082015284916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561033a57600080fd5b505afa15801561034e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037291906111ea565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161039f91815260200190565b60206040518083038186803b1580156103b757600080fd5b505afa1580156103cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ef919061129f565b6104295760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610272565b610432816108a1565b6104765760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610272565b5050600380546001810182556000919091527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b015550565b600381815481106104be57600080fd5b600091825260209091200154905081565b606060405180606001604052806021815260200161158f6021913992915050565b6000546040516340d9124560e11b815260048082015285916001600160a01b0316906381b2248a9060240160206040518083038186803b15801561053357600080fd5b505afa158015610547573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056b91906111ea565b6001600160a01b031663a329bda9826040518263ffffffff1660e01b815260040161059891815260200190565b60206040518083038186803b1580156105b057600080fd5b505afa1580156105c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e8919061129f565b6106225760405162461bcd60e51b815260206004820152600b60248201526a6f6e6c792059654d696e6760a81b6044820152606401610272565b61062b816108a1565b61066f5760405162461bcd60e51b81526020600482015260156024820152743737ba102cb2a6b4b73393b99037b832b930ba37b960591b6044820152606401610272565b5050505050565b600080546040516340d9124560e11b81526103ea600482015260019183916001600160a01b03909116906381b2248a9060240160206040518083038186803b1580156106c157600080fd5b505afa1580156106d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106f991906111ea565b604051637d1f0aab60e01b8152600481018790529091506000906001600160a01b03831690637d1f0aab9060240160006040518083038186803b15801561073f57600080fd5b505afa158015610753573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261077b9190810190611207565b905060005b81518110156107cb5781818151811061079b5761079b61154d565b602002602001015161271314156107b957600094505050505061028b565b806107c38161151c565b915050610780565b509195945050505050565b6001546001600160a01b031633146108305760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610272565b6001600160a01b0381166108955760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610272565b61089e8161108e565b50565b600080546040805163331fc30960e21b8152905183926001600160a01b03169163cc7f0c24916004808301926020929190829003018186803b1580156108e657600080fd5b505afa1580156108fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061091e91906111ea565b60405163020604bf60e21b81526004810185905290915033906001600160a01b0383169063081812fc9060240160206040518083038186803b15801561096357600080fd5b505afa158015610977573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099b91906111ea565b6001600160a01b03161480610a3057506040516331a9108f60e11b81526004810184905233906001600160a01b03831690636352211e9060240160206040518083038186803b1580156109ed57600080fd5b505afa158015610a01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2591906111ea565b6001600160a01b0316145b80610b3357506040516331a9108f60e11b8152600481018490526001600160a01b0382169063e985e9c5908290636352211e9060240160206040518083038186803b158015610a7e57600080fd5b505afa158015610a92573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ab691906111ea565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015233602482015260440160206040518083038186803b158015610afb57600080fd5b505afa158015610b0f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b33919061129f565b9392505050565b60408051600680825260e08201909252606091600091906020820160c08036833701905050600080546040516340d9124560e11b81526001600482015292935090916001600160a01b03909116906381b2248a9060240160206040518083038186803b158015610ba957600080fd5b505afa158015610bbd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be191906111ea565b90506101f46001600160a01b038216633f9fdf3c610c018761014b611504565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610c4057600080fd5b505afa158015610c54573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c7891906112da565b1015610c85576000610c88565b60015b60ff1682600081518110610c9e57610c9e61154d565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610cc7876102cf611504565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610d0657600080fd5b505afa158015610d1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d3e91906112da565b1015610d4b576000610d4e565b60015b60ff1682600181518110610d6457610d6461154d565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610d8d876103f5611504565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610dcc57600080fd5b505afa158015610de0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0491906112da565b1015610e11576000610e14565b60015b60ff1682600281518110610e2a57610e2a61154d565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610e53876104d5611504565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610e9257600080fd5b505afa158015610ea6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eca91906112da565b1015610ed7576000610eda565b60015b60ff1682600381518110610ef057610ef061154d565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610f1987610851611504565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b158015610f5857600080fd5b505afa158015610f6c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f9091906112da565b1015610f9d576000610fa0565b60015b60ff1682600481518110610fb657610fb661154d565b60209081029190910101526101f46001600160a01b038216633f9fdf3c610fdf876135bd611504565b6040516001600160e01b031960e084901b16815260048101919091526103e8602482015260440160206040518083038186803b15801561101e57600080fd5b505afa158015611032573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061105691906112da565b1015611063576000611066565b60015b60ff168260058151811061107c5761107c61154d565b60209081029190910101525092915050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000601f83818401126110f257600080fd5b82356020611107611102836114e0565b6114af565b80838252828201915082870188848660051b8a0101111561112757600080fd5b60005b858110156111bf57813567ffffffffffffffff8082111561114a57600080fd5b818b0191508b603f83011261115e57600080fd5b8682013560408282111561117457611174611563565b611185828c01601f19168a016114af565b92508183528d8183860101111561119b57600080fd5b818185018a850137506000908201880152855250928401929084019060010161112a565b509098975050505050505050565b6000602082840312156111df57600080fd5b8135610b3381611579565b6000602082840312156111fc57600080fd5b8151610b3381611579565b6000602080838503121561121a57600080fd5b825167ffffffffffffffff81111561123157600080fd5b8301601f8101851361124257600080fd5b8051611250611102826114e0565b80828252848201915084840188868560051b870101111561127057600080fd5b600094505b83851015611293578051835260019490940193918501918501611275565b50979650505050505050565b6000602082840312156112b157600080fd5b81518015158114610b3357600080fd5b6000602082840312156112d357600080fd5b5035919050565b6000602082840312156112ec57600080fd5b5051919050565b6000806040838503121561130657600080fd5b50508035926020909101359150565b6000806000806080858703121561132b57600080fd5b843593506020808601359350604086013567ffffffffffffffff8082111561135257600080fd5b818801915088601f83011261136657600080fd5b8135611374611102826114e0565b8082825285820191508585018c878560051b880101111561139457600080fd5b600095505b838610156113b7578035835260019590950194918601918601611399565b509650505060608801359250808311156113d057600080fd5b50506113de878288016110e0565b91505092959194509250565b6000806000606084860312156113ff57600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b8181101561144e57835183529284019291840191600101611432565b50909695505050505050565b600060208083528351808285015260005b818110156114875785810183015185820160400152820161146b565b81811115611499576000604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156114d8576114d8611563565b604052919050565b600067ffffffffffffffff8211156114fa576114fa611563565b5060051b60200190565b6000821982111561151757611517611537565b500190565b600060001982141561153057611530611537565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461089e57600080fdfee4bda0e587bae78eb0e4ba86efbc8ce698afe4b8aae5bc95e58a9be5ad90e38082a26469706673582212202db7177be38f3bb102e47e12d56c1258e008d2aacd2d3134a92787e57305e5d464736f6c63430008060033";
