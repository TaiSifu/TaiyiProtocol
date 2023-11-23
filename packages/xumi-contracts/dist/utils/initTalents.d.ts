import { WorldConstants, WorldContractRoute } from '@taiyi/contracts/dist/typechain';
import { XumiConstants } from '../typechain';
import { Signer } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
export declare const initTalents: (talentsAddress: string, operator: Signer, xumiConstants: XumiConstants, worldConstants: WorldConstants) => Promise<void>;
export declare const deployTalentProcessors: (talentsAddress: string, operator: Signer, route: WorldContractRoute, deployer: SignerWithAddress) => Promise<void>;
