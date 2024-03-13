import {Client, Events} from 'discord.js';
import {Event} from "./event";
import {AppDataSource} from "../data-source";
import {Guild} from "../entities/guild";


export const GuildCreate: Event = {
    once: false,
    event: Events.GuildCreate,
    run: async (client: Client, guild: any) => {
        const guildRepo = AppDataSource.getRepository(Guild);
        const getGuild = await guildRepo.findOneBy({id: guild.id});
        if (getGuild) return;
        const newGuild = new Guild();
        newGuild.id = guild.id;
        newGuild.name = guild.name;
        newGuild.icon = guild.iconURL();

        await guildRepo.save(newGuild);
    }
}