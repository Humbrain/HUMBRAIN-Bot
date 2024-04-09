import {SubCommand} from "../../subCommand";
import {ChannelType, SlashCommandSubcommandBuilder, TextChannel} from "discord.js";
import {Levels} from "../../../entities/Levels";
import {AppDataSource} from "../../../data-source";
import {Error, Success} from "../../../utils/Embed";

export const LevelChannel: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName('setchannel')
        .setDescription('Configure le channel des niveaux')
        .addChannelOption(option => option
            .setName('channel')
            .addChannelTypes(ChannelType.GuildText)
            .setDescription('Le channel des niveaux')
            .setRequired(true)),
    run: async (client, interaction) => {
        const LevelRepo = AppDataSource.getRepository(Levels);
        const Level = await LevelRepo.findOneBy({guildId: interaction.guildId});
        const Channel = interaction.options.get('channel').channel as TextChannel;
        if (!Level) {
            const NewLevel = new Levels();
            NewLevel.guildId = interaction.guildId;
            NewLevel.channelId = Channel.id;
            NewLevel.isActivated = true;
            await LevelRepo.save(NewLevel);
            return await interaction.reply({embeds: [Success('Channel des niveaux configuré')], ephemeral: true});
        }
        Level.channelId = Channel.id;
        await LevelRepo.save(Level);
        return await interaction.reply({embeds: [Success('Channel des niveaux configuré')], ephemeral: true});
    }
}