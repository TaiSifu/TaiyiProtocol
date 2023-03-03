import { WorldContractRoute, WorldConstants } from '@taiyi/contracts/dist/typechain';
import { Signer } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { DahuangConstants } from '../typechain';
export declare const initTalents: (talentsAddress: string, operator: Signer, taiyiConstants: WorldConstants, worldConstants: DahuangConstants) => Promise<void>;
export declare const deployTalentProcessors: (talentsAddress: string, operator: Signer, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<{
    [index: string]: any;
}>;
