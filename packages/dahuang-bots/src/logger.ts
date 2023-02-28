//https://www.writebots.com/discord-text-formatting/
//https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-

import fs from 'fs-extra';
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
import { getAddressBookShareFilePath } from '@taiyi/dahuang-contracts/dist/utils/addressConfig';
import { TextChannel } from "discord.js";
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types';

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

export function getDahuangAddressBook() : {[index: string]:any} {
    return addressBook;
}

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

export let _RL_ATTRIBUTE_BASE = 0;
export let ATTR_AGE = 0; // 年龄
export let ATTR_HLH = 1; // 健康，生命
export let _RL_ATTRIBUTE_CHARM_BASE = 10;
export let ATTR_MEL = _RL_ATTRIBUTE_CHARM_BASE + 0; // 魅力
export let _RL_ATTRIBUTE_MOOD_BASE = 20;
export let ATTR_XIQ = _RL_ATTRIBUTE_MOOD_BASE + 0; // 心情
export let _RL_ATTRIBUTE_CORE_BASE = 30;
export let ATTR_LVL = _RL_ATTRIBUTE_CORE_BASE + 0; // 膂力
export let ATTR_TIZ = _RL_ATTRIBUTE_CORE_BASE + 1; // 体质
export let ATTR_LIM = _RL_ATTRIBUTE_CORE_BASE + 2; // 灵敏
export let ATTR_GEG = _RL_ATTRIBUTE_CORE_BASE + 3; // 根骨
export let ATTR_WUX = _RL_ATTRIBUTE_CORE_BASE + 4; // 悟性
export let ATTR_DIL = _RL_ATTRIBUTE_CORE_BASE + 5; // 定力
export let _RL_ATTRIBUTE_BEHAVIOR_BASE = 40;
export let ATTR_ACT = _RL_ATTRIBUTE_BEHAVIOR_BASE + 0; // 行动力

let ACTOR_GUANGONG : BigNumber;
let IsConstInitialized = false;


