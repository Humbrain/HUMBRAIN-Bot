import {SubCommand} from "../../subCommand";
import lang from "../../../lang/lang";
import {ChannelType, SlashCommandSubcommandBuilder, TextChannel} from "discord.js";
import {AppDataSource} from "../../../data-source";
import {Config} from "../../../entities/config";
import {Success} from "../../../utils/Embed";

export const WelcomSettings: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName(lang.admin.settings.welcome.name["en-US"])
        .setNameLocalizations(lang.admin.settings.welcome.name)
        .setDescription(lang.admin.settings.welcome.description["en-US"])
        .setDescriptionLocalizations(lang.admin.settings.welcome.description)
        .addChannelOption(option => option.setName(lang.admin.settings.welcome.channel.name["en-US"])
            .setNameLocalizations(lang.admin.settings.welcome.channel.name)
            .setDescription(lang.admin.settings.welcome.channel.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.welcome.channel.description)
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true))
        .addStringOption(option => option.setName(lang.admin.settings.welcome.message.name["en-US"])
            .setNameLocalizations(lang.admin.settings.welcome.message.name)
            .setDescription(lang.admin.settings.welcome.message.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.welcome.message.description)
            .setRequired(true)),
    run: async (client, interaction) => {
        const welcomeChannel = interaction.options.get(lang.admin.settings.welcome.channel.name["en-US"]).channel as TextChannel
        const welcomeMessage = interaction.options.get(lang.admin.settings.welcome.message.name["en-US"]).value as string;

        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
        if (!config) {
            await configRepo.insert({
                guildId: interaction.guildId,
                welcomeChannelId: welcomeChannel.id,
                welcomeMessage
            });
        } else {
            await configRepo.update(config.id, {welcomeChannelId: welcomeChannel.id, welcomeMessage});
        }
        const embed = Success("Les paramètres de présentation ont été mis à jour");
        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}