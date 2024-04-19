import {Command} from "../../components/command";
import {GuildMember, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Logs, Sanction} from "../../entities/logs";
import {Guild} from "../../entities/guild";
import lang from "../../lang/lang";

const UnMute: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.moderation.unmute["en-US"])
        .setNameLocalizations(lang.moderation.unmute)
        .setDescription(lang.moderation.unmute_description["en-US"])
        .setDescriptionLocalizations(lang.moderation.unmute_description)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addUserOption(option => option
            .setName(lang.user["en-US"])
            .setNameLocalizations(lang.user)
            .setDescription(lang.user_description["en-US"])
            .setDescriptionLocalizations(lang.user_description)
            .setRequired(true)),
    run: async (client, interaction) => {
        // @ts-ignore
        const user: GuildMember = interaction.options.getMember(lang.user['en-US']);
        if (!user) {
            await interaction.reply({content: 'An error has occurred', ephemeral: true});
            return;
        }
        const logsRepo = AppDataSource.getRepository(Logs);
        const guildRepo = AppDataSource.getRepository(Guild);
        const logs = new Logs();
        logs.guild = await guildRepo.findOneBy({id: interaction.guildId});
        logs.userId = user.id;
        logs.sanction = Sanction.UNMUTE;
        logs.reason = "Unmuted";
        await logsRepo.save(logs);
        await user.timeout(1);
        await interaction.reply({content: `Unmuted ${user.user.tag}`});
    }
}

export default UnMute;