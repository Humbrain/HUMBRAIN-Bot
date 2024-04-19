import {Command} from "../../components/command";
import {EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Logs, Sanction} from "../../entities/logs";
import {Guild} from "../../entities/guild";
import lang from "../../lang/lang";
import {Error} from "../../utils/Embed";
import Loggers from "../../utils/Loggers";

const Ban: Command = {
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
            const error = Error("Une erreur c'est produite");
            await interaction.reply({embeds: [error], ephemeral: true});
            return;
        }

        const logsRepo = AppDataSource.getRepository(Logs);
        const guildRepo = AppDataSource.getRepository(Guild);

        try {
            await interaction.guild.bans.create(user, {reason: reason})
            //await user.ban({reason: reason});
            const logs = new Logs();
            logs.guild = await guildRepo.findOneBy({id: interaction.guildId});
            logs.userId = user.id;
            logs.reason = reason;
            logs.sanction = Sanction.BAN;
            logsRepo.save(logs);
            const embed = Error(`L'utilisateur ${user} a été banni pour la raison suivante:\n \`${reason}\``);
            await interaction.reply({embeds: [embed], ephemeral: true});
        } catch (e) {
            Loggers.error(e);
            const error = Error("Une erreur c'est produite");
            await interaction.reply({embeds: [error], ephemeral: true});
            return;
        }
    }
}

export default Ban;