import {Client} from "discord.js";
import * as fs from "node:fs";
import Loggers from "../utils/Loggers";

export interface Events {
    once: boolean;
    event: string;
    run: (client: any, ...args: any[]) => void;
}

export const handleEvents = async (client: Client) => {
    const events = fs.readdirSync("./src/05-events").filter((file) => file.endsWith(".ts") || file.endsWith('.js'));
    const eventLoad = [];
    for (const event of events) {
        try {
            const e = (await import (`../05-events/${event}`)).default;
            if (e.once) {
                client.once(e.event, (...args) => e.run(client, ...args));
                eventLoad.push({event: e.event, type: "once", status: '🟩'});
            } else {
                client.on(e.event, (...args) => e.run(client, ...args));
                eventLoad.push({event: e.event, type: "on", status: '🟩'});
            }
        } catch (error) {
            eventLoad.push({event, type: "error", status: '🟥'});
        }
    }
    Loggers.table("Event loaded:", eventLoad, ['event', 'type', 'status'])
};