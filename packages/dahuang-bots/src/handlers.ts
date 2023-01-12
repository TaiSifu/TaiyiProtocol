//https://www.writebots.com/discord-text-formatting/
//https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-

import { BigNumber, utils } from 'ethers'; //https://docs.ethers.io/v5/
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import {
    Actors__factory, WorldConstants__factory, WorldZones__factory, ActorAttributes__factory, ActorSocialIdentity__factory,
    ActorLocations__factory, Trigrams__factory, WorldItems__factory, ActorPrelifes__factory, WorldFungible__factory,
    WorldNontransferableFungible__factory, WorldEvents__factory, ActorTalents__factory, ShejiTu__factory, ActorNames__factory,
    ActorRelationship__factory,
    AssetDaoli__factory,
} from '@taiyi/contracts/dist/typechain';
import {
    ActorBehaviorAttributes__factory, ActorCharmAttributes__factory, ActorCoreAttributes__factory, ActorMoodAttributes__factory,
    WorldZoneBaseResources__factory, DahuangConstants__factory, WorldDeadActors__factory, ActorsGender__factory, ActorBornFamilies__factory,
} from '@taiyi/dahuang-contracts/dist/typechain';
import { CommandInteraction, GuildMember, TextChannel } from "discord.js";
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types';
import { getEthersHelper } from '.';
import { ATTR_ACT, ATTR_DIL, ATTR_GEG, ATTR_HLH, ATTR_LIM, ATTR_LVL, ATTR_MEL, ATTR_TIZ, ATTR_WUX, ATTR_XIQ, _RL_ATTRIBUTE_BASE, getDahuangAddressBook } from './logger';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function str_pad(hex: string) {
    var zero = '00000000';
    var tmp = 8 - hex.length;
    return zero.substr(0, tmp) + hex;
}

function formatTime(time: number) {
    let unixtime = time
    let unixTimestamp = new Date(unixtime * 1000)
    let Y = unixTimestamp.getFullYear()
    //let M = ((unixTimestamp.getMonth() + 1) > 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
    let M = unixTimestamp.getMonth() + 1;
    let D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
    let toDay = Y + '-' + M + '-' + D
    return {
        toDay: toDay,
        Y: Y,
        M: M,
        D: D
    }
}

function assetQuantityDescription(amount: BigNumber) {
    if (amount.lt(BigInt(10e18)))
        return "少量";
    else if (amount.lt(BigInt(50e18)))
        return "些许";
    else if (amount.lt(BigInt(100e18)))
        return "许多";
    else
        return "大量";
}

function getTrigramUnicodeString(tri : number) {
    let o = 0x4dc0;
    return String.fromCharCode(o+tri);
}

export async function onShowWorld(user: GuildMember, channel: TextChannel, interaction: CommandInteraction) : Promise<void> {
    let addressBook = getDahuangAddressBook();
    const [wallet] = await getEthersHelper().getSigners();
    
    const assetGold = WorldFungible__factory.connect(addressBook.AssetGold, wallet);
    const assetFood = WorldFungible__factory.connect(addressBook.AssetFood, wallet);
    const assetWood = WorldFungible__factory.connect(addressBook.AssetWood, wallet);
    const assetFabric = WorldFungible__factory.connect(addressBook.AssetFabric, wallet);
    const assetHerb = WorldFungible__factory.connect(addressBook.AssetHerb, wallet);
    const worldDeadActors = WorldDeadActors__factory.connect(addressBook.WorldDeadActors, wallet);
    const actorsGender = ActorsGender__factory.connect(addressBook.ActorsGender, wallet);
    const actorBornFamilies = ActorBornFamilies__factory.connect(addressBook.ActorBornFamilies, wallet);
    
    //统计
    await interaction.reply(`稍等，即将播报大荒世界当前的情况。`);
    await channel.send(`***资源总量：***`);
    await channel.send(`\`\`\`fix\r\n` +
        `金石：${utils.formatEther(await assetGold.totalSupply())}\r\n` +
        `食材：${utils.formatEther(await assetFood.totalSupply())}\r\n` +
        `木材：${utils.formatEther(await assetWood.totalSupply())}\r\n` +
        `织物：${utils.formatEther(await assetFabric.totalSupply())}\r\n` +
        `药材：${utils.formatEther(await assetHerb.totalSupply())}\r\n` +
        `\`\`\``);
    await channel.send(`***统计信息：***`);
    await channel.send(`\`\`\`fix\r\n` +
        `出生男性：${await actorsGender.maleNum()}人。\r\n` +
        `出生女性：${await actorsGender.femaleNum()}人。\r\n` +
        `出生无性：${await actorsGender.asexualNum()}人。\r\n` +
        `出生双性：${await actorsGender.bisexualNum()}人。\r\n` +
        `农村：${await actorBornFamilies.countryNum()}人。\r\n` +
        `城镇：${await actorBornFamilies.cityNum()}人。\r\n` +
        `门派中人：${await actorBornFamilies.sectarianNum()}人。\r\n` +
        `死亡：${await worldDeadActors.deadNum()}人。\r\n` +
        `\`\`\``);
}

