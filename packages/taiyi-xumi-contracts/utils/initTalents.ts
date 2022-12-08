import {
    ActorAttributesConstants,
    WorldConstants,
    ActorTalents,
    ActorTalents__factory,
    WorldContractRoute,
} from '@taiyi/contracts/dist/typechain';
import {
    ActorXumiAttributesConstants,
    XumiConstants,
} from '../typechain';
import * as talentsJSON from "../files/talents.json";
import { BigNumber, Signer } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

export const initTalents = async (talentsAddress: string, operator: Signer, xumiConstants: XumiConstants, 
    attributesConst: ActorAttributesConstants,
    xumiAttributesConst: ActorXumiAttributesConstants): Promise<void> => {

    let talents = ActorTalents__factory.connect(talentsAddress, operator);
    
    let W_MODULE_XUMI_ATTRIBUTES = await xumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES();

    let INF = await xumiAttributesConst.INF();
    let MAS = await xumiAttributesConst.MAS();
    let ENG = await xumiAttributesConst.ENG();
    let STB = await xumiAttributesConst.STB();
    let HLH = await attributesConst.HLH();
    let AGE = await attributesConst.AGE();

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
