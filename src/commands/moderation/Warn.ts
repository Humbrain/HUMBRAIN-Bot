import {Command} from "../command";
import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Logs, Sanction} from "../../entities/logs";
import {Guild} from "../../entities/guild";
import lang from "../../lang";

export const Warn: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.moderation.warn["en-US"])
        .setNameLocalizations(lang.moderation.warn)
        .setDescription(lang.moderation.warn_description["en-US"])
        .setDescriptionLocalizations(lang.moderation.warn_description)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addUserOption(option => option.setName(lang.user["en-US"])
            .setNameLocalizations(lang.user)
            .setDescription(lang.user_description["en-US"])
            .setDescriptionLocalizations(lang.user_description)
            .setRequired(true))
        .addStringOption(option => option.setName(lang.reason["en-US"])
            .setNameLocalizations(lang.reason)
            .setDescription(lang.reason_description["en-US"])
            .setDescriptionLocalizations(lang.reason_description)),
    run: async (client, interaction) => {
        // @ts-ignore
        const user = interaction.options.getUser(lang.user['en-US']);
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
        logs.sanction = Sanction.WARN;

        await logsRepo.save(logs);
        await interaction.reply({content: `Warned ${user.tag} for ${reason}`});
    }
}