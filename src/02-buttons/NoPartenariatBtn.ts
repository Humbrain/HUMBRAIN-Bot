import {Button} from "./Button";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder} from "discord.js";
import {AppDataSource} from "../data-source";
import {Partenaria} from "../entities/partenaria";
import {Config} from "../entities/config";
import {Error, Success} from "../utils/Embed";
import {PartenariaBtn} from "./PartenariaBtn";
import Loggers from "../utils/Loggers";

export const NoPartenariatBtn: Button = {
    data: new ButtonBuilder()
        .setCustomId('nopartenariat')
        .setLabel('Refuser')
        .setStyle(ButtonStyle.Danger),
    run: async (client, interaction) => {
        const getEmbed = interaction.message.embeds[0];
        const regex = /<@\d+>/gm;
        const title = getEmbed.title;
        const partenariaId = title.split('#')[1];
        const partenariaIdInt = parseInt(partenariaId);
        const partenariaRepo = AppDataSource.getRepository(Partenaria);
        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOneBy({guildId: interaction.guildId});
        const partenaria = await partenariaRepo.findOneBy({id: partenariaIdInt});
        if (!partenaria) {
            const error = Error("La demande de partenariat n'existe pas");
            await interaction.reply({embeds: [error], ephemeral: true});
        }

        const messageInteraction = interaction.message;
        const embedInteraction = messageInteraction.embeds[0];
        const update = new EmbedBuilder()
            .setTitle("Partenariat #" + partenaria.id + " refusé")
            .setColor(Colors.Red)
            .setDescription(embedInteraction.description + "\nPartenariat refusée");
        // @ts-ignore
        await messageInteraction.edit({embeds: [update], components: []});

        const success = Success("Partenariat refusé avec succès");
        await interaction.reply({embeds: [success], ephemeral: true});
        const userToNotif = await client.users.fetch(partenaria.userId);
        const notif = new EmbedBuilder()
            .setTitle("Partenariat refusé")
            .setDescription("Votre demande de partenariat a été refusée")
            .setColor(Colors.Red);
        try {
            await userToNotif.send({embeds: [notif]});
        } catch (e) {
            Loggers.error("Partenariat Error: " + e.message);
        }
    }
}