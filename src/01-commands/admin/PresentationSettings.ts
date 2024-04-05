import {Command} from "../command";
import {SlashCommandBuilder} from "discord.js";
import lang from "../../lang/lang";
import {AppDataSource} from "../../data-source";
import {Config} from "../../entities/config";

export const PresentationSettings: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.admin.presentation_settings["en-US"])
        .setNameLocalizations(lang.admin.presentation_settings)
        .setDescription(lang.admin.presentation_settings_description["en-US"])
        .setDescriptionLocalizations(lang.admin.presentation_settings_description)
        .addChannelOption(option => option.setName(lang.admin.presentation_channel["en-US"])
            .setNameLocalizations(lang.admin.presentation_channel)
            .setDescription(lang.admin.presentation_channel_description["en-US"])
            .setDescriptionLocalizations(lang.admin.presentation_channel_description)
            .setRequired(true)),
    run: async (client, interaction) => {
        //@ts-ignore
        const welcomeChannel = interaction.options.getChannel(lang.admin.presentation_channel["en-US"]);

        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
        if (!config) {
            await configRepo.insert({
                guildId: interaction.guildId,
                presentationChannelId: welcomeChannel.id,
            });
        } else {
            await configRepo.update(config.id, {presentationChannelId: welcomeChannel.id});
        }
        await interaction.reply({content: "success", ephemeral: true});
    }
}