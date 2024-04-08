import {SubCommand} from "../../subCommand";
import lang from "../../../lang/lang";
import {ChannelType, GuildChannel, Role, SlashCommandSubcommandBuilder, TextChannel} from "discord.js";
import {Error, Success} from "../../../utils/Embed";
import {AppDataSource} from "../../../data-source";
import {Config} from "../../../entities/config";

export const PrivateMessageSettings: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName(lang.admin.settings.privatemessage.name["en-US"])
        .setNameLocalizations(lang.admin.settings.privatemessage.name)
        .setDescription(lang.admin.settings.privatemessage.description["en-US"])
        .setDescriptionLocalizations(lang.admin.settings.privatemessage.description)
        .addChannelOption(option => option.setName(lang.admin.settings.privatemessage.channel.name["en-US"])
            .setNameLocalizations(lang.admin.settings.privatemessage.channel.name)
            .setDescription(lang.admin.settings.privatemessage.channel.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.privatemessage.channel.description)
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true))
        .addBooleanOption(option => option.setName(lang.admin.settings.privatemessage.age_system.name["en-US"])
            .setNameLocalizations(lang.admin.settings.privatemessage.age_system.name)
            .setDescription(lang.admin.settings.privatemessage.age_system.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.privatemessage.age_system.description)
            .setRequired(false))
        .addRoleOption(option => option.setName(lang.admin.settings.privatemessage.adult_role.name["en-US"])
            .setNameLocalizations(lang.admin.settings.privatemessage.adult_role.name)
            .setDescription(lang.admin.settings.privatemessage.adult_role.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.privatemessage.adult_role.description)
            .setRequired(false))
        .addRoleOption(option => option.setName(lang.admin.settings.privatemessage.minor_role.name["en-US"])
            .setNameLocalizations(lang.admin.settings.privatemessage.minor_role.name)
            .setDescription(lang.admin.settings.privatemessage.minor_role.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.privatemessage.minor_role.description)
            .setRequired(false))
        .addRoleOption(option => option.setName(lang.admin.settings.privatemessage.close_role.name["en-US"])
            .setNameLocalizations(lang.admin.settings.privatemessage.close_role.name)
            .setDescription(lang.admin.settings.privatemessage.close_role.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.privatemessage.close_role.description)
            .setRequired(false)),
    run: async (client, interaction) => {
        const mpChannel = interaction.options.get(lang.admin.settings.privatemessage.channel.name["en-US"]).channel as TextChannel;
        const ageSystem = interaction.options.get(lang.admin.settings.privatemessage.age_system.name["en-US"]).value as boolean;
        const adultRole = interaction.options.get(lang.admin.settings.privatemessage.adult_role.name["en-US"]).role as Role;
        const minorRole = interaction.options.get(lang.admin.settings.privatemessage.minor_role.name["en-US"]).role as Role
        const closeRole = interaction.options.get(lang.admin.settings.privatemessage.close_role.name["en-US"]).role as Role;

        if (ageSystem && (!adultRole || !minorRole)) {
            const embed = Error("Vous devez spécifier les rôles majeur et mineur");
            await interaction.reply({embeds: [embed], ephemeral: true});
            return;
        }

        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
        if (!config) {
            await configRepo.save({
                guildId: interaction.guildId,
                mpChannelId: mpChannel.id,
                mpSystemAge: ageSystem,
                majorRoleId: adultRole?.id || null,
                minorRoleId: minorRole?.id || null,
                closeRoleId: closeRole?.id || null
            });
        } else {
            config.mpSystemAge = ageSystem || false;
            config.mpChannelId = mpChannel.id;
            config.majorRoleId = adultRole?.id || null;
            config.minorRoleId = minorRole?.id || null;
            config.closeRoleId = closeRole?.id || null;
            await configRepo.save(config);
        }
        const embed = Success("Les paramètres de présentation ont été mis à jour");
        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}