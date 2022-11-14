import '@nomiclabs/hardhat-ethers';
import { ethers, network } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  SifusToken, SifusToken__factory, SifusDescriptor, SifusDescriptor__factory, SifusSeeder, SifusSeeder__factory,
  Weth, Weth__factory,
} from '../typechain';
import ImageData from '../files/image-data.json';
import { Block } from '@ethersproject/abstract-provider';
import { chunkArray } from '../utils';
import { deployWorldContractRoute } from '../utils/deployWorld';

export type TestSigners = {
  deployer: SignerWithAddress;
  account0: SignerWithAddress;
  account1: SignerWithAddress;
  account2: SignerWithAddress;
};

export const getSigners = async (): Promise<TestSigners> => {
  const [deployer, account0, account1, account2] = await ethers.getSigners();
  return {
    deployer,
    account0,
    account1,
    account2,
  };
};

export const deploySifusDescriptor = async (
  deployer?: SignerWithAddress,
): Promise<SifusDescriptor> => {
  const signer = deployer || (await getSigners()).deployer;
  const multiPartRLEToSVGLibraryFactory = await ethers.getContractFactory('MultiPartRLEToSVG', signer);
  const multiPartRLEToSVGLibrary = await multiPartRLEToSVGLibraryFactory.deploy();
  const sifusDescriptorFactory = new SifusDescriptor__factory(
    // {
    //   __$e1d8844a0810dc0e87a665b1f2b5fa7c69$__: multiPartRLEToSVGLibrary.address,
    // },
    signer,
  );

  return sifusDescriptorFactory.deploy();
};

export const deploySifusSeeder = async (deployer?: SignerWithAddress): Promise<SifusSeeder> => {
  const factory = new SifusSeeder__factory(deployer || (await getSigners()).deployer);

  return factory.deploy();
};

export const deploySifusToken = async (
  deployer?: SignerWithAddress,
  taiyiDAO?: string,
  minter?: string,
  descriptor?: string,
  seeder?: string,
  worldRoute?: string,
  //proxyRegistryAddress?: string,
): Promise<SifusToken> => {
  const signer = deployer || (await getSigners()).deployer;
  const factory = new SifusToken__factory(signer);

  return factory.deploy(
    taiyiDAO || signer.address,
    minter || signer.address,
    descriptor || (await deploySifusDescriptor(signer)).address,
    seeder || (await deploySifusSeeder(signer)).address,
    worldRoute || (await deployWorldContractRoute(signer)).address,
    //proxyRegistryAddress || address(0)
  );
};

export const deployWeth = async (deployer?: SignerWithAddress): Promise<Weth> => {
  const factory = new Weth__factory(deployer || (await await getSigners()).deployer);

  return factory.deploy();
};

export const populateDescriptor = async (sifusDescriptor: SifusDescriptor): Promise<void> => {
  const { bgcolors, palette, images } = ImageData;
  const { bodies, accessories, heads, glasses } = images;

  // Split up head and accessory population due to high gas usage
  await Promise.all([
    sifusDescriptor.addManyBackgrounds(bgcolors),
    sifusDescriptor.addManyColorsToPalette(0, palette),
    sifusDescriptor.addManyPart1s(bodies.map(({ data }) => data)),
    chunkArray(accessories, 10).map(chunk =>
      sifusDescriptor.addManyPart2s(chunk.map(({ data }) => data)),
    ),
    chunkArray(heads, 10).map(chunk => sifusDescriptor.addManyPart3s(chunk.map(({ data }) => data))),
    sifusDescriptor.addManyPart4s(glasses.map(({ data }) => data)),
  ]);
};

/**
 * Return a function used to mint `amount` Sifus on the provided `token`
 * @param token The Sifu ERC721 token
 * @param amount The number of Sifus to mint
 */
export const MintSifus = (
  token: SifusToken,
  burnTaisifusTokens = true,
): ((amount: number) => Promise<void>) => {
  return async (amount: number): Promise<void> => {
    for (let i = 0; i < amount; i++) {
      await token.mint();
    }
    if (!burnTaisifusTokens) return;

    await setTotalSupply(token, amount);
  };
};

/**
 * Mints or burns tokens to target a total supply. Due to Taisifus' rewards tokens may be burned and tokenIds will not be sequential
 */
export const setTotalSupply = async (token: SifusToken, newTotalSupply: number): Promise<void> => {
  const totalSupply = (await token.totalSupply()).toNumber();

  if (totalSupply < newTotalSupply) {
    for (let i = 0; i < newTotalSupply - totalSupply; i++) {
      await token.mint();
    }
    // If Taisifus' reward tokens were minted totalSupply will be more than expected, so run setTotalSupply again to burn extra tokens
    await setTotalSupply(token, newTotalSupply);
  }

  if (totalSupply > newTotalSupply) {
    for (let i = newTotalSupply; i < totalSupply; i++) {
      await token.burn(i);
    }
  }
};

// The following adapted from `https://github.com/compound-finance/compound-protocol/blob/master/tests/Utils/Ethereum.js`

const rpc = <T = unknown>({
  method,
  params,
}: {
  method: string;
  params?: unknown[];
}): Promise<T> => {
  return network.provider.send(method, params);
};

export const encodeParameters = (types: string[], values: unknown[]): string => {
  const abi = new ethers.utils.AbiCoder();
  return abi.encode(types, values);
};

export const blockByNumber = async (n: number | string): Promise<Block> => {
  return rpc({ method: 'eth_getBlockByNumber', params: [n, false] });
};

export const increaseTime = async (seconds: number): Promise<unknown> => {
  await rpc({ method: 'evm_increaseTime', params: [seconds] });
  return rpc({ method: 'evm_mine' });
};

export const freezeTime = async (seconds: number): Promise<unknown> => {
  await rpc({ method: 'evm_increaseTime', params: [-1 * seconds] });
  return rpc({ method: 'evm_mine' });
};

export const advanceBlocks = async (blocks: number): Promise<void> => {
  for (let i = 0; i < blocks; i++) {
    await mineBlock();
  }
};

export const blockNumber = async (parse = true): Promise<number> => {
  const result = await rpc<number>({ method: 'eth_blockNumber' });
  return parse ? parseInt(result.toString()) : result;
};

export const blockTimestamp = async (
  n: number | string,
  parse = true,
): Promise<number | string> => {
  const block = await blockByNumber(n);
  return parse ? parseInt(block.timestamp.toString()) : block.timestamp;
};

export const setNextBlockTimestamp = async (n: number, mine = true): Promise<void> => {
  await rpc({ method: 'evm_setNextBlockTimestamp', params: [n] });
  if (mine) await mineBlock();
};

export const minerStop = async (): Promise<void> => {
  await network.provider.send('evm_setAutomine', [false]);
  await network.provider.send('evm_setIntervalMining', [0]);
};

export const minerStart = async (): Promise<void> => {
  await network.provider.send('evm_setAutomine', [true]);
};

export const mineBlock = async (): Promise<void> => {
  await network.provider.send('evm_mine');
};

export const chainId = async (): Promise<number> => {
  return parseInt(await network.provider.send('eth_chainId'), 16);
};

export const address = (n: number): string => {
  return `0x${n.toString(16).padStart(40, '0')}`;
};
