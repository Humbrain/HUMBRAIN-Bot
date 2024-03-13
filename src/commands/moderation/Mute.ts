import {Command} from "../command";
import {GuildMember, SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Logs, Sanction} from "../../entities/logs";
import {Guild} from "../../entities/guild";
import lang from "../../lang";
import * as ms from "ms";
import * as console from "console";

export const Mute: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.moderation.mute["en-US"])
        .setNameLocalizations(lang.moderation.mute)
        .setDescription(lang.moderation.mute_description["en-US"])
        .setDescriptionLocalizations(lang.moderation.mute_description)
        .addUserOption(option => option
            .setName(lang.moderation.user["en-US"])
            .setNameLocalizations(lang.moderation.user)
            .setDescription(lang.moderation.user_description["en-US"])
            .setDescriptionLocalizations(lang.moderation.user_description)
            .setRequired(true))
        .addStringOption(option => option
            .setName(lang.moderation.duration['en-US'])
            .setNameLocalizations(lang.moderation.duration)
            .setDescription(lang.moderation.duration_description['en-US'])
            .setDescriptionLocalizations(lang.moderation.duration_description).setRequired(true))
        .addStringOption(option => option
            .setName(lang.moderation.reason["en-US"])
            .setNameLocalizations(lang.moderation.reason)
            .setDescription(lang.moderation.reason_description["en-US"])
            .setDescriptionLocalizations(lang.moderation.reason_description)),
    run: async (client, interaction) => {
        // @ts-ignore
        const member: GuildMember = interaction.options.getMember(lang.moderation.user['en-US']);
        // @ts-ignore
        const reason = interaction.options.getString(lang.moderation.reason['en-US']) || 'No reason provided';
        // @ts-ignore
        const duration = interaction.options.getString(lang.moderation.duration['en-US']);
        if (!member) {
            await interaction.reply({content: 'An error has occurred', ephemeral: true});
            return;
        }
        const logsRepo = AppDataSource.getRepository(Logs);
        const guildRepo = AppDataSource.getRepository(Guild);
        const logs = new Logs();
        logs.guild = await guildRepo.findOneBy({id: interaction.guildId});
        logs.userId = member.id;
        logs.reason = reason + ` (Duration: ${duration})`;
        logs.sanction = Sanction.MUTE;
        await logsRepo.save(logs);
        const _ms = ms(duration);
        await member.timeout(_ms, reason);
        await interaction.reply({content: `Muted ${member.user.tag} for ${reason}`});
    }
}