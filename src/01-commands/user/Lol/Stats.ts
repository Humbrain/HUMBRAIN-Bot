import {SubCommand} from "../../subCommand";
import {AttachmentBuilder, EmbedBuilder, SlashCommandSubcommandBuilder} from "discord.js";
import axios from "axios";
import {leagueRankCard} from "../../../utils/leagueRankCard";
import {Error} from "../../../utils/Embed";

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
        const puuid = await getPuuid(summoner, tag, regionTag);
        if (!puuid) {
            let error = Error("Une erreur est survenue lors de la récupération des données du joueur. (Puuid)");
            await interaction.reply({
                embeds: [error]
            });
            return;
        }
        const summonerData = await getSummoner(puuid, region);
        if (!summonerData) {
            let error = Error("Une erreur est survenue lors de la récupération des données du joueur. (Summoner)");
            await interaction.reply({
                embeds: [error]
            });
            return;
        }
        const championMastery = await getMaxMasteryChampion(puuid, region);
        if (!championMastery) {
            let error = Error("Une erreur est survenue lors de la récupération des données du joueur. (Champion Mastery)");
            await interaction.reply({
                embeds: [error]
            });
            return;
        }
        const league = await getLeague(summonerData.id, region);
        if (!league) {
            let error = Error("Une erreur est survenue lors de la récupération des données du joueur. (League)");
            await interaction.reply({
                embeds: [error]
            });
            return;
        }
        const attachment = await leagueRankCard(`${summoner}#${tag}`, league.tier, league.wins, league.losses, league.leaguePoints, league.rank, summonerData.profileIconId, championMastery.championId, championMastery.championLevel, championMastery.championPoints);
        await interaction.reply({
            files: [attachment]
        });
    }
}

const getPuuid = async (summoner: string, tag: string, region: string) => {
    // /riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}
    try {
    const {data} = await axios.get(`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summoner}/${tag}?api_key=${process.env.RIOT_API_KEY}`);
    return data.puuid;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getSummoner = async (puuid: string, region: string) => {
    // /riot/account/v1/accounts/{puuid}
    try {
        const {data} = await axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.RIOT_API_KEY}`);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}


const getMaxMasteryChampion = async (puuid: string, region: string) => {
    try {
    // /lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID}
    const {data} = await axios.get(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${process.env.RIOT_API_KEY}`);
    data.sort((a, b) => b.championLevel - a.championLevel);
    return data[0];
    } catch (e) {
        console.log(e);
        return null;

    }
}

const getLeague = async (id: string, region: string) => {
    try {
    const {data} = await axios.get(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`);
    return data[0];
    } catch (e) {
        console.log(e);
        return null;
    }
}