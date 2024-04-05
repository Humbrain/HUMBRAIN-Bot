import {ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder} from "discord.js";
import {Button} from "./Button";
import Loggers from "../utils/Loggers";


export const SayWelcome: Button = {
    data: new ButtonBuilder()
        .setCustomId('welcomeBtn')
        .setLabel('Dit bienvenue !')
        .setStyle(ButtonStyle.Success),
    run: async (client, interaction: ButtonInteraction) => {
        const msg = interaction.message;
        const embed = msg.embeds[0];
        if (!embed) return;
        const nembed = new EmbedBuilder()
            .setTitle(embed.title)
            .setDescription(embed.description + '\n\n' + `<@${interaction.user.id}> vous souhaite la bienvenue !`)
            .setColor(embed.color)
            .setThumbnail(embed.thumbnail?.url)
        await interaction.update({embeds: [nembed]});
    }
}