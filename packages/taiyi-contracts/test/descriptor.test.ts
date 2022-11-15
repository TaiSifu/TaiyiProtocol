import chai from 'chai';
import { solidity } from 'ethereum-waffle';
import { SifusDescriptor } from '../typechain';
import ImageData from '../files/image-data.json';
import { LongestPart } from './types';
import { deploySifusDescriptor, populateDescriptor } from './utils';
import { ethers } from 'hardhat';
import { appendFileSync } from 'fs';

chai.use(solidity);
const { expect } = chai;

describe('师傅令牌图形描述器', () => {
  let sifusDescriptor: SifusDescriptor;
  let snapshotId: number;

  const part: LongestPart = {
    length: 0,
    index: 0,
  };
  const longest: Record<string, LongestPart> = {
    bodies: part,
    accessories: part,
    heads: part,
    glasses: part,
  };

  before(async () => {
    sifusDescriptor = await deploySifusDescriptor();

    for (const [l, layer] of Object.entries(ImageData.images)) {
      for (const [i, item] of layer.entries()) {
        if (item.data.length > longest[l].length) {
          longest[l] = {
            length: item.data.length,
            index: i,
          };
        }
      }
    }

    await populateDescriptor(sifusDescriptor);
  });

  beforeEach(async () => {
    snapshotId = await ethers.provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await ethers.provider.send('evm_revert', [snapshotId]);
  });

  it('生成SVG', async () => {
    const svg = await sifusDescriptor.generateSVGImage({
      background: 0,
      part1: longest.bodies.index,
      part2: longest.accessories.index,
      part3: longest.heads.index,
      part4: longest.glasses.index,
    });
    //console.log(svg);
    expect(svg).to.not.be.undefined;
  });

  // Unskip this test to validate the encoding of all parts. It ensures that no parts revert when building the token URI.
  // This test also outputs a parts.html file, which can be visually inspected.
  // Note that this test takes a long time to run. You must increase the mocha timeout to a large number.
  it.skip('生成所有可能的部件组合SVG', async () => {
    console.log('Running... this may take a little while...');

    const { bgcolors, images } = ImageData;
    const { bodies, accessories, heads, glasses } = images;
    const max = Math.max(bodies.length, accessories.length, heads.length, glasses.length);
    for (let i = 0; i < max; i++) {
      const svg = await sifusDescriptor.tokenURI(i, {
        background: Math.min(i, bgcolors.length - 1),
        part1: Math.min(i, bodies.length - 1),
        part2: Math.min(i, accessories.length - 1),
        part3: Math.min(i, heads.length - 1),
        part4: Math.min(i, glasses.length - 1),
      });
      expect(svg).to.not.be.undefined;

      appendFileSync(
        'parts.html',
        svg,
      );

      if (i && i % Math.round(max / 10) === 0) {
        console.log(`${Math.round((i / max) * 100)}% complete`);
      }
    }
  });
});
