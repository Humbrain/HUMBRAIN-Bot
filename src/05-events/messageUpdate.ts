import {Colors, EmbedBuilder, Events, TextChannel} from "discord.js";
import {Events as e} from "../handlers/eventHandler";
import Loggers from "../utils/Loggers";
import CooldownLevelingMiddleware from "../middlewares/cooldownLevlingMiddleware";
import Leveling from "../utils/Leveling";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";

const MessageUpdate: e = {
    once: false,
    event: Events.MessageUpdate,
    run: async (client, oldmessage, newMessage) => {
        if (newMessage.author.bot) return;
        if (!newMessage.guild) return;
        if (newMessage.content === oldmessage.content) return;
        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: newMessage.guild.id}});
        if (!config) return;
        if (!config.messageLogChannelId) return;
        const channel = await client.channels.fetch(config.messageLogChannelId) as TextChannel;
        if (!channel) return;
        const embed = new EmbedBuilder()
            .setAuthor({
                name: newMessage.author.tag,
                iconURL: newMessage.author.displayAvatarURL()
            })
            .setTitle("Message mis à jour")
            .setDescription(`L'utilisateur ${newMessage.author} a mis à jour un message\n Ancien message: \n${oldmessage.content}\n Nouveau message: \n${newMessage.content} \ndans le salon <#${newMessage.channel.id}>`)
            .setColor(Colors.Orange)
            .setTimestamp()

        await channel.send({embeds: [embed]});
    }
}

export default MessageUpdate;