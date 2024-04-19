import {SubCommand} from "../../../components/subCommand";

import {SlashCommandSubcommandBuilder, TextChannel} from "discord.js";
import lang from "../../../lang/lang";
import {AppDataSource} from "../../../data-source";
import {Config} from "../../../entities/config";
import {Success} from "../../../utils/Embed";

export const MessageSettings: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName(lang.admin.settings.message.name["en-US"])
        .setNameLocalizations(lang.admin.settings.message.name)
        .setDescription(lang.admin.settings.message.description["en-US"])
        .setDescriptionLocalizations(lang.admin.settings.message.description)
        .addChannelOption(option =>
            option.setName(lang.admin.settings.message.channel.name["en-US"])
                .setNameLocalizations(lang.admin.settings.message.channel.name)
                .setDescription(lang.admin.settings.message.channel.description["en-US"])
                .setDescriptionLocalizations(lang.admin.settings.message.channel.description)
                .setRequired(true))
    ,
    run: async (client, interaction) => {
        const channelId = interaction.options.get(lang.admin.settings.message.channel.name['en-US']).channel as TextChannel;
        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
        if (!config) {
            await configRepo.insert({
                guildId: interaction.guildId,
                messageLogChannelId: channelId.id,
            });
        } else {
            config.messageLogChannelId = channelId.id;
            await configRepo.save(config);
        }
        await interaction.reply({embeds: [Success('Les paramètres ont été mis à jour')], ephemeral: true});
    }
}