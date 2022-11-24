import {
    ActorAttributesConstants,
    ActorCharmAttributesConstants,
    ActorCoreAttributesConstants,
    ActorMoodAttributesConstants,
    ActorTalentProcessor1010__factory,
    ActorTalentProcessor1049__factory,
    ActorTalentProcessor1050__factory,
    ActorTalents,
    ActorTalents__factory,
    WorldConstants,
    WorldContractRoute,
} from '../typechain';
import * as talentsJSON from "../files/talents.json";
import { BigNumber, Signer } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

export const initTalents = async (talentsAddress: string, operator: Signer, worldConstants: WorldConstants, attributesConst: ActorAttributesConstants,
    charmAttributesConst: ActorCharmAttributesConstants, coreAttributesConst: ActorCoreAttributesConstants, moodAttributesConst: ActorMoodAttributesConstants): Promise<void> => {

    let talents = ActorTalents__factory.connect(talentsAddress, operator);
    
    let W_MODULE_CORE_ATTRIBUTES = await worldConstants.WORLD_MODULE_CORE_ATTRIBUTES();
    let W_MODULE_BASE_ATTRIBUTES = await worldConstants.WORLD_MODULE_ATTRIBUTES();
    let W_MODULE_CHARM_ATTRIBUTES = await worldConstants.WORLD_MODULE_CHARM_ATTRIBUTES();
    let W_MODULE_MOOD_ATTRIBUTES = await worldConstants.WORLD_MODULE_MOOD_ATTRIBUTES();

    let HLH = await attributesConst.HLH();
    let AGE = await attributesConst.AGE();
    let MEL = await charmAttributesConst.MEL();
    let XIQ = await moodAttributesConst.XIQ();
    let LVL = await coreAttributesConst.LVL();
    let TIZ = await coreAttributesConst.TIZ();
    let LIM = await coreAttributesConst.LIM();
    let GEG = await coreAttributesConst.GEG();
    let WUX = await coreAttributesConst.WUX();
    let DIL = await coreAttributesConst.DIL();

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
        if (effect.MEL)
            modifiers.push(MEL, BigNumber.from(effect.MEL));
        if (effect.XIQ)
            modifiers.push(XIQ, BigNumber.from(effect.XIQ));
        if (effect.LVL)
            modifiers.push(LVL, BigNumber.from(effect.LVL));
        if (effect.TIZ)
            modifiers.push(TIZ, BigNumber.from(effect.TIZ));
        if (effect.LIM)
            modifiers.push(LIM, BigNumber.from(effect.LIM));
        if (effect.GEG)
            modifiers.push(GEG, BigNumber.from(effect.GEG));
        if (effect.WUX)
            modifiers.push(WUX, BigNumber.from(effect.WUX));
        if (effect.DIL)
            modifiers.push(DIL, BigNumber.from(effect.DIL));

        let attr_point_modifiers = [W_MODULE_CORE_ATTRIBUTES, attr_modifyer];

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

    processor = await (await (new ActorTalentProcessor1010__factory(deployer)).deploy(route.address)).deployed();
    await talents.setTalentProcessor(1010, processor.address);

    processor = await (await (new ActorTalentProcessor1049__factory(deployer)).deploy(route.address)).deployed();
    await talents.setTalentProcessor(1049, processor.address);

    processor = await (await (new ActorTalentProcessor1050__factory(deployer)).deploy(route.address)).deployed();
    await talents.setTalentProcessor(1050, processor.address);
};
