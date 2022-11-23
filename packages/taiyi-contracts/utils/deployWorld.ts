import { ethers, upgrades  } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    ActorAttributes, ActorAttributes__factory, ActorAttributesConstants, ActorAttributesConstants__factory,
    ActorNames, ActorNames__factory, Actors, Actors__factory, ActorSocialIdentity, ActorSocialIdentity__factory,    
    WorldFungible, WorldFungible__factory, ShejiTu, ShejiTu__factory, SifusToken,
    WorldConstants, WorldConstants__factory, WorldContractRoute, WorldContractRoute__factory, WorldRandom, WorldRandom__factory, 
    WorldItems, WorldItems__factory, WorldZones, WorldZones__factory,
} from '../typechain';
import { BigNumberish, Contract as EthersContract } from 'ethers';

export const deployWorldContractRoute = async (deployer?: SignerWithAddress): Promise<WorldContractRoute> => {
    const factory = new WorldContractRoute__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployWorldConstants = async (deployer?: SignerWithAddress): Promise<WorldConstants> => {
    const factory = new WorldConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployActorAttributesConstants = async (deployer?: SignerWithAddress): Promise<ActorAttributesConstants> => {
    const factory = new ActorAttributesConstants__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployActors = async (taiyiDAO: string, mintStart: BigNumberish, coinContract: string,
route: WorldContractRoute, deployer?: SignerWithAddress): Promise<Actors> => {
    const factory = new Actors__factory(deployer);
    return (await factory.deploy(taiyiDAO, mintStart, coinContract, route.address)).deployed();
};

export const deployShejiTu = async (oneAgeVSecond: number, sifusToken: SifusToken, route: WorldContractRoute, deployer?: SignerWithAddress) => {
    console.log(`deploy ShejiTu with oneAgeVSecond=${oneAgeVSecond}`);
    const shejiTuFactory = new ShejiTu__factory(deployer);
    return upgrades.deployProxy(shejiTuFactory, [
        sifusToken.address,
        oneAgeVSecond,
        route.address
    ]) as Promise<ShejiTu>;
}

export const deployWorldRandom = async (deployer?: SignerWithAddress): Promise<WorldRandom> => {
    const factory = new WorldRandom__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployActorAttributes = async (route: WorldContractRoute, deployer?: SignerWithAddress): Promise<ActorAttributes> => {
    const factory = new ActorAttributes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployAssetDaoli = async (worldConst: WorldConstants, route: WorldContractRoute, deployer?: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Daoli", "DAOLI", await worldConst.WORLD_MODULE_COIN(), route.address)).deployed();
};

export const deployAssetFood = async (worldConst: WorldConstants, route: WorldContractRoute, deployer?: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Food", "TYFOOD", await worldConst.WORLD_MODULE_FOOD(), route.address)).deployed();
};

export const deployAssetWood = async (worldConst: WorldConstants, route: WorldContractRoute, deployer?: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Wood", "TYWOOD", await worldConst.WORLD_MODULE_WOOD(), route.address)).deployed();
};

export const deployAssetGold = async (worldConst: WorldConstants, route: WorldContractRoute, deployer?: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Gold", "TYGOLD", await worldConst.WORLD_MODULE_GOLD(), route.address)).deployed();
};

export const deployAssetFabric = async (worldConst: WorldConstants, route: WorldContractRoute, deployer?: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Fabric", "TYFABRIC", await worldConst.WORLD_MODULE_FABRIC(), route.address)).deployed();
};

export const deployAssetHerb = async (worldConst: WorldConstants, route: WorldContractRoute, deployer?: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Herb", "TYHERB", await worldConst.WORLD_MODULE_HERB(), route.address)).deployed();
};

export const deployAssetPrestige = async (worldConst: WorldConstants, route: WorldContractRoute, deployer?: SignerWithAddress): Promise<WorldFungible> => {
    const factory = new WorldFungible__factory(deployer);
    return (await factory.deploy("Taiyi Prestige", "TYPRESTIGE", await worldConst.WORLD_MODULE_PRESTIGE(), route.address)).deployed();
};

export const deployActorNames = async (route: WorldContractRoute, deployer?: SignerWithAddress): Promise<ActorNames> => {
    const factory = new ActorNames__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployActorSocialIdentity = async (route: WorldContractRoute, deployer?: SignerWithAddress): Promise<ActorSocialIdentity> => {
    const factory = new ActorSocialIdentity__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldItems = async (route: WorldContractRoute, deployer?: SignerWithAddress): Promise<WorldItems> => {
    const factory = new WorldItems__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldZones = async (route: WorldContractRoute, deployer?: SignerWithAddress): Promise<WorldZones> => {
    const factory = new WorldZones__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

