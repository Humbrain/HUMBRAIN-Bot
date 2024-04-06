import {ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import {Modal} from "./Modal";
import CustomModal from "./CustomModal";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";
import {Presentations} from "../entities/Presentations";
import Loggers from "../utils/Loggers";


export const PresentationModal: Modal = {
    data: new CustomModal()
        .setCustomId('presentationModal')
        .setTitle('Presentation')
        .addComponent("form_presentation_name", "Nom", TextInputStyle.Short)
        .addComponent("form_presentation_age", "Age", TextInputStyle.Short)
        .addComponent("form_presentation_description", "Description", TextInputStyle.Paragraph),
    run: async (client, interaction) => {
        const configRepo = AppDataSource.getRepository(Config);
        const presentationRepo = AppDataSource.getRepository(Presentations);
        const config = await configRepo.findOneBy({guildId: interaction.guildId});
        if (!config) {
            interaction.reply({content: 'Une erreur est survenue', ephemeral: true});
            return;
        }
        const name = interaction.fields.getTextInputValue("form_presentation_name");
        const age = interaction.fields.getTextInputValue("form_presentation_age");
        const description = interaction.fields.getTextInputValue("form_presentation_description");
        const presentation = await presentationRepo.findOneBy({
            userId: interaction.user.id,
            guildId: interaction.guildId
        });
        const embed = new EmbedBuilder()
            .setTitle(`Presentation de ${interaction.user.username}`)
            .setThumbnail(interaction.user.avatarURL())
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(`${description}`)
            .addFields({name: 'Identité', value: `Nom: ${name}\nAge: ${age}`})
            .setColor("#bcddf6")
        const channel = await client.channels.fetch(config.presentationChannelId);
        const presentationBtn = client.buttons.get("presentation");
        const row = new ActionRowBuilder().addComponents(presentationBtn.data);
        // @ts-ignore
        const msg = await channel.send({embeds: [embed], components: [row]});
        if (presentation) {
            // @ts-ignore
            const oldMsg = await channel.messages.fetch(presentation.presentationMsgId);
            await oldMsg.delete();
            presentation.name = name;
            presentation.age = age;
            presentation.description = description;
            presentation.presentationMsgId = msg.id;
            await presentationRepo.save(presentation);
        } else {
            const pres = new Presentations()
            pres.name = name;
            pres.age = age;
            pres.description = description;
            pres.guildId = interaction.guildId;
            pres.userId = interaction.user.id;
            pres.presentationMsgId = msg.id;
            await presentationRepo.save(pres);
        }
        await interaction.reply({content: 'Votre presentation a bien été envoyée', ephemeral: true});
    }
}