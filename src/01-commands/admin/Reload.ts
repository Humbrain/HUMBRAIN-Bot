import {Command} from "../command";
import {SlashCommandBuilder} from "discord.js";
import lang from "../../lang/lang";

export const Reload: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.admin.reload["en-US"])
        .setNameLocalizations(lang.admin.reload)
        .setDescription(lang.admin.reload_description["en-US"])
        .setDescriptionLocalizations(lang.admin.reload_description)
        .addStringOption(option => option.setName(lang.admin.command["en-US"])
            .setNameLocalizations(lang.admin.command)
            .setDescription(lang.admin.command_description["en-US"])
            .setDescriptionLocalizations(lang.admin.command_description)
            .setRequired(true)),
    run: async (client, interaction) => {
        // TODO: Implement reload command
    }
}