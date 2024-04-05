import {Event} from "./event";
import {Events} from "discord.js";
import Loggers from "../utils/Loggers";

export const Ready: Event = {
    once: true,
    event: Events.ClientReady,
    run: async (client) => {
        if (!client.user || !client.application) {
            return;
        }
        Loggers.sucess(`${client.user.username} is online`);
    }
}