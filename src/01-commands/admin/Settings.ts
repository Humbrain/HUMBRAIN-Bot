import {
    ActionRowBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
    ChannelType, EmbedBuilder, Colors
} from "discord.js";
import lang from "../../lang/lang";
import {AppDataSource} from "../../data-source";
import {Config} from "../../entities/config";
import {Command} from "../command";
import {Error, Success} from "../../utils/Embed";
import {PresentationBtn} from "../../02-buttons/presentationBtn";
import {TicketsBtn} from "../../02-buttons/Tickets";
import {PartenariaBtn} from "../../02-buttons/PartenariaBtn";

export const Settings: Command = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Change bot settings')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand => subcommand
            .setName(lang.admin.presentation_settings["en-US"])
            .setNameLocalizations(lang.admin.presentation_settings)
            .setDescription(lang.admin.presentation_settings_description["en-US"])
            .setDescriptionLocalizations(lang.admin.presentation_settings_description)
            .addChannelOption(option => option.setName(lang.admin.presentation_channel["en-US"])
                .setNameLocalizations(lang.admin.presentation_channel)
                .setDescription(lang.admin.presentation_channel_description["en-US"])
                .addChannelTypes(ChannelType.GuildText)
                .setDescriptionLocalizations(lang.admin.presentation_channel_description)
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(lang.admin.mp_settings["en-US"])
            .setNameLocalizations(lang.admin.mp_settings)
            .setDescription(lang.admin.mp_settings_description["en-US"])
            .setDescriptionLocalizations(lang.admin.mp_settings_description)
            .addChannelOption(option => option.setName(lang.admin.mp_channel["en-US"])
                .setNameLocalizations(lang.admin.mp_channel)
                .setDescription(lang.admin.mp_channel_description["en-US"])
                .setDescriptionLocalizations(lang.admin.mp_channel_description)
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
            .addBooleanOption(option => option.setName(lang.admin.mp_age_system["en-US"])
                .setNameLocalizations(lang.admin.mp_age_system)
                .setDescription(lang.admin.mp_age_system_description["en-US"])
                .setDescriptionLocalizations(lang.admin.mp_age_system_description)
                .setRequired(false))
            .addRoleOption(option => option.setName(lang.admin.adult_role["en-US"])
                .setNameLocalizations(lang.admin.adult_role)
                .setDescription(lang.admin.adult_role_description["en-US"])
                .setDescriptionLocalizations(lang.admin.adult_role_description)
                .setRequired(false))
            .addRoleOption(option => option.setName(lang.admin.minor_role["en-US"])
                .setNameLocalizations(lang.admin.minor_role)
                .setDescription(lang.admin.minor_role_description["en-US"])
                .setDescriptionLocalizations(lang.admin.minor_role_description)
                .setRequired(false))
            .addRoleOption(option => option.setName(lang.admin.close_role["en-US"])
                .setNameLocalizations(lang.admin.close_role)
                .setDescription(lang.admin.close_role_description["en-US"])
                .setDescriptionLocalizations(lang.admin.close_role_description)
                .setRequired(false)))
        .addSubcommand(subcommand => subcommand
            .setName(lang.admin.welcome_settings["en-US"])
            .setNameLocalizations(lang.admin.welcome_settings)
            .setDescription(lang.admin.welcome_settings_description["en-US"])
            .setDescriptionLocalizations(lang.admin.welcome_settings_description)
            .addChannelOption(option => option.setName(lang.admin.welcome_channel["en-US"])
                .setNameLocalizations(lang.admin.welcome_channel)
                .setDescription(lang.admin.welcome_channel_description["en-US"])
                .setDescriptionLocalizations(lang.admin.welcome_channel_description)
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
            .addStringOption(option => option.setName(lang.admin.welcome_message["en-US"])
                .setNameLocalizations(lang.admin.welcome_message)
                .setDescription(lang.admin.welcome_message_description["en-US"])
                .setDescriptionLocalizations(lang.admin.welcome_message_description)
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(lang.admin.ticket_settings["en-US"])
            .setNameLocalizations(lang.admin.ticket_settings)
            .setDescription(lang.admin.ticket_settings_description["en-US"])
            .setDescriptionLocalizations(lang.admin.ticket_settings_description)
            .addChannelOption(option => option.setName(lang.admin.ticket_channel["en-US"])
                .setNameLocalizations(lang.admin.ticket_channel)
                .setDescription(lang.admin.ticket_channel_description["en-US"])
                .setDescriptionLocalizations(lang.admin.ticket_channel_description)
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
            .addRoleOption(option => option.setName(lang.admin.ticket_role["en-US"])
                .setNameLocalizations(lang.admin.ticket_role)
                .setDescription(lang.admin.ticket_role_description["en-US"])
                .setDescriptionLocalizations(lang.admin.ticket_role_description)
                .setRequired(true))
            .addChannelOption(option => option
                .setName(lang.admin.ticket_category["en-US"])
                .setNameLocalizations(lang.admin.ticket_category)
                .setDescription(lang.admin.ticket_category_description["en-US"])
                .setDescriptionLocalizations(lang.admin.ticket_category_description)
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(true))
            .addChannelOption(option => option
                .setName(lang.admin.ticket_transcript["en-US"])
                .setNameLocalizations(lang.admin.ticket_transcript)
                .setDescription(lang.admin.ticket_transcript_description["en-US"])
                .setDescriptionLocalizations(lang.admin.ticket_transcript_description)
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
            .addStringOption(option => option
                .setName(lang.admin.ticket_message["en-US"])
                .setNameLocalizations(lang.admin.ticket_message)
                .setDescription(lang.admin.ticket_message_description["en-US"])
                .setDescriptionLocalizations(lang.admin.ticket_message_description)
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(lang.admin.partenaria_settings["en-US"])
            .setNameLocalizations(lang.admin.partenaria_settings)
            .setDescription(lang.admin.partenaria_settings_description["en-US"])
            .setDescriptionLocalizations(lang.admin.partenaria_settings_description)
            .addChannelOption(option => option
                .setName(lang.admin.partenaria_channel["en-US"])
                .setNameLocalizations(lang.admin.partenaria_channel)
                .setDescription(lang.admin.partenaria_channel_description["en-US"])
                .setDescriptionLocalizations(lang.admin.partenaria_channel_description)
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
            .addRoleOption(option => option
                .setName(lang.admin.partenaria_role["en-US"])
                .setNameLocalizations(lang.admin.partenaria_role)
                .setDescription(lang.admin.partenaria_role_description["en-US"])
                .setDescriptionLocalizations(lang.admin.partenaria_role_description)
                .setRequired(true))
            .addChannelOption(option => option
                .setName(lang.admin.partenaria_channel_ask["en-US"])
                .setNameLocalizations(lang.admin.partenaria_channel_ask)
                .setDescription(lang.admin.partenaria_channel_ask_description["en-US"])
                .setDescriptionLocalizations(lang.admin.partenaria_channel_ask_description)
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
            .addRoleOption(option => option
                .setName(lang.admin.partenaria_mention["en-US"])
                .setNameLocalizations(lang.admin.partenaria_mention)
                .setDescription(lang.admin.partenaria_mention_description["en-US"])
                .setDescriptionLocalizations(lang.admin.partenaria_mention_description)
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(lang.admin.private_room_settings["en-US"])
            .setNameLocalizations(lang.admin.private_room_settings)
            .setDescription(lang.admin.private_room_settings_description["en-US"])
            .setDescriptionLocalizations(lang.admin.private_room_settings_description)
            .addChannelOption(option => option
                .setName(lang.admin.private_room_category["en-US"])
                .setNameLocalizations(lang.admin.private_room_category)
                .setDescription(lang.admin.private_room_category_description["en-US"])
                .setDescriptionLocalizations(lang.admin.private_room_category_description)
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(true))
            .addChannelOption(option => option
                .setName(lang.admin.private_room_voice["en-US"])
                .setNameLocalizations(lang.admin.private_room_voice)
                .setDescription(lang.admin.private_room_voice_description["en-US"])
                .setDescriptionLocalizations(lang.admin.private_room_voice_description)
                .addChannelTypes(ChannelType.GuildVoice)
                .setRequired(true)))
    ,
    run: async (client, interaction) => {
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case lang.admin.presentation_settings["en-US"]:
                return await presentationSettings(interaction);
            case lang.admin.mp_settings["en-US"]:
                return await mpSetting(interaction);
            case lang.admin.welcome_settings["en-US"]:
                return await welcomeSettings(interaction);
            case lang.admin.ticket_settings["en-US"]:
                return await ticketSettings(interaction);
            case lang.admin.partenaria_settings["en-US"]:
                return await partenariaSettings(interaction);
            case lang.admin.private_room_settings["en-US"]:
                return await privateRoomSettings(interaction);
        }
    }
}

const welcomeSettings = async (interaction) => {
    //@ts-ignore
    const welcomeChannel = interaction.options.getChannel(lang.admin.welcome_channel["en-US"]);
    //@ts-ignore
    const welcomeMessage = interaction.options.getString(lang.admin.welcome_message["en-US"]);

    const configRepo = AppDataSource.getRepository(Config);
    const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
    if (!config) {
        await configRepo.insert({
            guildId: interaction.guildId,
            welcomeChannelId: welcomeChannel.id,
            welcomeMessage
        });
    } else {
        await configRepo.update(config.id, {welcomeChannelId: welcomeChannel.id, welcomeMessage});
    }
    const embed = Success("Les paramètres de présentation ont été mis à jour");
    await interaction.reply({embeds: [embed], ephemeral: true});
}

const mpSetting = async (interaction) => {
    // @ts-ignore
    const mpChannel = interaction.options.getChannel(lang.admin.mp_channel["en-US"]);
    // @ts-ignore
    const ageSystem = interaction.options.getBoolean(lang.admin.mp_age_system["en-US"]);
    // @ts-ignore
    const adultRole = interaction.options.getRole(lang.admin.adult_role["en-US"]);
    // @ts-ignore
    const minorRole = interaction.options.getRole(lang.admin.minor_role["en-US"]);
    // @ts-ignore
    const closeRole = interaction.options.getRole(lang.admin.close_role["en-US"]);

    if (ageSystem && (!adultRole || !minorRole)) {
        const embed = Error("Vous devez spécifier les rôles majeur et mineur");
        await interaction.reply({embeds: [embed], ephemeral: true});
        return;
    }

    const configRepo = AppDataSource.getRepository(Config);
    const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
    if (!config) {
        await configRepo.save({
            guildId: interaction.guildId,
            mpChannelId: mpChannel.id,
            mpSystemAge: ageSystem,
            majorRoleId: adultRole?.id || null,
            minorRoleId: minorRole?.id || null,
            closeRoleId: closeRole?.id || null
        });
    } else {
        config.mpSystemAge = ageSystem || false;
        config.mpChannelId = mpChannel.id;
        config.majorRoleId = adultRole?.id || null;
        config.minorRoleId = minorRole?.id || null;
        config.closeRoleId = closeRole?.id || null;
        await configRepo.save(config);
    }
    const embed = Success("Les paramètres de présentation ont été mis à jour");
    await interaction.reply({embeds: [embed], ephemeral: true});
}

const presentationSettings = async (interaction) => {
    //@ts-ignore
    const presentationChannel = interaction.options.getChannel(lang.admin.presentation_channel["en-US"]);

    const configRepo = AppDataSource.getRepository(Config);
    const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
    if (!config) {
        await configRepo.insert({
            guildId: interaction.guildId,
            presentationChannelId: presentationChannel.id,
        });
    } else {
        await configRepo.update(config.id, {presentationChannelId: presentationChannel.id});
    }
    const row = new ActionRowBuilder().addComponents(PresentationBtn.data);
    await interaction.guild.channels.cache.get(presentationChannel.id).send({components: [row]});
    const embed = Success("Les paramètres de présentation ont été mis à jour");
    await interaction.reply({embeds: [embed], ephemeral: true});
}

const ticketSettings = async (interaction) => {
    const ticketChannel = interaction.options.getChannel(lang.admin.ticket_channel["en-US"]);
    const ticketRole = interaction.options.getRole(lang.admin.ticket_role["en-US"]);
    const ticketCategory = interaction.options.getChannel(lang.admin.ticket_category["en-US"]);
    const ticketMessage = interaction.options.getString(lang.admin.ticket_message["en-US"]);
    const ticketTranscript = interaction.options.getChannel(lang.admin.ticket_transcript["en-US"]);

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
    const ticketBtn = new ActionRowBuilder().addComponents(TicketsBtn.data);
    const embedTick = new EmbedBuilder()
        .setTitle("Ticket")
        .setDescription(ticketMessage + "\nCliquez sur le bouton pour créer un ticket")
        .setColor(Colors.Blue);
    await ticketChannel.send({components: [ticketBtn], embeds: [embedTick]});
    const embed = Success("Les paramètres de ticket ont été mis à jour");
    await interaction.reply({embeds: [embed], ephemeral: true});
}

const partenariaSettings = async (interaction) => {
    const partenariaChannel = interaction.options.getChannel(lang.admin.partenaria_channel["en-US"]);
    const partenariaRole = interaction.options.getRole(lang.admin.partenaria_role["en-US"]);
    const partenariaChannelAsk = interaction.options.getChannel(lang.admin.partenaria_channel_ask["en-US"]);
    const partenariaMention = interaction.options.getRole(lang.admin.partenaria_mention["en-US"]);

    const configRepo = AppDataSource.getRepository(Config);
    const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
    if (!config) {
        await configRepo.insert({
            guildId: interaction.guildId,
            partenaireChannelId: partenariaChannel.id,
            partenaireRoleId: partenariaRole.id,
            partenariaChannelAskId: partenariaChannelAsk.id,
            partenaireMentionId: partenariaMention.id
        });
    } else {
        await configRepo.update(config.id, {
            partenaireChannelId: partenariaChannel.id,
            partenaireRoleId: partenariaRole.id,
            partenariaChannelAskId: partenariaChannelAsk.id,
            partenaireMentionId: partenariaMention.id
        });
    }

    const btn = new ActionRowBuilder().addComponents(PartenariaBtn.data);
    await interaction.guild.channels.cache.get(partenariaChannel.id).send({components: [btn]});

    const embed = Success("Les paramètres de partenaria ont été mis à jour");
    await interaction.reply({embeds: [embed], ephemeral: true});
}

const privateRoomSettings = async (interaction) => {
    const privateRoomCategory = interaction.options.getChannel(lang.admin.private_room_category["en-US"]);
    const privateRoomVoice = interaction.options.getChannel(lang.admin.private_room_voice["en-US"]);

    const configRepo = AppDataSource.getRepository(Config);
    const config = await configRepo.findOne({where: {guildId: interaction.guildId}});
    if (!config) {
        await configRepo.insert({
            guildId: interaction.guildId,
            privateRoomCategoryId: privateRoomCategory.id,
            privateRoomVoiceId: privateRoomVoice.id
        });
    } else {
        await configRepo.update(config.id, {
            privateRoomCategoryId: privateRoomCategory.id,
            privateRoomVoiceId: privateRoomVoice.id
        });
    }
    const embed = Success("Les paramètres de salon privé ont été mis à jour");
    await interaction.reply({embeds: [embed], ephemeral: true});
}