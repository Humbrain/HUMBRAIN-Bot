import {Events as e} from "../handlers/eventHandler";
import {Events} from "discord.js";
import Loggers from "../utils/Loggers";

const Ready: e = {
    once: true,
    event: Events.ClientReady,
    run: async (client) => {
        if (!client.user || !client.application) {
            return;
        }
        Loggers.sucess(`${client.user.username} is online`);
    }
}

export default Ready;