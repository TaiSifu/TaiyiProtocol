import "reflect-metadata";
import { Intents, Interaction, Message, TextChannel } from "discord.js";
import { Client } from "discordx";
import { dirname, importx } from "@discordx/importer";
import { startLogger, addChannel } from "./logger";
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";

let startBlockNum: number;
let ethersHelper: HardhatEthersHelpers;

export function getEthersHelper() : HardhatEthersHelpers {
    return ethersHelper;
}

const client = new Client({
    simpleCommand: {
        prefix: "!",
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.MESSAGE_CONTENT,
    ],
    // If you only want to use guild commands, uncomment this line
    // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
    silent: true,
});

client.once("ready", async () => {
    // init all applicaiton commands
    await client.clearApplicationCommands();
    await client.initApplicationCommands({
        guild: { log: true },
        global: { log: true },
    });

    console.log("Bot started");
    let channel = client.channels.cache.find(channel => channel.id == '1057234751934705704') as TextChannel;
    addChannel(channel);
    channel.send("开始播报大荒事件.....");

    startLogger(startBlockNum, ethersHelper);
});

client.on("interactionCreate", (interaction: Interaction) => {
    client.executeInteraction(interaction);
});

client.on("messageCreate", (message: Message) => {
    client.executeCommand(message);
});

export async function run_bot(_startBlockNum: number, _ethersHelper: HardhatEthersHelpers) {
    startBlockNum = _startBlockNum;
    ethersHelper = _ethersHelper;

    // with cjs
    await importx(__dirname + "/{events,commands}/**/*.{ts,js}");
    // with ems
    //await importx(dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}");
    client.login(process.env.BOT_TOKEN ?? ""); // provide your bot token
}
