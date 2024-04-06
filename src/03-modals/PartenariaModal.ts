import {ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import {Modal} from "./Modal";
import CustomModal from "./CustomModal";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";
import {Presentations} from "../entities/Presentations";
import Loggers from "../utils/Loggers";
import {Error, Success} from "../utils/Embed";
import {YesPartenariatBtn} from "../02-buttons/YesPartenariatBtn";
import {NoPartenariatBtn} from "../02-buttons/NoPartenariatBtn";
import {Partenaria} from "../entities/partenaria";


export const PartenariatModal: Modal = {
    data: new CustomModal()
        .setCustomId('partenariaModal')
        .setTitle('Demande de partenaria')
        .addComponent("form_partenariat_link", "Invitation", TextInputStyle.Short, null, "https://discord.gg/xxxx")
        .addComponent("form_partenariat_description", "Description", TextInputStyle.Paragraph)
        .addComponent("form_partenariat_img", "Image", TextInputStyle.Short, null, "https://example.com/image.png", false)
    ,
    run: async (client, interaction) => {
        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOneBy({guildId: interaction.guildId});
        if (!config) {
            await interaction.reply({content: 'Une erreur est survenue', ephemeral: true});
            return;
        }
        if (!config.partenaireChannelId || !config.partenaireRoleId) {
            const error = Error("Le salon ou le rôle partenaire n'ont pas été configurés");
            await interaction.reply({embeds: [error], ephemeral: true});
        }
        const link = interaction.fields.getTextInputValue("form_partenariat_link");
        const description = interaction.fields.getTextInputValue("form_partenariat_description");
        if (!link.startsWith("https://discord.gg")) {
            const error = Error("Le lien d'invitation doit être un lien https://discord.gg/");
            await interaction.reply({embeds: [error], ephemeral: true});
            return;
        }
        if (description.includes("https://discord.gg/")) {
            const error = Error("La description ne doit pas contenir de lien d'invitation");
            await interaction.reply({embeds: [error], ephemeral: true});
            return;
        }

        const img = interaction.fields.getTextInputValue("form_partenariat_img");

        const partenariaRepo = AppDataSource.getRepository(Partenaria);
        let partenaria = new Partenaria();
        partenaria.invite = link;
        partenaria.description = description;
        partenaria.userId = interaction.user.id;
        partenaria = await partenariaRepo.save(partenaria);

        const embed = new EmbedBuilder()
            .setTitle("Nouvelle demande de partenariat #" + partenaria.id)
            .setDescription(`**Lien d'invitation**: ${link}\n**Description**: ${description}`)
            .setColor("#FFA500")
            .setFooter({
                text: `Par ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()
            });
        if (img) {
            embed.setImage(img);
        }
        const row = new ActionRowBuilder().addComponents(YesPartenariatBtn.data, NoPartenariatBtn.data);
        // @ts-ignore
        const message = await client.channels.cache.get(config.partenariaChannelAskId).send({
            contents: `||<@${config.partenaireRoleId}>||`,
            embeds: [embed],
            components: [row]
        });
        const success = Success("Votre demande a bien été envoyée");
        await interaction.reply({embeds: [success], ephemeral: true});
    }
}