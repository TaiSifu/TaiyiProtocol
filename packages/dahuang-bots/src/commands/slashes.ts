import { CommandInteraction, GuildMember, MessageEmbed, TextChannel, User } from "discord.js";
import { Discord, MetadataStorage, SlashOption, Slash } from "discordx";
import { addChannel } from "../logger";
import { 
    onCollectAssets, onExchangeDaoli, onFinishTravel, onGrowActor, onInfo, onListActors, onMakeTool, onNewActor, onShowActorAssets, 
    onShowActorHistory, onShowActorInfo, onShowActorItems, onShowWorld, onStart, onTravelActor, onWithdrawDaoli
 } from "../handlers";

@Discord()
export abstract class SlashYeMing {

    @Slash("show-world", { description: "显示大荒世界统计信息" })
    async showWorld(interaction: CommandInteraction): Promise<void> {

        //console.log(interaction.channelId);
        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        //console.log(user);
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        //channel.send("🏃开始播报大荒世界事件……");
        await onShowWorld(user, channel, interaction);
    }

    @Slash("show-actor-info", { description: "显示角色的信息" })
    async showActorInfo(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onShowActorInfo(actor, user, channel, interaction);
    }

    @Slash("show-actor-assets", { description: "显示角色的资源" })
    async showActorAssets(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onShowActorAssets(actor, user, channel, interaction);
    }

    @Slash("show-actor-items", { description: "显示角色的物品" })
    async showActorItems(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onShowActorItems(actor, user, channel, interaction);
    }

    @Slash("show-actor-history", { description: "显示角色的成长经历" })
    async showActorHistory(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onShowActorHistory(actor, user, channel, interaction);
    }

    @Slash("start", { description: "开始" })
    async start(
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onStart(user, channel, interaction);
    }

    @Slash("list-actors", { description: "列出拥有的角色" })
    async listActors(
        interaction: CommandInteraction
    ): Promise<void> {
        
        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onListActors(user, channel, interaction);
    }

    @Slash("info", { description: "显示账号信息" })
    async info(
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onInfo(user, channel, interaction);
    }

    @Slash("new-actor", { description: "创建新角色" })
    async newActor(
        @SlashOption("last-name", { description: "姓", required: true })
        lastName: string,
        @SlashOption("first-name", { description: "名", required: true })
        firstName: string,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onNewActor(firstName, lastName, user, channel, interaction);
    }

    @Slash("grow-actor", { description: "角色成长一岁" })
    async growActor(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onGrowActor(actor, user, channel, interaction);
    }

    @Slash("collect-assets", { description: "就地采集资源" })
    async collectAssets(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
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

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onTravelActor(actor, zone, user, channel, interaction);
    }

    @Slash("finish-travel", { description: "角色完成旅行" })
    async finishTravel(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
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

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onExchangeDaoli(actor, assetId, amount, user, channel, interaction);
    }

    @Slash("withdraw-daoli", { description: "从角色提取一定量的道理" })
    async withdrawDaoli(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        @SlashOption("amount", { description: "数量", required: true })
        amount: number,
        @SlashOption("to", { description: "提取到指定地址（默认为角色拥有者地址）", required: false })
        to: string,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onWithdrawDaoli(actor, amount, to, user, channel, interaction);
    }

    @Slash("make-tool", { description: "找村民制作简单工具" })
    async makeTool(
        @SlashOption("actor", { description: "角色ID", required: true })
        actor: number,
        @SlashOption("type", { description: "工具类型（8-13）", required: true })
        typeId: number,
        interaction: CommandInteraction
    ): Promise<void> {

        let user = interaction.member? interaction.member as GuildMember : interaction.user as User;
        let channel = interaction.channel? interaction.channel as TextChannel : interaction.user as User;
        await onMakeTool(actor, typeId, user, channel, interaction);
    }
}
