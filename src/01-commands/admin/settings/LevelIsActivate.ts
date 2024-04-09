import {SubCommand} from "../../subCommand";
import {ChannelType, SlashCommandSubcommandBuilder, TextChannel} from "discord.js";
import {Levels} from "../../../entities/Levels";
import {AppDataSource} from "../../../data-source";
import {Error, Success} from "../../../utils/Embed";

export const LevelIsActivate: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName('activate')
        .setDescription('Active ou désactive les niveaux')
        .addBooleanOption(option => option
            .setName('activate')
            .setDescription('Active ou désactive les niveaux')
            .setRequired(true)
        ),
    run: async (client, interaction) => {
        const LevelRepo = AppDataSource.getRepository(Levels);
        const Level = await LevelRepo.findOneBy({guildId: interaction.guildId});
        const IsActivate = interaction.options.get('activate').value as boolean;
        if (!Level) {
            const NewLevel = new Levels();
            NewLevel.guildId = interaction.guildId;
            NewLevel.isActivated = IsActivate;
            await LevelRepo.save(NewLevel);
            return await interaction.reply({
                embeds: [Success(`Les niveaux on été ${(IsActivate) ? 'activé' : 'désactivé'}`)],
                ephemeral: true
            });
        }
        Level.isActivated = IsActivate;
        await LevelRepo.save(Level);
        return await interaction.reply({
            embeds: [Success(`Les niveaux on été ${(IsActivate) ? 'activé' : 'désactivé'}`)],
            ephemeral: true
        });
    }
}