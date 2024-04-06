import {Button} from "./Button";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, PermissionFlagsBits} from "discord.js";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";
import {Error, Success} from "../utils/Embed";
import {Tickets} from "../entities/Tickets";
import {CloseTicketsBtn} from "./CloseTicketsBtn";

export const TicketsBtn: Button = {
    data: new ButtonBuilder()
        .setCustomId("tickets")
        .setLabel("Tickets")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🎟️"),

    run: async (client, interaction) => {
        const config = AppDataSource.getRepository(Config)
        const guildId = interaction.guildId
        const guildConfig = await config.findOneBy({guildId})
        if (!guildConfig) {
            const error = Error("La configuration n'a pas été trouvée.")
            return interaction.reply({embeds: [error]})
        }

        const ticketCategory = await client.channels.fetch(guildConfig.ticketCategoryId)
        if (!ticketCategory) {
            const error = Error("La catégorie de ticket n'a pas été trouvée.")
            return interaction.reply({embeds: [error]})
        }

        const ticketRepo = AppDataSource.getRepository(Tickets)
        let newTicket = ticketRepo.create({
            userId: interaction.user.id,
            guildId: guildId
        })
        newTicket = await ticketRepo.save(newTicket)
        const channelName = `ticket-${newTicket.id}`
        let everyoneRole = interaction.guild.roles.cache.find(r => r.name === '@everyone');

        const ticketChannel = await interaction.guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText,
            parent: ticketCategory.id,
            permissionOverwrites: [
                {
                    id: everyoneRole.id,
                    deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                },
                {
                    id: guildConfig.ticketRoleId,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                }
            ]
        })
        // @ts-ignore
        newTicket.ticketChannelId = ticketChannel.id
        newTicket.open = true
        await ticketRepo.save(newTicket)
        const Embed = new EmbedBuilder()
            .setAuthor({
                name: `${interaction.guild.name} | Ticket: ${newTicket.id}`,
                iconURL: interaction.guild.iconURL({size: 512}),
            })
            .setDescription("Ticket ouvert par: <@" + interaction.user.id + ">" +
                "\nVeuillez attendre patiemment une réponse de l'équipe du personnel, en attendant, décrivez votre " +
                "problème avec le plus de détails possible.")
            .setFooter({text: "Les boutons ci-dessous sont des boutons réservés au staff."});
        const closeBtn = new ActionRowBuilder().addComponents(CloseTicketsBtn.data)

        // @ts-ignore
        await ticketChannel.send({embeds: [Embed], components: [closeBtn]})
        // @ts-ignore
        const embed = Success(`Votre ticket a été créé avec succès. <#${ticketChannel.id}>`)
        await interaction.reply({embeds: [embed], ephemeral: true})
        // @ts-ignore
        const msg = await ticketChannel.send({content: `<@${interaction.user.id}>, voici votre ticket., <@&${guildConfig.ticketRoleId}>`});
        setTimeout(() => {
            msg.delete()
        }, 5000);
    }
}