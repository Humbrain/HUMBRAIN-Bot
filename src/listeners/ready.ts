import {Event} from "./event";
import {Events} from "discord.js";
import {Commands} from "../commands";
import {Events as E} from "../listeners";
import * as console from "console";

export const Ready: Event = {
    once: true,
    event: Events.ClientReady,
    run: async (client) => {
        if (!client.user || !client.application) {
            return;
        }
        await client.application.commands.set(Commands.map(c => c.data));
        console.log(`Registered ${Commands.length} commands`);
        console.log(`Registered ${E.length} events`);
        console.log(`${client.user.username} is online`);
    }
}