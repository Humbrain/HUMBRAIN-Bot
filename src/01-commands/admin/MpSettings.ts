import {Command} from "../command";
import {SlashCommandBuilder} from "discord.js";
import lang from "../../lang/lang";
import {AppDataSource} from "../../data-source";
import {Config} from "../../entities/config";

export const MpSettings: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.admin.mp_settings["en-US"])
        .setNameLocalizations(lang.admin.mp_settings)
        .setDescription(lang.admin.mp_settings_description["en-US"])
        .setDescriptionLocalizations(lang.admin.mp_settings_description)
        .addChannelOption(option => option.setName(lang.admin.mp_channel["en-US"])
            .setNameLocalizations(lang.admin.mp_channel)
            .setDescription(lang.admin.mp_channel_description["en-US"])
            .setDescriptionLocalizations(lang.admin.mp_channel_description)
            .setRequired(true))
        .addBooleanOption(option => option.setName(lang.admin.mp_age_system["en-US"])
            .setNameLocalizations(lang.admin.mp_age_system)
            .setDescription(lang.admin.mp_age_system_description["en-US"])
            .setDescriptionLocalizations(lang.admin.mp_age_system_description)
            .setRequired(false))
        .addRoleOption(option => option.setName(lang.admin.adult_role["en-US"])
            .setNameLocalizations(lang.admin.adult_role)
            .setDescription(lang.admin.adult_role_description["en-US"])
            .setDescriptionLocalizations(lang.admin.adult_role_description)
            .setRequired(false))
        .addRoleOption(option => option.setName(lang.admin.minor_role["en-US"])
            .setNameLocalizations(lang.admin.minor_role)
            .setDescription(lang.admin.minor_role_description["en-US"])
            .setDescriptionLocalizations(lang.admin.minor_role_description)
            .setRequired(false))
        .addRoleOption(option => option.setName(lang.admin.close_role["en-US"])
            .setNameLocalizations(lang.admin.close_role)
            .setDescription(lang.admin.close_role_description["en-US"])
            .setDescriptionLocalizations(lang.admin.close_role_description)
            .setRequired(false)),
    run: async (client, interaction) => {
        // @ts-ignore
        const mpChannel = interaction.options.getChannel(lang.admin.mp_channel["en-US"]);
        // @ts-ignore
        const ageSystem = interaction.options.getBoolean(lang.admin.mp_age_system["en-US"]);
        // @ts-ignore
        const adultRole = interaction.options.getRole(lang.admin.adult_role["en-US"]);
        // @ts-ignore
        const minorRole = interaction.options.getRole(lang.admin.minor_role["en-US"]);
        // @ts-ignore
        const closeRole = interaction.options.getRole(lang.admin.close_role["en-US"]);

        if (ageSystem && (!adultRole || !minorRole)) {
            await interaction.reply({content: "error vous devez renseigner les roles d'adulte et de mineur", ephemeral: true});
            return;
        }

        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
        if (!config) {
            await configRepo.insert({
                guildId: interaction.guildId,
                mpChannelId: mpChannel.id,
                mpSystemAge: ageSystem,
                majorRoleId: adultRole.id,
                minorRoleId: minorRole.id,
                closeRoleId: closeRole.id
            });
        } else {
            await configRepo.update({guildId: interaction.guildId}, {
                mpChannelId: mpChannel.id,
                mpSystemAge: ageSystem,
                majorRoleId: adultRole.id,
                minorRoleId: minorRole.id,
                closeRoleId: closeRole.id
            });
        }
        await interaction.reply({content: "success", ephemeral: true});
    }
}