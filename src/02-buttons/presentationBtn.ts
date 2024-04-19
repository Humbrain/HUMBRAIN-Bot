import {ButtonBuilder, ButtonStyle, TextInputStyle} from "discord.js";
import {Button} from "../components/Button";
import {AppDataSource} from "../data-source";
import {Presentations} from "../entities/Presentations";
import CustomModal from "../components/CustomModal";


const PresentationBtn: Button = {
    data: new ButtonBuilder()
        .setCustomId('presentation')
        .setLabel('Faire sa présentation')
        .setStyle(ButtonStyle.Secondary),
    run: async (client, interaction) => {
        const presentationRepo = AppDataSource.getRepository(Presentations);
        const presentation = await presentationRepo.findOneBy({
            userId: interaction.user.id,
            guildId: interaction.guildId
        });
        let modal;
        if (presentation) {
            modal = new CustomModal()
                .setCustomId('presentationModal')
                .setTitle('Modifier votre presentation')
                .addComponent("form_presentation_name", "Nom", TextInputStyle.Short, presentation.name)
                .addComponent("form_presentation_age", "Age", TextInputStyle.Short, presentation.age)
                .addComponent("form_presentation_description", "Description", TextInputStyle.Paragraph, presentation.description)
        } else {
            modal = client.modals.get('presentationModal').data;
            if (!modal) {
                await interaction.reply({content: 'Une erreur est survenue', ephemeral: true});
                return;
            }
        }
        await interaction.showModal(modal.build());
    }
}

export default PresentationBtn;