import {Colors, EmbedBuilder, Events, TextChannel} from "discord.js";
import {Event} from "./event";
import Loggers from "../utils/Loggers";
import CooldownLevelingMiddleware from "../middlewares/cooldownLevlingMiddleware";
import Leveling from "../utils/Leveling";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";

export const MessageDelete: Event = {
    once: false,
    event: Events.MessageDelete,
    run: async (client, message) => {
        if (message?.author === null) return;
        if (message.author.bot) return;
        if (!message.guild) return;
        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: message.guild.id}});
        if (!config) return;
        if (!config.messageLogChannelId) return;
        const channel = await client.channels.fetch(config.messageLogChannelId) as TextChannel;
        if (!channel) return;
        const embed = new EmbedBuilder()
            .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL()
            })
            .setTitle("Message supprimé")
            .setDescription(`L'utilisateur ${message.author} a supprimé le message ${message.content} dans le salon ${message.channel}`)
            .setColor(Colors.Red)
            .setTimestamp()

        await channel.send({embeds: [embed]});
    }
}