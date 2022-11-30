import chai from 'chai';
import { ethers } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldRandom,
} from '../../typechain';
import {
    deployWorldRandom,
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(solidity);
const { expect } = chai;

describe('随机数系统测试', () => {

    let deployer: SignerWithAddress;
    let snapshotId: number;

    let worldRandom: WorldRandom;

    before(async () => {
        [deployer] = await ethers.getSigners();

        //Deploy WorldRandom
        worldRandom = await deployWorldRandom(deployer);
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it("dn", async ()=>{
        console.log(`dn = ${(await worldRandom.dn(1, 100)).toNumber()}`);
    });

});