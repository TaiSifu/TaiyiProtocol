//npx hardhat node
//yarn task:show-actor-info --network hard --actor 5
import fs from 'fs-extra';
import { task, types } from 'hardhat/config';
import {
    Actors__factory, ActorNames__factory, ActorTalents__factory, WorldFungible__factory, 
    ShejiTu__factory, WorldZones__factory, ActorAttributes__factory, WorldEvents__factory, ActorLocations__factory, ParameterizedStorylines__factory, ActorSocialIdentity__factory,
} from '@taiyi/contracts/dist/typechain';
import { 
    ActorBehaviorAttributes__factory, ActorCharmAttributes__factory, ActorCoreAttributes__factory,
    ActorMoodAttributes__factory,
    WorldEventProcessor60505__factory,
    WorldNontransferableFungible__factory, 
} from '../typechain';
import { getAddressBookShareFilePath } from '../utils';
import { BigNumber, utils } from 'ethers'; //https://docs.ethers.io/v5/

const process_args = require('minimist')(process.argv.slice(2));

async function getContractAddress(net: string) : Promise<{[index: string]:any}> {
    // @ts-ignore
    const sharedAddressPath = getAddressBookShareFilePath(net);
    return JSON.parse(fs.readFileSync(sharedAddressPath, { encoding: "ascii"}));
}

let logURI = (uri : string) => {
    let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
    console.log(JSON.stringify(JSON.parse(uriDecode), null, 2));
};


