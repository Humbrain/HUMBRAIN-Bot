import {Button} from "../components/Button";
import {ButtonBuilder, ButtonStyle, GuildMember} from "discord.js";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";
import {Error} from "../utils/Embed";
import {Tickets} from "../entities/Tickets";
import {createTranscript} from 'discord-html-transcripts'
import {ExportReturnType} from "discord-html-transcripts/dist/types";

const CloseTicketsBtn: Button = {
    data: new ButtonBuilder()
        .setCustomId("closetickets")
        .setLabel("Fermer les tickets")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("🚮"),

    run: async (client, interaction) => {
        const config = AppDataSource.getRepository(Config)
        const guildId = interaction.guildId
        const guildConfig = await config.findOneBy({guildId})
        if (!guildConfig) {
            const error = Error("La configuration n'a pas été trouvée.")
            return interaction.reply({embeds: [error]})
        }
        const userClicked = interaction.member as GuildMember
        if (!userClicked.roles.cache.has(guildConfig.ticketRoleId)) {
            const error = Error("Vous n'avez pas la permission de fermer les tickets.")
            return interaction.reply({embeds: [error], ephemeral: true})
        }
        const ticketRepo = AppDataSource.getRepository(Tickets)
        const interactionChannel = interaction.channel
        const ticketId = interactionChannel.name.split('-')[1]
        const ticketIdNumber = parseInt(ticketId)
        const ticket = await ticketRepo.findOneBy({id: ticketIdNumber})
        if (!ticket) {
            const error = Error("Le ticket n'a pas été trouvé.")
            return interaction.reply({embeds: [error], ephemeral: true})
        }

        const attachment = await createTranscript(interactionChannel, {
            limit: -1, // Max amount of messages to fetch. `-1` recursively fetches.
            returnType: ExportReturnType.Attachment, // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment' OR use the enum ExportReturnType
            filename: interactionChannel.name + ".html", // Only valid with returnType is 'attachment'. Name of attachment.
            saveImages: true, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
            footerText: "Exported {number} message{s}", // Change text at footer, don't forget to put {number} to show how much messages got exported, and {s} for plural
            poweredBy: false, // Whether to include the "Powered by discord-html-transcripts" footer
        });
        const transcriptChannel = await interaction.guild.channels.fetch(guildConfig.ticketTranscriptChannelId)
        // @ts-ignore
        const msg = await transcriptChannel.send({files: [attachment]})
        ticket.open = false
        ticket.transcript = msg.attachments.first().url
        await ticketRepo.save(ticket)
        await interactionChannel.delete()
    }
}

export default CloseTicketsBtn