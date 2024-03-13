import {Command} from "../command";
import {Colors, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Logs, Sanction} from "../../entities/logs";
import lang from "../../lang";

export const Sanctions: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.moderation.sanction['en-US'])
        .setNameLocalizations(lang.moderation.sanction)
        .setDescription(lang.moderation.sanction_description['en-US'])
        .setDescriptionLocalizations(lang.moderation.sanction_description)
        .addUserOption(option => option
            .setName(lang.user['en-US'])
            .setNameLocalizations(lang.user)
            .setDescription(lang.user_description['en-US'])
            .setDescriptionLocalizations(lang.user_description)
            .setRequired(true)),
    run: async (client, interaction) => {
        // @ts-ignore
        const user = interaction.options.getUser(lang.user['en-US']);
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