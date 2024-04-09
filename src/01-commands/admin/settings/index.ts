import {
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";
import lang from "../../../lang/lang";
import {Command} from "../../command";
import {Error, Success} from "../../../utils/Embed";
import {PresentationSetting} from "./Presentation";
import {PrivateMessageSettings} from "./PrivateMessageSettings";
import {WelcomSettings} from "./WelcomSettings";
import {TicketSettings} from "./TicketSettings";
import {PartnershipSettings} from "./PartnershipSettings";
import {PrivateRoomSettings} from "./PrivateRoomSettings";
import {LevelAddBlackList} from "./LevelAddBlackList";
import {LevelRemoveBlackList} from "./LevelRemoveBlackList";
import {LevelAddRang} from "./LevelAddRang";
import {LevelEditRang} from "./LevelEditRang";
import {LevelRemoveRang} from "./LevelRemoveRang";
import {LevelChannel} from "./LevelChannel";
import {LevelIsActivate} from "./LevelIsActivate";

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
        .addSubcommandGroup(subcommandGroup => subcommandGroup
            .setName(lang.level["en-US"])
            .setNameLocalizations(lang.level)
            .setDescription(lang.level["en-US"])
            .setDescriptionLocalizations(lang.level)
            .addSubcommand(LevelAddBlackList.data)
            .addSubcommand(LevelRemoveBlackList.data)
            .addSubcommand(LevelAddRang.data)
            .addSubcommand(LevelEditRang.data)
            .addSubcommand(LevelRemoveRang.data)
            .addSubcommand(LevelChannel.data)
            .addSubcommand(LevelIsActivate.data)
        )
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
            case LevelAddBlackList.data.name:
                await LevelAddBlackList.run(client, interaction);
                return;
            case LevelRemoveBlackList.data.name:
                await LevelRemoveBlackList.run(client, interaction);
                return;
            case LevelAddRang.data.name:
                await LevelAddRang.run(client, interaction);
                return;
            case LevelEditRang.data.name:
                await LevelEditRang.run(client, interaction);
                return;
            case LevelRemoveRang.data.name:
                await LevelRemoveRang.run(client, interaction);
                return;
            case LevelChannel.data.name:
                await LevelChannel.run(client, interaction);
                return;
            case LevelIsActivate.data.name:
                await LevelIsActivate.run(client, interaction);
                return;
            default:
                const embed = Error("Commande inconnue");
                await interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}