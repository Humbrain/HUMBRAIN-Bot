import {Button} from "./Button";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder} from "discord.js";

export const NeedHelpBtn: Button = {
    data: new ButtonBuilder()
        .setCustomId('answer-exper')
        .setLabel('Partager son expérience')
        .setStyle(ButtonStyle.Secondary),
    run: async (client, interaction) => {
        interaction.reply({content: 'Partager son expérience', ephemeral: true});
    }
}