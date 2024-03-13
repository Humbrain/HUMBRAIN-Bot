import {Command} from "../command";
import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Logs, Sanction} from "../../entities/logs";
import {Guild} from "../../entities/guild";
import lang from "../../lang";

export const Ban: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.moderation.ban['en-US'])
        .setNameLocalizations(lang.moderation.ban)
        .setDescription(lang.moderation.ban_description['en-US'])
        .setDescriptionLocalizations(lang.moderation.ban_description)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option
            .setName(lang.user['en-US'])
            .setNameLocalizations(lang.user)
            .setDescription(lang.user_description['en-US'])
            .setDescriptionLocalizations(lang.user_description)
            .setRequired(true))
        .addStringOption(option => option
            .setName(lang.reason['en-US'])
            .setNameLocalizations(lang.reason)
            .setDescription(lang.reason_description['en-US'])
            .setDescriptionLocalizations(lang.reason_description)
            .setRequired(true)),
    run: async (client, interaction) => {
        // @ts-ignore
        const user = interaction.options.getMember(lang.user['en-US']);
        // @ts-ignore
        const reason = interaction.options.getString(lang.reason['en-US']);

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
        logs.sanction = Sanction.BAN;
        logsRepo.save(logs);

        await user.ban({reason: reason});
        await interaction.reply({content: `Banned ${user.tag} for ${reason}`});
    }
}
