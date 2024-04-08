import {Command} from "../command";
import {GuildMember, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Guild} from "../../entities/guild";
import lang from "../../lang/lang";
import {LevelsUsers} from "../../entities/LevelsUsers";
import * as canvafy from "canvafy";
import Leveling from "../../utils/Leveling";
import * as console from "console";
import {Error} from "../../utils/Embed";

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
        let user = interaction.options.get(lang.user['en-US'])?.member as GuildMember | null;
        if (!user) user = interaction.member as GuildMember;
        const guild = await guildRepo.findOneBy({id: interaction.guildId});
        if (!guild) {
            const error = Error("La guild n'as pas été trouvé");
            return await interaction.reply({embeds: [error], ephemeral: true});
        }

        let userLevel = await LevelRepo.findOneBy({
            userId: user.id,
            guildId: guild.id
        });

        if (!userLevel) {
            const nU = new LevelsUsers();
            nU.userId = user.id;
            nU.guildId = guild.id;
            nU.level = 0;
            nU.xp = 0;
            userLevel = await LevelRepo.save(nU);
        }

        const rank = await new canvafy.Rank()
            .setAvatar(user.displayAvatarURL({forceStatic: true, extension: "png"}))
            .setBackground("color", "#bcddf6")
            .setUsername(user.user.username)
            .setBorder("#fff")
            .setBarColor("#fbc5dc")
            .setStatus('online')
            .setLevel(userLevel.level)
            .setRank(await Leveling.CalculateRank(user.id, guild.id))
            .setCurrentXp(userLevel.xp)
            .setRequiredXp(Leveling.getLevelNeed(userLevel))
            .build();

        return await interaction.reply({
            files: [{
                attachment: rank,
                name: `rank-${user.id}.png`
            }]
        });
    }
}


