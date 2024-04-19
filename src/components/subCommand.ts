import {CommandInteraction, Client, SlashCommandBuilder, SlashCommandSubcommandBuilder} from 'discord.js';
import CustomClient from "../utils/CustomClient";

export interface SubCommand {
  data: SlashCommandSubcommandBuilder;
  cooldown?: number;
  run: (client: CustomClient, interaction: CommandInteraction) => void;
}