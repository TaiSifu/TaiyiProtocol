import { CommandInteraction, GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";
import { addChannel } from "../logger";

@Discord()
export abstract class SlashYeMing {
  // example: pagination for all slash command
  @Slash("report", { description: "在本频道播报大荒事件" })
  async report(interaction: CommandInteraction): Promise<void> {

    //console.log(interaction.channelId);
    let user = interaction.member as GuildMember;
    //console.log(user);
    let channel = interaction.channel as TextChannel;
    if(channel.guild.ownerId == user.id) {
      interaction.reply(`收到${interaction.member}的指令！`);
      channel.send("🏃开始播报大荒世界事件……");
      addChannel(channel);
    }
    else {
      interaction.reply(`对不起，${interaction.member}，您无权命令我做这件事！`);
    }
  }
}
