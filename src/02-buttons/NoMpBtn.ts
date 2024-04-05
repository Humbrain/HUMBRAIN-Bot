import {Button} from "./Button";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder} from "discord.js";

export const NoMpBtn: Button = {
    data: new ButtonBuilder()
        .setCustomId('nomp')
        .setLabel('Non')
        .setStyle(ButtonStyle.Danger),
    run: async (client, interaction) => {
        const regex = /<@\d+>/gm;
        const message = interaction.message
        const user = message.mentions.users.first();
        if (user.id !== interaction.user.id) {
            return interaction.reply({content: 'Vous ne pouvez pas répondre à cette question', ephemeral: true})
        }
        const embed = message.embeds[0];
        const update = new EmbedBuilder().setColor(Colors.Red)
        const userPing = embed.description.split(',')[1]
        const uPing = userPing.match(regex)[0]
        update.setDescription(embed.description + `\n<@${user.id}> a répondu non`)
        // @ts-ignore
        await message.edit({content: `||${uPing}||`, embeds: [update], components: []})
        await interaction.reply({content: "Merci d'avoir répondu", ephemeral: true})
    }
}