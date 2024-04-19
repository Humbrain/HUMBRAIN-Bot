import {Colors, EmbedBuilder, Events, TextChannel} from "discord.js";
import {Events as e} from "../handlers/eventHandler";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";

const MessageDelete: e = {
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
            .setDescription(`Le message de ${message.author} a été supprimé \n Contené:\n${message.content}\n dans le salon ${message.channel}`)
            .setColor(Colors.Red)
            .setTimestamp()

        await channel.send({embeds: [embed]});
    }
}

export default MessageDelete;