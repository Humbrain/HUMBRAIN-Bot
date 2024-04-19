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

export const PresentationSetting: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName(lang.admin.settings.presentation.name["en-US"])
        .setNameLocalizations(lang.admin.settings.presentation.name)
        .setDescription(lang.admin.settings.presentation.description["en-US"])
        .setDescriptionLocalizations(lang.admin.settings.presentation.description)
        .addChannelOption(option => option.setName(lang.admin.settings.presentation.channel.name["en-US"])
            .setNameLocalizations(lang.admin.settings.presentation.channel.name)
            .setDescription(lang.admin.settings.presentation.channel.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.presentation.channel.description)
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)),
    cooldown: 10,
    run: async (client, interaction) => {
        const presentationChannel = interaction.options.get(lang.admin.settings.presentation.channel.name["en-US"]).channel as GuildChannel;
        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
        if (!config) {
            await configRepo.insert({
                guildId: interaction.guildId,
                presentationChannelId: presentationChannel.id,
            });
        } else {
            await configRepo.update(config.id, {presentationChannelId: presentationChannel.id});
        }
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(client.buttons.get('presentation').data);
        const channel = interaction.guild.channels.cache.get(presentationChannel.id) as TextChannel;
        await channel.send({components: [row]});
        const embed = Success("Les paramètres de présentation ont été mis à jour");
        await interaction.reply({embeds: [embed], ephemeral: true});
    }

}