async function startSyncMain(startBlockNum: number, ethersHelper: HardhatEthersHelpers) {
    if (addressBook["WorldConstants"] == undefined) {
        await initAddress();
    }
    let provider = await ethersHelper.provider;
    const [wallet] = await ethersHelper.getSigners();
    const worldConstants = WorldConstants__factory.connect(addressBook.WorldConstants, wallet);
    const actors = Actors__factory.connect(addressBook.Actors, wallet);
    const actorPrelifes = ActorPrelifes__factory.connect(addressBook.ActorPrelifes, wallet);
    const assetDaoli = AssetDaoli__factory.connect(addressBook.AssetDaoli, wallet); 
    const actorNames = ActorNames__factory.connect(addressBook.ActorNames, wallet);
    const actorLocations = ActorLocations__factory.connect(addressBook.ActorLocations, wallet);
    const worldZones = WorldZones__factory.connect(addressBook.WorldZones, wallet);
    const actorRelationship = ActorRelationship__factory.connect(addressBook.ActorRelationship, wallet);
    const worldItems = WorldItems__factory.connect(addressBook.WorldItems, wallet);
    const actorSID = ActorSocialIdentity__factory.connect(addressBook.ActorSocialIdentity, wallet);
    const trigrams = Trigrams__factory.connect(addressBook.Trigrams, wallet);
    const actorBaseAttributes = ActorAttributes__factory.connect(addressBook.ActorAttributes, wallet);

    const dahuangConstants = DahuangConstants__factory.connect(addressBook.DahuangConstants, wallet);
    const worldEvents = WorldEvents__factory.connect(addressBook.WorldEvents, wallet);
    const actorTalents = ActorTalents__factory.connect(addressBook.ActorTalents, wallet);
    const shejitu = ShejiTu__factory.connect(addressBook.ShejiTuProxy, wallet);
    const assetGold = WorldFungible__factory.connect(addressBook.AssetGold, wallet);
    const assetFood = WorldFungible__factory.connect(addressBook.AssetFood, wallet);
    const assetWood = WorldFungible__factory.connect(addressBook.AssetWood, wallet);
    const assetFabric = WorldFungible__factory.connect(addressBook.AssetFabric, wallet);
    const assetHerb = WorldFungible__factory.connect(addressBook.AssetHerb, wallet);
    const assetPrestige = WorldNontransferableFungible__factory.connect(addressBook.AssetPrestige, wallet);
    const worldZoneBaseResources = WorldZoneBaseResources__factory.connect(addressBook.WorldZoneBaseResources, wallet);
    const actorCharmAttributes = ActorCharmAttributes__factory.connect(addressBook.ActorCharmAttributes, wallet);
    const actorCoreAttributes = ActorCoreAttributes__factory.connect(addressBook.ActorCoreAttributes, wallet);
    const actorMoodAttributes = ActorMoodAttributes__factory.connect(addressBook.ActorMoodAttributes, wallet);
    const actorBehaviorAttributes = ActorBehaviorAttributes__factory.connect(addressBook.ActorBehaviorAttributes, wallet);
    const worldDeadActors = WorldDeadActors__factory.connect(addressBook.WorldDeadActors, wallet);
    const actorsGender = ActorsGender__factory.connect(addressBook.ActorsGender, wallet);
    const actorBornFamilies = ActorBornFamilies__factory.connect(addressBook.ActorBornFamilies, wallet);

    if(!IsConstInitialized) {    
        ACTOR_GUANGONG = await worldZoneBaseResources.ACTOR_GUANGONG();    
    
        IsConstInitialized = true;
    }
    
    let blockNum = await provider.getBlockNumber();
    //console.log(startBlockNum, blockNum);

    let actorMinted_filter = actors.filters.ActorMinted(null, null, null);
    let eventBorn_filter = worldEvents.filters.Born(null);
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
    let NameAssigned_filter = actorNames.filters.NameAssigned(null, null, null);
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

    if (channels.length > 0 && startBlockNum <= blockNum) {
        while (true) {
            console.log(startBlockNum);
            //let block = await provider.getBlock(startBlockNum);
            let endBlockNum = Math.min(blockNum, startBlockNum + 100);
            //let endBlock = await provider.getBlock(endBlockNum);

            //let event_promises:Promise<void>[] = [];

            //Create actor events
            //event_promises.push((async ():Promise<void>=> {
                let actorMinted_event = await actors.queryFilter(actorMinted_filter, startBlockNum, endBlockNum);
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
            //})());

            //worldEvent born character events
            //event_promises.push((async ():Promise<void>=> {
                let eventBorn_event = await worldEvents.queryFilter(eventBorn_filter, startBlockNum, endBlockNum);
                if (eventBorn_event.length > 0) {
                    for (var e = 0; e < eventBorn_event.length; e++) {
                        let actor = eventBorn_event[e].args.actor.toNumber();

                        await sendChannelMessage(`**角色#${actor}**出生了。`);

                        let preActor = (await actorPrelifes.preLifes(actor)).toNumber();
                        if (preActor > 0) {
                            let preActorName = (await actorNames.actorName(preActor))._name;
                            await sendChannelMessage(`**角色#${actor}**的前世是**${preActorName}(#${preActor})**。`);
                        }
                    }
                }
            //})());

            //timeline age events
            //event_promises.push((async ():Promise<void>=> {
                let timeline_ageEvent_event = await shejitu.queryFilter(timeline_ageEvent_filter, startBlockNum, endBlockNum);
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
            //})());

            //timeline active events
            //event_promises.push((async ():Promise<void>=> {
                let timeline_activeEvent_event = await shejitu.queryFilter(timeline_activeEvent_filter, startBlockNum, endBlockNum);
                if (timeline_activeEvent_event.length > 0) {
                    for (var e = 0; e < timeline_activeEvent_event.length; e++) {
                        let actor = timeline_activeEvent_event[e].args.actor;
                        let age = timeline_activeEvent_event[e].args.age;
                        let eventId = timeline_activeEvent_event[e].args.eventId;
                        let eventInfo = await worldEvents.eventInfo(eventId, actor);
                        let name = (await actorNames.actorName(actor))._name;

                        await sendChannelMessage(`\`\`\`fix\r\n${name}在${age}岁干了一些事\r\n` +
                            `[${eventId.toString()}]` + eventInfo + `\r\n\`\`\``);
                    }
                }
            //})());

            //timeline branch events
            //event_promises.push((async ():Promise<void>=> {
                let timeline_branchEvent_event = await shejitu.queryFilter(timeline_branchEvent_filter, startBlockNum, endBlockNum);
                if (timeline_branchEvent_event.length > 0) {
                    for (var e = 0; e < timeline_branchEvent_event.length; e++) {
                        let actor = timeline_branchEvent_event[e].args.actor;
                        let age = timeline_branchEvent_event[e].args.age;
                        let eventId = timeline_branchEvent_event[e].args.eventId;
                        let eventInfo = await worldEvents.eventInfo(eventId, actor);
                        let name = (await actorNames.actorName(actor))._name;

                        await sendChannelMessage(`\`\`\`fix\r\n${name}，${age}岁，` +
                            `[${eventId.toString()}]` + eventInfo + `\r\n\`\`\``);
                    }
                }
            //})());

            //name claimed events
            //event_promises.push((async ():Promise<void>=> {
                let NameClaimed_event = await actorNames.queryFilter(NameClaimed_filter, startBlockNum, endBlockNum);
                if (NameClaimed_event.length > 0) {
                    for (var e = 0; e < NameClaimed_event.length; e++) {
                        //let owner = NameClaimed_event[e].args.owner;
                        let actor = NameClaimed_event[e].args.actor.toNumber();
                        //let name_id = NameClaimed_event[e].args.nameId;
                        // let first_name = NameClaimed_event[e].args.firstName;
                        // let last_name = NameClaimed_event[e].args.lastName;
                        let name:string = "";
                        try {
                            name = NameClaimed_event[e].args.name;
                        }
                        catch(e) {
                            ; //某些浏览器上直接铸造中文名字会编码错误
                        }

                        if(actor > 0)
                            await sendChannelMessage(`\`\`\`css\r\n角色#${actor}取名为\"${name}\"\r\n\`\`\``);
                    }
                }
            //})());

            //zone claimed events
            //event_promises.push((async ():Promise<void>=> {
                let ZoneClaimed_event = await worldZones.queryFilter(ZoneClaimed_filter, startBlockNum, endBlockNum);
                if (ZoneClaimed_event.length > 0) {
                    for (var e = 0; e < ZoneClaimed_event.length; e++) {
                        let actor = ZoneClaimed_event[e].args.actor.toNumber();
                        let zone_id = ZoneClaimed_event[e].args.zoneId;
                        let name = ZoneClaimed_event[e].args.name;

                        await sendChannelMessage(`\`\`\`css\r\n名为\"${name}\"的地区出现。\r\n\`\`\``);
                    }
                }
            //})());

            //actor location changed events
            //event_promises.push((async ():Promise<void>=> {
                let actorLoacationChanged_event = await actorLocations.queryFilter(actorLoacationChanged_filter, startBlockNum, endBlockNum);
                if (actorLoacationChanged_event.length > 0) {
                    for (var e = 0; e < actorLoacationChanged_event.length; e++) {
                        let actor = actorLoacationChanged_event[e].args.actor.toNumber();
                        let oldA = actorLoacationChanged_event[e].args.oldA;
                        //let oldZoneNameA = await worldZones.names(oldA);
                        let oldB = actorLoacationChanged_event[e].args.oldB;
                        //let oldZoneNameB = await worldZones.names(oldB);
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
            //})());

            //sid claimed events
            //event_promises.push((async ():Promise<void>=> {
                let SIDClaimed_event = await actorSID.queryFilter(SIDClaimed_filter, startBlockNum, endBlockNum);
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
            //})());
            
            //generate new trigram
            //event_promises.push((async ():Promise<void>=> {
                // let TrigramOut_event = await trigrams.queryFilter(TrigramOut_filter, startBlockNum, endBlockNum);
                // if (TrigramOut_event.length > 0) {
                //     for (var e = 0; e < TrigramOut_event.length; e++) {
                //         let actor = TrigramOut_event[e].args.actor.toNumber();
                //         let tri = TrigramOut_event[e].args.trigram.toNumber();
                //         let name = (await actorNames.actorName(actor))._name;
                //         name = (name==""?"无名氏":name);

                //         await sendChannelMessage(`**${name}**卦象增加\"**${getTrigramUnicodeString(tri)}**\"。`);
                //     }
                // }
            //})());

            //talents init events
            //event_promises.push((async ():Promise<void>=> {
                let talentsInit_event = await actorTalents.queryFilter(talent_init_filter, startBlockNum, endBlockNum);
                if (talentsInit_event.length > 0) {
                    for (var e = 0; e < talentsInit_event.length; e++) {
                        let actor = talentsInit_event[e].args.actor;
                        let tlts = talentsInit_event[e].args.ids;
                        let name = (await actorNames.actorName(actor))._name;

                        if(tlts.length == 0)
                            await sendChannelMessage(`**${name}**没有拥有任何天赋。`);
                        else {
                            await sendChannelMessage(`**${name}**拥有的天赋：`);
                            let msg = `\`\`\`diff\r\n`;
                            for (var t = 0; t < tlts.length; t++) {
                                msg += `+  ${await actorTalents.talentNames(tlts[t])}(${await actorTalents.talentDescriptions(tlts[t])})\r\n`;
                            }
                            msg += `\`\`\``;
                            await sendChannelMessage(msg);
                        }
                    }
                }
            //})());

            //relationship update events
            //event_promises.push((async ():Promise<void>=> {
                let relationUpdated_event = await actorRelationship.queryFilter(relationUpdated_filter, startBlockNum, endBlockNum);
                if (relationUpdated_event.length > 0) {
                    for (var e = 0; e < relationUpdated_event.length; e++) {
                        let actor = relationUpdated_event[e].args.actor;
                        let name = (await actorNames.actorName(actor))._name;
                        let target = relationUpdated_event[e].args.target;
                        let target_name = (await actorNames.actorName(target))._name;
                        let rsid = relationUpdated_event[e].args.rsid;
                        let rsname = relationUpdated_event[e].args.rsname
                        //let age = await worldEvents.ages(actor);

                        await sendChannelMessage(`**${name == "" ? "无名氏" : name}**和**${target_name == "" ? "无名氏" : target_name}**关系变为***${rsname}***。`);
                    }
                }
            //})());

            //prelife update events
            //event_promises.push((async ():Promise<void>=> {
                let reincarnation_event = await actorPrelifes.queryFilter(reincarnation_filter, startBlockNum, endBlockNum);
                if (reincarnation_event.length > 0) {
                    for (var e = 0; e < reincarnation_event.length; e++) {
                        let actor = reincarnation_event[e].args.actor;
                        let name = (await actorNames.actorName(actor))._name;
                        let postLife = reincarnation_event[e].args.postLife;
                        let post_name = (await actorNames.actorName(postLife))._name;
                        //let age = await worldEvents.ages(actor);

                        await sendChannelMessage(`**${name == "" ? "无名氏" : name}(角色#${actor})**转世为**${post_name == "" ? "无名氏" : post_name}(角色#${actor})**。`);
                    }
                }
            //})());

            //item created events
            //event_promises.push((async ():Promise<void>=> {
                let itemCreated_event = await worldItems.queryFilter(itemCreated_filter, startBlockNum, endBlockNum);
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
                        //let age = await worldEvents.ages(actor);

                        await sendChannelMessage(`>**${name == "" ? "无名氏" : name}**获得了${shapeName}的**${typeName}**(耐久=${wear.toNumber()})。`);
                    }
                }
            //})());

            //item changed events
            //event_promises.push((async ():Promise<void>=> {
                let itemChanged_event = await worldItems.queryFilter(itemChanged_filter, startBlockNum, endBlockNum);
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
                        //let age = await worldEvents.ages(actor);

                        await sendChannelMessage(`**${name == "" ? "无名氏" : name}**的**${typeName}发生变化：耐久=${wear.toNumber()}。`);
                    }
                }
            //})());

            //item destroyed events
            //event_promises.push((async ():Promise<void>=> {
                let itemDestroyed_event = await worldItems.queryFilter(itemDestroyed_filter, startBlockNum, endBlockNum);
                if (itemDestroyed_event.length > 0) {
                    for (var e = 0; e < itemDestroyed_event.length; e++) {
                        let item = itemDestroyed_event[e].args.item;
                        let typeId = itemDestroyed_event[e].args.typeId;
                        let typeName = itemDestroyed_event[e].args.typeName;

                        await sendChannelMessage(`>一件**${typeName}**销毁了。`);
                    }
                }
            //})());

            //attribute update events
            //event_promises.push((async ():Promise<void>=> 
            {
                let attriUpdate_event = await actorBaseAttributes.queryFilter(attrBaseUpdate_filter, startBlockNum, endBlockNum);
                if (attriUpdate_event.length > 0) {
                    for (var e = 0; e < attriUpdate_event.length; e++) {
                        let actor = attriUpdate_event[e].args.actor;
                        let attrStr = "";
                        for (var a = 0; a < attriUpdate_event[e].args.attributes.length; a += 2) {
                            attrStr += `${await actorBaseAttributes.attributeLabels(attriUpdate_event[e].args.attributes[a].sub(_RL_ATTRIBUTE_BASE))}=${attriUpdate_event[e].args.attributes[a + 1]},`;
                        }
                        let name = (await actorNames.actorName(actor))._name;
                        //let age = await worldEvents.ages(actor);

                        await sendChannelMessage(`\`\`\`diff\r\n+ ${name}基本属性发生了变化：` + attrStr + `\r\n\`\`\``);
                    }
                }
            }
            //)());

            //event_promises.push((async ():Promise<void>=> 
            {
                let attriUpdate_event = await actorCharmAttributes.queryFilter(attrCharmUpdate_filter, startBlockNum, endBlockNum);
                if (attriUpdate_event.length > 0) {
                    for (var e = 0; e < attriUpdate_event.length; e++) {
                        let actor = attriUpdate_event[e].args.actor;
                        let attrStr = "";
                        for (var a = 0; a < attriUpdate_event[e].args.attributes.length; a += 2) {
                            attrStr += `${await actorCharmAttributes.attributeLabels(attriUpdate_event[e].args.attributes[a].sub(_RL_ATTRIBUTE_CHARM_BASE))}=${attriUpdate_event[e].args.attributes[a + 1]},`;
                        }
                        let name = (await actorNames.actorName(actor))._name;
                        //let age = await worldEvents.ages(actor);

                        await sendChannelMessage(`\`\`\`diff\r\n+ ${name}外貌发生了变化：` + attrStr + `\r\n\`\`\``);
                    }
                }
            }
            //)());

            //event_promises.push((async ():Promise<void>=> 
            {
                let attriUpdate_event = await actorMoodAttributes.queryFilter(attrMoodUpdate_filter, startBlockNum, endBlockNum);
                if (attriUpdate_event.length > 0) {
                    for (var e = 0; e < attriUpdate_event.length; e++) {
                        let actor = attriUpdate_event[e].args.actor;
                        let attrStr = "";
                        for (var a = 0; a < attriUpdate_event[e].args.attributes.length; a += 2) {
                            attrStr += `${await actorMoodAttributes.attributeLabels(attriUpdate_event[e].args.attributes[a].sub(_RL_ATTRIBUTE_MOOD_BASE))}=${attriUpdate_event[e].args.attributes[a + 1]},`;
                        }
                        let name = (await actorNames.actorName(actor))._name;
                        //let age = await worldEvents.ages(actor);

                        await sendChannelMessage(`\`\`\`diff\r\n+ ${name}情绪发生了变化：` + attrStr + `\r\n\`\`\``);
                    }
                }
            }
            //)());

            //event_promises.push((async ():Promise<void>=> 
            {
                let attriUpdate_event = await actorCoreAttributes.queryFilter(attrCoreUpdate_filter, startBlockNum, endBlockNum);
                if (attriUpdate_event.length > 0) {
                    for (var e = 0; e < attriUpdate_event.length; e++) {
                        let actor = attriUpdate_event[e].args.actor;
                        let attrStr = "";
                        for (var a = 0; a < attriUpdate_event[e].args.attributes.length; a += 2) {
                            attrStr += `${await actorCoreAttributes.attributeLabels(attriUpdate_event[e].args.attributes[a].sub(_RL_ATTRIBUTE_CORE_BASE))}=${attriUpdate_event[e].args.attributes[a + 1]},`;
                        }
                        let name = (await actorNames.actorName(actor))._name;
                        //let age = await worldEvents.ages(actor);

                        await sendChannelMessage(`\`\`\`diff\r\n+ ${name}身体发生了变化：` + attrStr + `\r\n\`\`\``);
                    }
                }
            }
            //})());

            //event_promises.push((async ():Promise<void>=> 
            {
                let attriUpdate_event = await actorBehaviorAttributes.queryFilter(attrBehaviorUpdate_filter, startBlockNum, endBlockNum);
                if (attriUpdate_event.length > 0) {
                    for (var e = 0; e < attriUpdate_event.length; e++) {
                        let actor = attriUpdate_event[e].args.actor;
                        let attrStr = "";
                        for (var a = 0; a < attriUpdate_event[e].args.attributes.length; a += 2) {
                            attrStr += `${await actorBehaviorAttributes.attributeLabels(attriUpdate_event[e].args.attributes[a].sub(_RL_ATTRIBUTE_BEHAVIOR_BASE))}=${attriUpdate_event[e].args.attributes[a + 1]},`;
                        }
                        let name = (await actorNames.actorName(actor))._name;
                        //let age = await worldEvents.ages(actor);

                        await sendChannelMessage(`\`\`\`diff\r\n+ ${name}行动力发生了变化：` + attrStr + `\r\n\`\`\``);
                    }
                }
            }
            //)());

            //behavior special events
            //event_promises.push((async ():Promise<void>=> {
                let actRecover_event = await actorBehaviorAttributes.queryFilter(actRecover_filter, startBlockNum, endBlockNum);
                if (actRecover_event.length > 0) {
                    for (var e = 0; e < actRecover_event.length; e++) {
                        let actor = actRecover_event[e].args.actor;
                        let name = (await actorNames.actorName(actor))._name;
                        // let age = await worldEvents.ages(actor);

                        await sendChannelMessage(`\`\`\`diff\r\n+ ${name}恢复了行动力（${actRecover_event[e].args.act}）。\r\n\`\`\``);
                    }
                }
            //})());

            //zone assets grown events
            //event_promises.push((async ():Promise<void>=> {
                let zone_asset_grown_event = await worldZoneBaseResources.queryFilter(ZoneAssetGrown_filter, startBlockNum, endBlockNum);
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
                            `金石（${utils.formatEther(gold.div(BigInt(1e17)).mul(BigInt(1e17)))}),` +
                            `食材（${utils.formatEther(food.div(BigInt(1e17)).mul(BigInt(1e17)))}),` +
                            `木材（${utils.formatEther(wood.div(BigInt(1e17)).mul(BigInt(1e17)))}),` +
                            `织物（${utils.formatEther(fabric.div(BigInt(1e17)).mul(BigInt(1e17)))}),` +
                            `药材（${utils.formatEther(herb.div(BigInt(1e17)).mul(BigInt(1e17)))})` +
                            `\`\`\``);
                    }
                }
            //})());

            //actor assets collection events
            //event_promises.push((async ():Promise<void>=> {
                // let actor_asset_collected_event = await worldZoneBaseResources.queryFilter(ActorAssetCollected_filter, startBlockNum, endBlockNum);
                // if (actor_asset_collected_event.length > 0) {
                //     for (var e = 0; e < actor_asset_collected_event.length; e++) {
                //         let actor_id = actor_asset_collected_event[e].args.actor.toNumber();
                //         let actorName = (await actorNames.actorName(actor_id))._name;
                //         let gold = actor_asset_collected_event[e].args.gold;
                //         let goldText = assetQuantityDescription(gold);
                //         let food = actor_asset_collected_event[e].args.food;
                //         let foodText = assetQuantityDescription(food);
                //         let herb = actor_asset_collected_event[e].args.herb;
                //         let herbText = assetQuantityDescription(herb);
                //         let fabric = actor_asset_collected_event[e].args.fabric;
                //         let fabricText = assetQuantityDescription(fabric);
                //         let wood = actor_asset_collected_event[e].args.wood;
                //         let woodText = assetQuantityDescription(wood);

                //         await sendChannelMessage(`**${actorName}**获得了` +
                //             (gold.isZero() ? `` : `${goldText + "**金石**（" + utils.formatEther(gold.div(BigInt(1e17)).mul(BigInt(1e17))) + "），"}`) +
                //             (food.isZero() ? `` : `${foodText + "**食材**（" + utils.formatEther(food.div(BigInt(1e17)).mul(BigInt(1e17))) + "），"}`) +
                //             (wood.isZero() ? `` : `${woodText + "**木材**（" + utils.formatEther(wood.div(BigInt(1e17)).mul(BigInt(1e17))) + "），"}`) +
                //             (fabric.isZero() ? `` : `${fabricText + "**织物**（" + utils.formatEther(fabric.div(BigInt(1e17)).mul(BigInt(1e17))) + "），"}`) +
                //             (herb.isZero() ? `` : `${herbText + "**药材**（" + utils.formatEther(herb.div(BigInt(1e17)).mul(BigInt(1e17))) + "）。"}`));
                //     }
                // }
            //})());

            //assets transfer events
            //event_promises.push((async ():Promise<void>=> {
                let daoli_transfer_event = await assetDaoli.queryFilter(daoli_transfer_filter, startBlockNum, endBlockNum);
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
                        if (from == 0)
                            await sendChannelMessage(`**${toName}**获得了` + amountText + `**道理**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        else if (to == 0)
                            await sendChannelMessage(`**${fromName}**提取了` + amountText + `**道理**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        else
                            await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**道理**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                    }
                }
            //})());

            //event_promises.push((async ():Promise<void>=> {
                let gold_transfer_event = await assetGold.queryFilter(gold_transfer_filter, startBlockNum, endBlockNum);
                if (gold_transfer_event.length > 0) {
                    for (var e = 0; e < gold_transfer_event.length; e++) {
                        let from = gold_transfer_event[e].args.from.toNumber();
                        let to = gold_transfer_event[e].args.to.toNumber();
                        let fromName = (await actorNames.actorName(from))._name;
                        let toName = (await actorNames.actorName(to))._name;
                        let amount = gold_transfer_event[e].args.amount;
                        let amountText = assetQuantityDescription(amount);

                        fromName = (fromName=="" ? "无名氏" : fromName);
                        toName = (toName=="" ? "无名氏" : toName);

                        if (to != ACTOR_GUANGONG.toNumber()) {
                            if (from == ACTOR_GUANGONG.toNumber())
                                await sendChannelMessage(`**${toName}**获得了` + amountText + `**金石**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                            else
                                await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**金石**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        }
                    }
                }
            //})());

            //event_promises.push((async ():Promise<void>=> {
                let food_transfer_event = await assetFood.queryFilter(food_transfer_filter, startBlockNum, endBlockNum);
                if (food_transfer_event.length > 0) {
                    for (var e = 0; e < food_transfer_event.length; e++) {
                        let from = food_transfer_event[e].args.from.toNumber();
                        let to = food_transfer_event[e].args.to.toNumber();
                        let fromName = (await actorNames.actorName(from))._name;
                        let toName = (await actorNames.actorName(to))._name;
                        let amount = food_transfer_event[e].args.amount;
                        let amountText = assetQuantityDescription(amount);

                        fromName = (fromName=="" ? "无名氏" : fromName);
                        toName = (toName=="" ? "无名氏" : toName);

                        if (to != ACTOR_GUANGONG.toNumber()) {
                            if (from == ACTOR_GUANGONG.toNumber())
                                await sendChannelMessage(`**${toName}**获得了` + amountText + `**食材**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                            else
                                await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**食材**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        }
                    }
                }
            //})());

            //event_promises.push((async ():Promise<void>=> {
                let wood_transfer_event = await assetWood.queryFilter(wood_transfer_filter, startBlockNum, endBlockNum);
                if (wood_transfer_event.length > 0) {
                    for (var e = 0; e < wood_transfer_event.length; e++) {
                        let from = wood_transfer_event[e].args.from.toNumber();
                        let to = wood_transfer_event[e].args.to.toNumber();
                        let fromName = (await actorNames.actorName(from))._name;
                        let toName = (await actorNames.actorName(to))._name;
                        let amount = wood_transfer_event[e].args.amount;
                        let amountText = assetQuantityDescription(amount);

                        fromName = (fromName=="" ? "无名氏" : fromName);
                        toName = (toName=="" ? "无名氏" : toName);

                        if (to != ACTOR_GUANGONG.toNumber()) {
                            if (from == ACTOR_GUANGONG.toNumber())
                                await sendChannelMessage(`**${toName}**获得了` + amountText + `**木材**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                            else
                                await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**木材**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        }
                    }
                }
            //})());

            //event_promises.push((async ():Promise<void>=> {
                let fabric_transfer_event = await assetFabric.queryFilter(fabric_transfer_filter, startBlockNum, endBlockNum);
                if (fabric_transfer_event.length > 0) {
                    for (var e = 0; e < fabric_transfer_event.length; e++) {
                        let from = fabric_transfer_event[e].args.from.toNumber();
                        let to = fabric_transfer_event[e].args.to.toNumber();
                        let fromName = (await actorNames.actorName(from))._name;
                        let toName = (await actorNames.actorName(to))._name;
                        let amount = fabric_transfer_event[e].args.amount;
                        let amountText = assetQuantityDescription(amount);

                        fromName = (fromName=="" ? "无名氏" : fromName);
                        toName = (toName=="" ? "无名氏" : toName);

                        if (to != ACTOR_GUANGONG.toNumber()) {
                            if (from == ACTOR_GUANGONG.toNumber())
                                await sendChannelMessage(`**${toName}**获得了` + amountText + `**织物**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                            else
                                await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**织物**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        }
                    }
                }
            //})());

            //event_promises.push((async ():Promise<void>=> {
                let herb_transfer_event = await assetHerb.queryFilter(herb_transfer_filter, startBlockNum, endBlockNum);
                if (herb_transfer_event.length > 0) {
                    for (var e = 0; e < herb_transfer_event.length; e++) {
                        let from = herb_transfer_event[e].args.from.toNumber();
                        let to = herb_transfer_event[e].args.to.toNumber();
                        let fromName = (await actorNames.actorName(from))._name;
                        let toName = (await actorNames.actorName(to))._name;
                        let amount = herb_transfer_event[e].args.amount;
                        let amountText = assetQuantityDescription(amount);

                        fromName = (fromName=="" ? "无名氏" : fromName);
                        toName = (toName=="" ? "无名氏" : toName);

                        if (to != ACTOR_GUANGONG.toNumber()) {
                            if (from == ACTOR_GUANGONG.toNumber())
                                await sendChannelMessage(`**${toName}**获得了` + amountText + `**药材**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                            else
                                await sendChannelMessage(`**${fromName}**给了` + `**${toName}**` + amountText + `**药材**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        }
                    }
                }
            //})());

            //event_promises.push((async ():Promise<void>=> {
                let prestige_transfer_event = await assetPrestige.queryFilter(prestige_transfer_filter, startBlockNum, endBlockNum);
                if (prestige_transfer_event.length > 0) {
                    for (var e = 0; e < prestige_transfer_event.length; e++) {
                        let from = prestige_transfer_event[e].args.from.toNumber();
                        let to = prestige_transfer_event[e].args.to.toNumber();
                        let fromName = (await actorNames.actorName(from))._name;
                        let toName = (await actorNames.actorName(to))._name;
                        let amount = prestige_transfer_event[e].args.amount;
                        let amountText = assetQuantityDescription(amount);

                        fromName = (fromName=="" ? "无名氏" : fromName);
                        toName = (toName=="" ? "无名氏" : toName);

                        if (from == 0)
                            await sendChannelMessage(`**${toName}**获得了` + amountText + `**威望**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                        else
                            await sendChannelMessage(`**${fromName}**消耗了` + amountText + `**威望**（${utils.formatEther(amount.div(BigInt(1e17)).mul(BigInt(1e17)))}）。`);
                    }
                }
            //})());

            //await Promise.all(event_promises);

            startBlockNum = endBlockNum + 1;
            if (startBlockNum > blockNum)
                break;
            // if (startBlockNum%10 == 0)
            //     break;
        }
    }

    // again in 240 second
    setTimeout(function () {
        console.log(`start-->`+`${startBlockNum}`);
        startSyncMain(startBlockNum, ethersHelper);
    }, 240000);
}

export function startLogger(startBlockNum: number, ethersHelper: HardhatEthersHelpers) {
    startSyncMain(startBlockNum, ethersHelper);
}
