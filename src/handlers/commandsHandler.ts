import CustomClient from "../utils/CustomClient";
import {Command} from "../01-commands/command";
import {Commands} from "../01-commands";

const handlerCommands = (client: CustomClient) => {
    const commands = Commands;
    for (const command of commands) {
        client.commands.set(command.data.name, command);
    }
}

export default handlerCommands