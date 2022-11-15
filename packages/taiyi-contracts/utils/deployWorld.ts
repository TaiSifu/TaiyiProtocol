import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    ActorAttributes,
    ActorAttributesConstants,
    ActorAttributesConstants__factory,
    ActorAttributes__factory,
    Actors,
    Actors__factory,
    ShejiTu,
    ShejiTu__factory,
    WorldConstants, WorldConstants__factory, WorldContractRoute, WorldContractRoute__factory, WorldRandom, WorldRandom__factory, 
} from '../typechain';
import { Contract as EthersContract } from 'ethers';

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

export const deployActors = async (route: WorldContractRoute, deployer?: SignerWithAddress): Promise<Actors> => {
    const factory = new Actors__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldRandom = async (deployer?: SignerWithAddress): Promise<WorldRandom> => {
    const factory = new WorldRandom__factory(deployer);
    return (await factory.deploy()).deployed();
};

export const deployShejiTu = async (oneAgeVSecond: number, route: WorldContractRoute, deployer?: SignerWithAddress): Promise<ShejiTu> => {
    const factory = new ShejiTu__factory(deployer);
    console.log(`deploy ShejiTu with oneAgeVSecond=${oneAgeVSecond}`);
    return (await factory.deploy(oneAgeVSecond, route.address)).deployed();
};

export const deployActorAttributes = async (route: WorldContractRoute, deployer?: SignerWithAddress): Promise<ActorAttributes> => {
    const factory = new ActorAttributes__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

