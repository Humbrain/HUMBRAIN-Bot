import {SubCommand} from "../../subCommand";
import lang from "../../../lang/lang";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ChannelType,
    Role,
    SlashCommandSubcommandBuilder,
    TextChannel
} from "discord.js";
import {AppDataSource} from "../../../data-source";
import {Config} from "../../../entities/config";
import {PartenariaBtn} from "../../../02-buttons/PartenariaBtn";
import {Success} from "../../../utils/Embed";

export const PartnershipSettings: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName(lang.admin.settings.partnership.name["en-US"])
        .setNameLocalizations(lang.admin.settings.partnership.name)
        .setDescription(lang.admin.settings.partnership.description["en-US"])
        .setDescriptionLocalizations(lang.admin.settings.partnership.description)
        .addChannelOption(option => option
            .setName(lang.admin.settings.partnership.channel.name["en-US"])
            .setNameLocalizations(lang.admin.settings.partnership.channel.name)
            .setDescription(lang.admin.settings.partnership.channel.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.partnership.channel.description)
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true))
        .addRoleOption(option => option
            .setName(lang.admin.settings.partnership.role.name["en-US"])
            .setNameLocalizations(lang.admin.settings.partnership.role.name)
            .setDescription(lang.admin.settings.partnership.role.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.partnership.role.description)
            .setRequired(true))
        .addChannelOption(option => option
            .setName(lang.admin.settings.partnership.forms_submitting_channel.name["en-US"])
            .setNameLocalizations(lang.admin.settings.partnership.forms_submitting_channel.name)
            .setDescription(lang.admin.settings.partnership.forms_submitting_channel.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.partnership.forms_submitting_channel.description)
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true))
        .addRoleOption(option => option
            .setName(lang.admin.settings.partnership.mentions_role.name["en-US"])
            .setNameLocalizations(lang.admin.settings.partnership.mentions_role.name)
            .setDescription(lang.admin.settings.partnership.mentions_role.description["en-US"])
            .setDescriptionLocalizations(lang.admin.settings.partnership.mentions_role.description)
            .setRequired(true)),
    run: async (client, interaction) => {
        const partenariaChannel = interaction.options.get(lang.admin.settings.partnership.channel.name["en-US"]).channel as TextChannel;
        const partenariaRole = interaction.options.get(lang.admin.settings.partnership.role.name["en-US"]).role as Role;
        const partenariaChannelAsk = interaction.options.get(lang.admin.settings.partnership.forms_submitting_channel.name["en-US"]).channel as TextChannel;
        const partenariaMention = interaction.options.get(lang.admin.settings.partnership.mentions_role.name["en-US"]).role as Role;

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

        const btn = new ActionRowBuilder<ButtonBuilder>().addComponents(PartenariaBtn.data);
        const sendChannel = interaction.guild.channels.cache.get(partenariaChannel.id) as TextChannel;
        await sendChannel.send({components: [btn]});

        const embed = Success("Les paramètres de partenariat ont été mis à jour");
        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}