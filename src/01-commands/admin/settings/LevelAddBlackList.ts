import {SubCommand} from "../../../components/subCommand";
import {ChannelType, SlashCommandSubcommandBuilder, TextChannel} from "discord.js";
import {Levels} from "../../../entities/Levels";
import {AppDataSource} from "../../../data-source";
import {Error, Success} from "../../../utils/Embed";

export const LevelAddBlackList: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName('addblacklist')
        .setDescription('Ajoute un channel à la blacklist')
        .addChannelOption(option => option
            .setName('channel')
            .addChannelTypes(ChannelType.GuildText)
            .setDescription('Le channel à ajouter à la blacklist')
            .setRequired(true)),
    run: async (client, interaction) => {
        const levelRepo = AppDataSource.getRepository(Levels);
        const channel = interaction.options.get('channel').channel as TextChannel;
        const level = await levelRepo.findOneBy({guildId: interaction.guildId});
        if (!level) {
            const nL = new Levels();
            nL.guildId = interaction.guildId;
            nL.blacklistedChannels = [channel.id];
            await levelRepo.save(nL);
            const success = Success("Ce channel a été ajouter à la blacklist")
            return await interaction.reply({embeds: [success], ephemeral: true});
        } else {
            if (level.blacklistedChannels != null && level.blacklistedChannels.includes(channel.id)) {
                const error = Error("Ce channel est déjà dans la blacklist")
                return await interaction.reply({embeds: [error], ephemeral: true});
            } else {
                if (level.blacklistedChannels == null) level.blacklistedChannels = [];
                level.blacklistedChannels.push(channel.id);
                await levelRepo.save(level);
                const success = Success("Ce channel a été ajouter à la blacklist")
                return await interaction.reply({embeds: [success], ephemeral: true});
            }
        }
    }
}