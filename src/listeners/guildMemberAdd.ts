import {CommandInteraction, Client, Interaction, Events} from 'discord.js';
import {Commands} from '../commands';
import {Event} from "./event";


export const GuildMemberAdd: Event = {
    once: false,
    event: Events.GuildMemberAdd,
    run: async (client: Client, member: any) => {
        console.log(`Welcome to the server, ${member}`);
    }
}