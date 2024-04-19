import {Button} from "../components/Button";
import {ButtonBuilder, ButtonStyle, Colors, EmbedBuilder} from "discord.js";
import {Error, Success} from "../utils/Embed";

const NoMpBtn: Button = {
    data: new ButtonBuilder()
        .setCustomId('nomp')
        .setLabel('Non')
        .setStyle(ButtonStyle.Danger),
    run: async (client, interaction) => {
        const regex = /<@\d+>/gm;
        const message = interaction.message
        const user = message.mentions.users.first();
        if (user.id !== interaction.user.id) {
            const error = Error("Vous ne pouvez pas répondre à cette question")
            return interaction.reply({embeds: [error], ephemeral: true})
        }
        const embed = message.embeds[0];
        const update = new EmbedBuilder().setColor(Colors.Red)
        const userPing = embed.description.split(',')[1]
        const uPing = userPing.match(regex)[0]
        update.setDescription(embed.description + `\n<@${user.id}> a répondu non`)
        // @ts-ignore
        await message.edit({content: `||${uPing}||`, embeds: [update], components: []})
        const success = Success("Votre réponse à bien été pris en compte");
        await interaction.reply({embeds: [success], ephemeral: true})
    }
}

export default NoMpBtn