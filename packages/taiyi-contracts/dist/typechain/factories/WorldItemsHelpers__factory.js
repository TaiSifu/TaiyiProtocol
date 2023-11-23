"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldItemsHelpers__factory = void 0;
const ethers_1 = require("ethers");
class WorldItemsHelpers__factory extends ethers_1.ContractFactory {
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
exports.WorldItemsHelpers__factory = WorldItemsHelpers__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "shapeNames",
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
                internalType: "string",
                name: "str",
                type: "string",
            },
        ],
        name: "toLower",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_itemId",
                type: "uint256",
            },
            {
                internalType: "contract WorldItems",
                name: "_items",
                type: "address",
            },
            {
                internalType: "contract WorldContractRoute",
                name: "_route",
                type: "address",
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
                internalType: "string",
                name: "str",
                type: "string",
            },
        ],
        name: "validateName",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode = "0x600b6101a08181526ae4b88bc2b7e4b99de5938160a81b6101c05260809081526101e08281526ae4b8adc2b7e585abe5938160a81b6102005260a0526102208281526ae4b88ac2b7e4b883e5938160a81b6102405260c0526102608281526ae5a587c2b7e585ade5938160a81b6102805260e0526102a08281526ae7a798c2b7e4ba94e5938160a81b6102c052610100526102e08281526ae69e81c2b7e59b9be5938160a81b61030052610120526103208281526ae8b685c2b7e4b889e5938160a81b61034052610140526103608281526ae7bb9dc2b7e4ba8ce5938160a81b61038052610160526103e06040526103a09182526ae7a59ec2b7e4b880e5938160a81b6103c052610180919091526200011d90600090600962000132565b503480156200012b57600080fd5b50620002d8565b82805482825590600052602060002090810192821562000184579160200282015b828111156200018457825180516200017391849160209091019062000196565b509160200191906001019062000153565b506200019292915062000221565b5090565b828054620001a4906200029b565b90600052602060002090601f016020900481019282620001c8576000855562000213565b82601f10620001e357805160ff191683800117855562000213565b8280016001018555821562000213579182015b8281111562000213578251825591602001919060010190620001f6565b506200019292915062000242565b808211156200019257600062000238828262000259565b5060010162000221565b5b8082111562000192576000815560010162000243565b50805462000267906200029b565b6000825580601f1062000278575050565b601f01602090049060005260206000209081019062000298919062000242565b50565b600181811c90821680620002b057607f821691505b60208210811415620002d257634e487b7160e01b600052602260045260246000fd5b50919050565b61183b80620002e86000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806387216426146100515780639416b4231461007a5780639ffdb65a1461008d578063ea691053146100b0575b600080fd5b61006461005f366004610f6e565b6100c3565b6040516100719190611499565b60405180910390f35b610064610088366004610da4565b6106d7565b6100a061009b366004610da4565b61083a565b6040519015158152602001610071565b6100646100be366004610f3c565b610987565b60606100cd610d07565b60405180610100016040528060dc815260200161172a60dc9139815284156103d85760405163898e621960e01b8152600481018690526000906001600160a01b0386169063898e62199060240160006040518083038186803b15801561013257600080fd5b505afa158015610146573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261016e9190810190610e8a565b905061017986610a33565b604051602001610189919061121a565b60408051808303601f190181529181526020808501929092528282015190516101b29201611320565b60408051808303601f1901815291815283810191909152606082015190516101dd9190602001611380565b60408051808303601f190181529190526060830152608081015161020090610a33565b60405160200161021091906111a1565b60408051601f1981840301815291905282600460200201819052506000846001600160a01b031663cc7f0c246040518163ffffffff1660e01b815260040160206040518083038186803b15801561026657600080fd5b505afa15801561027a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061029e9190610d80565b6001600160a01b031663b5adc5ad876001600160a01b0316636352211e8a6040518263ffffffff1660e01b81526004016102da91815260200190565b60206040518083038186803b1580156102f257600080fd5b505afa158015610306573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032a9190610d80565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260240160606040518083038186803b15801561036957600080fd5b505afa15801561037d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a19190610e1f565b6040015190506103b081610a33565b6040516020016103c09190611422565b60408051808303601f1901815291905260a084015250505b604051651e17b9bb339f60d11b602082015260260160408051808303601f1901815291815260c083018290528251602080850151858401516060870151608088015160a0890151965160009861043998959694959394929392909101611007565b604051602081830303815290604052905061045386610a33565b60405160200161046391906112d0565b60408051808303601f1901815291815290835280516060810190915260268082526116c4602083013982600160200201819052506040516020016104b9906b01610113230ba30911d103d960a51b8152600c0190565b60408051808303601f19018152918152838101829052516326b3e1e360e21b81526004810188905261054f906001600160a01b03881690639acf878c906024015b60206040518083038186803b15801561051257600080fd5b505afa158015610526573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054a9190610f55565b610a33565b60405160200161056092919061110f565b60408051808303601f19018152918152838101829052516391e9fa4360e01b8152600481018890526105a5906001600160a01b038816906391e9fa43906024016104fa565b6040516020016105b6929190611099565b60408051808303601f1901815291815283810182905251630c47948360e11b8152600481018890526105fb906001600160a01b0388169063188f2906906024016104fa565b60405160200161060c92919061115f565b60408051808303601f190181529181528381018290525161063091906020016110ea565b60408051808303601f1901815291815283015261064c81610ac8565b60405160200161065c91906113c2565b60408051808303601f190181529181526060840182905283516020808601518684015193516000956106a9956106959594909201610fb0565b604051602081830303815290604052610ac8565b9050806040516020016106bc919061128b565b60405160208183030381529060405293505050509392505050565b606060008290506000815167ffffffffffffffff8111156106fa576106fa611695565b6040519080825280601f01601f191660200182016040528015610724576020820181803683370190505b50905060005b82518110156108325760418382815181106107475761074761167f565b016020015160f81c108015906107775750605a83828151811061076c5761076c61167f565b016020015160f81c11155b156107d95782818151811061078e5761078e61167f565b602001015160f81c60f81b60f81c60206107a89190611566565b60f81b8282815181106107bd576107bd61167f565b60200101906001600160f81b031916908160001a905350610820565b8281815181106107eb576107eb61167f565b602001015160f81c60f81b8282815181106108085761080861167f565b60200101906001600160f81b031916908160001a9053505b8061082a8161164e565b91505061072a565b509392505050565b6000808290506001815110156108535750600092915050565b6019815111156108665750600092915050565b806000815181106108795761087961167f565b6020910101516001600160f81b031916600160fd1b141561089d5750600092915050565b80600182516108ac91906115cc565b815181106108bc576108bc61167f565b6020910101516001600160f81b031916600160fd1b14156108e05750600092915050565b6000816000815181106108f5576108f561167f565b01602001516001600160f81b031916905060005b825181101561097c5760008382815181106109265761092661167f565b01602001516001600160f81b0319169050600160fd1b811480156109575750600160fd1b6001600160f81b03198416145b156109685750600095945050505050565b9150806109748161164e565b915050610909565b506001949350505050565b6000818154811061099757600080fd5b9060005260206000200160009150905080546109b290611613565b80601f01602080910402602001604051908101604052809291908181526020018280546109de90611613565b8015610a2b5780601f10610a0057610100808354040283529160200191610a2b565b820191906000526020600020905b815481529060010190602001808311610a0e57829003601f168201915b505050505081565b60606000610a4083610c2e565b600101905060008167ffffffffffffffff811115610a6057610a60611695565b6040519080825280601f01601f191660200182016040528015610a8a576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610ac357610832565b610a94565b805160609080610ae8575050604080516020810190915260008152919050565b60006003610af783600261154e565b610b01919061158b565b610b0c9060046115ad565b90506000610b1b82602061154e565b67ffffffffffffffff811115610b3357610b33611695565b6040519080825280601f01601f191660200182016040528015610b5d576020820181803683370190505b50905060006040518060600160405280604081526020016116ea604091399050600181016020830160005b86811015610be9576003818a01810151603f601282901c8116860151600c83901c8216870151600684901c831688015192909316870151600891821b60ff94851601821b92841692909201901b91160160e01b835260049092019101610b88565b506003860660018114610c035760028114610c1457610c20565b613d3d60f01b600119830152610c20565b603d60f81b6000198301525b505050918152949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610c6d5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610c99576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610cb757662386f26fc10000830492506010015b6305f5e1008310610ccf576305f5e100830492506008015b6127108310610ce357612710830492506004015b60648310610cf5576064830492506002015b600a8310610d01576001015b92915050565b6040518060e001604052806007905b6060815260200190600190039081610d165790505090565b600082601f830112610d3f57600080fd5b8151610d52610d4d82611526565b6114f5565b818152846020838601011115610d6757600080fd5b610d788260208301602087016115e3565b949350505050565b600060208284031215610d9257600080fd5b8151610d9d816116ab565b9392505050565b600060208284031215610db657600080fd5b813567ffffffffffffffff811115610dcd57600080fd5b8201601f81018413610dde57600080fd5b8035610dec610d4d82611526565b818152856020838501011115610e0157600080fd5b81602084016020830137600091810160200191909152949350505050565b600060608284031215610e3157600080fd5b6040516060810181811067ffffffffffffffff82111715610e5457610e54611695565b6040528251610e62816116ab565b81526020830151610e72816116ab565b60208201526040928301519281019290925250919050565b600060208284031215610e9c57600080fd5b815167ffffffffffffffff80821115610eb457600080fd5b9083019060a08286031215610ec857600080fd5b610ed06114cc565b82518152602083015182811115610ee657600080fd5b610ef287828601610d2e565b60208301525060408301516040820152606083015182811115610f1457600080fd5b610f2087828601610d2e565b6060830152506080830151608082015280935050505092915050565b600060208284031215610f4e57600080fd5b5035919050565b600060208284031215610f6757600080fd5b5051919050565b600080600060608486031215610f8357600080fd5b833592506020840135610f95816116ab565b91506040840135610fa5816116ab565b809150509250925092565b60008551610fc2818460208a016115e3565b855190830190610fd6818360208a016115e3565b8551910190610fe98183602089016115e3565b8451910190610ffc8183602088016115e3565b019695505050505050565b60008851602061101a8285838e016115e3565b89519184019161102d8184848e016115e3565b895192019161103f8184848d016115e3565b88519201916110518184848c016115e3565b87519201916110638184848b016115e3565b86519201916110758184848a016115e3565b855192019161108781848489016115e3565b919091019a9950505050505050505050565b600083516110ab8184602088016115e3565b671139b430b832911d60c11b90830190815283516110d08160088401602088016115e3565b600b60fa1b60089290910191820152600901949350505050565b600082516110fc8184602087016115e3565b607d60f81b920191825250600101919050565b600083516111218184602088016115e3565b66113a3cb832911d60c91b90830190815283516111458160078401602088016115e3565b600b60fa1b60079290910191820152600801949350505050565b600083516111718184602088016115e3565b66113bb2b0b9111d60c91b90830190815283516111958160078401602088016115e3565b01600701949350505050565b7f3c7465787420783d2231302220793d2238302220636c6173733d2262617365228152601f60f91b602082015265e88090e4b98560d01b6021820152603d60f81b6027820152600082516111fc8160288501602087016115e3565b661e17ba32bc3a1f60c91b6028939091019283015250602f01919050565b7f3c7465787420783d2231302220793d2232302220636c6173733d2262617365228152601f60f91b602082015267e789a9e59381202360c01b60218201526000825161126d8160298501602087016115e3565b661e17ba32bc3a1f60c91b6029939091019283015250603001919050565b7f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c0000008152600082516112c381601d8501602087016115e3565b91909101601d0192915050565b7f7b226e616d65223a20225461697969204974656d7320230000000000000000008152600082516113088160178501602087016115e3565b601160f91b6017939091019283015250601801919050565b7f3c7465787420783d2231302220793d2234302220636c6173733d2262617365228152601f60f91b6020820152600082516113628160218501602087016115e3565b661e17ba32bc3a1f60c91b6021939091019283015250602801919050565b7f3c7465787420783d2231302220793d2236302220636c6173733d2262617365228152601f60f91b6020820152600082516113628160218501602087016115e3565b7f2c2022696d616765223a2022646174613a696d6167652f7376672b786d6c3b62815265185cd94d8d0b60d21b6020820152600082516114098160268501602087016115e3565b61227d60f01b6026939091019283015250602801919050565b7f3c7465787420783d2231302220793d223130302220636c6173733d2262617365815261111f60f11b60208201526ce5b19ee4ba8ee8a792e889b22360981b60228201526000825161147b81602f8501602087016115e3565b661e17ba32bc3a1f60c91b602f939091019283015250603601919050565b60208152600082518060208401526114b88160408501602087016115e3565b601f01601f19169190910160400192915050565b60405160a0810167ffffffffffffffff811182821017156114ef576114ef611695565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561151e5761151e611695565b604052919050565b600067ffffffffffffffff82111561154057611540611695565b50601f01601f191660200190565b6000821982111561156157611561611669565b500190565b600060ff821660ff84168060ff0382111561158357611583611669565b019392505050565b6000826115a857634e487b7160e01b600052601260045260246000fd5b500490565b60008160001904831182151516156115c7576115c7611669565b500290565b6000828210156115de576115de611669565b500390565b60005b838110156115fe5781810151838201526020016115e6565b8381111561160d576000848401525b50505050565b600181811c9082168061162757607f821691505b6020821081141561164857634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561166257611662611669565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146116c057600080fd5b5056fe2c20226465736372697074696f6e223a202254686973206973206e6f7420612067616d652e224142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2f3c73766720786d6c6e733d22687474703a2f2f7777772e77332e6f72672f323030302f73766722207072657365727665417370656374526174696f3d22784d696e594d696e206d656574222076696577426f783d223020302033353020333530223e3c7374796c653e2e62617365207b2066696c6c3a2077686974653b20666f6e742d66616d696c793a2073657269663b20666f6e742d73697a653a20313470783b207d3c2f7374796c653e3c726563742077696474683d223130302522206865696768743d2231303025222066696c6c3d22626c61636b22202f3ea2646970667358221220de2ae8854802be84e303f66b9543239c57912ebee13cabb3fdd56468c11ec25c64736f6c63430008060033";