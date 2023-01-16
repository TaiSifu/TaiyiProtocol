import { CommandInteraction, GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { Discord, MetadataStorage, SlashOption, Slash } from "discordx";
import { addChannel } from "../logger";
import { onCollectAssets, onExchangeDaoli, onFinishTravel, onGrowActor, onListActors, onNewActor, onShowActorHistory, onShowActorInfo, onShowWorld, onStart, onTravelActor } from "../handlers";

@Discord()
export abstract class SlashYeMing {

    @Slash("show-world", { description: "显示大荒世界统计信息" })
    async showWorld(interaction: CommandInteraction): Promise<void> {

        //console.log(interaction.channelId);
        let user = interaction.member as GuildMember;
        //console.log(user);
        let channel = interaction.channel as TextChannel;
        //channel.send("🏃开始播报大荒世界事件……");
        await onShowWorld(user, channel, interaction);
    }

    @Slash("show-actor-info", { description: "显示角色的信息" })
    async showActorInfo(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member as GuildMember;
        let channel = interaction.channel as TextChannel;
        await onShowActorInfo(actor, user, channel, interaction);
    }

    @Slash("show-actor-history", { description: "显示角色的成长经历" })
    async showActorHistory(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member as GuildMember;
        let channel = interaction.channel as TextChannel;
        await onShowActorHistory(actor, user, channel, interaction);
    }

    @Slash("start", { description: "开始" })
    async start(
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member as GuildMember;
        let channel = interaction.channel as TextChannel;
        await onStart(user, channel, interaction);
    }

    @Slash("list-actors", { description: "列出拥有的角色" })
    async listActors(
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member as GuildMember;
        let channel = interaction.channel as TextChannel;
        await onListActors(user, channel, interaction);
    }

    @Slash("new-actor", { description: "创建新角色" })
    async newActor(
        @SlashOption("last-name", { description: "姓", required: true })
        lastName: string,
        @SlashOption("first-name", { description: "名", required: true })
        firstName: string,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member as GuildMember;
        let channel = interaction.channel as TextChannel;
        await onNewActor(firstName, lastName, user, channel, interaction);
    }

    @Slash("grow-actor", { description: "角色成长一岁" })
    async growActor(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member as GuildMember;
        let channel = interaction.channel as TextChannel;
        await onGrowActor(actor, user, channel, interaction);
    }

    @Slash("collect-assets", { description: "就地采集资源" })
    async collectAssets(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member as GuildMember;
        let channel = interaction.channel as TextChannel;
        await onCollectAssets(actor, user, channel, interaction);
    }

    @Slash("travel-actor", { description: "角色步行到指定地点" })
    async travelActor(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        @SlashOption("zone", { description: "目标地点", required: true })
        zone: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member as GuildMember;
        let channel = interaction.channel as TextChannel;
        await onTravelActor(actor, zone, user, channel, interaction);
    }

    @Slash("finish-travel", { description: "角色完成旅行" })
    async finishTravel(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member as GuildMember;
        let channel = interaction.channel as TextChannel;
        await onFinishTravel(actor, user, channel, interaction);
    }

    @Slash("exchange-daoli", { description: "角色兑换资源获得道理" })
    async exchangeDaoli(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        @SlashOption("assect-id", { description: "资源ID", required: true })
        assetId: number,
        @SlashOption("assect-amount", { description: "资源数量", required: true })
        amount: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member as GuildMember;
        let channel = interaction.channel as TextChannel;
        await onExchangeDaoli(actor, assetId, amount, user, channel, interaction);
    }
}
