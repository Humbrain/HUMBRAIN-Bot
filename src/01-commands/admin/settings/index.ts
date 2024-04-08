import {
    ActionRowBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
    ChannelType, EmbedBuilder, Colors
} from "discord.js";
import lang from "../../../lang/lang";
import {AppDataSource} from "../../../data-source";
import {Config} from "../../../entities/config";
import {Command} from "../../command";
import {Error, Success} from "../../../utils/Embed";
import {PresentationBtn} from "../../../02-buttons/presentationBtn";
import {TicketsBtn} from "../../../02-buttons/Tickets";
import {PartenariaBtn} from "../../../02-buttons/PartenariaBtn";
import {PresentationSetting} from "./Presentation";
import {PrivateMessageSettings} from "./PrivateMessageSettings";
import {WelcomSettings} from "./WelcomSettings";
import {TicketSettings} from "./TicketSettings";
import {PartnershipSettings} from "./PartnershipSettings";
import {PrivateRoomSettings} from "./PrivateRoomSettings";
import {Levels} from "../../../entities/Levels";
import {Level} from "./Level";

export const Settings: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.admin.settings.name["en-US"])
        .setNameLocalizations(lang.admin.settings.name)
        .setDescription(lang.admin.settings.description["en-US"])
        .setDescriptionLocalizations(lang.admin.settings.description)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(PresentationSetting.data)
        .addSubcommand(PrivateMessageSettings.data)
        .addSubcommand(WelcomSettings.data)
        .addSubcommand(TicketSettings.data)
        .addSubcommand(PartnershipSettings.data)
        .addSubcommand(PrivateRoomSettings.data)
        .addSubcommandGroup(Level.data)
    ,
    run: async (client, interaction) => {
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case PresentationSetting.data.name:
                await PresentationSetting.run(client, interaction);
                return;
            case PrivateMessageSettings.data.name:
                await PrivateMessageSettings.run(client, interaction);
                return;
            case WelcomSettings.data.name:
                await WelcomSettings.run(client, interaction);
                return;
            case TicketSettings.data.name:
                await TicketSettings.run(client, interaction);
                return;
            case PartnershipSettings.data.name:
                await PartnershipSettings.run(client, interaction);
                return;
            case PrivateRoomSettings.data.name:
                await PrivateRoomSettings.run(client, interaction);
                return;
            case Level.data.name:
                await Level.run(client, interaction);
                return;
            default:
                const embed = Error("Commande inconnue");
                await interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}