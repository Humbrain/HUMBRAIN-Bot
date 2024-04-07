import {AppDataSource} from './data-source';
import {GatewayIntentBits, Partials} from "discord.js";
import {handleEvents} from "./listeners/event";
import Loggers from "./utils/Loggers";
import CustomClient from "./utils/CustomClient";
import handlerCommands from "./handlers/commandsHandler";
import registerCommands from "./utils/RegisterCommands";
import handlerButton from "./handlers/buttonsHandler";
import handlerModals from "./handlers/modalsHandler";
import handlerContextMenu from "./handlers/contextMenusHandler";
import * as process from "process";

AppDataSource.initialize().then(async () => {
}).catch(error => Loggers.error(error));

Loggers.info("Bot is starting...");
process.on('unhandledRejection', (reason, promise) => {
    Loggers.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
});

process.on('uncaughtException', (error) => {
    Loggers.error(`Uncaught Exception: ${error}`);
});

process.on('uncaughtExceptionMonitor', (error, origin) => {
    Loggers.error(`Uncaught Exception Monitor: ${error} origin: ${origin}`);
});

process.on('warning', (warning) => {
    Loggers.warn(`Warning: ${warning}`);
});


const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.GuildScheduledEvent
    ],
});

handlerCommands(client)
handlerButton(client)
handlerModals(client)
handlerContextMenu(client)
registerCommands(client)
handleEvents(client);

client.login(process.env.DISCORD_TOKEN);
