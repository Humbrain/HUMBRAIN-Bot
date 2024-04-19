import {Events, EmbedBuilder, ActionRowBuilder} from 'discord.js';
import {Events as e} from "../handlers/eventHandler";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";
import CustomClient from "../utils/CustomClient";


const GuildMemberAdd: e = {
    once: false,
    event: Events.GuildMemberAdd,
    run: async (client: CustomClient, member: any) => {
        const configRepo = AppDataSource.getRepository(Config)
        const config = await configRepo.findOne({where: {guildId: member.guild.id}})
        if (!config) return;
        if (!config.welcomeChannelId) return;
        const channel = member.guild.channels.cache.get(config.welcomeChannelId)
        if (!channel) return;
        const embed = new EmbedBuilder()
            .setTitle('Bienvenue ' + member.user.username + ' sur ' + member.guild.name + ' !')
            .setDescription(config.welcomeMessage)
            .setColor("#bcddf6")
            .setThumbnail(member.user.displayAvatarURL({format: "png"}))
        const text = `||<@${member.id}>||`
        const welcomeBtn = client.buttons.get('welcomeBtn')
        const presentationBtn = client.buttons.get('presentation')
        const row = new ActionRowBuilder()
        if (welcomeBtn) row.addComponents(welcomeBtn.data)
        if (presentationBtn && config.presentationChannelId != null) row.addComponents(presentationBtn.data)
        channel.send({content: text, embeds: [embed.data], components: [row]})

    }
}

export default GuildMemberAdd;