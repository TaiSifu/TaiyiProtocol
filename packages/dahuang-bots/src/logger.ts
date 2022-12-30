//https://www.writebots.com/discord-text-formatting/
//https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-

import fs from 'fs-extra';
import * as env from "hardhat";
import { ethers } from "hardhat";
import { BigNumber } from 'ethers'; //https://docs.ethers.io/v5/
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
    WorldEventProcessor10000__factory, WorldEventProcessor10001__factory,
    WorldEventProcessor10002__factory, WorldEventProcessor10009__factory, WorldEventProcessor10010__factory,
    WorldEventProcessor10011__factory, WorldEventProcessor10110__factory, WorldEventProcessor10111__factory,
    WorldZoneBaseResources__factory,
    DahuangConstants,
    DahuangConstants__factory,
} from '@taiyi/dahuang-contracts/dist/typechain';
import chalk from 'chalk';
import { getAddressBookShareFilePath } from '@taiyi/dahuang-contracts/dist/utils/addressConfig';
import { Intents, Interaction, Message, TextChannel } from "discord.js";

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

var addressBook:{[index: string]:any} = {};

async function initAddress() {
    const args = require('minimist')(process.argv.slice(2));
    const sharedAddressPath = getAddressBookShareFilePath(args.network);
    addressBook = JSON.parse(fs.readFileSync(sharedAddressPath, { encoding: "ascii" }));
    console.log(addressBook);
}

let channels: TextChannel[] = [];
async function sendChannelMessage(msg: string) {
    channels.forEach(async channel => {
        await channel.send(msg);
    });
}

export function addChannel(channel: TextChannel) {
    channels.push(channel);
}

