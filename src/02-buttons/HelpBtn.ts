import {ButtonBuilder, ButtonStyle} from "discord.js";
import {Button} from "../components/Button";


const HelpBtn: Button = {
    data: new ButtonBuilder()
        .setCustomId('helpBtn')
        .setLabel('Raconte nous ton témoignage anonymement')
        .setStyle(ButtonStyle.Secondary),
    run: async (client, interaction) => {
        let modal = client.modals.get('helpModal').data;
        if (!modal) {
            await interaction.reply({content: 'Une erreur est survenue', ephemeral: true});
            return;
        }
        await interaction.showModal(modal.build());
    }
}

export default HelpBtn