import {Command} from "../../components/command";
import {SlashCommandBuilder} from "discord.js";
import {AppDataSource} from "../../data-source";
import {Guild} from "../../entities/guild";
import lang from "../../lang/lang";
import {LevelsUsers} from "../../entities/LevelsUsers";
import * as canvafy from "canvafy";

const Rank: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.rank['en-US'])
        .setNameLocalizations(lang.rank)
        .setDescription(lang.rank_description['en-US'])
        .setDescriptionLocalizations(lang.rank_description),
    cooldown: 5,
    run: async (client, interaction) => {
        const guildRepo = AppDataSource.getRepository(Guild);
        const guild = await guildRepo.findOneBy({id: interaction.guildId});
        if (!guild) return;

        const LevelRepo = AppDataSource.getRepository(LevelsUsers);
        const usersLevel = await LevelRepo.find({where: {guildId: guild.id}, order: {level: "DESC"}, take: 10});
        const users = await Promise.all(usersLevel.map(async (user) => {
            return {
                avatar: client.users.cache.get(user.userId)?.displayAvatarURL({forceStatic: true, extension: "png"}),
                tag: client.users.cache.get(user.userId)?.globalName || client.users.cache.get(user.userId)?.username,
                score: user.level,
                top: usersLevel.indexOf(user) + 1
            }
        }));

        const top = await new canvafy.Top()
            .setOpacity(0.6)
            .setScoreMessage("Level:") //(Preferred Option)
            .setabbreviateNumber(false) //(Preferred Option)
            .setBackground("color", "#bcddf6") //(Preferred Option)
            .setColors({
                box: '#212121',
                username: '#ffffff',
                score: '#ffffff',
                firstRank: '#f7c716',
                secondRank: '#9e9e9e',
                thirdRank: '#94610f'
            }) //(Preferred Option)
            .setUsersData(users)
            .build();


        await interaction.reply({
            files: [{
                attachment: top,
                name: `top-.png`
            }]
        });
    }
}

export default Rank;


