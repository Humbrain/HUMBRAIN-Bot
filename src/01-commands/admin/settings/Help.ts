import {
    ActionRowBuilder,
    ButtonBuilder,
    ChannelType,
    GuildChannel,
    SlashCommandSubcommandBuilder,
    TextChannel
} from "discord.js";
import {SubCommand} from "../../../components/subCommand";
import lang from "../../../lang/lang";
import {AppDataSource} from "../../../data-source";
import {Config} from "../../../entities/config";
import {Success} from "../../../utils/Embed";

export const Help: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName('besoindaidesettings')
        .setDescription('Définir le salon d\'envoie de témoignage')
        .addChannelOption(option => option.setName('channel')
            .setDescription('Salon de témoignage')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)),
    cooldown: 10,
    run: async (client, interaction) => {
        const helpChannel = interaction.options.get(lang.admin.settings.presentation.channel.name["en-US"]).channel as GuildChannel;
        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
        if (!config) {
            await configRepo.insert({
                guildId: interaction.guildId,
                helpChannelId: helpChannel.id,
            });
        } else {
            await configRepo.update(config.id, {helpChannelId: helpChannel.id});
        }
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(client.buttons.get('helpBtn').data);
        const channel = interaction.guild.channels.cache.get(helpChannel.id) as TextChannel;
        await channel.send({components: [row]});
        const embed = Success("Les paramètres d'aide ont été mis à jour");
        await interaction.reply({embeds: [embed], ephemeral: true});
    }

}