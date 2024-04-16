import {SubCommand} from "../../subCommand";
import {AttachmentBuilder, EmbedBuilder, SlashCommandSubcommandBuilder} from "discord.js";
import axios from "axios";

export const Stats: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName("stats")
        .setDescription("Get information about a League of Legends.")
        .addStringOption(option =>
            option.setName("summoner")
                .setDescription("The summoner name.")
                .setRequired(true)
        )
        .addStringOption(option => option.setName('tag').setDescription('The tag of the server.').setRequired(true))
        .addStringOption(option => option.setName('region').setDescription('The region of the server.').setRequired(true)
            .setChoices(
                {
                    name: 'BR',
                    value: 'br1'
                },
                {
                    name: 'EUN',
                    value: 'eun1'
                },
                {
                    name: 'EUW',
                    value: 'euw1'
                },
                {
                    name: 'JP',
                    value: 'jp1'
                },
                {
                    name: 'KR',
                    value: 'kr'
                },
                {
                    name: 'LAN',
                    value: 'la1'
                },
                {
                    name: 'LAS',
                    value: 'la2'
                },
                {
                    name: 'NA',
                    value: 'na1'
                },
                {
                    name: 'OC',
                    value: 'oc1'
                },
                {
                    name: 'TR',
                    value: 'tr1'
                },
                {
                    name: 'RU',
                    value: 'ru'
                }
            )),
    run: async (client, interaction) => {
        const summoner = interaction.options.get('summoner').value as string;
        let tag = interaction.options.get('tag').value as string;
        const region = interaction.options.get('region').value as string;
        tag = tag.replace("#", "");
        let regionTag = "";
        switch (region) {
            case "br1":
            case "na1":
            case "la1":
            case "la2":
                regionTag = "americas";
                break;
            case "eun1":
            case "euw1":
                regionTag = "europe";
                break;
            case "jp1":
            case "kr":
            case "oc1":
            case "tr1":
            case "ru":
                regionTag = "asia";
                break;
            default:
                regionTag = "americas";
                break;

        }
        const apiUrlPuid = `https://${regionTag}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summoner}/${tag}?api_key=${process.env.RIOT_API_KEY}`
        let puid = "";
        try {
            const response = await axios.get(apiUrlPuid);
            const data = await response.data;
            puid = data.puuid;
        } catch (error) {
            await interaction.reply("The summoner was not found.");
            console.debug(error)
        }
        const apiUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puid}?api_key=${process.env.RIOT_API_KEY}`
        let id = "";
        let iconPath = "";
        try {
            const response = await axios.get(apiUrl);
            const data = await response.data;
            id = data.id;
            iconPath = data.profileIconId;
        } catch (error) {
            await interaction.reply("The summoner was not found.");
            console.debug(error)
        }
        const apiUrlStats = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`
        try {
            const response = await axios.get(apiUrlStats);
            const data = await response.data[0];
            let img = new AttachmentBuilder(`./src/00-assets/lolranks/${data.tier.toLowerCase()}.png`)
            const embed = new EmbedBuilder()
                .setTitle(`Stats for ${summoner}#${tag}`)
                .setAuthor({
                    name: `${summoner}#${tag}`,
                    iconURL: `https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/${iconPath}.png`
                })
                .setDescription(`**Rank**: ${data.tier} ${data.rank} ${data.leaguePoints} LP\n**Wins**: ${data.wins}\n**Losses**: ${data.losses}\n**Winrate**: ${((data.wins / (data.wins + data.losses)) * 100).toFixed(2)}%`)
                .setThumbnail(`attachment://${data.tier.toLowerCase()}.png`)
                .setColor("#0099ff")
                .setTimestamp()
            await interaction.reply({embeds: [embed], files: [img]});
        } catch (error) {
            await interaction.reply("The summoner was not found.");
            console.debug(error)
        }
    }
}