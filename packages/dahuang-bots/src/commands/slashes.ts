import { CommandInteraction, GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { Discord, MetadataStorage, SlashOption, Slash } from "discordx";
import { addChannel } from "../logger";
import { onNewActor, onShowActorHistory, onShowActorInfo, onShowWorld, onStart } from "../handlers";

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
}
