import {SubCommand} from "../../../components/subCommand";
import {Role, SlashCommandSubcommandBuilder} from "discord.js";
import {AppDataSource} from "../../../data-source";
import {Error, Success} from "../../../utils/Embed";
import {LevelsRanks} from "../../../entities/LevelsRanks";

export const LevelEditRang: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName('editrank')
        .setDescription('Modifier un rang au serveur')
        .addRoleOption(option => option
            .setName('role')
            .setDescription('Le role à modifier')
            .setRequired(true))
        .addNumberOption(option => option
            .setName('level')
            .setDescription('Le niveau a modifier')
            .setRequired(true)
        ),
    run: async (client, interaction) => {
        const levelRankRepo = AppDataSource.getRepository(LevelsRanks);
        const role = interaction.options.get('role').role as Role;
        const level = interaction.options.get('level').value as number;
        let levelRank = await levelRankRepo.findOneBy({guildId: interaction.guildId, roleId: role.id});
        if (!levelRank) {
            levelRank = await levelRankRepo.findOneBy({guildId: interaction.guildId, level: level});
            if (!levelRank) {
                return await interaction.reply({embeds: [Error('Ce rang n\'existe pas')], ephemeral: true});
            }
        }
        levelRank.roleId = role.id;
        levelRank.level = level;
        await levelRankRepo.save(levelRank);
        return await interaction.reply({embeds: [Success('Rang modifié')], ephemeral: true});
    }
}