import {AttachmentBuilder, SlashCommandBuilder} from "discord.js";
import {createCanvas, GlobalFonts, loadImage} from "@napi-rs/canvas";
import {request} from "undici";

export const leagueRankCard = async (summoner: string, rank: string, wins: number, losses: number, lp: number, tier: string, iconProfilId: number, championMastery: number, championMasteryLvl: number, championMasteryPoint: number) => {
    const winrate = Math.round((wins / (wins + losses)) * 100);
    const loserate = Math.round((losses / (wins + losses)) * 100);

    const ddragon = 'https://ddragon.leagueoflegends.com/cdn/11.16.1/data/fr_FR/champion.json';
    const {body: champions} = await request(ddragon);
    const {data} = JSON.parse(await champions.text());
    const getChampion = (id: number) => {
        for (const champion in data) {
            if (data[champion].key === id.toString()) {
                return data[champion];
            }
        }
    }

    const getChampionIcon = (id: number) => {
        const champion = getChampion(id);
        return `https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champion.image.full}`;
    }

    const canvas = createCanvas(1280, 706);
    const context = canvas.getContext('2d');

    const {body} = await request('https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/' + iconProfilId + '.png');
    const avatar = await loadImage(await body.arrayBuffer());
    context.drawImage(avatar, 130, 80, 195, 200)

    const background = await loadImage(`./src/00-assets/lolcard/${rank.toLowerCase()}.png`);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    GlobalFonts.registerFromPath('./src/00-assets/fonts/AlverataInformalSb.ttf', 'lolfont')
    context.font = '40px lolfont';
    context.fillStyle = '#785a28';
    if (tier === "I") {
        context.fillText(tier, 221, 100)
    }else if (tier === "II") {
        context.fillText(tier, 213, 100)
    } else if (tier === "V") {
        context.fillText(tier, 213, 100)
    } else {
        context.fillText(tier, 206, 100)
    }

    context.font = '60px lolfont';
    context.fillStyle = '#c89b3c';
    context.fillText(summoner, 460, 200)

    context.lineJoin = 'round';
    context.strokeStyle = '#ff2345';
    context.lineWidth = 30;
    context.strokeRect(250, 350, 700, 5);

    // Draw winrate
    context.strokeStyle = '#0ac9e4';
    context.lineWidth = 30;
    context.strokeRect(250, 350, 700 - (loserate * 7), 5);

    // Draw LP
    context.font = '40px lolfont';
    context.fillStyle = '#c89b3c';
    context.fillText(`${lp}LP`, 250, 450)

    // Draw wins
    context.font = '40px lolfont';
    context.fillStyle = '#c89b3c';
    context.fillText(`${winrate} % (${wins}/${losses})`, 700, 450)

    // Draw champion icon
    const championIcon = await loadImage(getChampionIcon(championMastery));
    context.drawImage(championIcon, 150, 500, 150, 150)

    // Draw champion name
    context.font = '40px lolfont';
    context.fillStyle = '#c89b3c';
    context.fillText(getChampion(championMastery).name, 400, 550)

    // draw mastery
    context.font = '40px lolfont';
    context.fillStyle = '#c89b3c';
    context.fillText('Maitrise', 400, 600)
    context.fillText(championMasteryLvl.toString(), 600, 600)

    // draw points
    context.font = '40px lolfont';
    context.fillStyle = '#c89b3c';
    context.fillText('Points', 400, 650)
    const masteryPointFormat = championMasteryPoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    context.fillText(masteryPointFormat, 600, 650)


    const attachement = new AttachmentBuilder(await canvas.encode('png'), {name: `${summoner}.png`})
    return attachement;
}