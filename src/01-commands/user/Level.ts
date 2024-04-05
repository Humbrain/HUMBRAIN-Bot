import {Command} from "../command";
import {GuildMember, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Guild} from "../../entities/guild";
import lang from "../../lang/lang";
import {LevelsUsers} from "../../entities/LevelsUsers";
import * as canvafy from "canvafy";
import Leveling from "../../utils/Leveling";
import * as console from "console";

export const Level: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.level['en-US'])
        .setNameLocalizations(lang.level)
        .setDescription(lang.level_description['en-US'])
        .setDescriptionLocalizations(lang.level_description)
        .addUserOption(option => option
            .setName(lang.user['en-US'])
            .setNameLocalizations(lang.user)
            .setDescription(lang.user_description['en-US'])
            .setDescriptionLocalizations(lang.user_description)
            .setRequired(false)),
    cooldown: 5,
    run: async (client, interaction) => {
        const guildRepo = AppDataSource.getRepository(Guild);
        const LevelRepo = AppDataSource.getRepository(LevelsUsers);
        // @ts-ignore
        let user = interaction.options.getMember(lang.user['en-US']);
        const member: GuildMember = user || interaction.member;
        const guild = await guildRepo.findOneBy({id: interaction.guildId});
        if (!guild) return;

        const userLevel = await LevelRepo.findOneBy({
            userId: member.id,
            guildId: guild.id
        });
        if (!userLevel) return;

        const rank = await new canvafy.Rank()
            .setAvatar(member.user.displayAvatarURL({forceStatic: true, extension: "png"}))
            .setBackground("color", "#bcddf6")
            .setUsername(member.user.globalName || member.user.username)
            .setBorder("#fff")
            .setBarColor("#fbc5dc")
            .setStatus(member.presence?.status)
            .setLevel(userLevel.level)
            .setRank(await Leveling.CalculateRank(member.id, guild.id))
            .setCurrentXp(userLevel.xp)
            .setRequiredXp(Leveling.getLevelNeed(userLevel))
            .build();

        return await interaction.reply({
            files: [{
                attachment: rank,
                name: `rank-${member.id}.png`
            }]
        });
    }
}


