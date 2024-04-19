import lang from "../../../lang/lang";
import {
    ActionRowBuilder, ButtonBuilder, CategoryChannel,
    ChannelType,
    Colors,
    EmbedBuilder, Role,
    SlashCommandSubcommandBuilder,
    TextChannel
} from "discord.js";
import {SubCommand} from "../../../components/subCommand";
import {AppDataSource} from "../../../data-source";
import {Config} from "../../../entities/config";
import {Success} from "../../../utils/Embed";

export const TicketSettings: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName(lang.admin.settings.ticket.name["en-US"])
        .setNameLocalizations(lang.admin.settings.ticket.name)
        .setDescription(lang.admin.settings.ticket.description["en-US"])
        .setDescriptionLocalizations(lang.admin.settings.ticket.description)
        .addChannelOption(option => option.setName(lang.admin.settings.ticket.channel.name["en-US"])
            .setNameLocalizations(lang.admin.settings.ticket.channel.name)
            .setDescription(lang.admin.settings.ticket.channel.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.ticket.channel.description)
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true))
        .addRoleOption(option => option.setName(lang.admin.settings.ticket.role.name["en-US"])
            .setNameLocalizations(lang.admin.settings.ticket.role.name)
            .setDescription(lang.admin.settings.ticket.role.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.ticket.role.description)
            .setRequired(true))
        .addChannelOption(option => option
            .setName(lang.admin.settings.ticket.category.name["en-US"])
            .setNameLocalizations(lang.admin.settings.ticket.category.name)
            .setDescription(lang.admin.settings.ticket.category.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.ticket.category.description)
            .addChannelTypes(ChannelType.GuildCategory)
            .setRequired(true))
        .addChannelOption(option => option
            .setName(lang.admin.settings.ticket.transcript.name["en-US"])
            .setNameLocalizations(lang.admin.settings.ticket.transcript.name)
            .setDescription(lang.admin.settings.ticket.transcript.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.ticket.transcript.description)
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true))
        .addStringOption(option => option
            .setName(lang.admin.settings.ticket.message.name["en-US"])
            .setNameLocalizations(lang.admin.settings.ticket.message.name)
            .setDescription(lang.admin.settings.ticket.message.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.ticket.message.description)
            .setRequired(true)),
    run: async (client, interaction) => {
        const ticketChannel = interaction.options.get(lang.admin.settings.ticket.channel.name["en-US"]).channel as TextChannel;
        const ticketRole = interaction.options.get(lang.admin.settings.ticket.role.name["en-US"]).role as Role;
        const ticketCategory = interaction.options.get(lang.admin.settings.ticket.category.name["en-US"]).channel as CategoryChannel;
        const ticketMessage = interaction.options.get(lang.admin.settings.ticket.message.name["en-US"]).value as string;
        const ticketTranscript = interaction.options.get(lang.admin.settings.ticket.transcript.name["en-US"]).channel as TextChannel;

        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
        if (!config) {
            await configRepo.insert({
                guildId: interaction.guildId,
                ticketChannelId: ticketChannel.id,
                ticketRoleId: ticketRole.id,
                ticketCategoryId: ticketCategory.id,
                ticketMessage,
                ticketTranscriptChannelId: ticketTranscript.id
            });
        } else {
            await configRepo.update(config.id, {
                ticketChannelId: ticketChannel.id,
                ticketRoleId: ticketRole.id,
                ticketCategoryId: ticketCategory.id,
                ticketMessage,
                ticketTranscriptChannelId: ticketTranscript.id
            });
        }
        const ticketBtn = new ActionRowBuilder<ButtonBuilder>().addComponents(client.buttons.get('tickets').data);
        const embedTick = new EmbedBuilder()
            .setTitle("Ticket")
            .setDescription(ticketMessage + "\nCliquez sur le bouton pour créer un ticket")
            .setColor(Colors.Blue);
        await ticketChannel.send({components: [ticketBtn], embeds: [embedTick]});
        const embed = Success("Les paramètres de ticket ont été mis à jour");
        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}