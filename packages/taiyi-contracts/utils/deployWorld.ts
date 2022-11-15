import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    Actors,
    Actors__factory,
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

export const deployActors = async (route: WorldContractRoute, deployer?: SignerWithAddress): Promise<Actors> => {
    const factory = new Actors__factory(deployer);
    return (await factory.deploy(route.address)).deployed();
};

export const deployWorldRandom = async (deployer?: SignerWithAddress): Promise<WorldRandom> => {
    const factory = new WorldRandom__factory(deployer);
    return (await factory.deploy()).deployed();
};
