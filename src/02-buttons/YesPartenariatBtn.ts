import {Button} from "../components/Button";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder} from "discord.js";
import {AppDataSource} from "../data-source";
import {Partenaria} from "../entities/partenaria";
import {Error, Success} from "../utils/Embed";
import {Config} from "../entities/config";
import Loggers from "../utils/Loggers";

const YesPartenariatBtn: Button = {
    data: new ButtonBuilder()
        .setCustomId('yespartenariat')
        .setLabel('Accepter')
        .setStyle(ButtonStyle.Success),
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

        const content = "━━━━━━━━━━━━━━━\n" +
            "Partenariat effectué avec: <@" + partenaria.userId + ">\n" +
            "Mention: <@&" + config.partenaireMentionId + ">\n" +
            "━━━━━━━━━━━━━━━";
        const embed = new EmbedBuilder()
            .setTitle("Partenariat #" + partenaria.id)
            .setDescription(partenaria.description)
            .setColor(Colors.Green)
        if (partenaria.image) {
            embed.setImage(partenaria.image);
        }
        const btn = new ButtonBuilder()
            .setLabel("Rejoindre le discord")
            .setURL(partenaria.invite)
            .setStyle(ButtonStyle.Link);
        const row = new ActionRowBuilder().addComponents(btn, client.buttons.get('partenaria').data);
        const channel = await client.channels.fetch(config.partenaireChannelId);
        // @ts-ignore
        await channel.send({content: content, embeds: [embed], components: [row]});
        const messageInteraction = interaction.message;
        const embedInteraction = messageInteraction.embeds[0];
        const update = new EmbedBuilder()
            .setTitle("Partenariat #" + partenaria.id + " accepté")
            .setColor(Colors.Green)
            .setDescription(embedInteraction.description + "\nPartenariat accepté");
        // @ts-ignore
        await messageInteraction.edit({embeds: [update], components: []});

        const success = Success("Partenariat effectué avec succès");
        await interaction.reply({embeds: [success], ephemeral: true});
        const userToNotif = await client.users.fetch(partenaria.userId);
        const notif = new EmbedBuilder()
            .setTitle("Partenariat accepté")
            .setDescription("Votre demande de partenariat a été acceptée")
            .setColor(Colors.Green);
        try {
            await userToNotif.send({embeds: [notif]});
        } catch (e) {
            Loggers.error("Partenariat Error: " + e.message);
        }
    }
}

export default YesPartenariatBtn;