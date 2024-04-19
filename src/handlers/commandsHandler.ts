import CustomClient from "../utils/CustomClient";
import * as fs from "node:fs";
import Loggers from "../utils/Loggers";

const handlerCommands = async (client: CustomClient) => {
    const commandsFolder = fs.readdirSync("./src/01-commands");
    const cmds = [];
    for (const folder of commandsFolder) {
        const commands = fs.readdirSync(`./src/01-commands/${folder}`);
        for (const command of commands) {
            try {
                const {default: commandFile} = (await import(`../01-commands/${folder}/${command}`));
                client.commands.set(commandFile.data.name, commandFile);
                cmds.push({name: commandFile.data.name, status: '🟩'});
            } catch (e) {
                cmds.push({name: command, status: '🟥'});
            }
        }
    }
    Loggers.table('commands', cmds, ['name', 'status'])
}

export default handlerCommands