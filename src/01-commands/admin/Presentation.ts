import {Command} from "../command";
import {ActionRowBuilder, SlashCommandBuilder} from "discord.js";
import lang from "../../lang/lang";
import CustomClient from "../../utils/CustomClient";
import Loggers from "../../utils/Loggers";

export const Presentation: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.presentation["en-US"])
        .setNameLocalizations(lang.presentation)
        .setDescription(lang.presentation_description["en-US"])
        .setDescriptionLocalizations(lang.presentation_description),
    run: async (client: CustomClient, interaction) => {
        const btn = client.buttons.get('presentation');
        if (!btn) {
            return interaction.reply({content: "erreur", ephemeral: true});
        }
        const row = new ActionRowBuilder().addComponents(btn.data);
        // @ts-ignore
        await interaction.reply({content: lang.presentation["en-US"], components: [row]});

    }
}