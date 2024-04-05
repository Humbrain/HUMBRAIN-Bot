import {Command} from "../command";
import {SlashCommandBuilder} from "discord.js";
import lang from "../../lang/lang";
import {AppDataSource} from "../../data-source";
import {Config} from "../../entities/config";

export const WelcomeSettings: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.admin.welcome_settings["en-US"])
        .setNameLocalizations(lang.admin.welcome_settings)
        .setDescription(lang.admin.welcome_settings_description["en-US"])
        .setDescriptionLocalizations(lang.admin.welcome_settings_description)
        .addChannelOption(option => option.setName(lang.admin.welcome_channel["en-US"])
            .setNameLocalizations(lang.admin.welcome_channel)
            .setDescription(lang.admin.welcome_channel_description["en-US"])
            .setDescriptionLocalizations(lang.admin.welcome_channel_description)
            .setRequired(true))
        .addStringOption(option => option.setName(lang.admin.welcome_message["en-US"])
            .setNameLocalizations(lang.admin.welcome_message)
            .setDescription(lang.admin.welcome_message_description["en-US"])
            .setDescriptionLocalizations(lang.admin.welcome_message_description)
            .setRequired(true)),
    run: async (client, interaction) => {
        //@ts-ignore
        const welcomeChannel = interaction.options.getChannel(lang.admin.welcome_channel["en-US"]);
        //@ts-ignore
        const welcomeMessage = interaction.options.getString(lang.admin.welcome_message["en-US"]);

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
        await interaction.reply({content: "success", ephemeral: true});
    }
}