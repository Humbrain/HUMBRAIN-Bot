import {Button} from "../components/Button";
import {ButtonBuilder, ButtonStyle} from "discord.js";
import {Error} from "../utils/Embed";

const PartenariaBtn: Button = {
    data: new ButtonBuilder()
        .setCustomId("partenaria")
        .setLabel("Demande de partenariat")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🎟️"),
    run: async (client, interaction) => {
        const modal = client.modals.get('partenariaModal')
        if (!modal) {
            const error = Error("Le modal n'a pas été trouvé.")
            return interaction.reply({embeds: [error], ephemeral: true})
        }
        return interaction.showModal(modal.data.build())
    }
}

export default PartenariaBtn;