import {
    WorldConstants,
    ActorTalents,
    ActorTalents__factory,
    WorldContractRoute,
} from '@taiyi/contracts/dist/typechain';
import {
    XumiConstants,
} from '../typechain';
import * as talentsJSON from "../files/talents.json";
import { BigNumber, Signer } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

export const initTalents = async (talentsAddress: string, operator: Signer, xumiConstants: XumiConstants, worldConstants: WorldConstants): Promise<void> => {

    let talents = ActorTalents__factory.connect(talentsAddress, operator);
    
    let W_MODULE_XUMI_ATTRIBUTES = await xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES();

    let INF = await xumiConstants.ATTR_INF();
    let MAS = await xumiConstants.ATTR_MAS();
    let ENG = await xumiConstants.ATTR_ENG();
    let STB = await xumiConstants.ATTR_STB();
    let HLH = await worldConstants.ATTR_HLH();
    let AGE = await worldConstants.ATTR_AGE();

    //read talent list to init talent automatically, most for development and debug
    let talentsData: { [index: string]: any } = talentsJSON;
    let keys = Object.keys(talentsData);
    for (var i = 0; i < keys.length; i++) {
        process.stdout.write(`\u001B[1000D${Math.round(i * 100.0 / keys.length)}%`);
        let tlt = talentsData[keys[i]];
        let name = tlt.name;
        let description = tlt.description;
        let attr_modifyer = BigNumber.from(tlt.status ? tlt.status : 0);
        let exclusive = tlt.exclusive ? tlt.exclusive : [];
        let exclusivity: BigNumber[] = [];
        for (var e = 0; e < exclusive.length; e++) {
            exclusivity.push(BigNumber.from(exclusive[e]));
        }
        let effect = tlt.effect ? tlt.effect : {};
        let modifiers: BigNumber[] = [];
        if (effect.HLH)
            modifiers.push(HLH, BigNumber.from(effect.HLH));
        if (effect.AGE)
            modifiers.push(AGE, BigNumber.from(effect.AGE));
        if (effect.INF)
            modifiers.push(INF, BigNumber.from(effect.INF));
        if (effect.MAS)
            modifiers.push(MAS, BigNumber.from(effect.MAS));
        if (effect.ENG)
            modifiers.push(ENG, BigNumber.from(effect.ENG));
        if (effect.STB)
            modifiers.push(STB, BigNumber.from(effect.STB));

        let attr_point_modifiers = [W_MODULE_XUMI_ATTRIBUTES, attr_modifyer];

        if (tlt.id != undefined) {
            let tx = await talents.setTalent(tlt.id, name, description, modifiers, attr_point_modifiers);
            //await tx.wait();
            tx = await talents.setTalentExclusive(tlt.id, exclusive);
            //await tx.wait();
        }
    }
    process.stdout.write(`\u001B[1000D`);
}

export const deployTalentProcessors = async (talentsAddress: string, operator: Signer, route: WorldContractRoute, deployer: SignerWithAddress): Promise<void> => {
    let talents = ActorTalents__factory.connect(talentsAddress, operator);
    let processor: any;

    // processor = await (await (new ActorTalentProcessor1010__factory(deployer)).deploy(route.address)).deployed();
    // await talents.setTalentProcessor(1010, processor.address);

    // processor = await (await (new ActorTalentProcessor1049__factory(deployer)).deploy(route.address)).deployed();
    // await talents.setTalentProcessor(1049, processor.address);

    // processor = await (await (new ActorTalentProcessor1050__factory(deployer)).deploy(route.address)).deployed();
    // await talents.setTalentProcessor(1050, processor.address);
};
