import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    //proto world related
    WorldConstants, WorldConstants__factory, WorldContractRoute, WorldContractRoute__factory, 
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

