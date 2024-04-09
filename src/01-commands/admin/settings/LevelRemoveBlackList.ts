import {SubCommand} from "../../subCommand";
import {ChannelType, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, TextChannel} from "discord.js";
import {Levels} from "../../../entities/Levels";
import {AppDataSource} from "../../../data-source";
import {SubGroupCommand} from "../../subGroupCommand";
import {Error, Success} from "../../../utils/Embed";

export const LevelRemoveBlackList: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName('removeblacklist')
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
            const error = Error("Ce channel n'est pas dans la blacklist")
            return await interaction.reply({embeds: [error], ephemeral: true});
        }
        if (level.blacklistedChannels != null && level.blacklistedChannels.includes(channel.id)) {
            level.blacklistedChannels.splice(level.blacklistedChannels.indexOf(channel.id), 1);
            await levelRepo.save(level);
            const success = Success("Ce channel n'est plus dans la blacklist")
            return await interaction.reply({embeds: [success], ephemeral: true});
        }
        const error = Error("Ce channel n'est pas dans la blacklist")
        return await interaction.reply({embeds: [error], ephemeral: true});
    }
}