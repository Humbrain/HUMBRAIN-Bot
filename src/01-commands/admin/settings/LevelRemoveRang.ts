import {Role, SlashCommandSubcommandBuilder} from "discord.js";
import {AppDataSource} from "../../../data-source";
import {Error, Success} from "../../../utils/Embed";
import {LevelsRanks} from "../../../entities/LevelsRanks";
import {SubCommand} from "../../../components/subCommand";

export const LevelRemoveRang: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName('removerank')
        .setDescription('Ajoute un rang a supprimer')
        .addRoleOption(option => option
            .setName('role')
            .setDescription('Supprimer par role')
            .setRequired(false))
        .addNumberOption(option => option
            .setName('level')
            .setDescription('Supprimer par level')
            .setRequired(false)
        ),
    run: async (client, interaction) => {
        const levelRankRepo = AppDataSource.getRepository(LevelsRanks);
        const role = interaction.options.get('role')?.role as Role | undefined;
        const level = interaction.options.get('level')?.value as number | undefined;
        if (!role && !level) {
            return await interaction.reply({
                embeds: [Error('Vous devez fournir un role ou un level')],
                ephemeral: true
            });
        }
        if (role && level) {
            return await interaction.reply({
                embeds: [Error('Vous ne pouvez pas fournir un role et un level')],
                ephemeral: true
            });
        }
        let LevelRank: LevelsRanks | undefined;
        if (role) {
            LevelRank = await levelRankRepo.findOneBy({guildId: interaction.guildId, roleId: role.id});
        } else {
            LevelRank = await levelRankRepo.findOneBy({guildId: interaction.guildId, level: level});
        }
        if (!LevelRank) {
            return await interaction.reply({embeds: [Error('Ce rang n\'existe pas')], ephemeral: true});
        }
        await levelRankRepo.remove(LevelRank);
        return await interaction.reply({embeds: [Success('Rang supprimé')], ephemeral: true});
    }
}