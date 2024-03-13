import {Event} from "./event";
import {Events} from "discord.js";
import {Commands} from "../commands";
import {Events as E} from "../listeners";
import * as console from "console";
import * as trace_events from "trace_events";
import {ContextMenus} from "../contextMenu";

export const Ready: Event = {
    once: true,
    event: Events.ClientReady,
    run: async (client) => {
        if (!client.user || !client.application) {
            return;
        }
        await client.application.commands.set(Commands.map(c => c.data));
        console.info("Slash commands registered");
        console.table(Commands.map(c => ({
            "name": c.data.name,
            "description": c.data.description
        })));

        await client.application.commands.set(ContextMenus.map(c => c.data));
        console.info("Context menus registered");
        console.table(ContextMenus.map(c => ({
            "name": c.data.name,
            "description": c.data.description
        })));

        console.info("Event listeners registered");
        console.table(E.map(e => ({
            "event": e.event,
            "once": e.once
        })));

        console.log(`${client.user.username} is online`);
    }
}