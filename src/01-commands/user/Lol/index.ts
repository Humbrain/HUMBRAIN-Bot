import {Command} from "../../command";
import {SlashCommandBuilder} from "discord.js";
import {Stats} from "./Stats";

export const Lol: Command = {
    data: new SlashCommandBuilder()
        .setName("leagueoflegends")
        .setDescription("Get information about a League of Legends.")
        .addSubcommand(Stats.data),
    run: async (client, interaction) => {
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case Stats.data.name:
                await Stats.run(client, interaction);
                break;
            default:
                await interaction.reply("This is the default subcommand.");
                break;
        }
    }

}