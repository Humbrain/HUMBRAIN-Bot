import {SubCommand} from "../../subCommand";
import {CategoryChannel, ChannelType, SlashCommandSubcommandBuilder, VoiceChannel} from "discord.js";
import lang from "../../../lang/lang";
import {AppDataSource} from "../../../data-source";
import {Config} from "../../../entities/config";
import {Success} from "../../../utils/Embed";

export const PrivateRoomSettings: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName(lang.admin.settings.privatechannel.name["en-US"])
        .setNameLocalizations(lang.admin.settings.privatechannel.name)
        .setDescription(lang.admin.settings.privatechannel.description["en-US"])
        .setDescriptionLocalizations(lang.admin.settings.privatechannel.description)
        .addChannelOption(option => option
            .setName(lang.admin.settings.privatechannel.category.name["en-US"])
            .setNameLocalizations(lang.admin.settings.privatechannel.category.name)
            .setDescription(lang.admin.settings.privatechannel.category.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.privatechannel.category.description)
            .addChannelTypes(ChannelType.GuildCategory)
            .setRequired(true))
        .addChannelOption(option => option
            .setName(lang.admin.settings.privatechannel.channel.name["en-US"])
            .setNameLocalizations(lang.admin.settings.privatechannel.channel.name)
            .setDescription(lang.admin.settings.privatechannel.channel.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.privatechannel.channel.description)
            .addChannelTypes(ChannelType.GuildVoice)
            .setRequired(true)),
    run: async (client, interaction) => {
        const privateRoomCategory = interaction.options.get(lang.admin.settings.privatechannel.category.name["en-US"]).channel as CategoryChannel;
        const privateRoomVoice = interaction.options.get(lang.admin.settings.privatechannel.channel.name["en-US"]).channel as VoiceChannel;

        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
        if (!config) {
            await configRepo.insert({
                guildId: interaction.guildId,
                privateRoomCategoryId: privateRoomCategory.id,
                privateRoomVoiceId: privateRoomVoice.id
            });
        } else {
            await configRepo.update(config.id, {
                privateRoomCategoryId: privateRoomCategory.id,
                privateRoomVoiceId: privateRoomVoice.id
            });
        }
        const embed = Success("Les paramètres de salon privé ont été mis à jour");
        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}