export async function onShowActorInfo(actor: number, user: GuildMember, channel: TextChannel, interaction: CommandInteraction) : Promise<void> {
    let addressBook = getDahuangAddressBook();
    const [wallet] = await getEthersHelper().getSigners();
    
    const dahuangConstants = DahuangConstants__factory.connect(addressBook.DahuangConstants, wallet);
    const actorNames = ActorNames__factory.connect(addressBook.ActorNames, wallet);
    const worldEvents = WorldEvents__factory.connect(addressBook.WorldEvents, wallet);
    const shejitu = ShejiTu__factory.connect(addressBook.ShejiTuProxy, wallet);
    const actorSocialIdentity = ActorSocialIdentity__factory.connect(addressBook.ActorSocialIdentity, wallet);
    const actorTalents = ActorTalents__factory.connect(addressBook.ActorTalents, wallet);
    const assetPrestige = WorldNontransferableFungible__factory.connect(addressBook.AssetPrestige, wallet);
    const actorLocations = ActorLocations__factory.connect(addressBook.ActorLocations, wallet);
    const worldZones = WorldZones__factory.connect(addressBook.WorldZones, wallet);

    const actorBaseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, wallet);
    const actorCharmAttributes = ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, wallet);
    const actorCoreAttributes = ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, wallet);
    const actorMoodAttributes = ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, wallet);
    const actorBehaviorAttributes = ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, wallet);

    let name = (await actorNames.actorName(actor))._name;
    name = (name==""?"无名氏":name);
    await interaction.reply(`即将播报**${name}**(角色#${actor})的信息。`);

    let infoStr = `\`\`\`fix\r\n${name}(角色#${actor})的信息：\r\n`;

    //岁数
    let currentAge = (await worldEvents.ages(actor)).toNumber();
    let isBirthday = true;
    if(currentAge == 0) {
        isBirthday = false;        
        if(await worldEvents.actorBorn(actor)) {
            isBirthday = await worldEvents.actorBirthday(actor);
            if(isBirthday)
                infoStr += `出生才几个月。\r\n`;
            else
                infoStr += `新生儿。\r\n`;
        }
        else
            infoStr += `还未出世。\r\n`;
    }
    else
        infoStr += `已经${currentAge}岁了。\r\n`;

    //身份
    let sidNum = (await actorSocialIdentity.balanceOfActor(actor)).toNumber();
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
    let tltIds = await actorTalents.actorTalents(actor);
    if(tltIds.length > 0) {
        infoStr += `天赋：\r\n`;
        for(var t=0; t<tltIds.length; t++) {
            let tid = tltIds[t];
            infoStr += `+ ${await actorTalents.talentNames(tid)}\r\n`;
            infoStr += `    ${await actorTalents.talentDescriptions(tid)}\r\n`;
        }
    }
    else {
        infoStr += `没有天赋。\r\n`;
    }

    if(isBirthday) {
        let hlh = await actorBaseAttributes.attributesScores(ATTR_HLH, actor);
        if(hlh.eq(0))
            infoStr += `已经去世了。\r\n`;
        //属性
        infoStr += `属性：\r\n`;
        infoStr += `  健康=${hlh.toString()}\r\n`;
        infoStr += `  魅力=${(await actorCharmAttributes.attributesScores(ATTR_MEL, actor)).toString()}\r\n`;
        infoStr += `  心情=${(await actorMoodAttributes.attributesScores(ATTR_XIQ, actor)).toString()}\r\n`;
        infoStr += `  膂力=${(await actorCoreAttributes.attributesScores(ATTR_LVL, actor)).toString()}，` +
            `体质=${(await actorCoreAttributes.attributesScores(ATTR_TIZ, actor)).toString()}，` +
            `灵敏=${(await actorCoreAttributes.attributesScores(ATTR_LIM, actor)).toString()}，` +
            `根骨=${(await actorCoreAttributes.attributesScores(ATTR_GEG, actor)).toString()}，` +
            `悟性=${(await actorCoreAttributes.attributesScores(ATTR_WUX, actor)).toString()}，` +
            `定力=${(await actorCoreAttributes.attributesScores(ATTR_DIL, actor)).toString()}\r\n`;
        infoStr += `  行动力=${(await actorBehaviorAttributes.attributesScores(ATTR_ACT, actor)).toString()}\r\n`;

        //声誉
        infoStr += `声誉值为：${utils.formatEther(await assetPrestige.balanceOfActor(actor))}\r\n`;

        //位置
        let lct = await actorLocations.actorLocations(actor);
        if(lct[0].eq(lct[1]))
            infoStr += `当前位于${await worldZones.names(lct[1])}。\r\n`;
        else
            infoStr += `当前位于${await worldZones.names(lct[0])}和${await worldZones.names(lct[1])}之间。\r\n`;
    }
    
    infoStr += `\`\`\``;
    await channel.send(infoStr);
}

export async function onShowActorHistory(actor: number, user: GuildMember, channel: TextChannel, interaction: CommandInteraction) : Promise<void> {
    let addressBook = getDahuangAddressBook();
    const [wallet] = await getEthersHelper().getSigners();
    
    const actorNames = ActorNames__factory.connect(addressBook.ActorNames, wallet);
    const worldEvents = WorldEvents__factory.connect(addressBook.WorldEvents, wallet);
    const shejitu = ShejiTu__factory.connect(addressBook.ShejiTuProxy, wallet);

    let currentAge = (await worldEvents.ages(actor)).toNumber();
    let name = (await actorNames.actorName(actor))._name;
    name = (name==""?"无名氏":name);
    await interaction.reply(`即将播报**${name}**(角色#${actor})的成长经历。`);

    let historyStr = `\`\`\`fix\r\n${name}(角色#${actor})的成长经历：\r\n`;
    for (var a = 0; a <= currentAge; a++) {
        historyStr += `${a==0?"出生":(a+"岁")}：\r\n`;
        let evts = await worldEvents.actorEvent(actor, a);
        for(var e = 0; e < evts.length; e++) {
            let eventId = evts[e];
            let eventInfo = await worldEvents.eventInfo(eventId, actor);
            historyStr += `-[${eventId.toString()}]` + eventInfo + `\r\n`;
        }
    }
    historyStr += `\`\`\``;
    await channel.send(historyStr);
}