task('show-actor-info', '显示角色信息')
    .addOptionalParam('actor', 'The token ID of actor', 0, types.int)
    .setAction(async (args, { ethers }) => {        
        const [deployer, taisifu, operator1, operator2] = await ethers.getSigners();

        let addressBook:{[index: string]:any} = await getContractAddress(process_args.network?process_args.network:"hard");

        let actors = Actors__factory.connect(addressBook.Actors, operator1);
        let names = ActorNames__factory.connect(addressBook.ActorNames, operator1);
        let talents = ActorTalents__factory.connect(addressBook.ActorTalents, operator1);
        let zones = WorldZones__factory.connect(addressBook.WorldZones, operator1);
        let baseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, operator1);        
        let locations = ActorLocations__factory.connect(addressBook.ActorLocations, operator1);
        
        let dahuang = ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
        let events = WorldEvents__factory.connect(addressBook.WorldEvents, operator1);
        let golds = WorldFungible__factory.connect(addressBook.AssetGold, operator1);
        let charmAttributes = ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, operator1);
        let behaviorAttributes = ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, operator1);
        let coreAttributes = ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, operator1);
        let moodAttributes = ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, operator1);
        let parameterizedStorylines = ParameterizedStorylines__factory.connect(addressBook.ParameterizedStorylines, operator1);
        const actorSocialIdentity = ActorSocialIdentity__factory.connect(addressBook.ActorSocialIdentity, operator1);
        const assetPrestige = WorldNontransferableFungible__factory.connect(addressBook.AssetPrestige, operator1);

        let actor = args.actor;
        
        let shejiTu = ShejiTu__factory.connect(addressBook.ShejiTuProxy, operator1);
        let evt60505 = WorldEventProcessor60505__factory.connect(addressBook.WorldEventProcessor60505, operator1);        

        if((await actors.mintTime(actor)).eq(0)) {
            console.log(`角色#${actor}不存在。`);
            return;
        }
    
        let currentAge = (await events.ages(actor)).toNumber();
        let name = (await names.actorName(actor))._name;
        name = (name==""?"无名氏":name);

        console.log(`${name}(角色#${actor})的信息：`);

        //岁数
        let isBirthday = true;
        if(currentAge == 0) {
            isBirthday = false;        
            if(await events.actorBorn(actor)) {
                isBirthday = await events.actorBirthday(actor);
                if(isBirthday)
                    console.log(`出生才几个月。`);
                else
                    console.log(`新生儿。`);
            }
            else
                console.log(`还未出世。`);
        }
        else
            console.log(`已经${currentAge}岁了。`);

        //身份
        let sidNum = (await actorSocialIdentity.balanceOfActor(actor)).toNumber();
        let infoStr = '';
        if(sidNum > 0) {
            infoStr += `身份有`;
            for(var s=0; s<sidNum; s++) {
                let sid = await actorSocialIdentity.tokenOfActorByIndex(actor, s);
                let sidName = (await actorSocialIdentity.sidName(sid))._name;
                infoStr += `「${sidName}」`;
                if(s != (sidNum-1))
                    infoStr += `、`;
            }
            infoStr += `。\r\n`;
        }
        else {
            infoStr += `没有身份。\r\n`;
        }

        //天赋
        let tltIds = await talents.actorTalents(actor);
        if(tltIds.length > 0) {
            infoStr += `天赋：\r\n`;
            for(var t=0; t<tltIds.length; t++) {
                let tid = tltIds[t];
                infoStr += `+ ${await talents.talentNames(tid)}\r\n`;
                infoStr += `    ${await talents.talentDescriptions(tid)}\r\n`;
            }
        }
        else {
            infoStr += `没有天赋。\r\n`;
        }

        let _RL_ATTRIBUTE_BASE = 0;
        let ATTR_AGE = 0; // 年龄
        let ATTR_HLH = 1; // 健康，生命
        let _RL_ATTRIBUTE_CHARM_BASE = 10;
        let ATTR_MEL = _RL_ATTRIBUTE_CHARM_BASE + 0; // 魅力
        let _RL_ATTRIBUTE_MOOD_BASE = 20;
        let ATTR_XIQ = _RL_ATTRIBUTE_MOOD_BASE + 0; // 心情
        let _RL_ATTRIBUTE_CORE_BASE = 30;
        let ATTR_LVL = _RL_ATTRIBUTE_CORE_BASE + 0; // 膂力
        let ATTR_TIZ = _RL_ATTRIBUTE_CORE_BASE + 1; // 体质
        let ATTR_LIM = _RL_ATTRIBUTE_CORE_BASE + 2; // 灵敏
        let ATTR_GEG = _RL_ATTRIBUTE_CORE_BASE + 3; // 根骨
        let ATTR_WUX = _RL_ATTRIBUTE_CORE_BASE + 4; // 悟性
        let ATTR_DIL = _RL_ATTRIBUTE_CORE_BASE + 5; // 定力
        let _RL_ATTRIBUTE_BEHAVIOR_BASE = 40;
        let ATTR_ACT = _RL_ATTRIBUTE_BEHAVIOR_BASE + 0; // 行动力

        if(isBirthday) {
            let hlh = await baseAttributes.attributesScores(ATTR_HLH, actor);
            if(hlh.eq(0))
                infoStr += `已经去世了。\r\n`;
            //属性
            infoStr += `属性：\r\n`;
            infoStr += `  健康=${hlh.toString()}\r\n`;
            infoStr += `  魅力=${(await charmAttributes.attributesScores(ATTR_MEL, actor)).toString()}\r\n`;
            infoStr += `  心情=${(await moodAttributes.attributesScores(ATTR_XIQ, actor)).toString()}\r\n`;
            infoStr += `  膂力=${(await coreAttributes.attributesScores(ATTR_LVL, actor)).toString()}，` +
                `体质=${(await coreAttributes.attributesScores(ATTR_TIZ, actor)).toString()}，` +
                `灵敏=${(await coreAttributes.attributesScores(ATTR_LIM, actor)).toString()}，` +
                `根骨=${(await coreAttributes.attributesScores(ATTR_GEG, actor)).toString()}，` +
                `悟性=${(await coreAttributes.attributesScores(ATTR_WUX, actor)).toString()}，` +
                `定力=${(await coreAttributes.attributesScores(ATTR_DIL, actor)).toString()}\r\n`;
            infoStr += `  行动力=${(await behaviorAttributes.attributesScores(ATTR_ACT, actor)).toString()}\r\n`;

            //声誉
            infoStr += `声誉值为：${utils.formatEther(await assetPrestige.balanceOfActor(actor))}\r\n`;

            //位置
            let lct = await locations.actorLocations(actor);
            if(lct[0].eq(lct[1]))
                infoStr += `当前位于${await zones.names(lct[1])}。\r\n`;
            else
                infoStr += `当前位于${await zones.names(lct[0])}和${await zones.names(lct[1])}之间。\r\n`;
        }
        
        console.log(infoStr);
});
