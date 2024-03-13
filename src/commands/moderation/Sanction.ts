import {Command} from "../command";
import {Colors, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Logs, Sanction} from "../../entities/logs";

export const Sanctions: Command = {
    data: new SlashCommandBuilder().setName('sanctions').setDescription('Get list of sanctions')
        .addUserOption(option => option.setName('user').setDescription('The user to show list').setRequired(true)),
    run: async (client, interaction) => {
        // @ts-ignore
        const user = interaction.options.getUser('user');
        if (!user) {
            await interaction.reply({content: 'An error has occurred', ephemeral: true});
            return;
        }
        const logsRepo = AppDataSource.getRepository(Logs);
        const logs = await logsRepo.findBy({userId: user.id});
        const response = new EmbedBuilder();
        response.setColor(Colors.Red);
        response.setTitle(`Sanctions for ${user.username}`);
        response.setThumbnail("https://i.ibb.co/B6C8Ycc/hammer-crash-sharp-solid.png");
        let description = `Total sanctions: ${logs.length}`;
        logs.forEach((log: Logs) => {
            description += `\n${log.id} - ${log.sanction} - ${log.reason} - ${log.createdAt.toLocaleDateString()}`;
        });
        response.setDescription(description);

        await interaction.reply({embeds: [response]});

    }
}