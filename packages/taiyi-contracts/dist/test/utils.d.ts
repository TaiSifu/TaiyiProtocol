import '@nomiclabs/hardhat-ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { SifusToken, SifusDescriptor, SifusSeeder, Weth } from '../typechain';
import { Block } from '@ethersproject/abstract-provider';
import { BigNumberish } from 'ethers';
export type TestSigners = {
    deployer: SignerWithAddress;
    account0: SignerWithAddress;
    account1: SignerWithAddress;
    account2: SignerWithAddress;
};
export declare const getSigners: () => Promise<TestSigners>;
export declare const deploySifusDescriptor: (deployer?: SignerWithAddress) => Promise<SifusDescriptor>;
export declare const deploySifusSeeder: (deployer?: SignerWithAddress) => Promise<SifusSeeder>;
export declare const deploySifusToken: (worldRouteAddress: string, deployer?: SignerWithAddress, taiyiDAO?: string, descriptor?: string, seeder?: string) => Promise<SifusToken>;
export declare const deployWeth: (deployer?: SignerWithAddress) => Promise<Weth>;
export declare const populateDescriptor: (sifusDescriptor: SifusDescriptor) => Promise<void>;
/**
 * Return a function used to mint `amount` Sifus on the provided `token`
 * @param token The Sifu ERC721 token
 * @param amount The number of Sifus to mint
 */
export declare const MintSifus: (operator: BigNumberish, token: SifusToken, burnTaisifusTokens?: boolean) => (amount: number) => Promise<void>;
/**
 * Mints or burns tokens to target a total supply. Due to Taiyidao's rewards tokens may be burned and tokenIds will not be sequential
 */
export declare const setTotalSupply: (operator: BigNumberish, token: SifusToken, newTotalSupply: number) => Promise<void>;
export declare const encodeParameters: (types: string[], values: unknown[]) => string;
export declare const blockByNumber: (n: number | string) => Promise<Block>;
export declare const increaseTime: (seconds: number) => Promise<unknown>;
export declare const freezeTime: (seconds: number) => Promise<unknown>;
export declare const advanceBlocks: (blocks: number) => Promise<void>;
export declare const blockNumber: (parse?: boolean) => Promise<number>;
export declare const blockTimestamp: (n: number | string, parse?: boolean) => Promise<number | string>;
export declare const setNextBlockTimestamp: (n: number, mine?: boolean) => Promise<void>;
export declare const minerStop: () => Promise<void>;
export declare const minerStart: () => Promise<void>;
export declare const mineBlock: () => Promise<void>;
export declare const chainId: () => Promise<number>;
export declare const address: (n: number) => string;
