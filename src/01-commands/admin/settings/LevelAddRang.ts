import {SubCommand} from "../../subCommand";
import {ChannelType, Role, SlashCommandSubcommandBuilder, TextChannel} from "discord.js";
import {Levels} from "../../../entities/Levels";
import {AppDataSource} from "../../../data-source";
import {Error, Success} from "../../../utils/Embed";
import {LevelsRanks} from "../../../entities/LevelsRanks";

export const LevelAddRang: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName('addrank')
        .setDescription('Ajoute un rang au serveur')
        .addRoleOption(option => option
            .setName('role')
            .setDescription('Le role à ajouter')
            .setRequired(true))
        .addNumberOption(option => option
            .setName('level')
            .setDescription('Le niveau requis pour ce role')
            .setRequired(true)
        ),
    run: async (client, interaction) => {
        const levelRankRepo = AppDataSource.getRepository(LevelsRanks);
        const role = interaction.options.get('role').role as Role;
        const level = interaction.options.get('level').value as number;
        const levelRank = await levelRankRepo.findOneBy({guildId: interaction.guildId, roleId: role.id});
        if (levelRank) {
            return await interaction.reply({embeds: [Error('Ce rang est déjà dans la liste des rangs')], ephemeral: true});
        }

        const newLevelRank = new LevelsRanks();
        newLevelRank.guildId = interaction.guildId;
        newLevelRank.roleId = role.id;
        newLevelRank.level = level;
        await levelRankRepo.save(newLevelRank);
        return await interaction.reply({embeds: [Success('Rang ajouté à la liste des rangs')], ephemeral: true});
    }
}