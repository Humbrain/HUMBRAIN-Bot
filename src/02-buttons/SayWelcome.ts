import {ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder} from "discord.js";
import {Button} from "../components/Button";
import {Error} from "../utils/Embed";


const SayWelcome: Button = {
    data: new ButtonBuilder()
        .setCustomId('welcomeBtn')
        .setLabel('Dit bienvenue !')
        .setStyle(ButtonStyle.Success),
    run: async (client, interaction: ButtonInteraction) => {
        const msg = interaction.message;
        const content = msg.content;
        const embed = msg.embeds[0];
        if (content.includes(interaction.user.id)) {
            const error = Error('Vous ne pouvez pas vous dire bienvenue !');
            await interaction.reply({embeds: [error], ephemeral: true});
            return;
        }
        if (embed.description.includes(interaction.user.id)) {
            const error = Error('Vous avez déjà dit bienvenue !');
            await interaction.reply({content: 'Vous avez déjà dit bienvenue !', ephemeral: true});
            return;
        }

        if (!embed) return;
        const nembed = new EmbedBuilder()
            .setTitle(embed.title)
            .setDescription(embed.description + '\n' + `<@${interaction.user.id}> vous souhaite la bienvenue !`)
            .setColor(embed.color)
            .setThumbnail(embed.thumbnail?.url)
        await interaction.update({content: content, embeds: [nembed]});
    }
}

export default SayWelcome;