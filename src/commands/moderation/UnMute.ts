import {Command} from "../command";
import {GuildMember, SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Logs, Sanction} from "../../entities/logs";
import {Guild} from "../../entities/guild";
import lang from "../../lang";

export const UnMute: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.moderation.unmute["en-US"])
        .setNameLocalizations(lang.moderation.unmute)
        .setDescription(lang.moderation.unmute_description["en-US"])
        .setDescriptionLocalizations(lang.moderation.unmute_description)
        .addUserOption(option => option
            .setName(lang.moderation.user["en-US"])
            .setNameLocalizations(lang.moderation.user)
            .setDescription(lang.moderation.user_description["en-US"])
            .setDescriptionLocalizations(lang.moderation.user_description)
            .setRequired(true)),
    run: async (client, interaction) => {
        // @ts-ignore
        const user: GuildMember = interaction.options.getMember(lang.moderation.user['en-US']);
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