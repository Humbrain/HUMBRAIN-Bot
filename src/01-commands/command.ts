import { CommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import CustomClient from "../utils/CustomClient";

export interface Command {
  data: any;
  cooldown?: number;
  run: (client: CustomClient, interaction: CommandInteraction) => void;
}