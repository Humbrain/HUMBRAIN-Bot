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

AppDataSource.initialize().then(async () => {
}).catch(error => Loggers.error(error));

Loggers.info("Bot is starting...");

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
