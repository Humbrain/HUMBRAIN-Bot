import {Command} from "../command";
import {SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Logs, Sanction} from "../../entities/logs";
import {Guild} from "../../entities/guild";

export const Warn: Command = {
    data: new SlashCommandBuilder().setName('warn').setDescription('Warn a user')
        .addUserOption(option => option.setName('user').setDescription('The user to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the warning')),
    run: async (client, interaction) => {
        // @ts-ignore
        const user = interaction.options.getUser('user');
        // @ts-ignore
        const reason = interaction.options.getString('reason');
        if (!user) {
            await interaction.reply({content: 'An error has occurred', ephemeral: true});
            return;
        }
        const logsRepo = AppDataSource.getRepository(Logs);
        const guildRepo = AppDataSource.getRepository(Guild);
        const logs = new Logs();
        logs.guild = await guildRepo.findOneBy({id: interaction.guildId});
        logs.userId = user.id;
        logs.reason = reason;
        logs.sanction = Sanction.WARN;

        await logsRepo.save(logs);
        await interaction.reply({content: `Warned ${user.tag} for ${reason}`});
    }
}