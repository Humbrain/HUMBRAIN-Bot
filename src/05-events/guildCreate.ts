import {Client, Events} from 'discord.js';
import {Events as e} from "../handlers/eventHandler";
import {AppDataSource} from "../data-source";
import {Guild} from "../entities/guild";


const GuildCreate: e = {
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

export default GuildCreate;