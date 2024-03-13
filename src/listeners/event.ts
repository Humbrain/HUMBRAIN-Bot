import {Client, CommandInteraction} from "discord.js";
import {Events} from "./index";

export interface Event {
    once: boolean;
    event: string;
    run: (client: any, ...args: any[]) => void;
}

export const handleEvents = async (client: Client): Promise<void> => {
    const events = Events
    for (const event of events) {
        if (event.once) {
            client.once(event.event, (...args) => event.run(client, ...args));
            continue;
        }
        client.on(event.event, (...args) => event.run(client, ...args));
    }
};