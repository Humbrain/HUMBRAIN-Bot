import {Command} from "../command";
import {PermissionFlagsBits, SlashCommandBuilder, User} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Logs, Sanction} from "../../entities/logs";
import {Guild} from "../../entities/guild";
import lang from "../../lang/lang";

export const UnBan: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.moderation.unban['en-US'])
        .setNameLocalizations(lang.moderation.unban)
        .setDescription(lang.moderation.unban_description['en-US'])
        .setDescriptionLocalizations(lang.moderation.unban_description)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option
            .setName(lang.user['en-US'])
            .setNameLocalizations(lang.user)
            .setDescription(lang.user_description['en-US'])
            .setDescriptionLocalizations(lang.user_description)
            .setRequired(true)),
    run: async (client, interaction) => {
        // @ts-ignore
        const user: User = interaction.options.getUser(lang.user['en-US']);

        if (!user) {
            await interaction.reply({content: 'An error has occurred', ephemeral: true});
            return;
        }

        const logsRepo = AppDataSource.getRepository(Logs);
        const guildRepo = AppDataSource.getRepository(Guild);
        const logs = new Logs();
        logs.guild = await guildRepo.findOneBy({id: interaction.guildId});
        logs.userId = user.id;
        logs.reason = "Unban";
        logs.sanction = Sanction.BAN;
        logsRepo.save(logs);

        await interaction.guild.members.unban(user);
        await interaction.reply({content: `Unbanned ${user.tag}`});
    }
}
