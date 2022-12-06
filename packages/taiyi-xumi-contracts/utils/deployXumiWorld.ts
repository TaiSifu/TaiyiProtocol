import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, BigNumberish, Contract as EthersContract } from 'ethers';
import { default as XumiABI } from '../abi/contracts/Xumi.sol/Xumi.json';
import { Interface } from 'ethers/lib/utils';
import { chunkArray } from '@taiyi/contracts/utils/chunkArray';
import { 
    ActorXumiAttributes,
    ActorXumiAttributesConstants,
    ActorXumiAttributesConstants__factory,
    ActorXumiAttributes__factory,
    XumiConstants, XumiConstants__factory, Xumi__factory 
} from '../typechain';
import {
    WorldConstants, WorldContractRoute, ShejiTuProxyAdmin__factory, ShejiTuProxy__factory, WorldFungible, 
    WorldFungible__factory,
} from '@taiyi/contracts/dist/typechain';

export const deployXumiConstants = async (deployer: SignerWithAddress): Promise<XumiConstants> => {
    const factory = new XumiConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployXumi = async (route: WorldContractRoute, deployer: SignerWithAddress) => {
    let xumiImpl = await (await (new Xumi__factory(deployer)).deploy()).deployed();    
    let xumiProxyAdmin = await (await (new ShejiTuProxyAdmin__factory(deployer)).deploy()).deployed();
    const xumiProxyFactory = new ShejiTuProxy__factory(deployer);
    let xumiProxy = await xumiProxyFactory.deploy(
        xumiImpl.address,
        xumiProxyAdmin.address,
        new Interface(XumiABI).encodeFunctionData('initialize', [
            route.address]));
    return [await xumiProxy.deployed(), xumiProxyAdmin, xumiImpl];
}

export const deployAssetEnergy = async (worldConst: XumiConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Xumi Energy", "XMENERGY", await worldConst.WORLD_MODULE_XUMI_ENERGY(), route.address)).deployed();
};

export const deployAssetElementH = async (worldConst: XumiConstants, route: WorldContractRoute, deployer: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Xumi Element H", "XMH", await worldConst.WORLD_MODULE_XUMI_ELEMENT_H(), route.address)).deployed();
};

export const deployActorXumiAttributesConstants = async (deployer: SignerWithAddress): Promise<ActorXumiAttributesConstants> => {
    const factory = new ActorXumiAttributesConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};
export const deployActorXumiAttributes = async (route: WorldContractRoute, deployer: SignerWithAddress): Promise<ActorXumiAttributes> => {
    const factory = new ActorXumiAttributes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export type XumiContractName =
    | 'Xumi'
    | 'AssetEnergy'
    | 'AssetElementH'
    | 'XumiConstants';

