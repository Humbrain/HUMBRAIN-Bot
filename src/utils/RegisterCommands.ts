import CustomClient from "./CustomClient";
import {REST, Routes} from "discord.js";
import Loggers from "./Loggers";
import * as process from "process";

const registerCommands = async (client: CustomClient) => {
    Loggers.info("Registering commands...");
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    try {
        const cmd = client.commands.map(command => command.data.toJSON());
        const context = client.contextMenu.map(contextMenu => contextMenu.data.toJSON());
        const dataJson = [...cmd, ...context];
        Loggers.info(`Started refreshing ${client.commands.size} application (/) commands.`);
        const data = await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
            {
                body: dataJson
            },
        ) as any[];
        Loggers.sucess(`Successfully reloaded application (/) commands. ${data.length} commands were loaded.`);
    } catch (error) {
        Loggers.error(error);
    }
}

export default registerCommands