async function startSyncMain(startBlockNum: number) {
    if (addressBook["WorldConstants"] == undefined) {
        await initAddress();
    }
    let provider = await ethers.provider;
    const [wallet] = await ethers.getSigners();
    const worldConstants = WorldConstants__factory.connect(addressBook.WorldConstants, wallet);
    const actors = Actors__factory.connect(addressBook.Actors, wallet);
    const actorPrelifes = ActorPrelifes__factory.connect(addressBook.ActorPrelifes, wallet);
    const assetDaoli = AssetDaoli__factory.connect(addressBook.AssetDaoli, wallet); 
    const assetGold = WorldFungible__factory.connect(addressBook.AssetGold, wallet);
    const assetFood = WorldFungible__factory.connect(addressBook.AssetFood, wallet);
    const assetWood = WorldFungible__factory.connect(addressBook.AssetWood, wallet);
    const assetFabric = WorldFungible__factory.connect(addressBook.AssetFabric, wallet);
    const assetHerb = WorldFungible__factory.connect(addressBook.AssetHerb, wallet);
    const assetPrestige = WorldNontransferableFungible__factory.connect(addressBook.AssetPrestige, wallet);
    const worldEvents = WorldEvents__factory.connect(addressBook.WorldEvents, wallet);
    const actorTalents = ActorTalents__factory.connect(addressBook.ActorTalents, wallet);
    const shejitu = ShejiTu__factory.connect(addressBook.ShejiTuProxy, wallet);
    const actorNames = ActorNames__factory.connect(addressBook.ActorNames, wallet);
    const actorLocations = ActorLocations__factory.connect(addressBook.ActorLocations, wallet);
    const worldZones = WorldZones__factory.connect(addressBook.WorldZones, wallet);
    const worldZoneBaseResources = WorldZoneBaseResources__factory.connect(addressBook.WorldZoneBaseResources, wallet);
    const actorRelationship = ActorRelationship__factory.connect(addressBook.ActorRelationship, wallet);
    const worldItems = WorldItems__factory.connect(addressBook.WorldItems, wallet);
    const actorSID = ActorSocialIdentity__factory.connect(addressBook.ActorSocialIdentity, wallet);
    const trigrams = Trigrams__factory.connect(addressBook.Trigrams, wallet);
    const actorBaseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, wallet);
    const actorCharmAttributes = ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, wallet);
    const actorCoreAttributes = ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, wallet);
    const actorMoodAttributes = ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, wallet);
    const actorBehaviorAttributes = ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, wallet);
    const eventProcessor10000 = WorldEventProcessor10000__factory.connect(addressBook.WorldEventProcessor10000, wallet);
    const eventProcessor10001 = WorldEventProcessor10001__factory.connect(addressBook.WorldEventProcessor10001, wallet);
    const eventProcessor10002 = WorldEventProcessor10002__factory.connect(addressBook.WorldEventProcessor10002, wallet);
    const eventProcessor10110 = WorldEventProcessor10110__factory.connect(addressBook.WorldEventProcessor10110, wallet);
    const eventProcessor10111 = WorldEventProcessor10111__factory.connect(addressBook.WorldEventProcessor10111, wallet);
    const eventProcessor10009 = WorldEventProcessor10009__factory.connect(addressBook.WorldEventProcessor10009, wallet);
    const eventProcessor10010 = WorldEventProcessor10010__factory.connect(addressBook.WorldEventProcessor10010, wallet);
    const eventProcessor10011 = WorldEventProcessor10011__factory.connect(addressBook.WorldEventProcessor10011, wallet);
    const dahuangConstants = DahuangConstants__factory.connect(addressBook.DahuangConstants, wallet);

    let blockNum = await provider.getBlockNumber();
    //console.log(startBlockNum, blockNum);

    let actorMinted_filter = actors.filters.ActorMinted(null, null, null);
    let actorBorn_filter = worldEvents.filters.Born(null);
    let timeline_ageEvent_filter = shejitu.filters.AgeEvent(null, null, null);
    let timeline_branchEvent_filter = shejitu.filters.BranchEvent(null, null, null);
    let timeline_activeEvent_filter = shejitu.filters.ActiveEvent(null, null, null);
    let attrBaseUpdate_filter = actorBaseAttributes.filters.Updated(null, null, null);
    let attrCoreUpdate_filter = actorCoreAttributes.filters.Updated(null, null, null);
    let attrCharmUpdate_filter = actorCharmAttributes.filters.Updated(null, null, null);
    let attrMoodUpdate_filter = actorMoodAttributes.filters.Updated(null, null, null);
    let attrBehaviorUpdate_filter = actorBehaviorAttributes.filters.Updated(null, null, null);
    let actRecover_filter = actorBehaviorAttributes.filters.ActRecovered(null, null);
    let NameClaimed_filter = actorNames.filters.NameClaimed(null, null, null, null, null, null);
    let ZoneClaimed_filter = worldZones.filters.ZoneClaimed(null, null, null);
    let TrigramOut_filter = trigrams.filters.TrigramsOut(null, null);
    let relationUpdated_filter = actorRelationship.filters.RelationUpdated(null, null, null, null);
    let itemCreated_filter = worldItems.filters.ItemCreated(null, null, null, null, null, null, null);
    let itemChanged_filter = worldItems.filters.ItemChanged(null, null, null, null, null, null, null);
    let itemDestroyed_filter = worldItems.filters.ItemDestroyed(null, null, null);
    let SIDClaimed_filter = actorSID.filters.SIDClaimed(null, null, null);
    let talent_init_filter = actorTalents.filters.Created(null, null, null);
    let daoli_transfer_filter = assetDaoli.filters.FungibleTransfer(null, null, null);
    let gold_transfer_filter = assetGold.filters.FungibleTransfer(null, null, null);
    let food_transfer_filter = assetFood.filters.FungibleTransfer(null, null, null);
    let wood_transfer_filter = assetWood.filters.FungibleTransfer(null, null, null);
    let fabric_transfer_filter = assetFabric.filters.FungibleTransfer(null, null, null);
    let herb_transfer_filter = assetHerb.filters.FungibleTransfer(null, null, null);
    let prestige_transfer_filter = assetPrestige.filters.FungibleTransfer(null, null, null);
    let ZoneAssetGrown_filter = worldZoneBaseResources.filters.ZoneAssetGrown(null, null, null, null, null, null);
    let ActorAssetCollected_filter = worldZoneBaseResources.filters.ActorAssetCollected(null, null, null, null, null, null);
    let reincarnation_filter = actorPrelifes.filters.Reincarnation(null, null);
    let actorLoacationChanged_filter = actorLocations.filters.ActorLocationChanged(null, null, null, null, null);

    let _RL_ATTRIBUTE_BASE = await worldConstants.ATTR_BASE();
    let _RL_ATTRIBUTE_CHARM_BASE = await dahuangConstants.ATTR_BASE_CHARM();
    let _RL_ATTRIBUTE_CORE_BASE = await dahuangConstants.ATTR_BASE_CORE();
    let _RL_ATTRIBUTE_MOOD_BASE = await dahuangConstants.ATTR_BASE_MOOD();
    let _RL_ATTRIBUTE_BEHAVIOR_BASE = await dahuangConstants.ATTR_BASE_BEHAVIOR();

    let RL_ATTRIBUTE_ACT = await dahuangConstants.ATTR_ACT();

    let ACTOR_GUANGONG = await worldZoneBaseResources.ACTOR_GUANGONG();

    if (channels.length > 0 && startBlockNum <= blockNum) {
        while (true) {
            //console.log(startBlockNum);
            let block = await provider.getBlock(startBlockNum);

            //Create actor events
            let actorMinted_event = await actors.queryFilter(actorMinted_filter, block.hash);
            if (actorMinted_event.length > 0) {
                //console.log(actorMinted_event);
                for (var e = 0; e < actorMinted_event.length; e++) {
                    let owner = actorMinted_event[e].args.owner;
                    let actor = actorMinted_event[e].args.actorId.toNumber();
                    let time = actorMinted_event[e].args.time.toNumber();
                    let timeInfo = formatTime(time);

                    await sendChannelMessage(`\`\`\`diff\r\n- [${timeInfo.M}月${timeInfo.D}日] 角色#${actor}由神秘实体创生 -\r\n\`\`\``);
                }
            }

            //timeline born character events
            let actorBorn_event = await shejitu.queryFilter(actorBorn_filter, block.hash);
            if (actorBorn_event.length > 0) {
                for (var e = 0; e < actorBorn_event.length; e++) {
                    let actor = actorBorn_event[e].args.actor.toNumber();

                    await sendChannelMessage(`**角色#${actor}**出生了。`);

                    let preActor = (await actorPrelifes.preLifes(actor)).toNumber();
                    if (preActor > 0) {
                        let preActorName = (await actorNames.actorName(preActor))._name;
                        await sendChannelMessage(`**角色#${actor}**的前世是**${preActorName}(#${preActor})**。`);
                    }

                    //统计
                    await sendChannelMessage(`***资源总量***：`);
                    await sendChannelMessage(`\`\`\`fix\r\n` +
                        `金石（${ethers.utils.formatEther(await assetGold.totalSupply())}),` +
                        `食材（${ethers.utils.formatEther(await assetFood.totalSupply())}),` +
                        `木材（${ethers.utils.formatEther(await assetWood.totalSupply())}),` +
                        `织物（${ethers.utils.formatEther(await assetFabric.totalSupply())}),` +
                        `药材（${ethers.utils.formatEther(await assetHerb.totalSupply())})` +
                        `\`\`\``);
                    await sendChannelMessage(`***统计信息***：`);
                    await sendChannelMessage(`\`\`\`fix\r\n` +
                        `出生男性：${await eventProcessor10001.maleNum()}人。\r\n` +
                        `出生女性：${await eventProcessor10002.femaleNum()}人。\r\n` +
                        `出生无性：${await eventProcessor10110.asexualNum()}人。\r\n` +
                        `出生双性：${await eventProcessor10111.bisexualNum()}人。\r\n` +
                        `农村：${await eventProcessor10009.actorNum()}人。\r\n` +
                        `城镇：${await eventProcessor10010.actorNum()}人。\r\n` +
                        `门派中人：${await eventProcessor10011.actorNum()}人。\r\n` +
                        `死亡：${await eventProcessor10000.deadNum()}人。\r\n` +
                        `\`\`\``);
                }
            }

            //timeline age events
            let timeline_ageEvent_event = await shejitu.queryFilter(timeline_ageEvent_filter, block.hash);
            if (timeline_ageEvent_event.length > 0) {
                for (var e = 0; e < timeline_ageEvent_event.length; e++) {
                    let actor = timeline_ageEvent_event[e].args.actor;
                    let age = timeline_ageEvent_event[e].args.age;
                    let eventId = timeline_ageEvent_event[e].args.eventId;
                    let eventInfo = await worldEvents.eventInfo(eventId, actor);
                    let name = (await actorNames.actorName(actor))._name;

                    await sendChannelMessage(`\`\`\`fix\r\n${name}已经${age}岁了\r\n` +
                        `[${eventId.toString()}]` + eventInfo + `\r\n\`\`\``);
                }
            }

            //timeline active events
            let timeline_activeEvent_event = await shejitu.queryFilter(timeline_activeEvent_filter, block.hash);
            if (timeline_activeEvent_event.length > 0) {
                for (var e = 0; e < timeline_activeEvent_event.length; e++) {
                    let actor = timeline_activeEvent_event[e].args.actor;
                    let age = timeline_activeEvent_event[e].args.age;
                    let eventId = timeline_activeEvent_event[e].args.eventId;
                    let eventInfo = await worldEvents.eventInfo(eventId, actor);
                    let name = (await actorNames.actorName(actor))._name;

                    await sendChannelMessage(`[${eventId.toString()}]` + eventInfo);
                }
            }

            //timeline branch events
            let timeline_branchEvent_event = await shejitu.queryFilter(timeline_branchEvent_filter, block.hash);
            if (timeline_branchEvent_event.length > 0) {
                for (var e = 0; e < timeline_branchEvent_event.length; e++) {
                    let actor = timeline_branchEvent_event[e].args.actor;
                    let age = timeline_branchEvent_event[e].args.age;
                    let eventId = timeline_branchEvent_event[e].args.eventId;
                    let eventInfo = await worldEvents.eventInfo(eventId, actor);
                    let name = (await actorNames.actorName(actor))._name;

                    await sendChannelMessage(`[${eventId.toString()}]` + eventInfo);
                }
            }

            //name claimed events
            let NameClaimed_event = await actorNames.queryFilter(NameClaimed_filter, block.hash);
            if (NameClaimed_event.length > 0) {
                for (var e = 0; e < NameClaimed_event.length; e++) {
                    let owner = NameClaimed_event[e].args.owner;
                    let actor = NameClaimed_event[e].args.actor.toNumber();
                    let name_id = NameClaimed_event[e].args.nameId;
                    let first_name = NameClaimed_event[e].args.firstName;
                    let last_name = NameClaimed_event[e].args.lastName;
                    let name = NameClaimed_event[e].args.name;

                    await sendChannelMessage(`\`\`\`css\r\n角色#${actor}取名为\"${name}\"\r\n\`\`\``);
                }
            }

            //zone claimed events
            let ZoneClaimed_event = await worldZones.queryFilter(ZoneClaimed_filter, block.hash);
            if (ZoneClaimed_event.length > 0) {
                for (var e = 0; e < ZoneClaimed_event.length; e++) {
                    let actor = ZoneClaimed_event[e].args.actor.toNumber();
                    let zone_id = ZoneClaimed_event[e].args.zoneId;
                    let name = ZoneClaimed_event[e].args.name;

                    await sendChannelMessage(`\`\`\`css\r\n名为\"${name}\"的地区出现。\r\n\`\`\``);
                }
            }

            //actor location changed events
            let actorLoacationChanged_event = await actorLocations.queryFilter(actorLoacationChanged_filter, block.hash);
            if (actorLoacationChanged_event.length > 0) {
                for (var e = 0; e < actorLoacationChanged_event.length; e++) {
                    let actor = actorLoacationChanged_event[e].args.actor.toNumber();
                    let oldA = actorLoacationChanged_event[e].args.oldA;
                    let oldZoneNameA = await worldZones.names(oldA);
                    let oldB = actorLoacationChanged_event[e].args.oldB;
                    let oldZoneNameB = await worldZones.names(oldB);
                    let newA = actorLoacationChanged_event[e].args.newA;
                    let newZoneNameA = await worldZones.names(newA);
                    let newB = actorLoacationChanged_event[e].args.newB;
                    let newZoneNameB = await worldZones.names(newB);

                    let name = (await actorNames.actorName(actor))._name;
                    name = (name==""?"无名氏":name);

                    if(oldA.eq(newA) && oldB.eq(newB)) {
                        if(newA.eq(newB))
                            await sendChannelMessage(`**${name}**出现在**${newZoneNameA}**。`);
                        else
                            await sendChannelMessage(`**${name}**出现在**${newZoneNameA}**和**${newZoneNameB}**之间的地区。`);
                    }
                    else {
                        if(newA.eq(newB))
                            await sendChannelMessage(`**${name}**来到了**${newZoneNameA}**。`);
                        else
                            await sendChannelMessage(`**${name}**来到了**${newZoneNameA}**和**${newZoneNameB}**之间的地区。`);
                    }
                }
            }

            //sid claimed events
            let SIDClaimed_event = await actorSID.queryFilter(SIDClaimed_filter, block.hash);
            if (SIDClaimed_event.length > 0) {
                for (var e = 0; e < SIDClaimed_event.length; e++) {
                    let actor = SIDClaimed_event[e].args.actor.toNumber();
                    let sid = SIDClaimed_event[e].args.sid;
                    let sidName = SIDClaimed_event[e].args.name;
                    let name = (await actorNames.actorName(actor))._name;
                    name = (name==""?"无名氏":name);

                    await sendChannelMessage(`**${name}**身份包含\"**${sidName}**\"。`);
                }
            }
            
            //generate new trigram
            let TrigramOut_event = await trigrams.queryFilter(TrigramOut_filter, block.hash);
            if (TrigramOut_event.length > 0) {
                for (var e = 0; e < TrigramOut_event.length; e++) {
                    let actor = TrigramOut_event[e].args.actor.toNumber();
                    let tri = TrigramOut_event[e].args.trigram.toNumber();
                    let name = (await actorNames.actorName(actor))._name;
                    name = (name==""?"无名氏":name);

                    await sendChannelMessage(`**${name}**卦象增加\"**${getTrigramUnicodeString(tri)}**\"。`);
                }
            }

            //talents init events
            let talentsInit_event = await actorTalents.queryFilter(talent_init_filter, block.hash);
            if (talentsInit_event.length > 0) {
                for (var e = 0; e < talentsInit_event.length; e++) {
                    let actor = talentsInit_event[e].args.actor;
                    let tlts = talentsInit_event[e].args.ids;
                    let name = (await actorNames.actorName(actor))._name;

                    await sendChannelMessage(`**${name}**拥有的天赋：`);
                    let msg = `\`\`\`diff\r\n`;
                    for (var t = 0; t < tlts.length; t++) {
                        msg += `+  ${await actorTalents.talentNames(tlts[t])}(${await actorTalents.talentDescriptions(tlts[t])})\r\n`;
                    }
                    msg += `\`\`\``;
                    await sendChannelMessage(msg);
                }
            }

            //relationship update events
            let relationUpdated_event = await actorRelationship.queryFilter(relationUpdated_filter, block.hash);
            if (relationUpdated_event.length > 0) {
                for (var e = 0; e < relationUpdated_event.length; e++) {
                    let actor = relationUpdated_event[e].args.actor;
                    let name = (await actorNames.actorName(actor))._name;
                    let target = relationUpdated_event[e].args.target;
                    let target_name = (await actorNames.actorName(target))._name;
                    let rsid = relationUpdated_event[e].args.rsid;
                    let rsname = relationUpdated_event[e].args.rsname
                    let age = await worldEvents.ages(actor);

                    await sendChannelMessage(`**${name == "" ? "无名氏" : name}**和**${target_name == "" ? "无名氏" : target_name}**关系变为***${rsname}***。`);
                }
            }

            //prelife update events
            let reincarnation_event = await actorPrelifes.queryFilter(reincarnation_filter, block.hash);
            if (reincarnation_event.length > 0) {
                for (var e = 0; e < reincarnation_event.length; e++) {
                    let actor = reincarnation_event[e].args.actor;
                    let name = (await actorNames.actorName(actor))._name;
                    let postLife = reincarnation_event[e].args.postLife;
                    let post_name = (await actorNames.actorName(postLife))._name;
                    let age = await worldEvents.ages(actor);

                    await sendChannelMessage(`**${name == "" ? "无名氏" : name}(角色#${actor})**转世为**${post_name == "" ? "无名氏" : post_name}(角色#${actor})**。`);
                }
            }

            //item created events
            let itemCreated_event = await worldItems.queryFilter(itemCreated_filter, block.hash);
            if (itemCreated_event.length > 0) {
                for (var e = 0; e < itemCreated_event.length; e++) {
                    let actor = itemCreated_event[e].args.actor;
                    let name = (await actorNames.actorName(actor))._name;
                    let item = itemCreated_event[e].args.item;
                    let typeId = itemCreated_event[e].args.typeId;
                    let typeName = itemCreated_event[e].args.typeName;
                    let wear = itemCreated_event[e].args.wear;
                    let shape = itemCreated_event[e].args.shape;
                    let shapeName = itemCreated_event[e].args.shapeName;
                    let age = await worldEvents.ages(actor);

                    await sendChannelMessage(`>**${name == "" ? "无名氏" : name}**创建了${shapeName}的**${typeName}**(耐久=${wear.toNumber()})。`);
                }
            }

            //item changed events
            let itemChanged_event = await worldItems.queryFilter(itemChanged_filter, block.hash);
            if (itemChanged_event.length > 0) {
                for (var e = 0; e < itemChanged_event.length; e++) {
                    let actor = itemChanged_event[e].args.actor;
                    let name = (await actorNames.actorName(actor))._name;
                    let item = itemChanged_event[e].args.item;
                    let typeId = itemChanged_event[e].args.typeId;
                    let typeName = itemChanged_event[e].args.typeName;
                    let wear = itemChanged_event[e].args.wear;
                    let shape = itemChanged_event[e].args.shape;
                    let shapeName = itemChanged_event[e].args.shapeName;
                    let age = await worldEvents.ages(actor);

                    await sendChannelMessage(`**${name == "" ? "无名氏" : name}**的**${typeName}发生变化：耐久=${wear.toNumber()}。`);
                }
            }

            //item destroyed events
            let itemDestroyed_event = await worldItems.queryFilter(itemDestroyed_filter, block.hash);
            if (itemDestroyed_event.length > 0) {
                for (var e = 0; e < itemDestroyed_event.length; e++) {
                    let item = itemDestroyed_event[e].args.item;
                    let typeId = itemDestroyed_event[e].args.typeId;
                    let typeName = itemDestroyed_event[e].args.typeName;

                    await sendChannelMessage(`>一件**${typeName}**销毁了。`);
                }
            }

            //attribute update events
            let attriUpdate_event = await actorBaseAttributes.queryFilter(attrBaseUpdate_filter, block.hash);
            if (attriUpdate_event.length > 0) {
                for (var e = 0; e < attriUpdate_event.length; e++) {
                    let actor = attriUpdate_event[e].args.actor;
                    let attrStr = "";
                    for (var a = 0; a < attriUpdate_event[e].args.attributes.length; a += 2) {
                        attrStr += `${await actorBaseAttributes.attributeLabels(attriUpdate_event[e].args.attributes[a].sub(_RL_ATTRIBUTE_BASE))}=${attriUpdate_event[e].args.attributes[a + 1]},`;
                    }
                    let name = (await actorNames.actorName(actor))._name;
                    let age = await worldEvents.ages(actor);

                    await sendChannelMessage(`\`\`\`diff\r\n+ ${name}基本属性发生了变化：` + attrStr + `\r\n\`\`\``);
                }
            }
            attriUpdate_event = await actorCharmAttributes.queryFilter(attrCharmUpdate_filter, block.hash);
            if (attriUpdate_event.length > 0) {
                for (var e = 0; e < attriUpdate_event.length; e++) {
                    let actor = attriUpdate_event[e].args.actor;
                    let attrStr = "";
                    for (var a = 0; a < attriUpdate_event[e].args.attributes.length; a += 2) {
                        attrStr += `${await actorCharmAttributes.attributeLabels(attriUpdate_event[e].args.attributes[a].sub(_RL_ATTRIBUTE_CHARM_BASE))}=${attriUpdate_event[e].args.attributes[a + 1]},`;
                    }
                    let name = (await actorNames.actorName(actor))._name;
                    let age = await worldEvents.ages(actor);

                    await sendChannelMessage(`\`\`\`diff\r\n+ ${name}外貌发生了变化：` + attrStr + `\r\n\`\`\``);
                }
            }
            attriUpdate_event = await actorMoodAttributes.queryFilter(attrMoodUpdate_filter, block.hash);
            if (attriUpdate_event.length > 0) {
                for (var e = 0; e < attriUpdate_event.length; e++) {
                    let actor = attriUpdate_event[e].args.actor;
                    let attrStr = "";
                    for (var a = 0; a < attriUpdate_event[e].args.attributes.length; a += 2) {
                        attrStr += `${await actorMoodAttributes.attributeLabels(attriUpdate_event[e].args.attributes[a].sub(_RL_ATTRIBUTE_MOOD_BASE))}=${attriUpdate_event[e].args.attributes[a + 1]},`;
                    }
                    let name = (await actorNames.actorName(actor))._name;
                    let age = await worldEvents.ages(actor);

                    await sendChannelMessage(`\`\`\`diff\r\n+ ${name}情绪发生了变化：` + attrStr + `\r\n\`\`\``);
                }
            }
            attriUpdate_event = await actorCoreAttributes.queryFilter(attrCoreUpdate_filter, block.hash);
            if (attriUpdate_event.length > 0) {
                for (var e = 0; e < attriUpdate_event.length; e++) {
                    let actor = attriUpdate_event[e].args.actor;
                    let attrStr = "";
                    for (var a = 0; a < attriUpdate_event[e].args.attributes.length; a += 2) {
                        attrStr += `${await actorCoreAttributes.attributeLabels(attriUpdate_event[e].args.attributes[a].sub(_RL_ATTRIBUTE_CORE_BASE))}=${attriUpdate_event[e].args.attributes[a + 1]},`;
                    }
                    let name = (await actorNames.actorName(actor))._name;
                    let age = await worldEvents.ages(actor);

                    await sendChannelMessage(`\`\`\`diff\r\n+ ${name}身体发生了变化：` + attrStr + `\r\n\`\`\``);
                }
            }
            attriUpdate_event = await actorBehaviorAttributes.queryFilter(attrBehaviorUpdate_filter, block.hash);
            if (attriUpdate_event.length > 0) {
                for (var e = 0; e < attriUpdate_event.length; e++) {
                    let actor = attriUpdate_event[e].args.actor;
                    let attrStr = "";
                    for (var a = 0; a < attriUpdate_event[e].args.attributes.length; a += 2) {
                        attrStr += `${await actorBehaviorAttributes.attributeLabels(attriUpdate_event[e].args.attributes[a].sub(_RL_ATTRIBUTE_BEHAVIOR_BASE))}=${attriUpdate_event[e].args.attributes[a + 1]},`;
                    }
                    let name = (await actorNames.actorName(actor))._name;
                    let age = await worldEvents.ages(actor);

                    await sendChannelMessage(`\`\`\`diff\r\n+ ${name}行动力发生了变化：` + attrStr + `\r\n\`\`\``);
                }
            }

            //behavior special events
            let actRecover_event = await actorBehaviorAttributes.queryFilter(actRecover_filter, block.hash);
            if (actRecover_event.length > 0) {
                for (var e = 0; e < actRecover_event.length; e++) {
                    let actor = actRecover_event[e].args.actor;
                    let name = (await actorNames.actorName(actor))._name;
                    let age = await worldEvents.ages(actor);

                    await sendChannelMessage(`\`\`\`diff\r\n+ 恢复了行动力（${actRecover_event[e].args.act}）。\r\n\`\`\``);
                }
            }

            //zone assets grown events
            let zone_asset_grown_event = await worldZoneBaseResources.queryFilter(ZoneAssetGrown_filter, block.hash);
            if (zone_asset_grown_event.length > 0) {
                for (var e = 0; e < zone_asset_grown_event.length; e++) {
                    let zone_id = zone_asset_grown_event[e].args.zone.toNumber();
                    let zoneName = await worldZones.names(zone_id);
                    let gold = zone_asset_grown_event[e].args.gold;
                    let goldText = assetQuantityDescription(gold);
                    let food = zone_asset_grown_event[e].args.food;
                    let foodText = assetQuantityDescription(food);
                    let herb = zone_asset_grown_event[e].args.herb;
                    let herbText = assetQuantityDescription(herb);
                    let fabric = zone_asset_grown_event[e].args.fabric;
                    let fabricText = assetQuantityDescription(fabric);
                    let wood = zone_asset_grown_event[e].args.wood;
                    let woodText = assetQuantityDescription(wood);

                    await sendChannelMessage(`\`\`\`fix\r\n${zoneName}地区产生了：` +
                        `金石（${ethers.utils.formatEther(gold.div(BigInt(1e17)).mul(BigInt(1e17)))}),` +
                        `食材（${ethers.utils.formatEther(food.div(BigInt(1e17)).mul(BigInt(1e17)))}),` +
                        `木材（${ethers.utils.formatEther(wood.div(BigInt(1e17)).mul(BigInt(1e17)))}),` +
                        `织物（${ethers.utils.formatEther(fabric.div(BigInt(1e17)).mul(BigInt(1e17)))}),` +
                        `药材（${ethers.utils.formatEther(herb.div(BigInt(1e17)).mul(BigInt(1e17)))})` +
                        `\`\`\``);
                }
            }

            //actor assets collection events
            let actor_asset_collected_event = await worldZoneBaseResources.queryFilter(ActorAssetCollected_filter, block.hash);
            if (actor_asset_collected_event.length > 0) {
                for (var e = 0; e < actor_asset_collected_event.length; e++) {
                    let actor_id = actor_asset_collected_event[e].args.actor.toNumber();
                    let actorName = (await actorNames.actorName(actor_id))._name;
                    let gold = actor_asset_collected_event[e].args.gold;
                    let goldText = assetQuantityDescription(gold);
                    let food = actor_asset_collected_event[e].args.food;
                    let foodText = assetQuantityDescription(food);
                    let herb = actor_asset_collected_event[e].args.herb;
                    let herbText = assetQuantityDescription(herb);
                    let fabric = actor_asset_collected_event[e].args.fabric;
                    let fabricText = assetQuantityDescription(fabric);
                    let wood = actor_asset_collected_event[e].args.wood;
                    let woodText = assetQuantityDescription(wood);

                    await sendChannelMessage(`**${actorName}**获得了` +
                        (gold.isZero() ? `` : `${goldText + "**金石**（" + ethers.utils.formatEther(gold.div(BigInt(1e17)).mul(BigInt(1e17))) + "），"}`) +
                        (food.isZero() ? `` : `${foodText + "**食材**（" + ethers.utils.formatEther(food.div(BigInt(1e17)).mul(BigInt(1e17))) + "），"}`) +
                        (wood.isZero() ? `` : `${woodText + "**木材**（" + ethers.utils.formatEther(wood.div(BigInt(1e17)).mul(BigInt(1e17))) + "），"}`) +
                        (fabric.isZero() ? `` : `${fabricText + "**织物**（" + ethers.utils.formatEther(fabric.div(BigInt(1e17)).mul(BigInt(1e17))) + "），"}`) +
                        (herb.isZero() ? `` : `${herbText + "**药材**（" + ethers.utils.formatEther(herb.div(BigInt(1e17)).mul(BigInt(1e17))) + "）。"}`));
                }
            }

            //assets transfer events
            let daoli_transfer_event = await assetDaoli.queryFilter(daoli_transfer_filter, block.hash);
            if (daoli_transfer_event.length > 0) {
                for (var e = 0; e < daoli_transfer_event.length; e++) {
                    let from = daoli_transfer_event[e].args.from.toNumber();
                    let to = daoli_transfer_event[e].args.to.toNumber();
                    let fromName = (await actorNames.actorName(from))._name;
                    let toName = (await actorNames.actorName(to))._name;
                    let amount = daoli_transfer_event[e].args.amount;
                    let amountText = assetQuantityDescription(amount);

                    if(fromName == "")
                        fromName = `角色#${from}`;
                    if(toName == "")
                        toName = `角色#${to}`;
                    if (from == to)
                        await sendChannelMessage(`**${toName}**获得了` + amountText + `**道理**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                    else
                        await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**道理**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                }
            }

            let gold_transfer_event = await assetGold.queryFilter(gold_transfer_filter, block.hash);
            if (gold_transfer_event.length > 0) {
                for (var e = 0; e < gold_transfer_event.length; e++) {
                    let from = gold_transfer_event[e].args.from.toNumber();
                    let to = gold_transfer_event[e].args.to.toNumber();
                    let fromName = (await actorNames.actorName(from))._name;
                    let toName = (await actorNames.actorName(to))._name;
                    let amount = gold_transfer_event[e].args.amount;
                    let amountText = assetQuantityDescription(amount);

                    if (from != ACTOR_GUANGONG.toNumber()) {
                        if (from == to)
                            await sendChannelMessage(`**${toName}**获得了` + amountText + `**金石**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        else
                            await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**金石**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        }
                }
            }

            let food_transfer_event = await assetFood.queryFilter(food_transfer_filter, block.hash);
            if (food_transfer_event.length > 0) {
                for (var e = 0; e < food_transfer_event.length; e++) {
                    let from = food_transfer_event[e].args.from.toNumber();
                    let to = food_transfer_event[e].args.to.toNumber();
                    let fromName = (await actorNames.actorName(from))._name;
                    let toName = (await actorNames.actorName(to))._name;
                    let amount = food_transfer_event[e].args.amount;
                    let amountText = assetQuantityDescription(amount);

                    if (from != ACTOR_GUANGONG.toNumber()) {
                        if (from == to)
                            await sendChannelMessage(`**${toName}**获得了` + amountText + `**食材**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        else
                            await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**食材**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                    }
                }
            }

            let wood_transfer_event = await assetWood.queryFilter(wood_transfer_filter, block.hash);
            if (wood_transfer_event.length > 0) {
                for (var e = 0; e < wood_transfer_event.length; e++) {
                    let from = wood_transfer_event[e].args.from.toNumber();
                    let to = wood_transfer_event[e].args.to.toNumber();
                    let fromName = (await actorNames.actorName(from))._name;
                    let toName = (await actorNames.actorName(to))._name;
                    let amount = wood_transfer_event[e].args.amount;
                    let amountText = assetQuantityDescription(amount);

                    if (from != ACTOR_GUANGONG.toNumber()) {
                        if (from == to)
                            await sendChannelMessage(`**${toName}**获得了` + amountText + `**木材**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        else
                            await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**木材**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                    }
                }
            }

            let fabric_transfer_event = await assetFabric.queryFilter(fabric_transfer_filter, block.hash);
            if (fabric_transfer_event.length > 0) {
                for (var e = 0; e < fabric_transfer_event.length; e++) {
                    let from = fabric_transfer_event[e].args.from.toNumber();
                    let to = fabric_transfer_event[e].args.to.toNumber();
                    let fromName = (await actorNames.actorName(from))._name;
                    let toName = (await actorNames.actorName(to))._name;
                    let amount = fabric_transfer_event[e].args.amount;
                    let amountText = assetQuantityDescription(amount);

                    if (from != ACTOR_GUANGONG.toNumber()) {
                        if (from == to)
                            await sendChannelMessage(`**${toName}**获得了` + amountText + `**织物**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        else
                            await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**织物**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                    }
                }
            }

            let herb_transfer_event = await assetHerb.queryFilter(herb_transfer_filter, block.hash);
            if (herb_transfer_event.length > 0) {
                for (var e = 0; e < herb_transfer_event.length; e++) {
                    let from = herb_transfer_event[e].args.from.toNumber();
                    let to = herb_transfer_event[e].args.to.toNumber();
                    let fromName = (await actorNames.actorName(from))._name;
                    let toName = (await actorNames.actorName(to))._name;
                    let amount = herb_transfer_event[e].args.amount;
                    let amountText = assetQuantityDescription(amount);

                    if (from != ACTOR_GUANGONG.toNumber()) {
                        if (from == to)
                            await sendChannelMessage(`**${toName}**获得了` + amountText + `**药材**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        else
                            await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**药材**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                    }
                }
            }

            let prestige_transfer_event = await assetPrestige.queryFilter(prestige_transfer_filter, block.hash);
            if (prestige_transfer_event.length > 0) {
                for (var e = 0; e < prestige_transfer_event.length; e++) {
                    let from = prestige_transfer_event[e].args.from.toNumber();
                    let to = prestige_transfer_event[e].args.to.toNumber();
                    let fromName = (await actorNames.actorName(from))._name;
                    let toName = (await actorNames.actorName(to))._name;
                    let amount = prestige_transfer_event[e].args.amount;
                    let amountText = assetQuantityDescription(amount);

                    if (from == to)
                        await sendChannelMessage(`**${toName}**获得了` + amountText + `**威望**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                    else
                        await sendChannelMessage(`**${fromName}**消耗了` + amountText + `**威望**（${ethers.utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                }
            }

            startBlockNum++;
            if (startBlockNum > blockNum)
                break;
        }
    }

    // again in 1 second
    setTimeout(function () {
        startSyncMain(startBlockNum);
    }, 1000);
}

export function startLogger() {
    const args = require('minimist')(process.argv.slice(2));

    if (args.network) {
        env.changeNetwork(args.network);
    }

    if (args.start)
        startSyncMain(args.start);
    else
        startSyncMain(0);
}
