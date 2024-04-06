import {Button} from "./Button";
import {ButtonBuilder, ButtonStyle} from "discord.js";
import {modals} from "../03-modals";
import {Error} from "../utils/Embed";

export const PartenariaBtn: Button = {
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