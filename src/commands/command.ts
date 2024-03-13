import { CommandInteraction, Client, SlashCommandBuilder } from 'discord.js';

export interface Command {
  data: any;
  run: (client: Client, interaction: CommandInteraction) => void;
}